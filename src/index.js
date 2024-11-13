import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Router } from './Router';
import { AuthProvider } from './context/auth/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
