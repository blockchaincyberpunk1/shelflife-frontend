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
  // useForm hook to handle form logic, with validation support
  const { register, handleSubmit, formState: { errors } } = useForm();

  // useAuth hook to access password reset function and loading/error state
  const { requestPasswordReset, isLoading, error } = useAuth();

  // useTranslation hook to get the translation function
  const { t } = useTranslation();

  /**
   * onSubmit function
   * This function is called when the form is submitted. It triggers the password reset request.
   * 
   * @param {Object} data - The form data, which includes the user's email.
   */
  const onSubmit = async (data) => {
    try {
      // Call the requestPasswordReset function from the useAuth hook
      await requestPasswordReset(data.email);
      // Show an alert to notify the user of the success
      alert(t('passwordReset.success'));
    } catch (err) {
      // Log any unexpected errors to the console (API errors are handled in useAuth)
      console.error('Password reset error:', err);
    }
  };

  return (
    <div css={css`${formContainerStyles}`}> {/* Apply global form container styles */}
      <h2>{t('passwordReset.heading')}</h2> {/* Localized heading for "Password Reset" */}

      {/* Display error message, if any, using the ErrorMessage component */}
      {error && <ErrorMessage message={error} />}

      {/* Form for password reset, handled by react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Email input field */}
          <label htmlFor="email" css={css`${labelStyles}`}>{t('passwordReset.emailLabel')}</label>
          <input
            type="email"
            id="email"
            css={css`${inputFieldStyles}`} // Apply global input field styles
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
        <button type="submit" disabled={isLoading} css={css`${buttonStyles}`}>
          {isLoading ? <Spin /> : t('passwordReset.submitButton')} {/* Show spinner during loading */}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
