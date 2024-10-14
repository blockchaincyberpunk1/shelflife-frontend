/**
 * Book Component
 * Purpose: Displays a single book's information (e.g., title, author, genre, cover image, and shelf status).
 * Additional Functionality: If reviews are enabled, users can directly add a review for the book.
 * Context Functions Used:
 * - getBookById: To fetch the specific book details by ID.
 * - addReview: If the component allows users to add a review directly.
 */

import React, { useEffect, useCallback, useState } from 'react'; // Hooks for component lifecycle and performance optimization
import { useTranslation } from 'react-i18next'; // Hook for internationalization (i18n support)
import { Select, Card, Button, Modal, Input, Rate } from 'antd'; // Ant Design components for UI: Select for dropdown, Card for layout, Modal for review submission
import LazyLoad from 'react-lazyload'; // LazyLoad to improve performance by loading images only when visible
import { useBook } from '../../hooks/useBook'; // Custom hook to handle book-related actions (like updating the shelf)
import {
  bookCardStyles,
  bookCoverStyles,
  bookTitleStyles,
  bookAuthorsStyles,
  dropdownStyles,
  reviewButtonStyles,
} from '../../assets/styles/globalStyles'; // Import global styles from the shared styles file

// Destructure Option component from Ant Design's Select for convenience
const { Option } = Select;

const Book = ({ bookId }) => {
  const { getBookById, addReview, updateBookShelf, book, isLoading, error } = useBook(); // Destructure relevant context functions
  const { t } = useTranslation(); // Hook to access translation function for i18n
  const [isModalVisible, setIsModalVisible] = useState(false); // State to handle modal visibility for adding reviews
  const [reviewData, setReviewData] = useState({ rating: 0, comment: '' }); // State to handle review inputs

  useEffect(() => {
    getBookById(bookId); // Fetch book details when the component mounts or the bookId changes
  }, [getBookById, bookId]); // Dependency array ensures useEffect runs only when necessary

  /**
   * Handles shelf change for the book.
   * This function updates the shelf of the book via the `updateBookShelf` context function.
   * @param {string} value - The selected shelf value (e.g., 'currentlyReading', 'wantToRead', 'read', or 'none').
   */
  const handleShelfChange = useCallback(
    (value) => {
      updateBookShelf(bookId, value); // Call to update the book's shelf
    },
    [bookId, updateBookShelf] // Memoized to only recreate if bookId or updateBookShelf changes
  );

  /**
   * Handles opening the modal for adding a review.
   */
  const showModal = () => {
    setIsModalVisible(true); // Set modal visibility to true
  };

  /**
   * Handles closing the modal after review submission or cancellation.
   */
  const handleCancel = () => {
    setIsModalVisible(false); // Set modal visibility to false
  };

  /**
   * Handles submitting a review for the book.
   * This function calls the `addReview` context function to submit the review.
   */
  const handleSubmitReview = async () => {
    if (reviewData.rating > 0 && reviewData.comment) {
      await addReview(bookId, reviewData); // Call to add the review
      setReviewData({ rating: 0, comment: '' }); // Reset the review form
      setIsModalVisible(false); // Close the modal after submission
    } else {
      alert(t('review.missingFields')); // Alert if rating/comment is missing
    }
  };

  if (isLoading) return <p>{t('loading')}</p>; // Display loading state
  if (error) return <p>{t('error', { message: error })}</p>; // Display error state
  if (!book) return <p>{t('book.notFound')}</p>; // Display if no book is found

  return (
    <div>
      <Card
        hoverable
        css={bookCardStyles} // Global styles for book card layout
        cover={
          <LazyLoad height={200} offset={100} once> {/* Lazy load the book cover image */}
            <img
              css={bookCoverStyles} // Apply global styles for book cover
              src={book.coverImageUrl || 'https://via.placeholder.com/150'} // Fallback image if no cover image is provided
              alt={book.title}
            />
          </LazyLoad>
        }
      >
        <h3 css={bookTitleStyles}>{book.title}</h3> {/* Display the book's title */}
        <p css={bookAuthorsStyles}>
          {book.authors?.length > 0 ? book.authors.join(', ') : t('book.noAuthors')} {/* Display authors or fallback */}
        </p>
        <p>{t('book.genre')}: {book.genre || t('book.noGenre')}</p> {/* Display genre */}
        <p>{t('book.isbn')}: {book.isbn || t('book.noIsbn')}</p> {/* Display ISBN */}

        {/* Dropdown for changing the shelf */}
        <Select
          defaultValue={book.shelf || 'none'} // Set current shelf or default to 'none'
          onChange={handleShelfChange} // Handle shelf change
          css={dropdownStyles} // Apply styles to the dropdown
        >
          <Option value="currentlyReading">{t('shelves.currentlyReading')}</Option>
          <Option value="wantToRead">{t('shelves.wantToRead')}</Option>
          <Option value="read">{t('shelves.read')}</Option>
          <Option value="none">{t('shelves.none')}</Option>
        </Select>

        {/* Button to add a review */}
        <Button css={reviewButtonStyles} onClick={showModal}>
          {t('review.addReview')}
        </Button>
      </Card>

      {/* Modal for submitting a review */}
      <Modal
        title={t('review.title')}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmitReview}
      >
        <Rate
          onChange={(value) => setReviewData((prev) => ({ ...prev, rating: value }))}
          value={reviewData.rating}
        />
        <Input.TextArea
          rows={4}
          placeholder={t('review.placeholder')}
          value={reviewData.comment}
          onChange={(e) => setReviewData((prev) => ({ ...prev, comment: e.target.value }))}
        />
      </Modal>
    </div>
  );
};

export default Book;