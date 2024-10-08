/**
 * NotFoundPage.js
 * This page is rendered when the user navigates to a non-existing route (404).
 * It leverages Ant Design for UI components, React Spring for animations, 
 * React Icons for icons, and Emotion for styling. 
 * The goal is to provide a user-friendly error page that smoothly transitions in.
 */

import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigating back to the homepage
import { Result, Button } from 'antd'; // Ant Design Result component and Button for UI
import { useSpring, animated } from 'react-spring'; // For smooth animations on page load
import { css } from '@emotion/react'; // Emotion for applying dynamic CSS styles
import { FrownOutlined } from 'react-icons/frown'; // Frown icon to visually indicate a 404 error

const NotFoundPage = () => {
  // Define the animation using React Spring, with an initial fade and slight Y-axis translation
  const springProps = useSpring({
    opacity: 1, // Fade-in effect
    transform: 'translateY(0)', // Animate from slightly below
    from: { opacity: 0, transform: 'translateY(20px)' }, // Initial state before the animation
    config: { tension: 200, friction: 20 }, // Control the speed and smoothness of the animation
  });

  // Emotion CSS-in-JS styles for consistent theme application
  const notFoundStyles = css`
    .not-found-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #312c49; /* Background color from your palette */
      color: white;
      text-align: center;
      padding: 24px;
    }

    .not-found-content {
      background-color: #494761; /* Dark background for content */
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle box-shadow for depth */
      display: inline-block;
      max-width: 600px;
    }

    .ant-result-icon {
      margin-bottom: 24px;
      svg {
        font-size: 48px;
        color: #ffffff; /* Ensures the icon color matches the design */
      }
    }

    .ant-btn-primary {
      background-color: #3c3853;
      border-color: #3c3853;
      &:hover {
        background-color: #312c49;
        border-color: #312c49;
      }
    }
  `;

  return (
    <div className="not-found-page" css={notFoundStyles}>
      {/* Use React Spring animation for smooth page transition */}
      <animated.div style={springProps} className="not-found-content">
        <Result
          icon={<FrownOutlined />} // Custom frown icon using React Icons
          title="404 - Page Not Found" // Main title indicating the 404 error
          subTitle="Sorry, the page you visited does not exist." // Additional explanation
          status="404" // Status used for the Ant Design styling
          extra={(
            // Button to navigate back to the homepage
            <Link to="/">
              <Button type="primary">
                Back to Home
              </Button>
            </Link>
          )}
        />
      </animated.div>
    </div>
  );
};

export default NotFoundPage;
