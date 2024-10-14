/**
 * BookPage.js
 * This page displays detailed information about a single book, allowing users to view, edit, or delete it.
 * It uses Ant Design for layout and UI components, Emotion for styling, react-i18next for localization,
 * and react-spring/react-lazyload for animations and lazy loading.
 */

import React, { useMemo } from "react";
import { useParams } from "react-router-dom"; // Extract URL params
import { useBook } from "../../hooks/useBook"; // Hook for managing book-related logic
import { useAuth } from "../../hooks/useAuth"; // Hook for authentication
import { css } from "@emotion/react"; // Emotion for CSS-in-JS styling
import { Layout, Row, Col } from "antd"; // Ant Design components for layout and UI elements
import BookDetails from "../books/BookDetails"; // Component for displaying book details
import BookActions from "../books/BookActions"; // Component for handling book actions (edit, delete, shelf update)
import BookReview from "../books/BookReview"; // Component for displaying and adding book reviews
import BookShelf from "../books/BookShelf"; // Component for displaying the shelf information
import { useSpring, animated } from "react-spring"; // React Spring for animations
import LazyLoad from "react-lazyload"; // Lazy loading to optimize component rendering
import { useTranslation } from "react-i18next"; // For internationalization
import LoadingErrorWrapper from "../common/LoadingErrorWrapper"; // Reusable loading/error wrapper

const { Content } = Layout;

const BookPage = () => {
  const { bookId } = useParams(); // Extract book ID from the URL params
  const { books, isLoading, error } = useBook(); // Fetch books and their loading/error states from BookContext
  const { user } = useAuth(); // Access authenticated user information
  const { t } = useTranslation(); // Hook for translations

  // Memoize the book object to avoid unnecessary re-renders
  const book = useMemo(
    () => books.find((b) => b._id === bookId),
    [books, bookId]
  );

  // React Spring animation for book details section
  const springProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
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
    .book-review {
      margin-top: 40px;
    }
    .book-shelf {
      margin-top: 20px;
    }
  `;

  return (
    // Reusable wrapper for loading/error states
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      <Layout className="book-page" css={bookPageStyles}>
        <Content>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {/* Lazy load the book details with animation */}
              <LazyLoad height={200} offset={100}>
                <animated.div style={springProps} className="book-details">
                  {book ? (
                    <>
                      {/* Render the BookDetails component to display detailed book info */}
                      <BookDetails book={book} />

                      {/* Render the BookActions component for managing actions on the book */}
                      {user && (
                        <div className="action-buttons">
                          <BookActions
                            bookId={book._id}
                            currentShelf={book.shelf}
                          />
                        </div>
                      )}

                      {/* Render the BookShelf component to display and manage book's shelf */}
                      <div className="book-shelf">
                        <BookShelf
                          shelfId={book.shelf}
                          shelfName={book.shelfName}
                        />
                      </div>

                      {/* Render the BookReview component to display and add reviews for the book */}
                      <div className="book-review">
                        <BookReview bookId={book._id} reviews={book.reviews} />
                      </div>
                    </>
                  ) : (
                    <div>{t("bookPage.bookNotFound")}</div> // Display message if book is not found
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
