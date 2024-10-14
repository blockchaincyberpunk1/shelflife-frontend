/**
 * AddBookToShelf.js
 * 
 * This component provides an interface for adding books to a specific shelf.
 * It uses `useShelf` custom hook to manage adding books to the shelf and provides a dropdown or search functionality for book selection.
 * This component is designed with Ant Design for UI elements and utilizes Emotion for styling.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useShelf } from '../../hooks/useShelf'; // Custom hook to handle shelf actions
import { useBook } from '../../hooks/useBook'; // Custom hook to handle book-related actions
import { Select, Button, Spin, Alert } from 'antd'; // Ant Design components for select dropdown, button, spinner, and alerts
import styled from '@emotion/styled'; // Emotion for styling components
import { useTranslation } from 'react-i18next'; // Hook for internationalization (i18n)
import {
  formContainerStyles,
  buttonStyles,
  selectFieldStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for consistent design

// Destructure Option from Ant Design's Select component
const { Option } = Select;

// Styled container for the form using Emotion and global styles
const FormContainer = styled.div`
  ${formContainerStyles}; // Apply global container styles
  background-color: #494761; // Background color consistent with app's color scheme
  color: white; // Text color
  padding: 20px;
  border-radius: 8px;
`;

/**
 * AddBookToShelf Component
 * 
 * @param {string} shelfId - The ID of the shelf to which books are being added.
 * @param {Function} onAddCompleted - A callback function to be called after the book is successfully added to the shelf.
 */
const AddBookToShelf = ({ shelfId, onAddCompleted }) => {
  const { addBookToShelf, isLoading, error } = useShelf(); // Extract addBookToShelf function, loading, and error state from useShelf hook
  const { books, fetchBooks, isLoading: isBooksLoading, error: bookError } = useBook(); // Access book-related functions and state from useBook hook
  const [selectedBookId, setSelectedBookId] = useState(null); // State to track the selected book ID
  const { t } = useTranslation(); // Initialize the translation hook for i18n support

  // Fetch the list of books when the component mounts
  useEffect(() => {
    fetchBooks(); // Fetch all available books
  }, [fetchBooks]);

  /**
   * Handle the book selection change.
   * 
   * @param {string} value - The ID of the selected book.
   */
  const handleBookSelect = useCallback((value) => {
    setSelectedBookId(value); // Update the selected book ID state
  }, []);

  /**
   * Form submission handler for adding a book to the shelf
   * 
   * @param {Event} e - The form submission event
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (selectedBookId) {
      try {
        // Call the addBookToShelf function from the shelf context to add the book to the shelf
        await addBookToShelf(shelfId, selectedBookId);
        setSelectedBookId(null); // Clear the selected book after successful addition

        if (onAddCompleted) {
          onAddCompleted(); // Trigger the callback passed via props once the book is added
        }
      } catch (err) {
        console.error('Error adding book to shelf:', err); // Log any errors encountered during the addition
      }
    }
  }, [selectedBookId, addBookToShelf, shelfId, onAddCompleted]);

  return (
    <FormContainer>
      {/* Display any errors encountered during the book fetching or adding process */}
      {(error || bookError) && (
        <Alert message={t(error || bookError)} type="error" showIcon />
      )}

      {/* Display loading spinner while fetching books */}
      {isBooksLoading ? (
        <Spin tip={t('addBookToShelf.loadingBooks')} size="large" />
      ) : (
        <>
          {/* Book selection dropdown */}
          <Select
            showSearch // Enable search functionality in the dropdown
            placeholder={t('addBookToShelf.selectBookPlaceholder')} // Localized placeholder text
            optionFilterProp="children" // Filter options based on children (book titles)
            onChange={handleBookSelect} // Handle the selection change
            value={selectedBookId} // Bind the selected value to the state
            css={selectFieldStyles} // Apply global styles to the select field
          >
            {books.map((book) => (
              <Option key={book._id} value={book._id}>
                {book.title} {/* Display the book title as the option text */}
              </Option>
            ))}
          </Select>

          {/* Add button */}
          <Button
            type="primary"
            htmlType="submit"
            block // Make the button span the full width
            css={buttonStyles} // Apply global button styles
            disabled={isLoading || !selectedBookId} // Disable button if loading or no book is selected
            onClick={handleSubmit} // Handle button click to submit the form
          >
            {isLoading ? t('addBookToShelf.loading') : t('addBookToShelf.addButton')} {/* Show loading text or add button text */}
          </Button>
        </>
      )}
    </FormContainer>
  );
};

// Export the component using React.memo to prevent unnecessary re-renders
export default React.memo(AddBookToShelf);