import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { createTheme,ThemeProvider } from '@mui/material';

const theme1=createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2b2b31',
      contrastText: '#ff9800',

    },
    secondary: {
      main: '#ff9800',

    },
    background: {
      default: 'white',
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>    
      <ThemeProvider theme={theme1}>
       
      <App/>
      
      </ThemeProvider>
    </Provider>  
        </BrowserRouter>

  </React.StrictMode>
);
reportWebVitals();
