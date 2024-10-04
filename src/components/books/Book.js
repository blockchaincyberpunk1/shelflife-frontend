/**
 * Book.js
 * This component renders a single book with its details such as title, author, and cover image.
 * It also allows the user to change the book's shelf using a dropdown.
 */

import React from 'react';
import { Card, Select } from 'antd'; // Ant Design components for card and select dropdown
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles

// Destructure the Ant Design Select component options
const { Option } = Select;

// Styled book cover image using Emotion
const BookCover = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

// Styled title for the book
const BookTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
`;

// Styled author section
const BookAuthors = styled.p`
  font-size: 0.9rem;
  color: #d1c7e0;
  margin-bottom: 12px;
`;

// Main Book component
const Book = ({ book, onUpdateShelf }) => {
  const handleShelfChange = (value) => {
    onUpdateShelf(book.id, value); // Trigger shelf update when the dropdown changes
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', backgroundColor: '#3b3752', borderRadius: '8px', padding: '10px' }}
      cover={<BookCover src={book.coverImageUrl || 'https://via.placeholder.com/150'} alt={book.title} />}
    >
      <BookTitle>{book.title}</BookTitle>
      <BookAuthors>{book.authors.join(', ')}</BookAuthors>

      {/* Dropdown to change the shelf */}
      <Select
        defaultValue={book.shelf || 'none'}
        onChange={handleShelfChange}
        style={{ width: '100%' }}
        dropdownStyle={{ backgroundColor: '#494761' }}
      >
        <Option value="currentlyReading">Currently Reading</Option>
        <Option value="wantToRead">Want to Read</Option>
        <Option value="read">Read</Option>
        <Option value="none">None</Option>
      </Select>
    </Card>
  );
};

export default Book;
