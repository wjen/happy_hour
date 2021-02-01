import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context/context';
import { AuthProvider, user } from './context/auth.context';
import './css/style.css';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
