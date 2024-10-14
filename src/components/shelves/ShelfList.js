/**
 * ShelfList.js
 * 
 * This component renders a list of user-created shelves and provides links to view details for each shelf.
 * It integrates with the `useShelf` hook for managing shelf-related state and actions, 
 * uses Ant Design for UI components, and Emotion for CSS-in-JS styling.
 * The component is also localized using the `react-i18next` library.
 */

import React, { useMemo } from 'react'; // Import React and memoization hook
import { Link } from 'react-router-dom'; // For navigation to shelf details using React Router
import { useShelf } from '../../hooks/useShelf'; // Custom hook to access shelf-related data and actions
import { List, Spin, Typography, Alert, Button, Popconfirm } from 'antd'; // Ant Design components for list, spinner, typography, alert, button, and popconfirm
import { FolderOutlined, DeleteOutlined } from '@ant-design/icons'; // Ant Design icons for representing shelves and delete action
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { useTranslation } from 'react-i18next'; // Hook for translations
import {
  globalContainerStyles,
  errorMessageStyles,
  listItemStyles,
  buttonStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for consistency

// Destructure Title from Ant Design's Typography component
const { Title } = Typography;

// Styled container for the shelf list using Emotion and global styles
const ShelfListContainer = styled.div`
  ${globalContainerStyles}; /* Apply global container styles */
  background-color: #3c3853; /* Dark background color to match app theme */
  border-radius: 8px; /* Rounded corners for a polished UI */
  color: white; /* Ensure text is visible against dark background */
`;

// Styled list item for each shelf using Emotion and global styles
const StyledListItem = styled(List.Item)`
  ${listItemStyles}; /* Apply global styles for list items */
  display: flex;
  justify-content: space-between; /* Ensure content is spaced out */
  align-items: center;
`;

/**
 * ShelfList Component
 * 
 * This component fetches and displays a list of shelves from the `useShelf` hook. 
 * If there are shelves, it maps over the list and displays each shelf as a clickable link. 
 * It also handles loading and error states using Ant Design's Spin and Alert components.
 * Users can also delete shelves directly from the list.
 * 
 * @returns {JSX.Element} - A list of shelves or a loading/error message.
 */
const ShelfList = () => {
  const { t } = useTranslation(); // Translation hook for internationalization (i18n)
  const { shelves, isLoading, error, deleteShelf } = useShelf(); // Get shelves, loading, and error states from the custom hook

  // Memoize the shelves data to prevent unnecessary re-renders
  const memoizedShelves = useMemo(() => shelves, [shelves]);

  // If data is loading, display a spinner
  if (isLoading) {
    return <Spin tip={t('shelfList.loading')} size="large" />; // Display loading message and spinner
  }

  // If an error occurred, display an error alert
  if (error) {
    return (
      <Alert
        message={t('shelfList.errorTitle')} // Localized error title
        description={t('shelfList.errorDescription', { error })} // Localized error description
        type="error" // Set alert type to error
        showIcon // Show the error icon
        css={errorMessageStyles} // Apply global error message styles
      />
    );
  }

  // Render the list of shelves if they exist
  return (
    <ShelfListContainer>
      {/* Display the title of the section */}
      <Title level={3}>{t('shelfList.title')}</Title> {/* Localized title for the shelf list */}

      {/* If shelves exist, render the list of shelves */}
      <List
        dataSource={memoizedShelves} // Use memoized data to avoid unnecessary re-renders
        renderItem={(shelf) => (
          <StyledListItem key={shelf._id}> {/* Each shelf has a unique key */}
            <Link to={`/shelf/${shelf._id}`} style={{ color: 'inherit' }}> {/* Link to the shelf's details page */}
              <FolderOutlined style={{ marginRight: 8 }} /> {/* Folder icon for representing shelves */}
              {t('shelfList.shelfName', { name: shelf.name, count: shelf.books.length })} {/* Localized shelf name and book count */}
            </Link>
            {/* Delete button for each shelf */}
            <Popconfirm
              title={t('shelfList.deleteConfirm')} // Localized confirmation message
              onConfirm={() => deleteShelf(shelf._id)} // Call deleteShelf function on confirmation
              okText={t('shelfList.confirm')} // Localized confirm text
              cancelText={t('shelfList.cancel')} // Localized cancel text
            >
              <Button
                type="link"
                icon={<DeleteOutlined style={{ color: 'red' }} />} // Delete icon with red color for visibility
                css={buttonStyles} // Apply global button styles
              >
                {t('shelfList.delete')} {/* Localized text for delete button */}
              </Button>
            </Popconfirm>
          </StyledListItem>
        )}
        bordered // Add a border around each list item for visual separation
      />
    </ShelfListContainer>
  );
};

// Export the component using React.memo to prevent unnecessary re-renders
export default React.memo(ShelfList);