/**
 * RemoveBookFromShelf.js
 * 
 * This component provides an interface for users to remove books from a specific shelf.
 * It uses the ShelfContext to manage the removal of books and is designed to be used as a button or within a book list.
 * The component supports internationalization using react-i18next and uses Ant Design for UI.
 */

import React, { useCallback } from 'react'; // Import React and hooks
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related logic
import { Button, Popconfirm, message } from 'antd'; // Ant Design components for UI
import { useTranslation } from 'react-i18next'; // Hook for internationalization
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { buttonStyles } from '../../assets/styles/globalStyles'; // Import global button styles for consistency

// Styled button component using Emotion and global styles
const RemoveButton = styled(Button)`
  ${buttonStyles}; // Apply global button styles
  background-color: #ff4d4f; // Red color to indicate removal
  border: none;
  &:hover {
    background-color: #ff7875; // Lighter red on hover for visual feedback
  }
`;

/**
 * RemoveBookFromShelf Component
 * 
 * @param {string} shelfId - The ID of the shelf from which the book will be removed.
 * @param {string} bookId - The ID of the book to be removed.
 * @param {Function} [onRemoveCompleted] - Optional callback to be called after the book is successfully removed.
 * @returns {JSX.Element} - A button component to remove a book from the shelf.
 */
const RemoveBookFromShelf = ({ shelfId, bookId, onRemoveCompleted }) => {
  const { removeBookFromShelf } = useShelf(); // Access the removeBookFromShelf function from ShelfContext
  const { t } = useTranslation(); // Translation hook for internationalization

  /**
   * Handles the removal of a book from a shelf.
   * Calls the removeBookFromShelf function from the context and shows a success message upon completion.
   */
  const handleRemoveBook = useCallback(async () => {
    try {
      await removeBookFromShelf(shelfId, bookId); // Remove the book using ShelfContext
      message.success(t('removeBook.success')); // Show success message

      if (onRemoveCompleted) {
        onRemoveCompleted(); // Call the optional callback after successful removal
      }
    } catch (err) {
      console.error('Error removing book from shelf:', err); // Log any errors
      message.error(t('removeBook.error')); // Show error message
    }
  }, [removeBookFromShelf, shelfId, bookId, onRemoveCompleted, t]);

  return (
    <Popconfirm
      title={t('removeBook.confirmation')} // Localized confirmation message
      onConfirm={handleRemoveBook} // Handle book removal on confirmation
      okText={t('removeBook.confirm')} // Localized confirm button text
      cancelText={t('removeBook.cancel')} // Localized cancel button text
    >
      <RemoveButton type="primary" danger>
        {t('removeBook.buttonLabel')} {/* Localized label for the remove button */}
      </RemoveButton>
    </Popconfirm>
  );
};

// Export the component using React.memo to prevent unnecessary re-renders
export default React.memo(RemoveBookFromShelf);