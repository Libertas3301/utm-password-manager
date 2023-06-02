/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';

import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import useFetch from 'renderer/hooks/useFetch';
import { CryptoJS } from 'renderer/scripts/aes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#1a237e',
    fontWeight: 'bold',
  },
}));

function StorePasswords() {
  const classes = useStyles();

  const [website, setWebsite] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const encryptedPassword = CryptoJS.AES.encrypt(password, 'vladdiethepilot');

    useFetch(
      '/credentials',
      'POST',
      `credential[website]=${website}&credential[login]=${login}&credential[password]=${encryptedPassword}&credential[notes]=${note}&session[token]=${token}`
    );

    alert('Succesfully added password');

    setWebsite('');
    setLogin('');
    setPassword('');
    setNote('');
  };

  return (
    <Box className={classes.root}>
      <Box p={1}>
        <Typography variant="h5" className={classes.title}>
          Add New Credential
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Website URL (Login page)"
                fullWidth
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Login"
                fullWidth
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Note"
                fullWidth
                multiline
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Save Credential
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default StorePasswords;
