/**
 * ShelfList.js
 * This component displays a list of user-created shelves.
 * It integrates with the ShelfContext to fetch and display shelves.
 * Ant Design components are used for a polished UI, and Emotion handles styling.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useShelf } from '../../context/ShelfContext'; 
import { List, Spin, Typography } from 'antd'; // Ant Design components
import { FolderOutlined } from 'react-icons/all'; // React Icons for folder icon
import styled from '@emotion/styled';

// Styled container for the shelf list
const ShelfListContainer = styled.div`
  background-color: #3c3853;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #ffffff;
`;

// Styled list item with hover effect
const StyledListItem = styled(List.Item)`
  background-color: #494761;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px 15px;
  &:hover {
    background-color: #3a3651;
  }
`;

const { Title } = Typography; // Destructure Ant Design's Typography

const ShelfList = () => {
  const { shelves, isLoading, error } = useShelf();

  if (isLoading) {
    return (
      <Spin tip="Loading shelves..." size="large" /> // Ant Design's loading spinner
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Error message if something goes wrong
  }

  return (
    <ShelfListContainer>
      <Title level={3}>My Shelves</Title> {/* Ant Design's Typography for the title */}
      
      <List
        dataSource={shelves}
        renderItem={(shelf) => (
          <StyledListItem>
            <Link to={`/shelf/${shelf._id}`}>
              <FolderOutlined style={{ marginRight: 8 }} /> {/* React Icon for folder */}
              {shelf.name} ({shelf.books.length} books) {/* Shelf name and number of books */}
            </Link>
          </StyledListItem>
        )}
        bordered
      />
    </ShelfListContainer>
  );
};

export default ShelfList;
