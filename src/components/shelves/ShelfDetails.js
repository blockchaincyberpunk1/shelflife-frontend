/**
 * ShelfDetails.js
 * 
 * This component displays detailed information about a specific shelf, including its list of books.
 * It integrates with the ShelfContext to fetch, update, add, or remove books from a shelf.
 * Users can also edit the shelf name or add/remove books while viewing the shelf details.
 * The component uses Ant Design for UI and Emotion for consistent styling.
 * Internationalization is handled by react-i18next for multilingual support.
 */

import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the shelf ID from the URL params
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related actions
import BookList from '../books/BookList'; // Component to display the list of books in the shelf
import UpdateShelf from './UpdateShelf'; // Component to update the shelf name
import { Typography, Spin, Button, Modal, Input } from 'antd'; // Ant Design components for UI
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { useTranslation } from 'react-i18next'; // Hook for i18n support (translations)
import {
  globalContainerStyles,
  errorMessageStyles,
  titleStyles,
  buttonStyles
} from '../../assets/styles/globalStyles'; // Import global styles for consistency

// Destructure Title from Ant Design's Typography component
const { Title } = Typography;

// Styled container for the shelf details, using global container styles
const ShelfDetailsContainer = styled.div`
  ${globalContainerStyles}; // Apply global container styles for consistency
  background-color: #3c3853; // Match the background color to the application's color scheme
  padding: 20px;
  border-radius: 8px;
  color: white;
`;

// Styled header for the shelf name, using Emotion and global styles
const ShelfTitle = styled(Title)`
  ${titleStyles}; 
  color: #ffffff; // Ensure good contrast with the background color
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

// Component for the shelf details view
const ShelfDetail = () => {
  const { shelfId } = useParams(); // Get the shelfId from the URL params using the useParams hook
  const {
    getShelfById,
    addBookToShelf,
    removeBookFromShelf,
    shelves,
    isLoading,
    error
  } = useShelf(); // Access shelf-related state and actions from ShelfContext
  const { t } = useTranslation(); // Initialize translation hook for i18n
  const [isEditing, setIsEditing] = useState(false); // State to control whether the shelf is being edited
  const [isAddBookModalVisible, setIsAddBookModalVisible] = useState(false); // State for controlling add book modal visibility
  const [bookIdToAdd, setBookIdToAdd] = useState(''); // State to store the book ID to be added

  // Fetch the shelf details when the component mounts or shelfId changes
  useEffect(() => {
    getShelfById(shelfId);
  }, [shelfId, getShelfById]);

  // Memoize the shelf data to prevent unnecessary re-renders when shelfId or shelves change
  const shelf = useMemo(() => shelves.find((shelf) => shelf._id === shelfId), [shelves, shelfId]);

  // Handle toggling between edit mode and view mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  // Handle adding a book to the shelf
  const handleAddBook = async () => {
    if (!bookIdToAdd) return;
    try {
      await addBookToShelf(shelfId, bookIdToAdd);
      setIsAddBookModalVisible(false);
      setBookIdToAdd('');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  // Handle removing a book from the shelf
  const handleRemoveBook = async (bookId) => {
    try {
      await removeBookFromShelf(shelfId, bookId);
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  // Display loading spinner while waiting for the shelf data
  if (isLoading) {
    return <Spin tip={t('shelfDetail.loading')} size="large" />; // Display localized loading message
  }

  // Display error message if an error occurs while fetching the shelf
  if (error) {
    return <div css={errorMessageStyles}>{t('shelfDetail.error', { error })}</div>; // Display localized error message
  }

  // Display a message if the shelf is not found
  if (!shelf) {
    return <div>{t('shelfDetail.notFound')}</div>; // Display localized "not found" message
  }

  return (
    <ShelfDetailsContainer>
      {/* Conditional rendering for edit mode or view mode */}
      {isEditing ? (
        // If in edit mode, show the UpdateShelf form
        <UpdateShelf
          initialShelfData={shelf} // Pass the current shelf data to the UpdateShelf component
          onUpdateCompleted={toggleEditMode} // Switch back to view mode after updating the shelf
        />
      ) : (
        <>
          {/* Shelf name and edit button (view mode) */}
          <ShelfTitle level={2}>{shelf.name}</ShelfTitle>
          <Button
            type="primary"
            css={buttonStyles} // Apply global button styles
            onClick={toggleEditMode} // Enable edit mode when the button is clicked
          >
            {t('shelfDetail.editShelf')} {/* Localized button text for "Edit Shelf" */}
          </Button>

          {/* Button to add a book to the shelf */}
          <Button
            type="dashed"
            css={buttonStyles}
            onClick={() => setIsAddBookModalVisible(true)}
            style={{ marginLeft: '10px' }}
          >
            {t('shelfDetail.addBook')} {/* Localized button text for "Add Book" */}
          </Button>

          {/* Modal to add a book to the shelf */}
          <Modal
            title={t('shelfDetail.addBookModalTitle')}
            visible={isAddBookModalVisible}
            onOk={handleAddBook}
            onCancel={() => setIsAddBookModalVisible(false)}
          >
            <Input
              placeholder={t('shelfDetail.bookIdPlaceholder')} // Placeholder text for book ID input
              value={bookIdToAdd}
              onChange={(e) => setBookIdToAdd(e.target.value)}
            />
          </Modal>

          {/* Render the list of books in the shelf */}
          <BookList
            books={shelf.books}
            onRemoveBook={handleRemoveBook} // Pass the handleRemoveBook function to the BookList component
          />
        </>
      )}
    </ShelfDetailsContainer>
  );
};

export default React.memo(ShelfDetail); // Memoize the component to prevent unnecessary re-renders