import './Header.css';
import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../../context";
import { AuthService } from "../../../../services/auth.service";
import { LocalStorageUtil } from "../../../../utils/LocalStorageUtil";
import { Navbar } from "../../molecules/Navbar";
import { LoginForm } from "../Auth/LoginForm";
import { useHistory } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  const [ showLogin, setShowLogin ] = useState(false);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const validateToken = async (authToken: string | null) => {
      if (authToken) {
        try {
          await AuthService.validateToken(authToken);
          updateTokenAndLogin(authToken);
        } catch (error) {
          logout();
        }
      }
    };
    validateToken(token);
  }, []);

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const updateTokenAndLogin = (authToken: string) => {
    LocalStorageUtil.set('token', authToken);
    setToken(authToken);
    setShowLogin(false);
    history.push('/notes');
  };

  const logout = () => {
    AuthService.logout();
    setToken('');
    history.push('');
  };

  const navbarElements: { text: string; onClick: () => void; href: string; show: boolean }[] = [
    {
      text: 'Login',
      onClick: toggleLoginModal,
      href: '',
      show: !token,
    },
    {
      text: 'Logout',
      onClick: logout,
      href: '',
      show: !!token,
    },
  ];

  return (
    <header className="header">
      {showLogin && <LoginForm updateTokenAndLogin={updateTokenAndLogin} toggleLoginModal={toggleLoginModal} />}
      <Navbar elements={navbarElements} />
    </header>
  )
};
