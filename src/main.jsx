// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Main CSS for your app
import App from './App.jsx'; // Main App component

// Render the App component inside the #root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/Local-artisian-market-place">
      <App />
    </BrowserRouter>
  </StrictMode>
);
