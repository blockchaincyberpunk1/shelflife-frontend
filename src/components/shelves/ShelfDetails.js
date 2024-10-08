/**
 * ShelfDetail.js
 * 
 * This component displays detailed information about a specific shelf, including its list of books.
 * It integrates with the ShelfContext and BookContext to fetch shelf and book-related data.
 * The component also allows users to update the shelf name by incorporating the UpdateShelf component.
 * It uses Ant Design for layout and UI, along with Emotion for consistent styling.
 * Internationalization is handled by react-i18next for multilingual support.
 */

import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the shelf ID from the URL params
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related actions
import { useBook } from '../../hooks/useBook'; // Custom hook to access book-related actions
import BookList from '../books/BookList'; // Component to display the list of books in the shelf
import UpdateShelf from './UpdateShelf'; // Component to update the shelf name
import { Typography, Spin, Button } from 'antd'; // Ant Design components for UI
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
  const { shelves, isLoading, error } = useShelf(); // Access shelf-related state and actions
  const { updateBookShelf } = useBook(); // Access the function to update a book's shelf
  const { t } = useTranslation(); // Initialize translation hook for i18n
  const [isEditing, setIsEditing] = useState(false); // State to control whether the shelf is being edited

  // Memoize the shelf data to prevent unnecessary re-renders when shelfId or shelves change
  const shelf = useMemo(() => shelves.find((shelf) => shelf._id === shelfId), [shelves, shelfId]);

  // Handle toggling between edit mode and view mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
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

          {/* Render the list of books in the shelf */}
          <BookList books={shelf.books} onUpdateShelf={updateBookShelf} /> {/* Pass the books and updateBookShelf function */}
        </>
      )}
    </ShelfDetailsContainer>
  );
};

export default React.memo(ShelfDetail); // Memoize the component to prevent unnecessary re-renders
