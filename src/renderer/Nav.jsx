import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import Profile from 'renderer/components/Profile';
import PasswordStrengthChecker from 'renderer/components/PasswordStrengthChecker';
import GenerateNewPassword from 'renderer/components/GenerateNewPassword';
import CredentialList from 'renderer/components/CredentialList';
import StorePasswords from 'renderer/components/StorePasswords';
import {
  AccountCircle,
  VpnKey,
  Lock,
  ListAlt,
  Save,
} from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import Teams from 'renderer/components/Teams';

const drawerList = [
  {
    text: 'Profile',
    icon: <AccountCircle style={{ fill: 'white' }} />,
    link: 'Profile',
  },
  {
    text: 'Password Strength Checker',
    icon: <VpnKey style={{ fill: 'white' }} />,
    link: 'PasswordStrengthChecker',
  },
  {
    text: 'Generate New Password',
    icon: <Lock style={{ fill: 'white' }} />,
    link: 'GenerateNewPassword',
  },
  {
    text: 'Credential List',
    icon: <ListAlt style={{ fill: 'white' }} />,
    link: 'CredentialList',
  },
  {
    text: 'Store Passwords',
    icon: <Save style={{ fill: 'white' }} />,
    link: 'StorePasswords',
  },
  {
    text: 'Teams',
    icon: <GroupIcon style={{ fill: 'white' }} />,
    link: 'teams',
  },
];

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#2C2D3E',
    color: 'white',
    boxShadow: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'white',
    background: '#2C2D3E',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: '#e8eaf6',
    minHeight: '100vh',
  },
  menuIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [currentMenu, setCurrentMenu] = useState('Profile');

  const handleMenuClick = (link) => {
    setCurrentMenu(link);
  };

  const renderMenuContent = () => {
    switch (currentMenu) {
      case 'Profile':
        return <Profile />;
      case 'PasswordStrengthChecker':
        return <PasswordStrengthChecker />;
      case 'GenerateNewPassword':
        return <GenerateNewPassword />;
      case 'CredentialList':
        return <CredentialList />;
      case 'StorePasswords':
        return <StorePasswords />;
      case 'teams':
        return <Teams />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            UTM Password Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {drawerList.map((menu) => (
              <ListItem
                button
                key={menu.text}
                onClick={() => handleMenuClick(menu.link)}
              >
                <ListItemIcon className={classes.menuIcon}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {renderMenuContent()}
      </main>
    </div>
  );
}

export default App;
