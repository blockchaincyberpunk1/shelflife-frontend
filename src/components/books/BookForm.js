/**
 * BookForm.js
 * This component provides a form to create or update a book, using React Hook Form for form handling
 * and the useBook custom hook for managing book-related actions. It supports both adding new books
 * and editing existing ones, with validation for required fields like title and authors.
 */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // For form handling and validation
import { useBook } from '../../hooks/useBook'; // Custom hook for managing books
import { Input, Button, Form } from 'antd'; // Ant Design components for UI elements
import styled from '@emotion/styled'; // Emotion for styling
import { useTranslation } from 'react-i18next'; // For translations (i18n)
import { buttonStyles, formContainerStyles } from '../../assets/styles/globalStyles'; // Global styles

// Styled container for the form
const BookFormContainer = styled.div`
  ${formContainerStyles} /* Apply global form container styles */
  background-color: #3c3853;
  color: #ffffff;
`;

// Styled buttons section
const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BookForm = ({ initialData, onSubmit, onCancel }) => {
  // Extract necessary book actions from useBook and loading state
  const { addBook, updateBook, isLoading } = useBook();
  // React Hook Form for form handling, with pre-filled data if editing
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: initialData || {}, // Pre-fill form if `initialData` exists (for editing)
  });
  const { t } = useTranslation(); // Hook for translations

  // Set form values if `initialData` is provided (for editing a book)
  useEffect(() => {
    if (initialData) {
      // Populate the form fields with existing data when editing a book
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]); // Dynamically set each form field value
      });
    }
  }, [initialData, setValue]); // Only run this effect when `initialData` or `setValue` changes

  /**
   * Handle form submission for both adding and updating books.
   * If `initialData` is provided, update the book; otherwise, add a new book.
   * @param {Object} data - The form data to be submitted.
   */
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        // Update the existing book
        await updateBook(initialData.id, data);
      } else {
        // Add a new book
        await addBook(data);
      }
      onSubmit(); // Callback after successful submission
    } catch (error) {
      console.error('Error adding/updating book:', error); // Handle any errors during submission
    } finally {
      reset(); // Reset the form after submission
    }
  };

  return (
    <BookFormContainer>
      {/* Title of the form, which is dynamic based on whether the user is adding or editing a book */}
      <h2>{initialData ? t('bookForm.editBook') : t('bookForm.addBook')}</h2> {/* Localized title */}

      {/* Form wrapping Ant Design form components and integrating react-hook-form for validation */}
      <Form onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
        {/* Title Field */}
        <Form.Item
          label={t('bookForm.title')} // Localized label for "Title"
          validateStatus={errors.title ? 'error' : ''} // Display error styling if there's a validation error
          help={errors.title ? t(errors.title.message) : null} // Show localized error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterTitle')} // Localized placeholder text
            {...register('title', { required: t('bookForm.titleRequired') })} // Validation rules for title field
          />
        </Form.Item>

        {/* Author(s) Field */}
        <Form.Item
          label={t('bookForm.authors')} // Localized label for "Authors"
          validateStatus={errors.authors ? 'error' : ''} // Display error styling if there's a validation error
          help={errors.authors ? t(errors.authors.message) : null} // Show localized error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterAuthors')} // Localized placeholder text
            {...register('authors', { required: t('bookForm.authorsRequired') })} // Validation rules for authors field
          />
        </Form.Item>

        {/* Cover Image URL Field */}
        <Form.Item
          label={t('bookForm.coverImageUrl')} // Localized label for "Cover Image URL"
          validateStatus={errors.coverImageUrl ? 'error' : ''} // Display error styling if there's a validation error
          help={errors.coverImageUrl ? t(errors.coverImageUrl.message) : null} // Show localized error message if validation fails
        >
          <Input
            type="text"
            placeholder={t('bookForm.enterCoverImageUrl')} // Localized placeholder text
            {...register('coverImageUrl', {
              // URL validation pattern for image URL
              pattern: {
                value: /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/, // Regex for valid image URL
                message: t('bookForm.invalidImageUrl'), // Localized validation message
              }
            })}
          />
        </Form.Item>

        {/* Buttons for submitting the form or canceling the operation */}
        <FormButtons>
          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading} // Display loading spinner when form is submitting
            css={buttonStyles} // Apply global button styles
          >
            {initialData ? t('bookForm.updateBook') : t('bookForm.addBook')} {/* Localized button text */}
          </Button>

          {/* Cancel Button (if onCancel is provided) */}
          {onCancel && (
            <Button
              type="default"
              onClick={onCancel} // Trigger the onCancel function when clicked
              css={buttonStyles} // Apply global button styles
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
