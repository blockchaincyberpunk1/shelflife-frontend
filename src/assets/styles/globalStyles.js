/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

/**
 * Global styles for commonly used components, buttons, inputs, and form containers.
 * This allows us to reuse consistent styles across multiple components,
 * ensuring a cohesive design and improving maintainability.
 */

// General layout styles, especially for form containers and sections
export const globalContainerStyles = css`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

// Button styles - Applies to all button types for consistency
export const buttonStyles = css`
  padding: 10px 20px;
  background-color: #494761; /* Primary button color based on logo */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3c3853; /* Hover state for buttons */
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

// Input field styles - Standardizes the appearance of input fields
export const inputFieldStyles = css`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: #3a3651; /* Matches color scheme from logo */
  color: white;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #494761;
    outline: none;
  }
`;

// Form container styles - To ensure consistency in spacing, layout, and alignment across forms
export const formContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  background-color: #494761;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: white;
`;

// Label styles - For form labels
export const labelStyles = css`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff; /* White for clear contrast */
`;

// Error message styles - For error messages in forms
export const errorMessageStyles = css`
  color: #ff6b6b; /* Error color for warnings */
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
`;

// Page wrapper styles - Consistent spacing and alignment for page-level components
export const pageWrapperStyles = css`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #312c49; /* Matches primary background color from logo */
  min-height: 100vh;
`;

// Card container styles - For reusable card components
export const cardStyles = css`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px;
  width: 100%;
  max-width: 500px;

  h2 {
    font-size: 24px;
    color: #494761; /* Use one of the logo accent colors */
  }

  p {
    font-size: 16px;
    color: #3a3752;
  }
`;

// Header-specific styles
export const logoStyles = css`
  width: 150px;         /* Set logo width */
  height: auto;         /* Maintain aspect ratio */
  margin-right: 20px;   /* Add spacing to the right */
`;

export const headerContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #312c49; /* Matches logo background color */
`;

export const navMenuStyles = css`
  background-color: transparent;
  border-bottom: none;
`;

// Book-specific styles
export const bookCardStyles = css`
  width: 100%;
  background-color: #3b3752;
  border-radius: 8px;
  padding: 10px;
`;

export const bookCoverStyles = css`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const bookTitleStyles = css`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
`;

export const bookAuthorsStyles = css`
  font-size: 0.9rem;
  color: #d1c7e0;
  margin-bottom: 12px;
`;

export const dropdownStyles = css`
  width: 100%;
  .ant-select-selector {
    background-color: #494761 !important;
    color: white !important;
    border: none !important;
  }
  .ant-select-dropdown {
    background-color: #494761;
  }
  .ant-select-item {
    color: white;
  }
`;

/* Additional general utility classes */
// Text utility
export const textCenter = css`
  text-align: center;
`;

// Button utility for primary and secondary buttons
export const primaryButton = css`
  background-color: #3c3853;
  &:hover {
    background-color: #3a3651;
  }
`;

export const secondaryButton = css`
  background-color: #3d3a54;
  &:hover {
    background-color: #322d4a;
  }
`;

// Spinner style
export const spinnerStyles = css`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.6s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
