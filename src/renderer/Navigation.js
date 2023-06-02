import React from 'react';
import { Route, Routes } from 'react-router';

import LoadingPage from 'renderer/Loading';
import PasswordManager from './PasswordManager';
import RegistrationForm from './Register';
import LoginForm from './Login';

function Navigation() {
  return (
    <div>
      <Routes>
        <Route exact path="/" Component={LoadingPage} />
        <Route path="/home" Component={PasswordManager} />
        <Route path="/" Component={LoginForm} />
        <Route path="/login" Component={LoginForm} />
        <Route path="/register" Component={RegistrationForm} />
      </Routes>
    </div>
  );
}

export default Navigation;
