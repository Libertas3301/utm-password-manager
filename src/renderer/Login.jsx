/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { TextField, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import useFetch from 'renderer/hooks/useFetch';
import Login from './assets/Login.jsx';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await useFetch(
      '/session',
      'POST',
      `session[email]=${email}&session[password]=${password}`
    );

    if (res.token) {
      localStorage.setItem('authToken', res.token);
      navigate('/home');
    } else {
      alert('Login or password is wrong');
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        maxWidth: '1000px',
        padding: '0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h2>Login to UTM password Manager</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '100px', width: '50%' }}
            onClick={onSubmit}
          >
            Login
          </Button>
          <div
            style={{
              marginTop: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Don't have an account?{' '}
            <div
              style={{
                color: '#5340FF',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
              onClick={() => navigate('/register')}
            >
              <p>Register</p>
            </div>
          </div>
        </form>
      </Box>
      <Login />
    </Container>
  );
}

export default LoginForm;
