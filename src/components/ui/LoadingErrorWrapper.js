/**
 * LoadingErrorWrapper.js
 * 
 * This higher-order component (HOC) is designed to handle loading and error states for other components.
 * It uses Ant Design's `Spin` for loading indicators and `ErrorMessage` for displaying localized error messages.
 * The wrapped component will only be rendered if no loading is in progress and no errors are present.
 */

import React from 'react';
import PropTypes from 'prop-types'; // To validate component props
import { Spin } from 'antd'; // Import Ant Design's Spin and Alert components
import ErrorMessage from './ErrorMessage'; // Import the custom ErrorMessage component

/**
 * LoadingErrorWrapper functional component
 * 
 * @param {Object} props - The props object that contains loading, error, and children components.
 * @param {boolean} props.isLoading - A boolean indicating if loading is in progress.
 * @param {string} props.error - An error message to display if an error has occurred.
 * @param {React.ReactNode} props.children - The children components to render if no loading or error is present.
 * 
 * @returns {JSX.Element} - Returns a loading spinner, error message, or the wrapped component based on the state.
 */
const LoadingErrorWrapper = ({ isLoading, error, children }) => {
  // If loading is true, show the Spin component from Ant Design
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." /> {/* Ant Design's loading spinner with a tip */}
      </div>
    );
  }

  // If there is an error, show the ErrorMessage component or Ant Design's Alert if no translation is needed
  if (error) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <ErrorMessage message={error} /> {/* Display translated error message */}
        {/* Alternatively, you could use Ant Design's Alert for non-localized errors */}
        {/* <Alert message="Error" description={error} type="error" showIcon /> */}
      </div>
    );
  }

  // If not loading and no error, render the children (wrapped components)
  return <>{children}</>;
};

// Define prop types for the component
LoadingErrorWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired, // Whether loading is happening
  error: PropTypes.string, // An optional error message
  children: PropTypes.node.isRequired, // The child components to render
};

// Export the LoadingErrorWrapper component for use in other parts of the application
export default LoadingErrorWrapper;
