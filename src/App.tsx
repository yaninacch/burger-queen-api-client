import React from 'react';
import "./App.css";
import { LogIn } from './components/LogIn/LogIn';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <LogIn />
      </header>
    </div>
  );
}

export default App;