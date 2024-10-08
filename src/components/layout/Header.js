/**
 * Header.js
 * 
 * This component provides the navigation header for the app. It includes links to various sections of the app 
 * and displays options based on whether the user is logged in or not. 
 * It uses the `useAuth` custom hook for managing authentication and `react-i18next` for handling translations.
 * Ant Design components are used for layout and menu, while `react-router-dom` manages navigation.
 */

import React from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation
import { useAuth } from '../../hooks/useAuth'; // Custom hook for authentication
import { useTranslation } from 'react-i18next'; // i18n hook for localization
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import { Layout, Menu } from 'antd'; // Ant Design components for UI layout and menu
import { UserOutlined, BookOutlined } from '@ant-design/icons'; // Ant Design icons for UI enhancement
import LogoutButton from '../auth/LogoutButton'; // Import the LogoutButton component
import { logoStyles, headerContainerStyles, navMenuStyles } from '../../assets/styles/globalStyles'; // Import global styles

// Destructure Ant Design's Layout component to use its Header
const { Header: AntHeader } = Layout;

/**
 * Header Component
 * 
 * This component renders a navigation header with different options based on the user's authentication state.
 * It conditionally shows login, signup, and profile-related links. If the user is logged in, a logout button is also shown.
 */
const Header = () => {
  const { user } = useAuth(); // Access the user state from useAuth hook
  const { t } = useTranslation(); // Access translation function from react-i18next

  return (
    <AntHeader> {/* Ant Design's Header component */}
      <div css={css`${headerContainerStyles}`}> {/* Apply global header container styles */}
        
        {/* Logo section linking to the homepage */}
        <Link to="/"> {/* Clicking the logo navigates to the homepage */}
          <img 
            src="/assets/images/ShelfLife-Logo.png" 
            alt="ShelfLife Logo" 
            css={css`${logoStyles}`} // Apply logo styles
          />
        </Link>

        {/* Navigation Menu */}
        <Menu mode="horizontal" theme="dark" css={css`${navMenuStyles}`}> {/* Apply global menu styles */}
          {user ? (
            // Show menu items for logged-in users
            <>
              <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">{t('header.profile')}</Link> {/* Link to user profile */}
              </Menu.Item>
              <Menu.Item key="books" icon={<BookOutlined />}>
                <Link to="/books">{t('header.myBooks')}</Link> {/* Link to user's books */}
              </Menu.Item>
              {/* Logout Button as a separate component */}
              <Menu.Item key="logout">
                <LogoutButton /> {/* Import and render the LogoutButton component */}
              </Menu.Item>
              {/* Display a welcome message with the user's username */}
              <Menu.Item key="welcome" disabled>
                {t('header.welcome')}, {user.username}!
              </Menu.Item>
            </>
          ) : (
            // Show menu items for guests (not logged in)
            <>
              <Menu.Item key="login">
                <Link to="/login">{t('header.login')}</Link> {/* Link to login page */}
              </Menu.Item>
              <Menu.Item key="signup">
                <Link to="/signup">{t('header.signup')}</Link> {/* Link to signup page */}
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </AntHeader>
  );
};

export default Header;
