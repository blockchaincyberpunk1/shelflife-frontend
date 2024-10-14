/**
 * PasswordReset.js
 * 
 * This component renders a form that allows users to request a password reset by providing their email.
 * It uses `react-hook-form` for form handling and validation, `useAuth` for managing the password reset logic,
 * and `react-i18next` for localization support. Styles are applied using Emotion's CSS-in-JS.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Import react-hook-form for managing form state and validation
import { useAuth } from '../../hooks/useAuth'; // Import custom useAuth hook for authentication logic
import { useTranslation } from 'react-i18next'; // Import i18n hook for localization support
import { css } from '@emotion/react'; // Import Emotion for styling
import {
  formContainerStyles,
  buttonStyles,
  inputFieldStyles,
  labelStyles,
  errorMessageStyles,
} from '../../assets/styles/globalStyles'; // Import global styles from globalStyles
import ErrorMessage from '../ui/ErrorMessage'; // Error message component for displaying any form errors
import { Spin } from 'antd'; // Import Ant Design's Spin component for loading state

const PasswordReset = () => {
  // Initialize useForm hook to handle form logic and validation
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Destructure requestPasswordReset function and isLoading, error state from useAuth hook
  const { requestPasswordReset, isLoading, error } = useAuth();

  // Initialize useTranslation hook for i18n localization
  const { t } = useTranslation();

  /**
   * onSubmit function
   * This function is triggered when the form is submitted. It handles the password reset request.
   * 
   * @param {Object} data - The form data, which includes the user's email.
   */
  const onSubmit = async (data) => {
    try {
      // Call the requestPasswordReset function from the useAuth hook
      await requestPasswordReset(data.email);
      // Optionally, show a more user-friendly success message instead of an alert (for better UX)
      alert(t('passwordReset.success')); // Can replace this with a UI notification
    } catch (err) {
      console.error('Password reset error:', err); // Log any errors to the console
    }
  };

  return (
    <div css={css`${formContainerStyles}`}> {/* Apply global form container styles */}
      <h2>{t('passwordReset.heading')}</h2> {/* Localized heading for "Password Reset" */}

      {/* Conditionally render error message, if any, using the ErrorMessage component */}
      {error && <ErrorMessage message={error} />}

      {/* Form for password reset, handled by react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email input field */}
          <label htmlFor="email" css={css`${labelStyles}`} aria-label={t('passwordReset.emailLabel')}>
            {t('passwordReset.emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            css={css`${inputFieldStyles}`} // Apply global input field styles
            aria-required="true" // Mark the field as required for accessibility
            {...register('email', {
              required: t('validation.required', { field: t('passwordReset.email') }), // Localized validation message for required field
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                message: t('validation.emailInvalid'), // Localized validation message for invalid email format
              },
            })}
          />
          {/* Display validation error message for the email field */}
          {errors.email && <p css={css`${errorMessageStyles}`}>{errors.email.message}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button when form is submitting
          css={css`${buttonStyles}`} // Apply global button styles
          aria-label={t('passwordReset.submitButton')} // Add aria-label for accessibility
        >
          {isLoading ? <Spin /> : t('passwordReset.submitButton')} {/* Show spinner during loading */}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
