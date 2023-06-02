/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable promise/catch-or-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable promise/always-return */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserContext } from 'renderer/context/UserProvider';
import useFetch from 'renderer/hooks/useFetch';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  listItemContent: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
  },
  listItemTitle: {
    fontWeight: 'bold',
  },
  listItemText: {
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#1a237e',
    fontWeight: 'bold',
    marginLeft: theme.spacing(4),
  },
}));

function CredentialList() {
  const classes = useStyles();
  const { credentials, updateCredentials } = useContext(UserContext);

  const [expandedItem, setExpandedItem] = useState('');

  const handleExpand = (id) => {
    setExpandedItem((prevExpandedItem) => (prevExpandedItem === id ? '' : id));
  };

  const getCredentials = useCallback(() => {
    const token = localStorage.getItem('authToken');
    useFetch('/credentials', 'GET', `session[token]=${token}`).then((res) => {
      updateCredentials(res.credentials);
    });
  }, [updateCredentials]);
  useEffect(() => {
    getCredentials();
  }, []);

  return (
    <>
      <Typography variant="h4" className={classes.title}>
        Credentials List
      </Typography>
      <List>
        {credentials.map((credential) => (
          <ListItem
            key={credential.id}
            button
            onClick={() => handleExpand(credential.id)}
            className={classes.listItem}
          >
            <ListItemSecondaryAction>
              <IconButton edge="start" onMouseDown={(e) => e.preventDefault()}>
                {expandedItem === credential.id ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </ListItemSecondaryAction>
            <div className={classes.listItemContent}>
              <Typography variant="body2" className={classes.listItemText}>
                <b>Website:</b> {credential.website}
              </Typography>
              <Typography variant="body2" className={classes.listItemText}>
                <b>Login:</b> {credential.login}
              </Typography>
              {credential.notes && (
                <Typography variant="body2" className={classes.listItemText}>
                  <b>Note:</b> {credential.notes}
                </Typography>
              )}
              <Collapse
                in={expandedItem === credential.id}
                timeout="auto"
                unmountOnExit
              >
                <Typography variant="body2" className={classes.listItemText}>
                  <b>Password:</b> {credential.password}
                </Typography>
              </Collapse>
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default CredentialList;
