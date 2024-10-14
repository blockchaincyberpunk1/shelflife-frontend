/**
 * PasswordResetConfirm.js
 *
 * This component allows users to reset their password by providing a valid reset token and a new password.
 * It utilizes `react-hook-form` for form handling, `useAuth` for password reset logic, and `react-i18next` for localization.
 * Emotion's CSS-in-JS is used for styling, and Ant Design is used for loading and UI elements.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Import react-hook-form for form validation and handling
import { useAuth } from '../../hooks/useAuth'; // Import custom useAuth hook for resetPassword logic
import { useTranslation } from 'react-i18next'; // Import i18n hook for localization
import { css } from '@emotion/react'; // Emotion for styling
import { Spin } from 'antd'; // Ant Design's Spin for loading indicator
import {
  formContainerStyles,
  buttonStyles,
  inputFieldStyles,
  labelStyles,
  errorMessageStyles,
} from '../../assets/styles/globalStyles'; // Import global styles for form elements
import ErrorMessage from '../ui/ErrorMessage'; // Error message component to display any form errors

const PasswordResetConfirm = () => {
  // Initialize useForm hook for form validation and handling
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Destructure resetPassword function and states (isLoading, error) from useAuth
  const { resetPassword, isLoading, error } = useAuth();

  // Initialize useTranslation hook for localization
  const { t } = useTranslation();

  /**
   * onSubmit function
   * 
   * Handles form submission for resetting the user's password.
   * 
   * @param {Object} data - The form data, containing the reset token and new password.
   */
  const onSubmit = async (data) => {
    try {
      // Call resetPassword function from the useAuth hook
      await resetPassword(data.token, data.newPassword);
      // Optionally, show a success message or redirect the user to the login page
      alert(t('passwordResetConfirm.success')); // You can replace this with a UI notification
    } catch (err) {
      console.error('Error resetting password:', err); // Log unexpected errors to the console
    }
  };

  return (
    <div css={css`${formContainerStyles}`}> {/* Apply global form container styles */}
      <h2>{t('passwordResetConfirm.heading')}</h2> {/* Localized heading for password reset confirmation */}

      {/* Conditionally render error message, if any, using the ErrorMessage component */}
      {error && <ErrorMessage message={error} />}

      {/* Form for password reset confirmation, handled by react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Reset token input field */}
          <label htmlFor="token" css={css`${labelStyles}`}>{t('passwordResetConfirm.tokenLabel')}</label>
          <input
            type="text"
            id="token"
            css={css`${inputFieldStyles}`} // Apply global input field styles
            {...register('token', {
              required: t('validation.required', { field: t('passwordResetConfirm.token') }), // Localized validation message for required field
            })}
          />
          {/* Conditionally render error message for token field */}
          {errors.token && <p css={css`${errorMessageStyles}`}>{errors.token.message}</p>}
        </div>

        <div>
          {/* New password input field */}
          <label htmlFor="newPassword" css={css`${labelStyles}`}>{t('passwordResetConfirm.passwordLabel')}</label>
          <input
            type="password"
            id="newPassword"
            css={css`${inputFieldStyles}`} // Apply global input field styles
            {...register('newPassword', {
              required: t('validation.required', { field: t('passwordResetConfirm.password') }), // Localized validation message for required field
              minLength: {
                value: 6, // Minimum password length
                message: t('passwordResetConfirm.passwordMinLength'), // Localized error message for minimum length
              },
            })}
          />
          {/* Conditionally render error message for password field */}
          {errors.newPassword && <p css={css`${errorMessageStyles}`}>{errors.newPassword.message}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading} // Disable button while form is submitting
          css={css`${buttonStyles}`} // Apply global button styles
        >
          {isLoading ? <Spin /> : t('passwordResetConfirm.submitButton')} {/* Show loading spinner during submission */}
        </button>
      </form>
    </div>
  );
};

export default PasswordResetConfirm;
