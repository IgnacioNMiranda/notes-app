import { createContext } from 'react';

// There are better ways to handle token storage in Client
export const TokenContext = createContext<{ token: string; setToken: (token: string) => void }>({
  token: '',
  setToken: () => {},
});
