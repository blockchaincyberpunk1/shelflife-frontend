/**
 * HomePage.js
 *
 * The primary landing page of the application where users can interact with their shelves and books.
 * It uses Ant Design for layout, Emotion for styling, react-spring for animations, and LazyLoad for performance optimization.
 * The page consists of a sidebar for navigation, a main section displaying shelves, and an optional featured book list.
 */

import React from "react";
import { Layout, Row, Col } from "antd"; // Ant Design layout components
import { css } from "@emotion/react"; // Emotion for CSS-in-JS styling
import { useShelf } from "../hooks/useShelf"; // Custom hook for managing shelf state
import { useBook } from "../hooks/useBook"; // Custom hook for managing book state
import ShelfList from "../components/shelves/ShelfList"; // Component to display list of shelves
import BookList from "../components/books/BookList"; // Component to display list of books
import Sidebar from "../components/layout/Sidebar"; // Sidebar for navigation between shelves and categories
import { useAuth } from "../hooks/useAuth"; // Custom hook for managing authentication state
import { useSpring, animated } from "react-spring"; // React Spring for smooth animations
import LazyLoad from "react-lazyload"; // Lazy loading for optimizing component rendering

const { Header, Content } = Layout;

/**
 * HomePage Component
 *
 * Displays the main content for the application, including user-created shelves, a list of books, and a sidebar for navigation.
 * Integrates lazy loading for performance optimization and animations for smoother user experience.
 */
const HomePage = () => {
  const { user } = useAuth(); // Get the authenticated user from the AuthContext
  const { shelves } = useShelf(); // Get the user's shelves from ShelfContext
  const { books } = useBook(); // Get the user's books from BookContext

  // Animation configuration for the shelf list using React Spring
  const springProps = useSpring({
    opacity: 1, // The component fades in
    transform: "translateY(0)", // Translate to the original position
    from: { opacity: 0, transform: "translateY(-20px)" }, // Initially faded out and slightly off-screen
    config: { tension: 200, friction: 20 }, // Animation configuration
  });

  // CSS-in-JS using Emotion for the homepage layout and style
  const homePageStyles = css`
    .homepage {
      background-color: #312c49;
      color: white;
      min-height: 100vh; /* Full height of the viewport */
    }
    .content {
      padding: 24px; /* Padding around the content area */
    }
    .header {
      background-color: #3c3853;
      color: white;
      text-align: center;
      font-size: 1.5rem;
      padding: 16px 0;
    }
  `;

  return (
    <Layout className="homepage" css={homePageStyles}>
      {/* Ant Design Header with a welcome message */}
      <Header className="header">
        {`Welcome, ${user?.username || "Guest"} to ShelfLife!`}{" "}
        {/* Display user’s name if available, else 'Guest' */}
      </Header>

      <Layout>
        {/* Sidebar for navigating shelves and book categories */}
        <Sidebar />

        {/* Main content area displaying shelves and books */}
        <Content className="content">
          <Row gutter={[16, 16]}>
            {" "}
            {/* Ant Design's grid system with 16px gutter */}
            <Col span={24}>
              <animated.div style={springProps}>
                {" "}
                {/* Apply animation to the shelf list */}
                <LazyLoad height={200} offset={100}>
                  {" "}
                  {/* Lazy load the ShelfList component for optimization */}
                  <ShelfList shelves={shelves} />{" "}
                  {/* Pass the shelves data to the ShelfList component */}
                </LazyLoad>
              </animated.div>
            </Col>
            {/* Optionally, display a list of books from all shelves */}
            <Col span={24}>
              <h2>Books from All Shelves</h2> {/* Section heading for books */}
              {/* Lazy load the BookList component for optimization */}
              <LazyLoad height={200} offset={100}>
                <BookList books={books} />{" "}
                {/* Pass the books data to the BookList component */}
              </LazyLoad>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
