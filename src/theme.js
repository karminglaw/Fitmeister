import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1877F2', // Meta blue color
    },
    background: {
      default: '#F0F2F5', // Meta background color
    },
  },
  typography: {
    fontFamily: 'Helvetica Neue, Arial, sans-serif',
  },
});

export default theme;
