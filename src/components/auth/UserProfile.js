/**
 * UserProfile.js
 * 
 * This component allows the user to view and update their profile details.
 * It uses `useAuth` for accessing profile data and updating it, `react-hook-form` for form handling and validation,
 * `react-i18next` for localization, and Ant Design for UI components.
 * It handles the form submission for updating user details such as username and email.
 */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // Library for form validation and submission
import { useAuth } from '../../hooks/useAuth'; // Custom hook for accessing user profile data and actions
import { useTranslation } from 'react-i18next'; // Hook for localization
import ErrorMessage from '../ui/ErrorMessage'; // Component to display error messages
import { Input, Button, Form, Alert, Spin } from 'antd'; // Ant Design components for form UI
import { css } from '@emotion/react'; // Emotion for styling
import {
  formContainerStyles,
  buttonStyles,
  inputFieldStyles,
  errorMessageStyles,
} from '../../assets/styles/globalStyles'; // Global styles

/**
 * UserProfile Component
 * 
 * Displays the user's profile information and allows them to update their details.
 * It integrates form validation, localization, and error handling.
 */
const UserProfile = () => {
  // Access translation functions for i18n
  const { t } = useTranslation();

  // Destructure profile data, loading state, error state, and action functions from useAuth
  const { profile, isLoading, error, fetchUserProfile, updateProfile } = useAuth();

  // Initialize form methods with react-hook-form, default values being the profile data
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profile || {}, // Pre-fill the form with existing user data (if available)
  });

  // Fetch user profile when the component mounts
  useEffect(() => {
    fetchUserProfile(); // Fetch profile data on component load
  }, [fetchUserProfile]);

  // Emotion CSS-in-JS for form styling
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
   * onSubmit handler for updating user profile
   * 
   * This function is called when the form is submitted.
   * It updates the user's profile using the updateProfile function from useAuth.
   * 
   * @param {Object} data - The form data (username, email, etc.)
   */
  const onSubmit = async (data) => {
    try {
      await updateProfile(data); // Call the updateProfile function from useAuth to update profile details
      reset(data); // Reset the form with updated profile data
      // Optionally, display a success message (e.g., a toast or alert)
      alert(t('profile.updateSuccess'));
    } catch (err) {
      console.error('Error updating profile:', err); // Handle errors that occur during profile update
    }
  };

  // Display loading spinner while fetching user profile data
  if (isLoading) {
    return <Spin tip={t('profile.loading')} size="large" />; // Display localized loading message
  }

  // Display an error message if there was an issue fetching or updating the profile
  if (error) {
    return <ErrorMessage message={error} />; // Display the error message using the ErrorMessage component
  }

  // Handle case where the profile data is not available (e.g., fetch failed or not logged in)
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
            {...register('username', {
              required: t('validation.required', { field: t('profile.username') }), // Form validation with localization
            })}
          />
          {/* Conditionally render an error message if the username field has validation errors */}
          {errors.username && <p css={errorMessageStyles}>{errors.username.message}</p>}
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
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern validation
                message: t('validation.emailInvalid'), // Localized error message for invalid email format
              },
            })}
          />
          {/* Conditionally render an error message if the email field has validation errors */}
          {errors.email && <p css={errorMessageStyles}>{errors.email.message}</p>}
        </Form.Item>

        {/* Additional fields can be added here, such as profile picture, bio, etc. */}

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
