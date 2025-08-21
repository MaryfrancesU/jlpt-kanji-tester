import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
      h1: {
        fontSize: '3rem',
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem',
        textAlign: 'center',
        fontFamily: 'NinjaKageDemo-Regular, NinjaKageDemo-Rough, Roboto, Arial, sans-serif',
      },
      h2: {
        fontSize: '2rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        textAlign: 'center',
        fontFamily: 'Amanojaku, Roboto, Arial, sans-serif',
      },
      h3: {
        fontSize: '1.5rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        textAlign: 'center',
        fontFamily: 'Roboto, Arial, sans-serif',
      },
      h4: {
        fontSize: '1.25rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        textAlign: 'center',
        fontFamily: 'Roboto, Arial, sans-serif',
      },
      h5: {
        fontSize: '1rem',
        paddingTop: '0.125rem',
        paddingBottom: '0.125rem',
        textAlign: 'center',
        fontFamily: 'Roboto, Arial, sans-serif',
      },
      h6: {
        fontSize: '0.875rem',
        paddingTop: '0.0625rem',
        paddingBottom: '0.0625rem',
        textAlign: 'center',
        fontFamily: 'Roboto, Arial, sans-serif',
      },
  },
});

export default theme;
