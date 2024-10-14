/**
 * ShelfFormPage.js
 * This page is responsible for creating or editing shelves using the ShelfForm component.
 * It merges functionalities of CreateShelfPage and the edit feature of ShelfPage to provide a unified form for both adding and editing shelves.
 */

import React, { useMemo } from 'react'; // Import React for creating components and useMemo for memoization
import styled from '@emotion/styled'; // Import Emotion for CSS-in-JS styling
import { useNavigate, useParams } from 'react-router-dom'; // React Router hooks for navigation and extracting URL parameters
import ShelfForm from '../components/shelves/ShelfForm'; // Import the ShelfForm component for handling shelf creation/editing
import { pageWrapperStyles } from '../assets/styles/globalStyles'; // Import global styles for consistent page design
import { useTranslation } from 'react-i18next'; // Import for handling translations (i18n)
import { useShelf } from '../../hooks/useShelf'; // Hook for accessing shelf-related actions and data

// Styled wrapper for the page using Emotion and global styles
const ShelfFormPageWrapper = styled.div`
  ${pageWrapperStyles}; /* Apply global page wrapper styles */
`;

/**
 * ShelfFormPage Component
 * 
 * This page provides a form to add or edit a shelf. It uses the ShelfForm component
 * for rendering the form and handles validation, submission, and data management for
 * both adding and editing shelves.
 */
const ShelfFormPage = () => {
  const { shelfId } = useParams(); // Extract shelf ID from the URL params, if available
  const navigate = useNavigate(); // Initialize the navigation hook for programmatic navigation
  const { t } = useTranslation(); // Initialize translation hook for i18n support
  const { shelves, addShelf, updateShelf } = useShelf(); // Extract addShelf and updateShelf functions from context

  // Memoize the shelf object to avoid unnecessary re-renders when editing
  const shelf = useMemo(() => shelves.find((s) => s._id === shelfId), [shelves, shelfId]);

  /**
   * Callback for when the shelf is successfully created or updated.
   * It navigates the user back to the list of shelves.
   */
  const handleShelfSubmitted = () => {
    navigate('/shelves'); // Navigate to the list of shelves after successfully adding/updating a shelf
  };

  return (
    <ShelfFormPageWrapper>
      {/* Page title with internationalized text */}
      <h1>
        {shelfId ? t('shelfFormPage.editShelfTitle') : t('shelfFormPage.createShelfTitle')} {/* Conditionally render title based on add/edit mode */}
      </h1>

      {/* Render the ShelfForm for adding or editing a shelf */}
      <ShelfForm
        initialData={shelf} // Pass initial data if editing a shelf
        onSubmit={shelfId ? updateShelf : addShelf} // Call updateShelf if editing, otherwise addShelf
        onShelfSubmitted={handleShelfSubmitted} // Callback after shelf is successfully added/updated
      />
    </ShelfFormPageWrapper>
  );
};

export default ShelfFormPage;