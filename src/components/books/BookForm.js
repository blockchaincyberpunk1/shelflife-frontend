/**
 * BookForm.js
 * This component provides a form to create or update a book, using React Hook Form for form handling
 * and the BookContext for managing book-related actions. It supports both adding new books
 * and editing existing ones, with validation for required fields like title.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useBook } from '../../context/BookContext'; 
import { Input, Button, Form } from 'antd'; // Ant Design components for better UI
import styled from '@emotion/styled';

// Styled container for the form
const BookFormContainer = styled.div`
  background-color: #3c3853;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #ffffff;
`;

// Styled buttons section
const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const BookForm = ({ initialData, onSubmit, onCancel }) => {
  const { addBook, updateBook } = useBook(); // Use BookContext for add/update actions
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialData || {} // Pre-fill form if editing a book
  });

  // Handle form submission
  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        // Update an existing book
        await updateBook(initialData.id, data); 
      } else {
        // Add a new book
        await addBook(data);
      }
      onSubmit(); // Trigger the onSubmit callback after successful action
    } catch (error) {
      console.error('Error adding/updating book:', error); 
      // Handle error (e.g., display error message)
    } finally {
      reset(); // Clear the form after submission
    }
  };

  return (
    <BookFormContainer>
      <h2>{initialData ? 'Edit Book' : 'Add Book'}</h2>

      <Form onFinish={handleSubmit(handleFormSubmit)} layout="vertical">
        {/* Title Field */}
        <Form.Item
          label="Title"
          validateStatus={errors.title ? 'error' : ''}
          help={errors.title ? errors.title.message : null}
        >
          <Input 
            type="text" 
            {...register('title', { required: 'Title is required' })} 
            placeholder="Enter book title"
          />
        </Form.Item>

        {/* Author Field */}
        <Form.Item
          label="Author(s)"
          validateStatus={errors.authors ? 'error' : ''}
          help={errors.authors ? errors.authors.message : null}
        >
          <Input 
            type="text" 
            {...register('authors', { required: 'At least one author is required' })} 
            placeholder="Enter author(s), separated by commas"
          />
        </Form.Item>

        {/* Cover Image URL Field */}
        <Form.Item
          label="Cover Image URL"
          validateStatus={errors.coverImageUrl ? 'error' : ''}
          help={errors.coverImageUrl ? errors.coverImageUrl.message : null}
        >
          <Input 
            type="text" 
            {...register('coverImageUrl', {
              pattern: {
                value: /^https?:\/\/.*\.(jpeg|jpg|png|gif|webp)$/,
                message: 'Please enter a valid image URL (jpg, png, gif, webp)',
              }
            })} 
            placeholder="Enter cover image URL"
          />
        </Form.Item>

        {/* Buttons Section */}
        <FormButtons>
          <Button type="primary" htmlType="submit">
            {initialData ? 'Update Book' : 'Add Book'}
          </Button>
          {onCancel && (
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </FormButtons>
      </Form>
    </BookFormContainer>
  );
};

export default BookForm;
