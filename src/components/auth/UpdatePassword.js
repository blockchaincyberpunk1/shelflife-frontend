/**
 * UpdatePassword.js
 * This component allows the user to update their password.
 * It integrates with the useAuth hook to handle password update logic and uses react-hook-form for validation.
 * Additionally, it supports localization via react-i18next and uses Emotion for styling.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for form validation and handling
import { useAuth } from '../../hooks/useAuth'; // Custom hook to handle user-related actions (updated to useAuth)
import { useTranslation } from 'react-i18next'; // For i18n localization
import { Input, Button, Form, Spin } from 'antd'; // Ant Design components for UI elements
import { css } from '@emotion/react'; // Emotion for dynamic CSS-in-JS styling
import ErrorMessage from '../ui/ErrorMessage'; // Custom component to display error messages

const UpdatePassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Initialize form handling
  const { updatePassword, isLoading, error } = useAuth(); // Access password update logic from useAuth (updated)
  const { t } = useTranslation(); // Hook to access translation functions from react-i18next

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

  // Handle form submission for updating the password
  const onSubmit = async (data) => {
    try {
      await updatePassword(data.currentPassword, data.newPassword); // Call updatePassword function from useAuth
      reset(); // Reset form after successful submission
      // Optionally, display a success message or redirect user
    } catch (err) {
      console.error('Error updating password:', err); // Handle error
    }
  };

  return (
    <div className="update-password" css={updatePasswordStyles}>
      <h2>{t('passwordUpdate.title')}</h2> {/* Localized title for updating password */}

      {/* Show error message if there is an error from the API */}
      {error && <ErrorMessage message={error} />}

      {/* Form to update the user's password */}
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="update-password-form">
        {/* Current password field */}
        <Form.Item
          label={t('passwordUpdate.currentPassword')} 
          validateStatus={errors.currentPassword ? 'error' : ''}
          help={errors.currentPassword ? t(errors.currentPassword.message) : ''}
          className="form-item"
        >
          <Input.Password
            id="currentPassword"
            {...register('currentPassword', {
              required: t('validation.required', { field: t('passwordUpdate.currentPassword') }), // Localized validation
            })}
          />
        </Form.Item>

        {/* New password field */}
        <Form.Item
          label={t('passwordUpdate.newPassword')}
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword ? t(errors.newPassword.message) : ''}
          className="form-item"
        >
          <Input.Password
            id="newPassword"
            {...register('newPassword', {
              required: t('validation.required', { field: t('passwordUpdate.newPassword') }), // Localized validation
            })}
          />
        </Form.Item>

        {/* Submit button */}
        <div className="form-buttons">
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : t('passwordUpdate.submit')} {/* Localized button text */}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePassword;
