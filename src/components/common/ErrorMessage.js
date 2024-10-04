/** 
 * ErrorMessage Component
 * This component is responsible for displaying error messages in forms or any other sections where needed.
 * If no error message is provided, it returns null (doesn't render anything).
 * @param {string} message - The error message to display.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'; // Using Emotion's styled component

// Styled component using Emotion to style the error message
const StyledErrorMessage = styled.div`
  background-color: #f8d7da; /* Light red background color for error */
  color: #721c24; /* Darker red color for the text */
  border: 1px solid #f5c6cb; /* Red border to match the background */
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 0.875rem; /* Slightly smaller font size for subtle display */
  text-align: left; /* Left align the text */
`;

/**
 * ErrorMessage functional component
 * @param {string} message - The error message to display.
 * @returns {JSX.Element|null} - The rendered error message or null if no message is provided.
 */
const ErrorMessage = ({ message }) => {
  // If no message is provided, do not render the component
  if (!message) return null;

  // Render the styled error message if a message is provided
  return (
    <StyledErrorMessage>
      <p>{message}</p>
    </StyledErrorMessage>
  );
};

// Define prop types for the component to ensure proper usage
ErrorMessage.propTypes = {
  message: PropTypes.string, // Expecting a string for the message
};

export default ErrorMessage;
