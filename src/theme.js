import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f7',
    },
    primary: {
      main: '#808080',
    },
    text: {
      primary: '#1d1d1f',
    },
  },
  typography: {
    fontFamily: 'San Francisco, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export default theme;
