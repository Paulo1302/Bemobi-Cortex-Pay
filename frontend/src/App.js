// src/App.js
import React, { useState } from 'react';
import './index.css';
import BCP from './components/CortexPayDashboard/BCP';
import LoginPage from './components/LoginForm'; // certifique-se do caminho correto

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated ? (
        <BCP />
      ) : (
        <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;