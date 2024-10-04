import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { useAuth } from '../../context/AuthContext'; // Import the custom AuthContext hook to manage user state
import styled from '@emotion/styled'; // Import Emotion for styling
import { Button, Layout, Menu } from 'antd'; // Import Ant Design's Button, Layout, and Menu components
import { UserOutlined, LogoutOutlined, BookOutlined } from '@ant-design/icons'; // Import Ant Design icons for UI enhancements

// Destructure the Header component from Ant Design's Layout
const { Header: AntHeader } = Layout;

// Styled component for the logo using Emotion
const Logo = styled.img`
  width: 150px;         /* Set logo width */
  height: auto;         /* Maintain aspect ratio */
  margin-right: 20px;   /* Add spacing to the right */
`;

// Styled component for the header container using Emotion
const HeaderContainer = styled.div`
  display: flex;                     /* Flexbox for layout */
  justify-content: space-between;    /* Space between logo and nav menu */
  align-items: center;               /* Vertically center the items */
  padding: 0 20px;                   /* Add padding for spacing */
  background-color: #312c49;         /* Background color from your palette */
`;

// Styled component for the Ant Design Menu
const NavMenu = styled(Menu)`
  background-color: transparent;     /* Transparent background to blend with header */
  border-bottom: none;               /* Remove the default border */
`;

const Header = () => {
  const { user, logout } = useAuth(); // Destructure user and logout function from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  // Function to handle logout and redirect to login page
  const handleLogout = () => {
    logout(); // Call the logout function to clear authentication state
    navigate('/login'); // Redirect the user to the login page after logout
  };

  return (
    <AntHeader>
      <HeaderContainer>
        {/* Link to home with the logo */}
        <Link to="/">
          <Logo src="/assets/images/ShelfLife-Logo.png" alt="ShelfLife Logo" />
        </Link>

        {/* Navigation Menu */}
        <NavMenu mode="horizontal" theme="dark">
          {user ? (
            <>
              {/* If the user is authenticated, show profile, books, and logout options */}
              <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>
              <Menu.Item key="books" icon={<BookOutlined />}>
                <Link to="/books">My Books</Link>
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />}>
                {/* Logout button with logout logic */}
                <Button type="text" onClick={handleLogout} style={{ color: 'white' }}>
                  Logout
                </Button>
              </Menu.Item>
              {/* Display a welcome message with the user's username */}
              <Menu.Item key="welcome" disabled>
                Welcome, {user.username}!
              </Menu.Item>
            </>
          ) : (
            <>
              {/* If the user is not authenticated, show login and signup options */}
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="signup">
                <Link to="/signup">Signup</Link>
              </Menu.Item>
            </>
          )}
        </NavMenu>
      </HeaderContainer>
    </AntHeader>
  );
};

export default Header;
