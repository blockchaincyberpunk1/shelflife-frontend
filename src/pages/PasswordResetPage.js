/**
 * PasswordResetPage.js
 * This page handles the entire password reset process for users.
 * It utilizes `PasswordReset` for initiating password reset requests and `PasswordResetConfirm`
 * for confirming the password reset with a token and setting a new password.
 * Ant Design, Emotion, and React Spring are used for UI styling, loading states, and animations.
 */

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // For smooth animations
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import PasswordReset from '../components/auth/PasswordReset'; // Password reset initiation form
import PasswordResetConfirm from '../components/auth/PasswordResetConfirm'; // Password reset confirmation form
import { Button } from 'antd'; // Ant Design button component for toggling between reset phases

// Emotion CSS for styling the Password Reset page
const passwordResetPageStyles = css`
  .password-reset-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #312c49;
    color: white;
    padding: 24px;
  }
  .password-reset-content {
    background-color: #494761;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
  }
  .toggle-button {
    margin-top: 20px;
  }
`;

/**
 * PasswordResetPage Component
 * 
 * This component handles both stages of the password reset process:
 * 1. Requesting a password reset by entering the user's email.
 * 2. Confirming the reset by entering a token and a new password.
 * 
 * The two stages are toggled using the `isConfirmStage` state.
 */
const PasswordResetPage = () => {
  const [isConfirmStage, setIsConfirmStage] = useState(false); // State to toggle between password reset and confirmation

  // Spring animation for smooth page transition (fade-in effect)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 220, friction: 30 }, // Control animation speed and smoothness
  });

  /**
   * Handles toggling between the password reset request and confirmation stages.
   */
  const handleToggleStage = () => {
    setIsConfirmStage((prev) => !prev); // Toggle the stage when called
  };

  return (
    <div className="password-reset-page" css={passwordResetPageStyles}>
      {/* Use React Spring for smooth page transition */}
      <animated.div style={springProps} className="password-reset-content">
        {isConfirmStage ? (
          // Render PasswordResetConfirm for entering the reset token and new password
          <PasswordResetConfirm />
        ) : (
          // Render PasswordReset for initiating the password reset process
          <PasswordReset />
        )}

        {/* Button to toggle between the two stages */}
        <Button
          type="link"
          className="toggle-button"
          onClick={handleToggleStage}
        >
          {isConfirmStage ? 'Back to Password Reset Request' : 'Have a Reset Token?'}
        </Button>
      </animated.div>
    </div>
  );
};

export default PasswordResetPage;