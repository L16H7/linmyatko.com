import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NameSubmitForm from './components/nameSubmitForm';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Open Source Myanmar Names</h1>
        </header>
        <div> 
          <NameSubmitForm />
        </div>
      </div>
    );
  }
}

export default App;
