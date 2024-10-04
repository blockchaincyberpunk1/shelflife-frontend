/**
 * ShelfDetails.js
 * This component displays the details of a single shelf, including its list of books.
 * It integrates with the ShelfContext to retrieve shelf data and with the BookContext to manage book actions.
 */

import React from 'react';
import { useParams } from 'react-router-dom'; // Hook to access the shelf ID from the URL
import { useShelf } from '../../context/ShelfContext'; // Context for managing shelf state
import { useBook } from '../../context/BookContext';  // Context for managing book state
import BookList from '../books/BookList';  // BookList component to display the books in the shelf
import { Typography, Spin } from 'antd';  // Ant Design components
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling

const { Title } = Typography;  // Destructure Typography from Ant Design

// Styled container for shelf details
const ShelfDetailsContainer = styled.div`
  background-color: #3c3853;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #ffffff;
`;

// Styled header for the shelf name
const StyledHeader = styled(Title)`
  color: #ffffff;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const ShelfDetails = () => {
  const { shelfId } = useParams();  // Get the shelfId from the route params
  const { shelves, isLoading, error } = useShelf();  // Fetch the shelves from the context
  const { updateBookShelf } = useBook();  // Fetch the updateBookShelf function from BookContext

  // Find the shelf based on the shelfId from the URL
  const shelf = shelves.find((shelf) => shelf._id === shelfId);

  // Show a loading spinner while waiting for the shelf data
  if (isLoading) {
    return <Spin tip="Loading shelf details..." size="large" />;
  }

  // Display error message if an error occurs
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // If no shelf is found, display a "Shelf not found" message
  if (!shelf) {
    return <div>Shelf not found.</div>;
  }

  return (
    <ShelfDetailsContainer>
      {/* Display the shelf name as the header */}
      <StyledHeader level={2}>{shelf.name}</StyledHeader>
      
      {/* Render the BookList component and pass the books and updateBookShelf handler */}
      <BookList books={shelf.books} onUpdateShelf={updateBookShelf} />
    </ShelfDetailsContainer>
  );
};

export default ShelfDetails;
