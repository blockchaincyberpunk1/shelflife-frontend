/**
 * UpdatePassword.js
 * 
 * This component allows the user to update their password.
 * It integrates with the `useAuth` hook to handle the password update logic and uses `react-hook-form` for form validation.
 * Additionally, it supports localization via `react-i18next` and uses Emotion for dynamic styling.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for managing form state and validation
import { useAuth } from '../../hooks/useAuth'; // Custom hook for accessing password update and logout functionality
import { useTranslation } from 'react-i18next'; // Hook for localization
import { Input, Button, Form, Spin } from 'antd'; // Ant Design components for UI elements
import { css } from '@emotion/react'; // Emotion for dynamic CSS-in-JS styling
import ErrorMessage from '../ui/ErrorMessage'; // Component to display error messages

/**
 * UpdatePassword Component
 * 
 * Renders a form to allow the user to update their password.
 * It integrates with authentication logic through `useAuth` and handles form submission, validation, and error states.
 */
const UpdatePassword = () => {
  // Destructure necessary methods from `useForm` for form handling and validation
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Access password update and loading/error states from the `useAuth` hook
  const { updatePassword, isLoading, error, logout } = useAuth();

  // Access translation function from `react-i18next` for localization
  const { t } = useTranslation();

  // Custom Emotion styles for the form layout
  const updatePasswordStyles = css`
    .update-password-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 0 auto;
      color: white;
    }
    .form-item {
      margin-bottom: 16px;
    }
    .form-buttons {
      display: flex;
      justify-content: flex-end;
    }
  `;

  /**
   * onSubmit function
   * Handles form submission by calling the `updatePassword` function from `useAuth` to update the user's password.
   * 
   * @param {Object} data - The submitted form data (current and new passwords).
   */
  const onSubmit = async (data) => {
    try {
      // Attempt to update the user's password
      await updatePassword(data.currentPassword, data.newPassword);
      reset(); // Reset the form after successful password update
      // Optionally, display a success message or trigger a redirect
      logout(); // Log out the user after password change for security reasons
      alert(t('passwordUpdate.success')); // Display a success message
    } catch (err) {
      console.error('Error updating password:', err); // Handle any errors
    }
  };

  return (
    <div className="update-password" css={updatePasswordStyles}>
      <h2>{t('passwordUpdate.title')}</h2> {/* Localized title for updating password */}

      {/* Display error message if there is an error from the API */}
      {error && <ErrorMessage message={error} />}

      {/* Form to update the user's password */}
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="update-password-form">
        {/* Current password input field */}
        <Form.Item
          label={t('passwordUpdate.currentPassword')} // Localized label for "Current Password"
          validateStatus={errors.currentPassword ? 'error' : ''} // Conditionally set validation status
          help={errors.currentPassword ? t(errors.currentPassword.message) : ''} // Display validation error message
          className="form-item"
        >
          <Input.Password
            id="currentPassword"
            {...register('currentPassword', {
              required: t('validation.required', { field: t('passwordUpdate.currentPassword') }), // Localized required validation
            })}
          />
        </Form.Item>

        {/* New password input field */}
        <Form.Item
          label={t('passwordUpdate.newPassword')} // Localized label for "New Password"
          validateStatus={errors.newPassword ? 'error' : ''} // Conditionally set validation status
          help={errors.newPassword ? t(errors.newPassword.message) : ''} // Display validation error message
          className="form-item"
        >
          <Input.Password
            id="newPassword"
            {...register('newPassword', {
              required: t('validation.required', { field: t('passwordUpdate.newPassword') }), // Localized required validation
              minLength: {
                value: 6, // Minimum password length
                message: t('passwordUpdate.minLength'), // Localized validation message for minimum length
              },
            })}
          />
        </Form.Item>

        {/* Submit button */}
        <div className="form-buttons">
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : t('passwordUpdate.submit')} {/* Display spinner while loading */}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePassword;
