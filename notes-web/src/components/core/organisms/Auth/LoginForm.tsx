import React, { useState } from 'react';
import { CredentialsDTO } from '../../../../interfaces/credentials.dto';
import { AuthService } from '../../../../services/auth.service';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { Form } from '../../molecules/Form';
import { NotificationUtil } from '../../../../utils/NotificationUtil';
import './LoginForm.css';

const INITIAL_LOGIN_STATE: CredentialsDTO = {
  email: '',
  password: '',
};

export const LoginForm = ({ updateTokenAndLogin, toggleLoginModal }: any) => {
  const [credentials, setCredentials] = useState(INITIAL_LOGIN_STATE);

  const handleInput = ({ target: { name, value } }: any) => {
    const credentialsName: keyof CredentialsDTO = name;
    const newCredentials = { ...credentials };
    newCredentials[credentialsName] = value;
    setCredentials(newCredentials);
  };

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    try {
      const {
        data: { token },
      } = await AuthService.login(credentials);

      updateTokenAndLogin(token);
    } catch (error) {
      const { message: errors }: { message: string | string[] } = error.response.data;
      if (typeof errors === 'object' && Array.isArray(errors)) {
        errors.forEach((error) => {
          NotificationUtil.createNotification({
            title: 'Error',
            message: error,
            type: 'danger',
          });
        });
      } else {
        NotificationUtil.createNotification({
          title: 'Error',
          message: errors,
          type: 'danger',
        });
      }
    }
  };

  return (
    <div className="loginModal" style={{ width: window.outerWidth, height: window.outerHeight }}>
      <div
        className="loginBackground"
        style={{ width: window.outerWidth, height: window.outerHeight }}
        onClick={toggleLoginModal}
      ></div>
      <div className="loginFormWrap">
        <Form onSubmit={handleLogin} title="Log in">
          <Input type="email" name="email" placeholder="Email" onChange={handleInput} value={credentials.email} />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={credentials.password}
          />
          <Button extraClasses="loginButton" text="Login" />
        </Form>
      </div>
    </div>
  );
};
