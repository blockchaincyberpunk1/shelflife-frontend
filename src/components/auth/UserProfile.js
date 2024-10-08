/**
 * UserProfile.js
 * This component allows the user to view and update their profile details.
 * It integrates with the useAuth hook to access user data, react-hook-form for form validation,
 * react-i18next for localization, and Ant Design for UI components.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Library for form validation and submission
import { useAuth } from '../../hooks/useAuth'; // Custom hook to access user data and actions from AuthContext
import { useTranslation } from 'react-i18next'; // Hook for internationalization
import ErrorMessage from '../ui/ErrorMessage'; // Component to display error messages
import { Input, Button, Form, Alert, Spin } from 'antd'; // Ant Design components for forms and feedback
import { css } from '@emotion/react'; // Emotion for dynamic styling
import { formContainerStyles, buttonStyles, inputFieldStyles, errorMessageStyles } from '../../assets/styles/globalStyles'; // Import global styles

/**
 * UserProfile Component
 * Displays the user's profile information and allows them to update their details.
 * Integrates form validation, localization, and error handling.
 */
const UserProfile = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const { profile, isLoading, error, updateProfile } = useAuth(); // Access user data and actions from the AuthContext
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profile || {}, // Pre-fill the form with existing user data (empty if profile is null)
  });

  // CSS-in-JS styles using Emotion
  const profilePageStyles = css`
    .user-profile {
      ${formContainerStyles} // Apply global form container styles
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      color: white;
    }
  `;

  /**
   * Handle form submission to update user profile details.
   * @param {Object} data - The updated profile data from the form
   */
  const onSubmit = async (data) => {
    try {
      await updateProfile(data); // Call updateProfile function from useAuth to save changes
      reset(data); // Reset the form with the new updated profile data
      // Optional: Display success notification, e.g., a toast message
    } catch (err) {
      console.error('Error updating profile:', err); // Log any error in the console
    }
  };

  // Show loading spinner while fetching the profile
  if (isLoading) {
    return <Spin tip={t('profile.loading')} size="large" />; // Display loading message (localized)
  }

  // Show error message if there's an issue fetching or updating the profile
  if (error) {
    return <ErrorMessage message={error} />; // Display error message using ErrorMessage component
  }

  // Handle case where the profile is not available (null or undefined)
  if (!profile) {
    return <Alert message={t('profile.notFound')} type="warning" showIcon />; // Localized "Profile not found" message
  }

  return (
    <div className="user-profile" css={profilePageStyles}>
      <h2>{t('profile.myProfile')}</h2> {/* Localized heading for "My Profile" */}

      {/* Form to update user profile details */}
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        
        {/* Username Field */}
        <Form.Item
          label={t('profile.username')} // Localized label for "Username"
          validateStatus={errors.username ? 'error' : ''} // Conditionally set validation status
          help={errors.username ? errors.username.message : ''} // Display validation error message
        >
          <Input
            id="username"
            css={inputFieldStyles} // Apply global input field styles
            {...register('username', { required: t('validation.required', { field: t('profile.username') }) })} // Form validation with i18n
          />
          {errors.username && <p css={errorMessageStyles}>{errors.username.message}</p>} {/* Error message */}
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label={t('profile.email')} // Localized label for "Email"
          validateStatus={errors.email ? 'error' : ''} // Conditionally set validation status
          help={errors.email ? errors.email.message : ''} // Display validation error message
        >
          <Input
            id="email"
            type="email"
            css={inputFieldStyles} // Apply global input field styles
            {...register('email', {
              required: t('validation.required', { field: t('profile.email') }), // Required field validation
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation
                message: t('validation.emailInvalid'), // Localized error message for invalid email format
              },
            })}
          />
          {errors.email && <p css={errorMessageStyles}>{errors.email.message}</p>} {/* Error message */}
        </Form.Item>

        {/* Additional fields can be added here, e.g., profile picture, bio, etc. */}

        {/* Save Changes Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" css={buttonStyles}> {/* Apply global button styles */}
            {t('profile.saveChanges')} {/* Localized button text for "Save Changes" */}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
