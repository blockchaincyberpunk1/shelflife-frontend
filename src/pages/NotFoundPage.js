/**
 * NotFoundPage.js
 * This page is displayed when a user tries to access a non-existing route (404).
 * It uses Ant Design for UI components, React Spring for animations, and Emotion for styling.
 */

import React from 'react';
import { Link } from 'react-router-dom'; // For navigating back to home
import { Result, Button } from 'antd'; // Ant Design components for the 404 page
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import { css } from '@emotion/react'; // Emotion for dynamic styling
import { FrownOutlined } from 'react-icons/frown'; // React Icons for adding a frown icon

const NotFoundPage = () => {
  // Spring animation for page transition (fade-in effect)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for styling the page
  const notFoundStyles = css`
    .not-found-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #312c49; /* Background color from your color scheme */
      color: white;
      text-align: center;
    }
    .not-found-content {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
  `;

  return (
    <div className="not-found-page" css={notFoundStyles}>
      <animated.div style={springProps} className="not-found-content">
        {/* Ant Design Result component with a custom status */}
        <Result
          icon={<FrownOutlined style={{ fontSize: '48px', color: '#fff' }} />} // Custom frown icon
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Link to="/">
              <Button type="primary">Back to Home</Button>
            </Link>
          }
          status="404"
        />
      </animated.div>
    </div>
  );
};

export default NotFoundPage;
