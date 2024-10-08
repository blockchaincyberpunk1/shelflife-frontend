/**
 * UpdateShelf.js
 * 
 * This component renders a form that allows users to update the name of an existing shelf.
 * It leverages React Hook Form for form handling, Ant Design for UI components,
 * and `useShelf` custom hook for managing shelf-related actions (updating the shelf).
 * Additionally, the component supports localization using `react-i18next` for text translations.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { useShelf } from '../../hooks/useShelf'; // Custom hook to handle shelf actions (update, etc.)
import { useTranslation } from 'react-i18next'; // Translation hook for internationalization
import styled from '@emotion/styled'; // Emotion for styling components
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components for form, input fields, and UI elements
import {
  formContainerStyles,
  buttonStyles,
  inputFieldStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for consistent design

// Styled container for the form using Emotion and global styles
const FormContainer = styled(Form)`
  ${formContainerStyles}; // Apply the global container styles
  background-color: #494761; // Background color consistent with app's color scheme
  color: white; // Text color
`;

// Styled header for the form
const FormHeader = styled.h2`
  text-align: center; // Center align the header text
  color: #ffffff; // White text for clear contrast
  margin-bottom: 16px; // Add margin below the header
`;

/**
 * UpdateShelf Component
 * 
 * @param {Object} initialShelfData - The initial data of the shelf to be updated (id, name).
 * @param {Function} onUpdateCompleted - A callback function to be called after the shelf is successfully updated.
 */
const UpdateShelf = ({ initialShelfData, onUpdateCompleted }) => {
  const { updateShelf, error, isLoading } = useShelf(); // Extract shelf update function, loading, and error state from useShelf hook
  const [shelfName, setShelfName] = useState(initialShelfData.name); // Local state to hold the updated shelf name
  const { t } = useTranslation(); // Initialize the translation hook for i18n support

  // Memoized validation check to ensure shelf name is not empty or invalid
  const isShelfNameValid = useMemo(() => shelfName.trim().length > 0, [shelfName]);

  /**
   * Form submission handler for updating the shelf
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (isShelfNameValid) {
      try {
        // Call the updateShelf function from the shelf context to update the shelf
        await updateShelf(initialShelfData._id, shelfName); 
        setShelfName(''); // Clear the input field after successful update

        if (onUpdateCompleted) {
          onUpdateCompleted(); // Trigger the callback passed via props once the update is complete
        }
      } catch (err) {
        console.error('Error updating shelf:', err); // Log any errors encountered during the update
      }
    }
  }, [shelfName, isShelfNameValid, updateShelf, initialShelfData._id, onUpdateCompleted]);

  return (
    <FormContainer onSubmitCapture={handleSubmit} className="shelf-update-form"> {/* Ant Design form wrapper */}
      <FormHeader>{t('shelfUpdateForm.title')}</FormHeader> {/* Localized form header */}

      {/* Display any errors encountered during the update process using Ant Design's Alert component */}
      {error && <Alert message={t(error)} type="error" showIcon />}

      {/* Shelf name input field */}
      <Form.Item
        label={t('shelfUpdateForm.shelfName')} // Localized label for the input field
        required // Mark the field as required
        validateStatus={!isShelfNameValid ? 'error' : 'success'} // Show error state if the shelf name is invalid
        help={!isShelfNameValid ? t('shelfUpdateForm.shelfNameError') : ''} // Display localized error message for invalid name
      >
        <Input
          type="text"
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)} // Update the state as the user types
          css={inputFieldStyles} // Apply global input field styles
          placeholder={t('shelfUpdateForm.shelfNamePlaceholder')} // Localized placeholder text
          required // Make the input field required
        />
      </Form.Item>

      {/* Update button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block // Make the button span the full width
          css={buttonStyles} // Apply global button styles
          disabled={isLoading || !isShelfNameValid} // Disable button if loading or name is invalid
        >
          {isLoading ? t('shelfUpdateForm.loading') : t('shelfUpdateForm.updateButton')} {/* Show loading text or update button text */}
        </Button>
      </Form.Item>
    </FormContainer>
  );
};

// React.memo to prevent unnecessary re-renders if props don't change
export default React.memo(UpdateShelf);
