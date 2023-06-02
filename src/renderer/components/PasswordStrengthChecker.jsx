/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
/* eslint-disable camelcase */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, TextField, LinearProgress } from '@mui/material';
import { CheckPasswordStrength } from 'renderer/scripts/strongPasswords';
import zxcvbn from '../scripts/zxcvbn';

const useStyles = makeStyles((theme) => ({
  root: {
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
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    width: '100%',
  },
  strengthText: {
    marginTop: theme.spacing(2),
    fontSize: '14px',
    color: '#777',
  },
}));

function PasswordStrengthChecker() {
  const classes = useStyles();
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const calculatePasswordStrength = () => {
    const strength_obj = zxcvbn(password);

    const strengthZXCVBN = strength_obj.score + 1;
    const strengthCustom = CheckPasswordStrength(password);
    const strengthVar = (strengthCustom + strengthZXCVBN * 100) / 100;

    return strengthVar <= 5 ? strengthVar : 5;
  };

  const passwordStrength = useMemo(
    () => calculatePasswordStrength(),
    [password]
  );

  const getStrength = () => {
    switch (passwordStrength) {
      case 1:
        return 'Risky';
        break;
      case 2:
        return 'Weak';
        break;
      case 3:
        return 'Medium';
        break;
      case 4:
        return 'Strong';
        break;
      case 5:
        return 'Very strong';
        break;
      default:
        return 'Risky';
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Password Strength Checker
      </Typography>
      <TextField
        className={classes.input}
        label="Enter Password Here"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        variant="outlined"
        autoFocus
        required
      />
      <LinearProgress
        className={classes.progressBar}
        variant="determinate"
        value={passwordStrength * 20}
      />
      <Typography variant="body2" className={classes.strengthText}>
        {getStrength()}
      </Typography>
    </div>
  );
}

export default PasswordStrengthChecker;
