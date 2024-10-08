/**
 * CreateBookPage.js
 * 
 * This page is responsible for rendering the form to add a new book.
 * It uses the BookForm component for handling the form logic, integrates global styles,
 * and provides a clear user experience for creating a new book entry.
 */

import React from 'react'; // Import React for creating components
import styled from '@emotion/styled'; // Import Emotion for styling
import { useNavigate } from 'react-router-dom'; // React Router's navigation hook for programmatic navigation
import BookForm from '../components/books/BookForm'; // Import the BookForm component for book creation
import { pageWrapperStyles } from '../assets/styles/globalStyles'; // Import global styles for consistent design
import { useTranslation } from 'react-i18next'; // Import for handling translations (i18n)

// Styled wrapper for the page using Emotion and global styles
const CreateBookPageWrapper = styled.div`
  ${pageWrapperStyles}; /* Apply global page wrapper styles */
`;

/**
 * CreateBookPage Component
 * 
 * This page provides a form to add a new book. It uses the BookForm component
 * to render the form and handle validation, submission, and data management.
 */
const CreateBookPage = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const { t } = useTranslation(); // Initialize translation hook for i18n support

  /**
   * Callback for when the book is successfully created.
   * It navigates the user back to the book list or another appropriate page.
   */
  const handleBookCreated = () => {
    navigate('/books'); // Navigate to the list of books after successfully adding a book
  };

  return (
    <CreateBookPageWrapper>
      {/* Page title using i18n for translations */}
      <h1>{t('createBookPage.title')}</h1> {/* Localized title for "Add New Book" */}

      {/* Render the BookForm for adding a new book */}
      <BookForm onSubmit={handleBookCreated} />
    </CreateBookPageWrapper>
  );
};

export default CreateBookPage;
