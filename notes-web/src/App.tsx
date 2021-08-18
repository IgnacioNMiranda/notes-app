import 'normalize.css';
import './App.css';
import 'react-notifications-component/dist/theme.css';
import React, { useState } from 'react';
import ReactNotification from 'react-notifications-component';
import { LocalStorageUtil } from './utils/LocalStorageUtil';
import { AppRouter } from './AppRouter';
import { TokenContext } from "./context";
import { Header } from './components/core/organisms/Header/Header';

export function App() {
  const [ token, setToken ] = useState(LocalStorageUtil.get('token') || '');

  return (
    <div className="App">
      <TokenContext.Provider value={{ token, setToken }}>
        <Header/>
        <ReactNotification />
        <main className="main">
          <AppRouter/>
        </main>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
