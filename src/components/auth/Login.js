/**
 * Login Component
 * 
 * This component renders the login form, allowing users to authenticate using their email and password.
 * It utilizes the `useAuth` custom hook to handle the login process and `react-i18next` for localization.
 * Emotion's `css` is used to apply consistent styling across the form.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Library to manage form validation and submission
import { useNavigate, useLocation, Link } from 'react-router-dom'; // React Router for navigation
import { useAuth } from '../../hooks/useAuth'; // Custom hook to access authentication state and actions
import { useTranslation } from 'react-i18next'; // Hook for accessing the i18n translation functions
import ErrorMessage from '../ui/ErrorMessage'; // Error message component for displaying any form errors
import { Spin } from 'antd'; // Ant Design spinner to indicate loading state
import {
  formContainerStyles,
  inputFieldStyles,
  buttonStyles,
  labelStyles,
  errorMessageStyles,
} from '../../assets/styles/globalStyles'; // Global styles for form and input elements

const Login = () => {
  // Initialize React Hook Form with validation management
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Access the authentication-related actions and states from the AuthContext
  const { login, isLoading, error } = useAuth();

  // Initialize translation hook from i18n
  const { t } = useTranslation();

  // Hooks for navigation and redirecting post-login
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Function to handle form submission
   * @param {Object} data - The submitted form data, containing email and password
   */
  const onSubmit = async (data) => {
    try {
      // Attempt to log in the user with the provided email and password
      await login(data.email, data.password);
      
      // Redirect the user to the intended page after successful login, or default to '/'
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err); // Handle unexpected errors, if any
    }
  };

  return (
    <div css={formContainerStyles}> {/* Apply global form container styles */}
      <h2>{t('login.title')}</h2> {/* Display localized title using i18n */}

      {/* Conditionally render an error message if login fails */}
      {error && <ErrorMessage message={error} />}

      {/* Render the login form, with validation and form submission handled by React Hook Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email input field */}
        <div>
          <label htmlFor="email" css={labelStyles}>{t('login.emailLabel')}</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: t('login.emailRequired'), // Localized validation message for required field
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern validation
                message: t('login.emailInvalid'), // Localized error message for invalid email format
              },
            })}
            css={inputFieldStyles} // Apply global input field styles
          />
          {/* Conditionally render error message for email validation */}
          {errors.email && <p css={errorMessageStyles}>{errors.email.message}</p>}
        </div>

        {/* Password input field */}
        <div>
          <label htmlFor="password" css={labelStyles}>{t('login.passwordLabel')}</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: t('login.passwordRequired'), // Localized validation message for required field
              minLength: {
                value: 6, // Minimum length of 6 characters for password
                message: t('login.passwordMinLength'), // Localized error message for minimum length
              },
            })}
            css={inputFieldStyles} // Apply global input field styles
          />
          {/* Conditionally render error message for password validation */}
          {errors.password && <p css={errorMessageStyles}>{errors.password.message}</p>}
        </div>

        {/* Submit button with loading indicator */}
        <button type="submit" css={buttonStyles} disabled={isLoading}>
          {isLoading ? <Spin /> : t('login.submit')} {/* Show a spinner when loading, else show submit text */}
        </button>
      </form>

      {/* Links to sign up and password reset pages */}
      <p>
        {t('login.noAccount')} <Link to="/signup">{t('login.signupLink')}</Link> {/* Sign up link */}
      </p>
      <p>
        {t('login.forgotPassword')} <Link to="/password-reset">{t('login.resetLink')}</Link> {/* Password reset link */}
      </p>
    </div>
  );
};

export default Login;
