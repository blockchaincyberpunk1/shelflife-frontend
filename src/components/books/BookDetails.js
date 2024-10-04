/**
 * BookDetails.js
 * This component displays detailed information about a specific book, including its title, 
 * authors, cover image, and other optional metadata like description, publisher, and more.
 */

import React from 'react';
import { Typography } from 'antd'; // Ant Design components for the card layout and text elements
import styled from '@emotion/styled'; // Emotion's styled component

// Destructure Ant Design components
const { Title, Text } = Typography;

// Emotion styled component for the book cover image
const BookCover = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

// Emotion styled container for the book details
const BookDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #3d3a54;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
`;

// Styled metadata section
const BookMetadata = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5;
  color: #d1c7e0;
`;

const BookDetails = ({ book }) => {
  // Fallback for missing data
  const coverImageUrl = book.coverImageUrl || 'https://via.placeholder.com/250x350?text=No+Cover+Available';
  const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
  const description = book.description || 'No description available.';
  const publisher = book.publisher || 'Unknown Publisher';
  const publishedDate = book.publishedDate || 'Unknown Date';

  return (
    <BookDetailsContainer>
      {/* Book Cover Image */}
      <BookCover src={coverImageUrl} alt={book.title || 'Book Cover'} />

      {/* Book Title and Authors */}
      <Title level={2} style={{ color: '#ffffff' }}>
        {book.title || 'Untitled Book'}
      </Title>
      <Text type="secondary" style={{ color: '#b2adc2' }}>
        By: {authors}
      </Text>

      {/* Book Metadata */}
      <BookMetadata>
        <p><strong>Publisher:</strong> {publisher}</p>
        <p><strong>Published:</strong> {publishedDate}</p>
        <p><strong>Description:</strong> {description}</p>
      </BookMetadata>
    </BookDetailsContainer>
  );
};

export default BookDetails;
