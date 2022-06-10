import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
