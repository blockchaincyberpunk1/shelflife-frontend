// BookReview.js
/**
 * BookReview Component
 * This component is responsible for displaying the list of reviews for a specific book and
 * allowing users to submit new reviews (rating and comments). It utilizes the `addReview`
 * function from the context to add reviews and displays reviews that exist for the book.
 * 
 * Props:
 * - bookId: The ID of the book to fetch and display reviews for.
 * 
 * Context Functions Used:
 * - addReview: To add reviews to the specific book.
 * 
 * Additional Functionality:
 * - A form to submit new reviews.
 * - A list of existing reviews, including rating and comments from users.
 */

import React, { useState } from 'react';
import { useBook } from '../../hooks/useBook'; // Custom hook to access book context functions
import { useForm } from 'react-hook-form'; // For handling form submissions and validation
import { Rate, Input, Button, List, Avatar, Form, Spin } from 'antd'; // Ant Design components for form, rating, and list
import { useTranslation } from 'react-i18next'; // For translations
import styled from '@emotion/styled'; // Emotion for styling components

// Styled container for the review section
const ReviewContainer = styled.div`
  margin-top: 20px;
  background-color: #3c3853;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
`;

// Styled header for the review section
const ReviewHeader = styled.h3`
  font-size: 22px;
  margin-bottom: 20px;
  color: #fff;
`;

// Styled form container for adding reviews
const ReviewFormContainer = styled.div`
  margin-bottom: 30px;
`;

// Styled List for displaying reviews
const StyledReviewList = styled(List)`
  background-color: #3c3853;
  color: #fff;
  border-radius: 8px;
`;

const BookReview = ({ bookId, reviews }) => {
  const { addReview, isLoading, error } = useBook(); // Extract addReview function and state from the context
  const { t } = useTranslation(); // Translation hook for i18n support
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); // Initialize react-hook-form for form handling
  const [submitting, setSubmitting] = useState(false); // State to track submission

  /**
   * Handle form submission for adding a new review.
   * 
   * @param {Object} data - Contains the rating and comment from the form input.
   */
  const onSubmit = async (data) => {
    setSubmitting(true); // Set submitting to true while the review is being submitted

    try {
      await addReview(bookId, data); // Call the addReview function with bookId and review data
      reset(); // Reset the form fields after successful submission
    } catch (error) {
      console.error('Error adding review:', error); // Log any error that occurs during submission
    } finally {
      setSubmitting(false); // Reset submitting state after submission completes
    }
  };

  return (
    <ReviewContainer>
      <ReviewHeader>{t('bookReview.reviews')}</ReviewHeader> {/* Display section header for reviews */}

      {/* Form to submit a new review */}
      <ReviewFormContainer>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Rating Input Field */}
          <Form.Item
            label={t('bookReview.rating')} // Localized label for "Rating"
            validateStatus={errors.rating ? 'error' : ''} // Display error styling if validation fails
            help={errors.rating ? t(errors.rating.message) : null} // Display validation error message
          >
            <Rate {...register('rating', { required: t('bookReview.ratingRequired') })} /> {/* Ant Design's Rate component */}
          </Form.Item>

          {/* Comment Input Field */}
          <Form.Item
            label={t('bookReview.comment')} // Localized label for "Comment"
            validateStatus={errors.comment ? 'error' : ''} // Display error styling if validation fails
            help={errors.comment ? t(errors.comment.message) : null} // Display validation error message
          >
            <Input.TextArea
              rows={4}
              placeholder={t('bookReview.enterComment')} // Localized placeholder for the comment field
              {...register('comment', { required: t('bookReview.commentRequired') })} // Validation rules for comment
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting} // Show loading indicator while submitting
            >
              {t('bookReview.submitReview')} {/* Localized submit button text */}
            </Button>
          </Form.Item>
        </Form>
      </ReviewFormContainer>

      {/* Display loading spinner if the reviews are being fetched */}
      {isLoading ? (
        <Spin />
      ) : error ? (
        <p>{t('bookReview.errorLoadingReviews')}</p> // Display error message if reviews fail to load
      ) : (
        // Display a list of reviews using Ant Design's List component
        <StyledReviewList
          itemLayout="horizontal"
          dataSource={reviews} // Pass reviews array as the data source for the list
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar>{review.user.charAt(0).toUpperCase()}</Avatar>} // Display user's avatar using first letter
                title={<span>{review.user}</span>} // Display the reviewer's name
                description={review.comment} // Display the review comment
              />
              {/* Display the review rating */}
              <Rate disabled defaultValue={review.rating} />
            </List.Item>
          )}
        />
      )}
    </ReviewContainer>
  );
};

export default BookReview;
