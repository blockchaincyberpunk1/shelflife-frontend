/** 
 * LoginPage.js
 * This page handles user login using React Hook Form for form management,
 * Ant Design for UI components, and AuthContext for authentication.
 * It also utilizes react-i18next for internationalization, Emotion for global styling, and react-spring for animation.
 */

import React from 'react';
import { useSpring, animated } from 'react-spring'; // React Spring for animation effects
import { css } from '@emotion/react'; // Emotion for custom CSS
import Login from '../components/auth/Login'; // Import reusable Login component
import { formContainerStyles } from '../assets/styles/globalStyles'; // Global styles for form container

// Custom CSS for the login page layout
const loginPageStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #312c49;
  color: white;
`;

const LoginPage = () => {
  // Spring animation for the login form (fade-in and translate from bottom)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 280, friction: 60 }, // Customize animation speed
  });

  return (
    <div className="login-page" css={loginPageStyles}>
      {/* Animated div wrapping the Login component using react-spring */}
      <animated.div style={springProps} css={formContainerStyles}>
        <Login /> {/* Reuse the Login component here */}
      </animated.div>
    </div>
  );
};

export default LoginPage;
