/** BookPage.js
 * Page to display a single book's details.
 * Uses Ant Design for layout, Emotion for styling, and components such as BookDetails.
 * It also includes react-router-dom for navigation, react-spring for animations, and lazy loading.
 */

import React from 'react';
import { useParams } from 'react-router-dom'; // To get the book ID from the URL
import { useBook } from '../../context/BookContext'; // Context for books
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import { Layout, Row, Col, Button, Spin } from 'antd'; // Ant Design components
import BookDetails from '../books/BookDetails'; // BookDetails component
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import LazyLoad from 'react-lazyload'; // Lazy loading to optimize images

// Ant Design Layout components
const { Content } = Layout;

const BookPage = () => {
  const { bookId } = useParams(); // Get book ID from the URL
  const { books, isLoading, error } = useBook(); // Access books from context
  const book = books.find(b => b._id === bookId); // Find the book with the matching ID

  // React Spring animation for book details
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for custom styling
  const bookPageStyles = css`
    .book-page {
      background-color: #312c49;
      color: white;
      min-height: 100vh;
      padding: 24px;
    }
    .book-details {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .action-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
  `;

  if (isLoading) {
    return <Spin size="large" />; // Ant Design Spinner for loading state
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>; // Display error if any
  }

  if (!book) {
    return <div>Book not found.</div>; // Handle case where book is not found
  }

  return (
    <Layout className="book-page" css={bookPageStyles}>
      <Content>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            {/* Lazy loading book details and applying spring animation */}
            <LazyLoad height={200} offset={100}>
              <animated.div style={springProps} className="book-details">
                <BookDetails book={book} /> {/* BookDetails component */}
                <div className="action-buttons">
                  {/* Example of action buttons for updating or deleting the book */}
                  <Button type="primary" onClick={() => console.log('Edit book')}>
                    Edit Book
                  </Button>
                  <Button danger onClick={() => console.log('Delete book')}>
                    Delete Book
                  </Button>
                </div>
              </animated.div>
            </LazyLoad>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default BookPage;
