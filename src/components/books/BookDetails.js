/**
 * BookDetails Component
 * This component displays detailed information about a specific book or allows editing the book using the BookForm.
 * It uses the `useBook` hook to fetch and manage book data, `react-i18next` for localization, 
 * and Ant Design for UI components. The `LoadingErrorWrapper` is used to handle loading and error states.
 */

import React, { useEffect, useMemo, useState } from 'react'; // Import hooks for side effects, memoization, and state management
import { useParams, useNavigate } from 'react-router-dom'; // React Router hooks for accessing route parameters and navigation
import { useBook } from '../../hooks/useBook'; // Custom hook for accessing book-related data and actions
import { useTranslation } from 'react-i18next'; // Hook for translations from react-i18next
import { Button, Card } from 'antd'; // Ant Design components for UI elements
import { LoadingErrorWrapper } from '../common/LoadingErrorWrapper'; // Higher-order component to handle loading and error states
import BookForm from './BookForm'; // Import the BookForm component
import { css } from '@emotion/react'; // Emotion for styling with CSS-in-JS
import {
  bookCardStyles,
  bookCoverStyles,
  bookTitleStyles,
  bookAuthorsStyles,
  buttonStyles,
} from '../../assets/styles/globalStyles'; // Import global styles

const BookDetail = React.memo(() => {
  const { id } = useParams(); // Extract the book ID from the URL parameters using the useParams hook
  const { t } = useTranslation(); // Initialize translation hook for i18n
  const navigate = useNavigate(); // Hook for navigation to other routes
  const { getBookById, book, isLoading, error } = useBook(); // Extract the function to fetch a book and related state

  const [isEditing, setIsEditing] = useState(false); // State to manage whether the book is being edited

  // Fetch book details when the component mounts or the `id` changes
  useEffect(() => {
    getBookById(id); // Fetch the book details by its ID
  }, [id, getBookById]); // Re-run the effect if `id` or `getBookById` function changes

  // Memoize the book data to optimize performance by preventing unnecessary re-computation
  const memoizedBook = useMemo(() => book, [book]);

  // Emotion CSS-in-JS for styling the BookDetails component layout
  const bookDetailStyles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `;

  /**
   * Handle form submission when updating the book details.
   * After submission, switch back to view mode.
   */
  const handleFormSubmit = () => {
    setIsEditing(false); // Switch back to view mode after the form is submitted
  };

  /**
   * Handle canceling the edit mode.
   * Switch back to view mode without saving changes.
   */
  const handleCancelEdit = () => {
    setIsEditing(false); // Switch back to view mode
  };

  return (
    // The `LoadingErrorWrapper` component will handle the loading and error states
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      <div css={bookDetailStyles}> {/* Apply the CSS styles for layout */}
        {/* Check if the component is in editing mode */}
        {isEditing ? (
          // If editing, render the BookForm with the current book data
          <BookForm
            initialData={memoizedBook} // Pass the current book data as initialData to the form
            onSubmit={handleFormSubmit} // Handle form submission
            onCancel={handleCancelEdit} // Handle form cancellation
          />
        ) : (
          // Otherwise, render the book details view
          <Card css={bookCardStyles}> {/* Ant Design Card component styled with global styles */}
            {/* Render the book cover with a fallback placeholder if no cover image is available */}
            <img
              src={memoizedBook.coverImageUrl || 'https://via.placeholder.com/150'}
              alt={memoizedBook.title}
              css={bookCoverStyles}
            />

            {/* Display the book title using global title styles */}
            <h2 css={bookTitleStyles}>{memoizedBook.title}</h2>

            {/* Render the authors as a comma-separated list or display a localized message if no authors are available */}
            <p css={bookAuthorsStyles}>
              {memoizedBook.authors.length > 0
                ? memoizedBook.authors.join(', ')
                : t('book.noAuthors')}
            </p>

            {/* Display the book's description */}
            <p>{memoizedBook.description}</p>

            {/* Button to edit the book details */}
            <Button
              type="default"
              css={buttonStyles} // Apply global button styles
              onClick={() => setIsEditing(true)} // Switch to edit mode when clicked
            >
              {t('bookDetail.editBook')} {/* Localized text for the "Edit" button */}
            </Button>

            {/* Button to navigate back to the previous page */}
            <Button
              type="primary"
              css={buttonStyles} // Apply global button styles
              onClick={() => navigate(-1)} // Navigate back to the previous page when clicked
              style={{ marginTop: '10px' }} // Add spacing between buttons
            >
              {t('bookDetail.goBack')} {/* Localized text for the "Go Back" button */}
            </Button>
          </Card>
        )}
      </div>
    </LoadingErrorWrapper>
  );
});

export default BookDetail;
