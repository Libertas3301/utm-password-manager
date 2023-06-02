/* eslint-disable promise/catch-or-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react';
import AppCurrentVisits from 'renderer/bigComponents/VisitorComponent';
import { PRIMARY, INFO, WARNING, SUCCESS } from 'renderer/utils/colors';
import { makeStyles } from '@mui/styles';
import { Typography, Button, Grid } from '@mui/material';
import useFetch from 'renderer/hooks/useFetch';
import { useNavigate } from 'react-router';
import { UserContext } from 'renderer/context/UserProvider';

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
  info: {
    marginBottom: theme.spacing(2),
  },
  logoutButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#1a237e',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0d1137',
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user, credentials, updateUser } = useContext(UserContext);

  const handleLogout = () => {
    useFetch('/session', 'DELETE', '');
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getUser = () => {
    const token = localStorage.getItem('authToken');
    useFetch('/user/profile', 'GET', `session[token]=${token}`).then((res) => {
      updateUser(res.current_user);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          Profile
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Welcome to your profile page!
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Username: {user?.name} {user?.surname}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Email: {user?.email}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Member since: {user?.date}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Total Passwords: {credentials.length}
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Average Password Strength: Medium
        </Typography>
        <Typography variant="body1" className={classes.info}>
          Passwords Used All Over the World: 15%
        </Typography>
        <Button
          variant="contained"
          className={classes.logoutButton}
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
      <Grid item xs={12} md={6} lg={4}>
        <AppCurrentVisits
          title="Current Visits"
          chartData={[
            { label: 'Mid Safe', value: 5 },
            { label: 'Unsafe', value: 9 },
            { label: 'Very safe', value: 3 },
            { label: 'Safest', value: 6 },
          ]}
          chartColors={[PRIMARY.main, INFO.main, WARNING.main, SUCCESS.main]}
        />
      </Grid>
    </div>
  );
}

export default Profile;
