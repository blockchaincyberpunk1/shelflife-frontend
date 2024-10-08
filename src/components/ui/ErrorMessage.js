/**
 * ErrorMessage Component
 * This component is designed to display localized error messages, leveraging `react-i18next` for translation.
 * If no error message is provided, the component will return `null`, avoiding unnecessary rendering.
 * The visual styling of the error message is handled using Emotion's styled-components.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'; // Import styled from Emotion for defining styled components
import { useTranslation } from 'react-i18next'; // Import useTranslation for localization support

// Define a styled component for the error message container
const StyledErrorMessage = styled.div`
  background-color: #f8d7da; /* Sets a light red background to indicate an error */
  color: #721c24; /* Dark red color for the error text */
  border: 1px solid #f5c6cb; /* Red border to match the error theme */
  padding: 10px; /* Adds padding inside the error message box */
  border-radius: 5px; /* Rounds the corners of the box */
  margin-top: 10px; /* Adds space above the error message */
  font-size: 0.875rem; /* Sets a slightly smaller font size for the text */
  text-align: left; /* Aligns the text to the left */
`;

/**
 * ErrorMessage functional component
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.message - A key string that corresponds to a specific error message in the i18n translation file.
 * 
 * @returns {JSX.Element|null} - The component renders the translated error message if `message` is provided. 
 *                               If `message` is not provided, it returns `null` and does not render anything.
 */
const ErrorMessage = ({ message }) => {
  // Extract the translation function using the useTranslation hook from react-i18next
  const { t } = useTranslation();

  // If no message is provided, the component renders nothing (returns null)
  if (!message) return null;

  // Render the error message within the styled container
  return (
    <StyledErrorMessage>
      <p>{t(message)}</p> {/* Use the translation function to fetch and display the localized message */}
    </StyledErrorMessage>
  );
};

// Define prop types for the component to specify the expected prop type
ErrorMessage.propTypes = {
  message: PropTypes.string, // The `message` prop should be a string (specifically a key in the i18n translation files)
};

// Export the ErrorMessage component for use in other parts of the application
export default ErrorMessage;
