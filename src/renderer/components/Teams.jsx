/* eslint-disable promise/catch-or-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable promise/always-return */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { makeStyles } from '@mui/styles';
import { UserContext } from 'renderer/context/UserProvider';
import useFetch from 'renderer/hooks/useFetch';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
    color: '#1a237e',
    fontWeight: 'bold',
    marginLeft: theme.spacing(4),
  },

  content: {
    marginLeft: theme.spacing(4),
  },
  subHeading: {
    marginBottom: theme.spacing(2),
    color: '#1a237e',
    fontWeight: 'bold',
    marginLeft: -theme.spacing(1),
  },
  button: {},
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: theme.spacing(4),
  },
  addNameInput: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function TeamComponent() {
  const token = localStorage.getItem('authToken');
  const { user, updateUser } = useContext(UserContext);

  const classes = useStyles();

  const [isLeader, setIsLeader] = useState(true);
  const [newTeamName, setNewTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Alice' },
  ]);
  const [newUserName, setNewUserName] = useState('');

  const handleDeleteUser = (userId) => {
    setTeamMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== userId)
    );
  };

  const handleMakeLeader = (userId) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((member) => {
        if (member.id === userId) {
          return { ...member, isLeader: true };
        }
        return member;
      })
    );
  };

  const handleAddUser = () => {
    if (newUserName.trim() !== '') {
      const newUserId = teamMembers.length + 1;
      const newUser = { id: newUserId, name: newUserName };
      setTeamMembers((prevMembers) => [...prevMembers, newUser]);
      setNewUserName('');
    }
  };

  const handleCreateTeam = () => {
    if (newTeamName.length > 0) {
      useFetch(
        '/teams',
        'POST',
        `team[name]=${newTeamName}&team[leader_id]=${user.id}&session[token]=${token}`
      );

      useFetch('/user/profile', 'GET', `session[token]=${token}`).then(
        (res) => {
          updateUser(res.current_user);
        }
      );
    }
  };

  const getTeam = () => {
    useFetch(`/teams/${user.id}`, 'GET', `session[token]=${token}`);
  };

  useEffect(() => {
    getTeam();
  }, []);

  console.log(user);

  return (
    <div>
      {user?.team ? (
        <>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Team Information
          </Typography>
          <div className={classes.content}>
            <Typography variant="subtitle1" gutterBottom>
              Team Members:
            </Typography>
            <List>
              {teamMembers.map((member) => (
                <ListItem key={member.id}>
                  <ListItemText primary={member.name} />
                  {isLeader && member.isLeader && (
                    <Typography variant="body2" color="textSecondary">
                      Leader
                    </Typography>
                  )}
                  {isLeader && !member.isLeader && (
                    <>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteUser(member.id)}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleMakeLeader(member.id)}
                      >
                        <AddTaskIcon />
                      </IconButton>
                    </>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
          {isLeader && (
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Add New User:
              </Typography>
              <TextField
                label="User Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className={classes.emptyContainer}>
          <Typography variant="h5" gutterBottom className={classes.subHeading}>
            Teams
          </Typography>
          <Typography variant="p" gutterBottom>
            You have no team right now, wanna create one?
          </Typography>
          <TextField
            label="New team name"
            value={newTeamName}
            className={classes.addNameInput}
            onChange={(e) => setNewTeamName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeam}
          >
            Create Team
          </Button>
        </div>
      )}
    </div>
  );
}

export default TeamComponent;
