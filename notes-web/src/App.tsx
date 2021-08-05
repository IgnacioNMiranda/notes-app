import React from "react";
import logo from '../resources/svg/logo.svg';
import "./App.css";
import { Notes } from './components/Notes/Notes';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="200px"/>
        <h1>Notes application 📝</h1>
      </header>
      <main className='main'>
        <ReactNotification/>
        <Notes/>
      </main>
    </div>
  );
}

export default App;
