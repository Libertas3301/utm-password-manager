import { MemoryRouter as Router } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material';
import Kernel from 'renderer/Kernel';
import UserProvider from 'renderer/context/UserProvider';

const Theme = {
  palette: {
    primary: {
      dark: '#5340FF',
      main: '#5340FF',
      light: '#5340FF',
    },
  },
};

const theme = createTheme(Theme);

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Kernel />
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
}
