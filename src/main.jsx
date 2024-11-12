import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import App from './App';
import { ShopProvider } from './context/ShopContext';
import { BrowserRouter as Router } from 'react-router-dom';


import './index.css';

// Create root using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ShopProvider>
      <Router basename="/Local-artisian-market-place">
        <App />
      </Router>
    </ShopProvider>
  </React.StrictMode>
);
