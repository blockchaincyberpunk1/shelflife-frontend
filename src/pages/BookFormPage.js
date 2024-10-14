/**
 * BookFormPage.js
 * This page allows users to either create a new book or edit an existing book. It provides a form (via the BookForm component)
 * to input book details like title, authors, genre, and cover image URL. The page leverages the LoadingErrorWrapper to handle
 * the loading and error states.
 * The page uses conditional logic to differentiate between adding a new book and editing an existing one.
 */

import React, { useMemo, useEffect } from 'react'; // React hooks for creating components, managing side effects, and memoizing data
import { useParams, useNavigate } from 'react-router-dom'; // React Router hooks for extracting URL parameters and programmatic navigation
import { useBook } from '../../hooks/useBook'; // Custom hook for managing book-related actions and data
import BookForm from '../components/books/BookForm'; // Component for rendering the book form
import LoadingErrorWrapper from '../common/LoadingErrorWrapper'; // Reusable component to manage loading and error states
import { useTranslation } from 'react-i18next'; // For handling translations
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { pageWrapperStyles } from '../assets/styles/globalStyles'; // Import global styles for consistent design

// Styled wrapper for the page using Emotion and global styles
const BookFormPageWrapper = styled.div`
  ${pageWrapperStyles}; /* Apply global page wrapper styles */
`;

const BookFormPage = () => {
  const { bookId } = useParams(); // Extract the book ID from the URL parameters to check if the user is editing a book
  const navigate = useNavigate(); // Navigation hook for redirecting the user after successful form submission
  const { books, isLoading, error, getBookById } = useBook(); // Extract relevant functions and state from the useBook hook
  const { t } = useTranslation(); // Initialize translation hook for i18n support

  // Memoize the book data to avoid unnecessary re-fetching or re-renders
  const book = useMemo(() => books.find((b) => b._id === bookId), [books, bookId]);

  // Fetch the book details when the component mounts if editing an existing book
  useEffect(() => {
    if (bookId && !book) {
      getBookById(bookId); // Fetch book details from context if not already available
    }
  }, [bookId, book, getBookById]);

  /**
   * Handle successful form submission by redirecting the user.
   * The page navigates to the book listing or details page based on the context.
   */
  const handleBookFormSubmit = () => {
    navigate('/books'); // Redirect to the book listing page after a successful create/edit
  };

  /**
   * Handle form cancellation. Navigates back to the previous page or book list.
   */
  const handleFormCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      <BookFormPageWrapper>
        {/* Page title based on whether the user is adding or editing a book */}
        <h1>{bookId ? t('bookFormPage.editBookTitle') : t('bookFormPage.addBookTitle')}</h1>

        {/* Render the BookForm component with appropriate props */}
        <BookForm
          initialData={book} // Provide existing book data for editing
          onSubmit={handleBookFormSubmit} // Handle successful form submission
          onCancel={handleFormCancel} // Handle form cancellation
        />
      </BookFormPageWrapper>
    </LoadingErrorWrapper>
  );
};

export default BookFormPage;