/**
 * UserProfilePage.js
 * 
 * This page displays and allows the user to update their profile and account settings.
 * It integrates Ant Design for layout, Emotion for styling, React Hook Form for form handling,
 * and context management via the useUser hook. Localization support is added with react-i18next.
 * It reuses the UserProfile and Settings components for the form and settings updates.
 */

import React from 'react';
import { Layout, Spin, Alert } from 'antd'; // Ant Design components for layout and feedback
import { useTranslation } from 'react-i18next'; // For i18n localization
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import { useAuth } from '../../hooks/useAuth'; // Hook to access user data and profile actions
import UserProfile from '../../components/auth/UserProfile'; // Reuse the UserProfile component
import Settings from '../../components/auth/Settings'; // Reuse the Settings component for preferences
import ErrorMessage from '../../components/ui/ErrorMessage'; // Custom component for error messages

const { Content } = Layout;

const UserProfilePage = () => {
  const { t } = useTranslation(); // Initialize translation hook for i18n
  const { profile, isLoading, error } = useAuth(); // Access user data and profile management actions from context

  // CSS-in-JS styles using Emotion for the page layout and content
  const userProfilePageStyles = css`
    .user-profile-page {
      background-color: #312c49;
      padding: 24px;
      min-height: 100vh;
      color: white;
    }
    .profile-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
    }
    .settings-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  // Display a loading spinner while the profile data is being fetched
  if (isLoading) {
    return (
      <Layout className="user-profile-page" css={userProfilePageStyles}>
        <Content>
          <Spin size="large" tip={t('profile.loading')} /> {/* Localized loading message */}
        </Content>
      </Layout>
    );
  }

  // If an error occurs, display a custom error message component
  if (error) {
    return (
      <Layout className="user-profile-page" css={userProfilePageStyles}>
        <Content>
          <ErrorMessage message={error} /> {/* Display error message */}
        </Content>
      </Layout>
    );
  }

  // If no profile is found, display an alert with a localized message
  if (!profile) {
    return (
      <Layout className="user-profile-page" css={userProfilePageStyles}>
        <Content>
          <Alert message={t('profile.notFound')} type="warning" showIcon /> {/* Localized not found alert */}
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="user-profile-page" css={userProfilePageStyles}>
      <Content>
        {/* Profile Editing Section */}
        <div className="profile-form">
          <h2>{t('profile.myProfile')}</h2> {/* Localized title for "My Profile" */}
          <UserProfile /> {/* Render the UserProfile component */}
        </div>

        {/* Account Settings Section */}
        <div className="settings-form">
          <h2>{t('settings.title')}</h2> {/* Localized title for "Account Settings" */}
          <Settings /> {/* Render the Settings component */}
        </div>
      </Content>
    </Layout>
  );
};

export default UserProfilePage;
