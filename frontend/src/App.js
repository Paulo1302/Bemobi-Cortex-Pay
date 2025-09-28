// src/App.js
import React, { useState } from 'react';
import './index.css';
import BCP from './components/CortexPayDashboard/BCP';
import LoginPage from './components/LoginForm';
import RegisterPage from './components/CadastroForm'; // certifique-se do caminho correto

function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'register', 'dashboard'
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    setCurrentScreen('dashboard');
  };

  const goToLogin = () => setCurrentScreen('login');
  const goToRegister = () => setCurrentScreen('register');

  return (
    <div className="App">
      {currentScreen === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} goToRegister={goToRegister} />
      )}
      {currentScreen === 'register' && (
        <RegisterPage goToLogin={goToLogin} />
      )}
      {currentScreen === 'dashboard' && <BCP user={userData} />}
    </div>
  );
}

export default App;
