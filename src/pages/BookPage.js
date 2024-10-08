/**
 * BookPage.js
 * This page displays detailed information about a single book, allowing users to view, edit, or delete it.
 * It leverages Ant Design for layout and UI components, Emotion for styling, react-i18next for localization,
 * and react-spring/react-lazyload for animations and lazy loading.
 */

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Extract URL params and navigation functions
import { useBook } from '../../hooks/useBook'; // Hook for managing book-related logic
import { useAuth } from '../../hooks/useAuth'; // Hook for authentication
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import { Layout, Row, Col, Button } from 'antd'; // Ant Design components for layout and UI elements
import BookDetails from '../books/BookDetails'; // Component for displaying book details
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import LazyLoad from 'react-lazyload'; // Lazy loading to optimize component rendering
import { useTranslation } from 'react-i18next'; // For internationalization
import LoadingErrorWrapper from '../common/LoadingErrorWrapper'; // Reusable loading/error wrapper

const { Content } = Layout;

const BookPage = () => {
  const { bookId } = useParams(); // Extract book ID from the URL params
  const { books, isLoading, error } = useBook(); // Fetch books and their loading/error states from BookContext
  const { user } = useAuth(); // Access authenticated user information
  const navigate = useNavigate(); // Hook to programmatically navigate to other pages
  const { t } = useTranslation(); // Hook for translations

  // Memoize the book object to avoid unnecessary re-renders
  const book = useMemo(() => books.find(b => b._id === bookId), [books, bookId]);

  // React Spring animation for book details section
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

  // Handle edit action (redirects to an edit form)
  const handleEdit = () => {
    navigate(`/books/edit/${bookId}`);
  };

  // Handle delete action (optional confirmation logic)
  const handleDelete = () => {
    // Confirm deletion and proceed (confirmation logic can be added here)
    console.log('Delete book');
  };

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error}> {/* Reusable wrapper for loading/error states */}
      <Layout className="book-page" css={bookPageStyles}>
        <Content>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {/* Lazy load the book details with animation */}
              <LazyLoad height={200} offset={100}>
                <animated.div style={springProps} className="book-details">
                  {book ? (
                    <>
                      <BookDetails book={book} /> {/* Render the BookDetails component */}
                      <div className="action-buttons">
                        {/* Conditionally render edit and delete buttons based on user role */}
                        {user && (
                          <>
                            <Button type="primary" onClick={handleEdit}>
                              {t('bookPage.editBook')}
                            </Button>
                            <Button danger onClick={handleDelete}>
                              {t('bookPage.deleteBook')}
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    <div>{t('bookPage.bookNotFound')}</div> 
                  )}
                </animated.div>
              </LazyLoad>
            </Col>
          </Row>
        </Content>
      </Layout>
    </LoadingErrorWrapper>
  );
};

export default BookPage;
