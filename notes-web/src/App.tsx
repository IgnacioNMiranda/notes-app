import React, { useEffect, useState } from "react";
import { Notes } from './components/core/organisms/Notes/Notes';
import ReactNotification from 'react-notifications-component';
import { LoginForm } from "./components/core/organisms/Auth/LoginForm";
import { MainTitle } from "./components/core/atoms/MainTitle";
import { RightNavbar } from "./components/core/molecules/RIghtNavbar";
import { LocalStorageUtil } from "./utils/LocalStorageUtil";
import { AuthService } from "./services/auth.service";
import { NoteImage } from "./components/utils/NoteImage";
import { Paragraph } from "./components/core/atoms/Paragraph";
import { SpacerWrap } from "./components/utils/SpacerWrap";

import 'normalize.css';
import "./App.css";
import 'react-notifications-component/dist/theme.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [authToken, setAuthToken] = useState(LocalStorageUtil.get('authToken'));

  const toggleLoginModal = () => {
    setShowLogin(!showLogin);
  };

  const updateTokenAndLogin = (authToken: string) => {
    LocalStorageUtil.set('authToken', authToken);
    setAuthToken(authToken);
    setShowLogin(false);
  }

  const logout = () => {
    AuthService.logout();
    setAuthToken('');
  };

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
    validateToken(authToken);
  }, []);

  const navbarElements: { text: string, onClick: () => void, href: string, show: boolean }[] = [
    {
      text: 'Login',
      onClick: toggleLoginModal,
      href: '',
      show: authToken === '',
    },
    {
      text: 'Logout',
      onClick: logout,
      href: '',
      show: authToken !== '',
    }
  ]

  return (
    <div className="App">
      <header className="header">
        <RightNavbar elements={navbarElements}/>
      </header>
      <ReactNotification/>
      <main className='main'>
        {
          authToken !== ''
          ? <Notes authToken={authToken}/>
          :
          <>
            <MainTitle text='Notes application' extraClasses='homeTitle'/>
            <SpacerWrap classes='my-80'>
              <NoteImage/>
            </SpacerWrap>
            <Paragraph text={`With just a title and the content you're ready to go!`}/>
          </>
        }
        {
          showLogin && <LoginForm updateTokenAndLogin={updateTokenAndLogin} toggleLoginModal={toggleLoginModal}/>
        }
      </main>
    </div>
  );
}

export default App;
