/**
 * ShelfBooksList.js
 * 
 * This component renders a list of books that are part of a specific shelf.
 * It uses ShelfContext to fetch the books for a given shelf and provides the functionality to remove books directly from the list.
 * Ant Design is used for the UI, while Emotion provides consistent styling.
 * It also supports localization through `react-i18next` for multilingual support.
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the shelf ID from the URL params
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related data and actions
import { List, Button, Typography, Spin, Alert } from 'antd'; // Ant Design components for list, buttons, typography, and alerts
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { useTranslation } from 'react-i18next'; // Hook for i18n support (translations)
import {
  globalContainerStyles,
  listItemStyles,
  buttonStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for consistency

// Destructure Title from Ant Design's Typography component
const { Title } = Typography;

// Styled container for the book list
const BooksListContainer = styled.div`
  ${globalContainerStyles}; // Apply global container styles
  background-color: #3c3853; // Match the background color to the application's color scheme
  padding: 20px;
  border-radius: 8px;
  color: white;
`;

// Styled list item for each book
const StyledListItem = styled(List.Item)`
  ${listItemStyles}; // Apply global list item styles
`;

/**
 * ShelfBooksList Component
 * 
 * This component fetches and displays the books for a particular shelf and allows the user to remove books.
 * 
 * @returns {JSX.Element} - A list of books for the selected shelf.
 */
const ShelfBooksList = () => {
  const { shelfId } = useParams(); // Get the shelfId from the URL params
  const { getShelfById, removeBookFromShelf, shelves, isLoading, error } = useShelf(); // Get necessary functions and states from the ShelfContext
  const { t } = useTranslation(); // Translation hook for internationalization (i18n)

  // Fetch the specific shelf by ID when the component mounts
  useEffect(() => {
    if (shelfId) {
      getShelfById(shelfId);
    }
  }, [shelfId, getShelfById]);

  // Find the specific shelf in the state
  const shelf = shelves.find((shelf) => shelf._id === shelfId);

  // Display loading spinner while waiting for the shelf data
  if (isLoading) {
    return <Spin tip={t('shelfBooksList.loading')} size="large" />; // Display localized loading message
  }

  // Display error message if an error occurs while fetching the shelf
  if (error) {
    return <Alert message={t('shelfBooksList.error', { error })} type="error" showIcon />; // Display localized error message
  }

  // Display a message if the shelf is not found
  if (!shelf) {
    return <div>{t('shelfBooksList.notFound')}</div>; // Display localized "not found" message
  }

  // Handler to remove a book from the shelf
  const handleRemoveBook = async (bookId) => {
    try {
      await removeBookFromShelf(shelfId, bookId); // Call the removeBookFromShelf function from the ShelfContext
    } catch (err) {
      console.error('Error removing book from shelf:', err); // Log any errors encountered during removal
    }
  };

  return (
    <BooksListContainer>
      {/* Display the title of the section */}
      <Title level={3}>{t('shelfBooksList.title', { shelfName: shelf.name })}</Title> {/* Localized title for the shelf */}

      {/* List of books on the shelf */}
      <List
        dataSource={shelf.books} // Use the list of books from the selected shelf
        renderItem={(book) => (
          <StyledListItem key={book._id}> {/* Each book has a unique key */}
            <div>
              <strong>{book.title}</strong> - {book.author}
            </div>
            <Button
              type="primary"
              danger
              css={buttonStyles} // Apply global button styles
              onClick={() => handleRemoveBook(book._id)} // Remove the book from the shelf when the button is clicked
            >
              {t('shelfBooksList.removeBook')} {/* Localized button text for removing a book */}
            </Button>
          </StyledListItem>
        )}
        bordered // Add a border around each list item for visual separation
      />
    </BooksListContainer>
  );
};

export default React.memo(ShelfBooksList); // Memoize the component to prevent unnecessary re-renders