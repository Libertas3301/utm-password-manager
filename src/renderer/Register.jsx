/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { TextField, Button, Box, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useFetch from 'renderer/hooks/useFetch';

import Register from './assets/Register';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const onSubmit = async () => {
    const res = await useFetch(
      '/users',
      'POST',
      `user[email]=${email}&user[surname]=${surname}&user[name]=${name}&user[password]=${password}&user[date]=06/10/2001`
    );

    if (res.token) {
      localStorage.setItem('authToken', res.token);
      navigate('/home');
    } else {
      alert('Credentials are bad formatted');
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
      <Register />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h2>Register to UTM password Manager</h2>
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
            label="Surname"
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ border: 'white' }}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />{' '}
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            sx={{ border: 'white' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </Button>
          <div
            style={{
              marginTop: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Already have an account?{' '}
            <div
              style={{
                color: '#5340FF',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
              onClick={() => navigate('/login')}
            >
              <p>Login</p>
            </div>
          </div>
        </form>
      </Box>
    </Container>
  );
}

export default RegistrationForm;
