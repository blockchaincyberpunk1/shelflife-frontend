/**
 * Sidebar.js
 * 
 * This component renders a sidebar navigation for the app, displaying both default shelves (e.g., "Currently Reading", "Want to Read", "Read")
 * as well as user-created custom shelves. It utilizes the `useShelf` custom hook to fetch the list of shelves and `react-router-dom`
 * for navigation. The `NavLink` component is used to navigate between different shelves and categories, with active link highlighting.
 */

import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation between pages
import { useShelf } from '../../hooks/useShelf'; // Custom hook for managing shelf data
import { Typography, Divider } from 'antd'; // Ant Design components for UI elements
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styling
import { BookOutlined, FolderOutlined } from '@ant-design/icons'; // Icons for shelves
import { useTranslation } from 'react-i18next'; // Translation hook for internationalization

// Styled sidebar container
const SidebarContainer = styled.aside`
  width: 250px;
  padding: 20px;
  background-color: #312c49; // Sidebar background color matching app theme
  color: white;
  height: 100vh; // Full height of the viewport
  position: fixed; // Fixed position to always be visible
`;

// Styled list for the shelves
const ShelfList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

// Styled list item for each shelf link
const ShelfItem = styled.li`
  margin-bottom: 15px;
`;

// Styled NavLink for consistent styling and active link indication
const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 1rem;

  &.active {
    font-weight: bold;
    color: #ff9800; // Highlight color for active link
  }

  &:hover {
    color: #ff9800; // Hover color for better UX
  }
`;

// Sidebar component for navigating between different shelves and book categories
const Sidebar = () => {
  const { shelves } = useShelf(); // Get shelf data (default and custom shelves) from useShelf hook
  const { t } = useTranslation(); // Initialize translation hook for i18n support

  return (
    <SidebarContainer>
      <Typography.Title level={4} style={{ color: 'white' }}>{t('sidebar.myShelves')}</Typography.Title> {/* Localized sidebar heading */}
      <Divider style={{ backgroundColor: '#484660' }} /> {/* Divider for visual separation */}

      {/* List of default shelves */}
      <ShelfList>
        {/* All Books link */}
        <ShelfItem>
          <StyledNavLink to="/" exact activeClassName="active"> {/* Highlight the active link */}
            <BookOutlined style={{ marginRight: 8 }} /> {/* Icon for all books */}
            {t('sidebar.allBooks')} {/* Localized label for All Books */}
          </StyledNavLink>
        </ShelfItem>

        {/* Default shelf: Currently Reading */}
        <ShelfItem>
          <StyledNavLink to="/shelf/currentlyReading" activeClassName="active">
            <BookOutlined style={{ marginRight: 8 }} /> {/* Icon for Currently Reading */}
            {t('sidebar.currentlyReading')} {/* Localized label for Currently Reading */}
          </StyledNavLink>
        </ShelfItem>

        {/* Default shelf: Want to Read */}
        <ShelfItem>
          <StyledNavLink to="/shelf/wantToRead" activeClassName="active">
            <BookOutlined style={{ marginRight: 8 }} /> {/* Icon for Want to Read */}
            {t('sidebar.wantToRead')} {/* Localized label for Want to Read */}
          </StyledNavLink>
        </ShelfItem>

        {/* Default shelf: Read */}
        <ShelfItem>
          <StyledNavLink to="/shelf/read" activeClassName="active">
            <BookOutlined style={{ marginRight: 8 }} /> {/* Icon for Read */}
            {t('sidebar.read')} {/* Localized label for Read */}
          </StyledNavLink>
        </ShelfItem>

        {/* Custom shelves created by the user */}
        {shelves.map((shelf) => (
          <ShelfItem key={shelf._id}>
            <StyledNavLink to={`/shelf/${shelf._id}`} activeClassName="active">
              <FolderOutlined style={{ marginRight: 8 }} /> {/* Icon for custom shelf */}
              {shelf.name} {/* Display the name of the custom shelf */}
            </StyledNavLink>
          </ShelfItem>
        ))}
      </ShelfList>
    </SidebarContainer>
  );
};

export default React.memo(Sidebar); // Export the Sidebar component using React.memo to prevent unnecessary re-renders