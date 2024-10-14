/**
 * ShelfPage.js
 * This page displays details about a specific shelf and its books, using various components.
 * Integrates with the `useShelf` hook for data access, animations for UI effects, and Ant Design for layout.
 * Supports internationalization with `react-i18next` for a localized user experience.
 */

import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to extract shelfId from the URL
import { useShelf } from '../../hooks/useShelf'; // Hook to access shelf-related state and actions
import { Layout, Spin, Alert } from 'antd'; // Ant Design components for layout, spinner, and alerts
import ShelfDetails from '../../components/shelves/ShelfDetails'; // Component to display detailed shelf information
import ShelfBooksList from '../../components/shelves/ShelfBooksList'; // Component to display books on the shelf
import AddBookToShelf from '../../components/shelves/AddBookToShelf'; // Component to add books to the shelf
import RemoveBookFromShelf from '../../components/shelves/RemoveBookFromShelf'; // Component to remove books from the shelf
import Sidebar from '../../components/layout/Sidebar'; // Sidebar for easy navigation to other shelves
import { useSpring, animated } from 'react-spring'; // For smooth animations
import LazyLoad from 'react-lazyload'; // For optimizing component loading
import { useTranslation } from 'react-i18next'; // For internationalization
import { css } from '@emotion/react'; // Emotion for styling
import { globalContainerStyles, errorMessageStyles } from '../../assets/styles/globalStyles'; // Global styles

const { Content } = Layout;

const ShelfPage = () => {
  const { shelfId } = useParams(); // Extract the shelf ID from the URL
  const { t } = useTranslation(); // Hook for localization
  const { shelves, isLoading, error } = useShelf(); // Access shelf data from ShelfContext

  // Find the specific shelf by ID
  const shelf = shelves.find((shelf) => shelf._id === shelfId);

  // React Spring animation for smooth appearance of the shelf details
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for custom styling
  const shelfPageStyles = css`
    ${globalContainerStyles}; /* Apply global container styles */
    background-color: #312c49;
    color: white;
    display: flex;
    .content {
      margin-left: 250px; /* Offset for sidebar */
      padding: 24px;
      width: 100%;
    }
    .shelf-details {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .add-book-section {
      margin-top: 20px;
    }
    .remove-book-section {
      margin-top: 20px;
    }
  `;

  // Display loading spinner if data is still being fetched
  if (isLoading) {
    return <Spin tip={t('shelfPage.loading')} size="large" />;
  }

  // Display error message if there was an error fetching shelf data
  if (error) {
    return (
      <Alert
        message={t('shelfPage.errorTitle')}
        description={t('shelfPage.errorDescription', { error })}
        type="error"
        showIcon
        css={errorMessageStyles}
      />
    );
  }

  // Display a message if the shelf is not found
  if (!shelf) {
    return <div>{t('shelfPage.shelfNotFound')}</div>;
  }

  return (
    <Layout className="shelf-page" css={shelfPageStyles}>
      {/* Sidebar for easy navigation */}
      <Sidebar />
      <Content className="content">
        <LazyLoad height={200} offset={100}>
          {/* Animate shelf details with React Spring */}
          <animated.div style={springProps} className="shelf-details">
            {/* Display shelf details using ShelfDetails component */}
            <ShelfDetails shelf={shelf} />

            {/* Display books in the shelf using ShelfBooksList */}
            <ShelfBooksList shelfId={shelfId} />
          </animated.div>
        </LazyLoad>

        {/* Section to add books to the shelf */}
        <div className="add-book-section">
          <AddBookToShelf shelfId={shelfId} />
        </div>

        {/* Section to remove books from the shelf */}
        <div className="remove-book-section">
          <RemoveBookFromShelf shelfId={shelfId} />
        </div>
      </Content>
    </Layout>
  );
};

export default React.memo(ShelfPage); // Memoize to avoid unnecessary re-renders
