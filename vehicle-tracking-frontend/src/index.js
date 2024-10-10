// Import necessary modules

import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for createRoot
import App from './App';                 // Import your main component

// Get the root element from your HTML
const rootElement = document.getElementById('root');

// Create the root
const root = ReactDOM.createRoot(rootElement);

// Render the app using createRoot

root.render(<React.StrictMode><App /></React.StrictMode>);
