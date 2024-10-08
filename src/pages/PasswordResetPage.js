/**
 * PasswordResetPage.js
 * This page allows users to request a password reset by entering their email.
 * It leverages `PasswordReset` component for the form, React Hook Form for validation,
 * React Spring for animations, and Ant Design for UI elements. Emotion is used for styling.
 */

import React from 'react';
import { useSpring, animated } from 'react-spring'; // For smooth animations
import { css } from '@emotion/react'; // Emotion for dynamic CSS styling
import PasswordReset from '../components/auth/PasswordReset'; // Import the reusable PasswordReset component

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
`;

const PasswordResetPage = () => {
  // Spring animation for smooth page transition (fade-in effect)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 220, friction: 30 }, // Control animation speed and smoothness
  });

  return (
    <div className="password-reset-page" css={passwordResetPageStyles}>
      {/* Use React Spring for smooth page transition */}
      <animated.div style={springProps} className="password-reset-content">
        {/* Reuse PasswordReset component for form handling */}
        <PasswordReset />
      </animated.div>
    </div>
  );
};

export default PasswordResetPage;
