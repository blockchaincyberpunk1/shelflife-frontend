import React from 'react';
import styled from '@emotion/styled'; // Import Emotion for CSS-in-JS styling

// Styled component for the footer container
const FooterContainer = styled.footer`
  background-color: #322d4a;  /* Dark background color from your color palette */
  color: #fff;                /* White text for contrast */
  padding: 20px 0;            /* Padding for space inside the footer */
  text-align: center;         /* Center align the text */
  position: absolute;         /* Footer sticks to the bottom */
  width: 100%;                /* Ensure footer spans full width */
  bottom: 0;                  /* Sticks the footer to the bottom of the page */
`;

// Styled component for the text inside the footer
const FooterText = styled.p`
  margin: 0;                  /* Remove default margin */
  font-size: 14px;            /* Set font size for the text */
  color: #bfbfbf;             /* Light grey color for subtle contrast */
`;

// Main Footer component
const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} ShelfLife. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
