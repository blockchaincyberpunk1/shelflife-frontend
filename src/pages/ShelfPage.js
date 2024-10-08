/**
 * ShelfPage.js
 * This page displays details about a specific shelf and its books, using the ShelfDetail component.
 * It integrates with the `useShelf` hook to access shelf-related data and uses react-spring for animation.
 * Internationalization (i18n) is supported by react-i18next, and Ant Design is used for UI components.
 */

import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to extract shelfId from the URL
import { useShelf } from '../../hooks/useShelf'; // Hook to access shelf-related state and actions
import { Layout, Spin, Alert } from 'antd'; // Ant Design components for layout, spinner, and alerts
import ShelfDetail from '../../components/shelves/ShelfDetail'; // Component to display shelf details
import { useSpring, animated } from 'react-spring'; // For smooth animations
import LazyLoad from 'react-lazyload'; // For optimizing component loading
import { useTranslation } from 'react-i18next'; // For internationalization
import { css } from '@emotion/react'; // Emotion for styling
import { globalContainerStyles, errorMessageStyles } from '../../assets/styles/globalStyles'; // Global styles

const { Content } = Layout;

const ShelfPage = () => {
  const { shelfId } = useParams(); // Get the shelf ID from the URL
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
    .shelf-details {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      <Content>
        <LazyLoad height={200} offset={100}>
          {/* Animate shelf details with React Spring */}
          <animated.div style={springProps} className="shelf-details">
            {/* Display shelf details using ShelfDetail component */}
            <ShelfDetail shelf={shelf} />
          </animated.div>
        </LazyLoad>
      </Content>
    </Layout>
  );
};

export default React.memo(ShelfPage); // Memoize to avoid unnecessary re-renders
