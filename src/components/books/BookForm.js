/**
 * BookForm Component
 * Purpose: Provides a form for creating or editing a book's details such as title, authors, genre, and cover image URL.
 * Context Functions Used:
 * - addBook: To add a new book to the collection.
 * - updateBook: To update an existing book's details.
 * Props:
 * - initialData: (Optional) Data of the book being edited. If provided, the form is in edit mode; otherwise, it's for adding a new book.
 * - onSubmit: Function to call when the form is successfully submitted.
 * - onCancel: (Optional) Function to call when the form is canceled.
 * Additional Functionality:
 * - Form validation for required fields such as title and authors.
 * - Differentiates between add and edit modes based on whether `initialData` is provided.
 */

import React, { useEffect } from 'react'; // Import useEffect to handle side effects like populating form data
import { useForm } from 'react-hook-form'; // React Hook Form for managing form state and validation
import { useBook } from '../../hooks/useBook'; // Custom hook for interacting with book-related actions
import { Input, Button, Form } from 'antd'; // Ant Design components for UI: Input, Button, and Form layout
import styled from '@emotion/styled'; // Emotion for CSS-in-JS styled components
import { useTranslation } from 'react-i18next'; // i18n for handling translations
import { buttonStyles, formContainerStyles } from '../../assets/styles/globalStyles'; // Global styles

// Styled container for the form using Emotion's CSS-in-JS
const BookFormContainer = styled.div`
  ${formContainerStyles} /* Apply shared form container styles from global styles */
  background-color: #3c3853; /* Custom background color for the form */
  color: #ffffff; /* Custom text color */
`;

// Styled container for form buttons
const FormButtons = styled.div`
  display: flex;
  justify-content: space-between; /* Align the buttons to the left and right */
  margin-top: 20px; /* Add spacing at the top */
`;

const BookForm = ({ initialData, onSubmit, onCancel }) => {
  const { addBook, updateBook, isLoading } = useBook(); // Extract the addBook, updateBook functions, and isLoading state from BookContext
  const { t } = useTranslation(); // Hook for translations

  // React Hook Form setup, including default values when in edit mode (initialData is passed)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: initialData || {}, // If editing, pre-fill the form with initialData
  });

  // Populate the form with `initialData` when editing a book
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]); // Set each form field with the corresponding data
      });
    }
  }, [initialData, setValue]); // Only re-run the effect if `initialData` or `setValue` changes

  /**
   * Handles form submission.
   * If `initialData` exists, the form is used for editing, otherwise for adding a new book.
   * @param {Object} data - The form data.
   */
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        await updateBook(initialData.id, data); // Update the existing book if `initialData` is provided
      } else {
        await addBook(data); // Add a new book if no `initialData` is provided
      }
      onSubmit(); // Call the onSubmit callback to notify parent component
    } catch (error) {
      console.error('Error adding/updating book:', error); // Log any errors that occur during form submission
    } finally {
      reset(); // Reset the form to its default state after submission
    }
  };

  return (
    <BookFormContainer>
      {/* Display dynamic form title based on add or edit mode */}
      <h2>{initialData ? t('bookForm.editBook') : t('bookForm.addBook')}</h2> {/* Translated title */}

      {/* Ant Design form layout with React Hook Form integration */}
      <Form onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
        {/* Title Field */}
        <Form.Item
          label={t('bookForm.title')} // Localized label for "Title"
          validateStatus={errors.title ? 'error' : ''} // Show error state if title validation fails
          help={errors.title ? t(errors.title.message) : null} // Display error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterTitle')} // Localized placeholder
            {...register('title', { required: t('bookForm.titleRequired') })} // React Hook Form validation rules
          />
        </Form.Item>

        {/* Author(s) Field */}
        <Form.Item
          label={t('bookForm.authors')} // Localized label for "Authors"
          validateStatus={errors.authors ? 'error' : ''} // Show error state if authors validation fails
          help={errors.authors ? t(errors.authors.message) : null} // Display error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterAuthors')} // Localized placeholder
            {...register('authors', { required: t('bookForm.authorsRequired') })} // React Hook Form validation rules
          />
        </Form.Item>

        {/* Cover Image URL Field */}
        <Form.Item
          label={t('bookForm.coverImageUrl')} // Localized label for "Cover Image URL"
          validateStatus={errors.coverImageUrl ? 'error' : ''} // Show error state if cover image URL validation fails
          help={errors.coverImageUrl ? t(errors.coverImageUrl.message) : null} // Display error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterCoverImageUrl')} // Localized placeholder
            {...register('coverImageUrl', {
              // Regex pattern for validating a correct image URL
              pattern: {
                value: /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/, // Regex for image URLs
                message: t('bookForm.invalidImageUrl'), // Localized error message for invalid URLs
              },
            })}
          />
        </Form.Item>

        {/* Form buttons (Submit and Cancel) */}
        <FormButtons>
          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading} // Show loading spinner while form is being submitted
            css={buttonStyles} // Global button styles
          >
            {initialData ? t('bookForm.updateBook') : t('bookForm.addBook')} {/* Localized submit button text */}
          </Button>

          {/* Cancel Button (if onCancel is provided) */}
          {onCancel && (
            <Button
              type="default"
              onClick={onCancel} // Trigger onCancel callback when clicked
              css={buttonStyles} // Global button styles
            >
              {t('bookForm.cancel')} {/* Localized cancel button text */}
            </Button>
          )}
        </FormButtons>
      </Form>
    </BookFormContainer>
  );
};

export default BookForm;
