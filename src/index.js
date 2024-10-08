import React from 'react';
import ReactDOM from 'react-dom/client'; // ReactDOM to render React elements into the DOM
// import './index.css'; // Import global CSS styles
import App from './App'; // Import the root App component
import reportWebVitals from './reportWebVitals'; // Import performance measuring tool

/**
 * Entry point of the React application.
 * It initializes the root of the application and renders the App component.
 */

// Create a root element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * React.StrictMode is a tool to highlight potential problems in an application.
 * It activates additional checks and warnings for its child components.
 * It will only affect development mode (not production).
 */
root.render(
  <React.StrictMode>
    {/* Render the main App component within the StrictMode */}
    <App />
  </React.StrictMode>
);

// Performance measuring
// reportWebVitals logs performance metrics or sends them to an analytics endpoint.
// By default, it can log to the console for performance monitoring.
// Learn more about web vitals: https://bit.ly/CRA-vitals
reportWebVitals();