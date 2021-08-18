import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TokenContext } from '../context';
import { AuthService } from '../services/auth.service';
import { LocalStorageUtil } from '../utils/LocalStorageUtil';

export const useAuth = () => {
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
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

  return { token, showLogin, updateTokenAndLogin, toggleLoginModal, logout };
};
