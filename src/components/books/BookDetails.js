/**
 * BookDetails Component
 * Purpose: Displays detailed information about a specific book, including metadata such as publication date, status, reviews, and ratings.
 * Additional Functionality: Allows adding new reviews (using `addReview`) and editing book details using `BookForm`.
 * Context Functions Used:
 * - getBookById: Fetches detailed information of a specific book by its ID.
 * - addReview: Allows users to add a review for the book.
 * - updateBook: Provides the ability to edit the book's details.
 */

import React, { useEffect, useMemo, useState } from "react"; // Hooks for side effects, memoization, and managing state
import { useParams, useNavigate } from "react-router-dom"; // Hooks from React Router for route parameters and navigation
import { useBook } from '../../hooks/useBook'; // Custom hook for accessing book-related actions and data
import { useTranslation } from "react-i18next"; // Hook for handling internationalization (i18n)
import { Button, Card, Modal, Input, Rate } from "antd"; // Ant Design UI components: Button, Card for layout, Modal for reviews, Input for text fields, Rate for star rating
import BookForm from "./BookForm"; // Component for editing book details
import { LoadingErrorWrapper } from "../common/LoadingErrorWrapper"; // HOC for handling loading and error states
import {
  bookCardStyles,
  bookCoverStyles,
  bookTitleStyles,
  bookAuthorsStyles,
  buttonStyles,
  reviewButtonStyles,
} from "../../assets/styles/globalStyles"; // Global styles from Emotion's CSS-in-JS

const BookDetails = () => {
  const { id: bookId } = useParams(); // Extract the book ID from the URL parameters using React Router's useParams
  const { t } = useTranslation(); // Hook to access translation function for i18n
  const navigate = useNavigate(); // Hook for navigating to other routes
  const { getBookById, addReview, book, isLoading, error, updateBook } =
    useBook(); // Extract relevant context functions and state
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit modes
  const [isModalVisible, setIsModalVisible] = useState(false); // State for review modal visibility
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" }); // State to hold review input values

  useEffect(() => {
    getBookById(bookId); // Fetch the book details when the component mounts or when the bookId changes
  }, [getBookById, bookId]); // Re-run effect when bookId or getBookById changes

  // Memoize the book data to avoid unnecessary re-renders
  const memoizedBook = useMemo(() => book, [book]);

  /**
   * Handles form submission after editing book details.
   * Switches back to view mode after the form is successfully submitted.
   */
  const handleFormSubmit = async (updatedBookData) => {
    await updateBook(bookId, updatedBookData); // Call the updateBook function to save changes
    setIsEditing(false); // Exit editing mode after submission
  };

  /**
   * Handles adding a new review for the book.
   * Calls the addReview function from context and closes the modal after submission.
   */
  const handleSubmitReview = async () => {
    if (reviewData.rating > 0 && reviewData.comment) {
      await addReview(bookId, reviewData); // Submit the review using addReview
      setReviewData({ rating: 0, comment: "" }); // Reset review form fields
      setIsModalVisible(false); // Close the review modal
    } else {
      alert(t("review.missingFields")); // Alert if required fields are missing
    }
  };

  // Handles canceling the modal without saving the review
  const handleCancelModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  // Handles switching to editing mode
  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  if (isLoading) return <p>{t("loading")}</p>; // Display loading state
  if (error) return <p>{t("error", { message: error })}</p>; // Display error state
  if (!book) return <p>{t("book.notFound")}</p>; // Display if no book data is found

  return (
    <LoadingErrorWrapper isLoading={isLoading} error={error}>
      {" "}
      {/* Handle loading and error states */}
      <div style={{ padding: "20px" }}>
        {" "}
        {/* Main container for book details */}
        {/* Conditional rendering for editing mode */}
        {isEditing ? (
          <BookForm
            initialData={memoizedBook} // Pass current book data for editing
            onSubmit={handleFormSubmit} // Handle form submission to update book
            onCancel={() => setIsEditing(false)} // Handle cancellation of editing
          />
        ) : (
          <Card css={bookCardStyles}>
            {" "}
            {/* Display book details in a card layout */}
            {/* Book Cover */}
            <img
              src={
                memoizedBook.coverImageUrl || "https://via.placeholder.com/150"
              } // Fallback image if no cover
              alt={memoizedBook.title}
              css={bookCoverStyles} // Apply cover styles
            />
            {/* Book Title */}
            <h2 css={bookTitleStyles}>{memoizedBook.title}</h2>{" "}
            {/* Render book title */}
            {/* Book Authors */}
            <p css={bookAuthorsStyles}>
              {memoizedBook.authors?.length > 0
                ? memoizedBook.authors.join(", ")
                : t("book.noAuthors")}{" "}
              {/* Render authors or fallback message */}
            </p>
            {/* Additional Book Info */}
            <p>
              {t("book.genre")}: {memoizedBook.genre || t("book.noGenre")}
            </p>{" "}
            {/* Render book genre */}
            <p>
              {t("book.publicationDate")}:{" "}
              {memoizedBook.publicationDate || t("book.noPublicationDate")}
            </p>{" "}
            {/* Render publication date */}
            <p>
              {t("book.status")}: {memoizedBook.status || t("book.noStatus")}
            </p>{" "}
            {/* Render book status */}
            {/* Reviews Section */}
            <div>
              <h3>{t("book.reviews")}</h3> {/* Reviews header */}
              {memoizedBook.reviews?.length > 0
                ? memoizedBook.reviews.map((review, index) => (
                    <div key={index}>
                      <Rate disabled value={review.rating} />{" "}
                      {/* Display review rating */}
                      <p>{review.comment}</p> {/* Display review comment */}
                    </div>
                  ))
                : {
                    /* Fallback if no reviews */
                  }(<p>{t("review.noReviews")}</p>)}
            </div>
            {/* Add Review Button */}
            <Button
              css={reviewButtonStyles}
              onClick={() => setIsModalVisible(true)}
            >
              {t("review.addReview")} {/* Button to trigger review modal */}
            </Button>
            {/* Edit Book Button */}
            <Button
              type="default"
              css={buttonStyles} // Apply button styles
              onClick={handleEditClick} // Switch to edit mode
            >
              {t("bookDetail.editBook")}
            </Button>
            {/* Go Back Button */}
            <Button
              type="primary"
              css={buttonStyles}
              onClick={() => navigate(-1)} // Navigate back to the previous page
              style={{ marginTop: "10px" }}
            >
              {t("bookDetail.goBack")}
            </Button>
          </Card>
        )}
        {/* Review Modal */}
        <Modal
          title={t("review.title")}
          visible={isModalVisible}
          onCancel={handleCancelModal}
          onOk={handleSubmitReview}
        >
          <Rate
            onChange={(value) =>
              setReviewData((prev) => ({ ...prev, rating: value }))
            } // Update rating in state
            value={reviewData.rating}
          />
          <Input.TextArea
            rows={4}
            placeholder={t("review.placeholder")}
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData((prev) => ({ ...prev, comment: e.target.value }))
            } // Update comment in state
          />
        </Modal>
      </div>
    </LoadingErrorWrapper>
  );
};

export default BookDetails;
