/**
 * SignupPage.js
 * 
 * This page is responsible for handling user registration. It reuses the `Signup` component
 * to manage form handling and user signup logic. The page also includes animations using react-spring,
 * and styling using Emotion for a clean, user-friendly UI.
 */

import React from 'react';
import { useSpring, animated } from 'react-spring'; // Import React Spring for animation
import { css } from '@emotion/react'; // Import Emotion for custom CSS
import Signup from '../components/auth/Signup'; // Import reusable Signup component
import { formContainerStyles } from '../assets/styles/globalStyles'; // Global styles for consistent form container styling

// Custom CSS for the SignupPage layout using Emotion
const signupPageStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  background-color: #312c49; /* Background color matching the app's dark theme */
  color: white;
`;

/**
 * SignupPage Component
 * 
 * Renders the signup page with an animated transition and uses the `Signup` component
 * to handle user registration. Emotion is used for styling and React Spring for animations.
 */
const SignupPage = () => {
  // Define the animation for the signup form (fade-in with slight upward movement)
  const springProps = useSpring({
    opacity: 1, // Fully visible when the animation completes
    transform: 'translateY(0)', // The final position (no translation)
    from: { opacity: 0, transform: 'translateY(20px)' }, // The starting position (below and invisible)
    config: { tension: 280, friction: 60 }, // Customize the smoothness of the animation
  });

  return (
    <div className="signup-page" css={signupPageStyles}>
      {/* Wrap the Signup component with animation and global form styles */}
      <animated.div style={springProps} css={formContainerStyles}>
        <Signup /> {/* Render the reusable Signup component */}
      </animated.div>
    </div>
  );
};

export default SignupPage;
