/** ShelfPage.js
 * Page to display all books on a specific shelf.
 * Utilizes Ant Design for layout, Emotion for styling, and components such as ShelfDetails and BookList.
 * Integrates react-router-dom for navigation, react-spring for animations, and lazy loading for optimization.
 */

import React from 'react';
import { useParams } from 'react-router-dom'; // To get the shelf ID from the URL
import { useShelf } from '../../context/ShelfContext'; // Shelf context for managing shelves
import { useBook } from '../../context/BookContext'; // Book context for managing books
import { Layout, Row, Col, Spin } from 'antd'; // Ant Design components for layout and loading spinner
import BookList from '../books/BookList'; // Component to display a list of books
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import LazyLoad from 'react-lazyload'; // For lazy loading components and images
import { css } from '@emotion/react'; // Emotion for styling

const { Content } = Layout;

const ShelfPage = () => {
  const { shelfId } = useParams(); // Get the shelf ID from the URL
  const { shelves, isLoading, error } = useShelf(); // Access shelf state and functions
  const { updateBookShelf } = useBook(); // Access book state to allow updating book's shelf

  // Find the specific shelf using the shelfId from the URL
  const shelf = shelves.find((shelf) => shelf._id === shelfId);

  // React Spring animation for the page load
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for custom styling
  const shelfPageStyles = css`
    .shelf-page {
      background-color: #312c49;
      min-height: 100vh;
      padding: 24px;
      color: white;
    }
    .shelf-details {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  if (isLoading) {
    return <Spin size="large" />; // Ant Design spinner for loading state
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display any error that occurs
  }

  if (!shelf) {
    return <div>Shelf not found.</div>; // Handle case where the shelf is not found
  }

  return (
    <Layout className="shelf-page" css={shelfPageStyles}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {/* Lazy loading the shelf details with animation */}
            <LazyLoad height={200} offset={100}>
              <animated.div style={springProps} className="shelf-details">
                <h2>{shelf.name}</h2> {/* Display the shelf name */}
                <p>{shelf.books.length} books</p> {/* Display the number of books */}
                
                {/* Display the list of books on this shelf */}
                <BookList books={shelf.books} onUpdateShelf={updateBookShelf} />
              </animated.div>
            </LazyLoad>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ShelfPage;
