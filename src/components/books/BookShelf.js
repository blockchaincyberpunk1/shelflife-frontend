// BookShelf.js
/**
 * BookShelf Component
 * This component is responsible for displaying books on a specific shelf.
 * It uses the `getBooksByShelf` and `updateBookShelf` context functions to fetch and manage books.
 * Books can be moved between shelves via drag-and-drop functionality.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useBook } from '../../hooks/useBook'; // Custom hook to access book context functions
import BookList from './BookList'; // Import the BookList component to display books
import { useTranslation } from 'react-i18next'; // For translations
import { Spin } from 'antd'; // Ant Design's spinner for loading state
import styled from '@emotion/styled'; // Emotion for styling components

// Styled container for the bookshelf
const ShelfContainer = styled.div`
  padding: 20px;
  background-color: #3c3853;
  min-height: 400px;
  border-radius: 8px;
  color: #fff;
`;

// Styled header for the shelf title
const ShelfHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

/**
 * BookShelf Component
 * Displays a list of books from a specific shelf and enables moving books between shelves using drag and drop.
 *
 * @param {string} shelfId - The ID of the shelf to display.
 * @param {string} shelfName - The name of the shelf (for display purposes).
 */
const BookShelf = ({ shelfId, shelfName }) => {
  const { getBooksByShelf, updateBookShelf, books, isLoading, error } = useBook(); // Extract context functions and state
  const { t } = useTranslation(); // Hook for translations
  const [draggingBookId, setDraggingBookId] = useState(null); // State to track the dragged book

  // Fetch the books for the specific shelf when the component mounts or the shelfId changes
  useEffect(() => {
    if (shelfId) {
      getBooksByShelf(shelfId); // Call the context function to fetch books by shelf ID
    }
  }, [shelfId, getBooksByShelf]);

  /**
   * Handle the drag start event for a book.
   * This sets the dragged book's ID in the state.
   *
   * @param {string} bookId - The ID of the book being dragged.
   */
  const handleDragStart = (bookId) => {
    setDraggingBookId(bookId); // Set the ID of the dragged book
  };

  /**
   * Handle the drop event when a book is moved to a new shelf.
   * This updates the shelf of the dragged book using the `updateBookShelf` function.
   *
   * @param {string} targetShelfId - The ID of the target shelf where the book is dropped.
   */
  const handleDrop = useCallback(
    async (targetShelfId) => {
      if (draggingBookId && targetShelfId !== shelfId) {
        // If a book is dragged and dropped into a different shelf, update its shelf
        await updateBookShelf(draggingBookId, targetShelfId);
        setDraggingBookId(null); // Reset the dragged book ID after drop
      }
    },
    [draggingBookId, shelfId, updateBookShelf]
  );

  /**
   * Handle the drag over event to allow dropping.
   * This prevents the default behavior to allow for the drop.
   *
   * @param {Event} e - The drag event.
   */
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent the default behavior to allow dropping
  };

  // Render loading, error, or book list based on the state
  return (
    <ShelfContainer
      onDragOver={handleDragOver} // Enable drag-over to allow dropping books
      onDrop={() => handleDrop(shelfId)} // Handle the drop event to update the book's shelf
    >
      <ShelfHeader>{shelfName || t('bookShelf.defaultShelfName')}</ShelfHeader> {/* Display shelf name */}
      
      {isLoading ? (
        <Spin /> // Show a loading spinner while fetching books
      ) : error ? (
        <p>{t('bookShelf.errorLoadingBooks')}</p> // Show an error message if books fail to load
      ) : books.length > 0 ? (
        <BookList
          books={books}
          onUpdateShelf={updateBookShelf} // Pass the updateBookShelf function to the BookList component
          onDragStart={handleDragStart} // Pass the dragStart handler to each book component
        />
      ) : (
        <p>{t('bookShelf.noBooks')}</p> // Show a message if there are no books on the shelf
      )}
    </ShelfContainer>
  );
};

export default BookShelf;
