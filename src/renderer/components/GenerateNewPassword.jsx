import { Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { GeneratePassword } from 'renderer/scripts/generatePasswords';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: theme.spacing(1),
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#1a237e',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: theme.spacing(2),
    width: 180,
  },
  generateButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#1a237e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0d1137',
    },
  },
  generatedPassword: {
    marginTop: theme.spacing(4),
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    width: '300px',
    marginTop: '15px',
    background: 'azure',
  },
}));

function GenerateNewPassword() {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [metterValue, setMetterValue] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);

  const handlePasswordLengthChange = (event) => {
    const { value } = event.target;
    if (value >= 16) {
      setPasswordLength(16);
      return;
    }

    if (value <= 1) {
      setPasswordLength(1);
      return;
    }

    setPasswordLength(value);
  };

  const generatePassword = () => {
    const { meterValue, generatedPassword } = GeneratePassword(passwordLength);

    setMetterValue(meterValue);
    setPassword(generatedPassword);
  };

  useEffect(() => {
    generatePassword(10);
  }, []);

  return (
    <div className={classes.formContainer}>
      <Typography variant="h4" className={classes.title}>
        Password Generator
      </Typography>

      <form className={classes.form} id="contact" action="" method="post">
        <TextField
          className={classes.input}
          label="Length of Password (8-16)"
          type="number"
          inputProps={{ min: 8, max: 16, display: 'block' }}
          value={passwordLength}
          onChange={handlePasswordLengthChange}
          required
          autoFocus
        />

        <Button
          className={classes.generateButton}
          variant="contained"
          onClick={generatePassword}
        >
          Generate Password
        </Button>

        <Typography variant="h5" className={classes.generatedPassword}>
          Generated Password: {password}
        </Typography>

        <meter
          value={metterValue}
          max="8"
          className={classes.meta}
          id="password-strength-meter"
        />
      </form>
    </div>
  );
}

export default GenerateNewPassword;
