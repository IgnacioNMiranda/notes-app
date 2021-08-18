import './Header.css';
import React from "react";
import { Navbar } from "../../molecules/Navbar";
import { LoginForm } from "../Auth/LoginForm";
import { useAuth } from '../../../../hooks/useAuth';

export const Header = () => {
  const { token, showLogin, updateTokenAndLogin, toggleLoginModal, logout } = useAuth();

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
