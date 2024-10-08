/**
 * ShelfForm.js
 * 
 * This component allows users to create a new shelf by entering a shelf name.
 * It integrates with the `useShelf` hook for managing shelf creation and uses `react-i18next` for internationalization (i18n).
 * Ant Design is used for form components and UI, while Emotion is used for consistent styling.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next'; // Import i18n hook for translations
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related logic
import styled from '@emotion/styled'; // For Emotion-based styled components
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components for form UI
import {
  formContainerStyles,
  buttonStyles,
  inputFieldStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for consistent UI

// Styled form container using Emotion and applying global styles
const FormContainer = styled(Form)`
  ${formContainerStyles}; /* Apply global form container styles */
  background-color: #494761; /* Background color matching the app theme */
  color: white; /* Ensure text is readable against the dark background */
`;

// Styled header for the form
const FormHeader = styled.h2`
  text-align: center; /* Center-align the form header */
  color: #ffffff; /* White color to contrast with the background */
  margin-bottom: 16px; /* Add space below the header */
`;

/**
 * ShelfForm Component
 * 
 * This component provides a form for users to create a new shelf by entering a name.
 * The shelf creation process is handled using the `useShelf` custom hook.
 * Validation is provided for the shelf name input field to ensure it is not empty.
 * 
 * @param {Function} onShelfCreated - Callback to execute after the shelf is successfully created (e.g., closing the form).
 * @returns {JSX.Element} - A form component for creating a new shelf.
 */
const ShelfForm = ({ onShelfCreated }) => {
  const { createShelf, error, isLoading } = useShelf(); // Access the shelf creation logic and state (loading, error)
  const [shelfName, setShelfName] = useState(''); // Local state to track the shelf name input
  const { t } = useTranslation(); // Hook to handle translations

  // Memoized validation to check if the shelf name is valid (non-empty and trimmed)
  const isShelfNameValid = useMemo(() => shelfName.trim().length > 0, [shelfName]);

  /**
   * Handle form submission to create a new shelf.
   * If the shelf name is valid, it triggers the `createShelf` function.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (isShelfNameValid) { // Only proceed if the shelf name is valid
      try {
        await createShelf(shelfName); // Create the shelf by calling the custom hook function
        setShelfName(''); // Clear the shelf name input field upon successful creation
        if (onShelfCreated) {
          onShelfCreated(); // Optionally, execute the callback to handle post-creation behavior
        }
      } catch (err) {
        console.error('Error creating shelf:', err); // Log errors for debugging
      }
    }
  }, [shelfName, isShelfNameValid, createShelf, onShelfCreated]); // Add dependencies to prevent unnecessary re-renders

  return (
    <FormContainer onSubmitCapture={handleSubmit} className="shelf-form">
      <FormHeader>{t('shelfForm.title')}</FormHeader> {/* Localized form title */}

      {/* Display an error message if an error occurs during shelf creation */}
      {error && <Alert message={t(error)} type="error" showIcon />}

      {/* Shelf name input field */}
      <Form.Item
        label={t('shelfForm.shelfName')} // Localized label for the input field
        required // Make the field required
        validateStatus={!isShelfNameValid ? 'error' : 'success'} // Display validation status based on input
        help={!isShelfNameValid ? t('shelfForm.shelfNameError') : ''} // Provide localized error message if the name is invalid
      >
        <Input
          type="text"
          value={shelfName} // Bind the shelfName state to the input value
          onChange={(e) => setShelfName(e.target.value)} // Update state on input change
          css={inputFieldStyles} // Apply global styles to the input field
          placeholder={t('shelfForm.shelfNamePlaceholder')} // Localized placeholder for the input field
          required // Mark the input field as required
        />
      </Form.Item>

      {/* Submit button */}
      <Form.Item>
        <Button
          type="primary" // Use the primary button style
          htmlType="submit" // Set the button type to submit the form
          block // Make the button take the full width of the container
          css={buttonStyles} // Apply global button styles
          disabled={isLoading || !isShelfNameValid} // Disable the button if the form is loading or the shelf name is invalid
        >
          {isLoading ? t('shelfForm.loading') : t('shelfForm.submit')} {/* Display localized button text */}
        </Button>
      </Form.Item>
    </FormContainer>
  );
};

export default ShelfForm;
