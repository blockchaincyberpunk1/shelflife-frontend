import React from 'react';
import { Spin } from 'antd'; // Import Spin component from Ant Design
import styled from '@emotion/styled'; // Import Emotion's styled for CSS-in-JS

// Styled container for the spinner using Emotion
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center; // Center the spinner horizontally
  align-items: center; // Center the spinner vertically
  height: 100vh; // Full height of the viewport, making sure the spinner is centered
  background-color: rgba(49, 44, 73, 0.8); // Slightly transparent background (#312c49 from the color scheme)
`;

// Styled text for optional loading message (if needed)
const LoadingText = styled.p`
  margin-top: 16px; 
  font-size: 18px; 
  color: #fff; // White color text to contrast against dark background
`;

const Spinner = ({ message = "Loading..." }) => {
  return (
    <SpinnerContainer>
      {/* Ant Design Spinner (Spin) component */}
      <Spin size="large" /> 
      {/* Optional loading message */}
      <LoadingText>{message}</LoadingText>
    </SpinnerContainer>
  );
};

export default Spinner;
