/**
 * ShelfForm.js
 * This component allows users to create a new shelf.
 * It integrates with the ShelfContext to manage shelf creation and provides feedback to the user.
 */

import React, { useState } from 'react';
import { useShelf } from '../../context/ShelfContext'; // Hook to access shelf-related state and functions
import styled from '@emotion/styled'; // Emotion for styling
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components for forms and UI elements

// Styled form container
const FormContainer = styled(Form)`
  background-color: #494761;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  max-width: 400px;
  margin: 0 auto;
`;

// Styled form header
const FormHeader = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;

const ShelfForm = ({ onShelfCreated }) => {
  const { createShelf, error } = useShelf(); // Access the createShelf function and any errors from the context
  const [shelfName, setShelfName] = useState(''); // Local state to track the shelf name input

  /**
   * Handle the form submission to create a new shelf.
   * @param {Object} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      await createShelf(shelfName); // Call the createShelf function from the ShelfContext
      setShelfName(''); // Clear the input field after creating the shelf
      if (onShelfCreated) {
        onShelfCreated(); // Call the callback function to handle post-creation actions (e.g., close modal)
      }
    } catch (err) {
      console.error('Error creating shelf:', err); // Log any errors
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} className="shelf-form">
      <FormHeader>Create New Shelf</FormHeader>

      {/* If there's an error, display an Ant Design Alert */}
      {error && <Alert message={error} type="error" showIcon />}

      {/* Form Item for Shelf Name */}
      <Form.Item
        label="Shelf Name"
        required
        help={shelfName.length === 0 ? 'Shelf name is required' : ''}
        validateStatus={shelfName.length === 0 ? 'error' : 'success'}
      >
        <Input
          type="text"
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)} // Update state when input changes
          placeholder="Enter shelf name"
          required
        />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Shelf
        </Button>
      </Form.Item>
    </FormContainer>
  );
};

export default ShelfForm;