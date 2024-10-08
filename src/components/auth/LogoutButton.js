/**
 * LogoutButton Component
 * 
 * This component provides a button for users to log out of their account.
 * It uses the `useAuth` custom hook to handle the logout process and `react-i18next` for localization.
 * The button is styled using Emotion, with button styles imported from the global styles.
 */

import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // Import the custom useAuth hook to handle authentication
import { useTranslation } from 'react-i18next'; // Import i18n hook for localization
import { css } from '@emotion/react'; // Import css function from Emotion for inline styles
import { buttonStyles } from '../../assets/styles/globalStyles'; // Import global button styles for consistency

const LogoutButton = () => {
  // Destructure the logout function from the useAuth hook
  const { logout } = useAuth();

  // Initialize the translation function from react-i18next
  const { t } = useTranslation();

  /**
   * Function to handle the logout process
   * 
   * This function triggers the `logout` function from the AuthContext,
   * which will clear the user session and remove the token.
   */
  const handleLogout = () => {
    logout(); // Call the logout function to log the user out
  };

  return (
    // Render a button with the logout action
    <button
      onClick={handleLogout} // Trigger the handleLogout function on click
      css={css`${buttonStyles}`} // Apply global button styles from Emotion
    >
      {t('logout.buttonText')} {/* Display localized text using i18n */}
    </button>
  );
};

export default LogoutButton;
