/** 
 * BookList.js
 * This component renders a list of books by mapping over the `books` array and passing
 * each book to the `Book` component. The `onUpdateShelf` function is passed to handle shelf changes.
 */

import React from 'react';
import Book from './Book'; // Import the Book component
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles
import { Empty } from 'antd'; // Ant Design component for empty states

// Styled UL element for the list of books
const BookListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Main BookList component
const BookList = ({ books, onUpdateShelf }) => {
  return (
    <>
      {books.length > 0 ? (
        <BookListContainer> {/* Render a list of books if available */}
          {books.map((book) => (
            <li key={book.id}> 
              <Book book={book} onUpdateShelf={onUpdateShelf} /> {/* Pass book data and onUpdateShelf handler */}
            </li>
          ))}
        </BookListContainer>
      ) : (
        <Empty description="No books available" /> // Ant Design empty state if no books are available
      )}
    </>
  );
};

export default BookList;
