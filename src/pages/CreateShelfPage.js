/**
 * CreateShelfPage.js
 * 
 * This page renders the form for creating a new shelf using the ShelfForm component.
 * It handles shelf creation and navigation after successfully adding a new shelf.
 * Global styles are applied for consistent page layout and design.
 */

import React from 'react'; // Import React to create the component
import styled from '@emotion/styled'; // Import Emotion for CSS-in-JS styling
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation
import ShelfForm from '../components/shelves/ShelfForm'; // Import ShelfForm component for shelf creation
import { pageWrapperStyles } from '../assets/styles/globalStyles'; // Import global styles for consistent page design
import { useTranslation } from 'react-i18next'; // Import i18n hook for internationalization

// Styled wrapper for the page using Emotion and global styles
const CreateShelfPageWrapper = styled.div`
  ${pageWrapperStyles}; /* Apply global page wrapper styles */
`;

/**
 * CreateShelfPage Component
 * 
 * This component renders a form to allow the user to create a new shelf.
 * It uses the ShelfForm component for form handling and manages the submission
 * callback to navigate back to the shelf list after a shelf is created.
 */
const CreateShelfPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const { t } = useTranslation(); // Translation hook for internationalization

  /**
   * Callback function to handle the post-shelf creation action.
   * Navigates the user to the list of shelves after the shelf is successfully created.
   */
  const handleShelfCreated = () => {
    navigate('/shelves'); // Navigate to the list of shelves after creation
  };

  return (
    <CreateShelfPageWrapper>
      {/* Page title with internationalized text */}
      <h1>{t('createShelfPage.title')}</h1> {/* Localized page title for "Create New Shelf" */}

      {/* Render the ShelfForm component to handle shelf creation */}
      <ShelfForm onShelfCreated={handleShelfCreated} />
    </CreateShelfPageWrapper>
  );
};

export default CreateShelfPage;
