/**
 * Signup.js
 * 
 * This component renders a signup form, allowing users to create an account by providing their username, email, and password.
 * It uses `react-hook-form` for form handling, `useAuth` for authentication logic, and `react-i18next` for localization.
 * Styling is applied using Emotion with global styles imported from `globalStyles.js`.
 */

import React from "react";
import { useForm } from "react-hook-form"; // React Hook Form for managing form state and validation
import { Link, useNavigate } from "react-router-dom"; // React Router for navigation and link management
import { useAuth } from "../../hooks/useAuth"; // Custom hook for authentication logic
import { useTranslation } from "react-i18next"; // Hook for accessing translation functions (i18n)
import ErrorMessage from '../ui/ErrorMessage'; // Error message component for displaying any form errors
import { Spin } from "antd"; // Ant Design spinner for showing loading states
import {
  formContainerStyles,
  inputFieldStyles,
  buttonStyles,
  labelStyles,
  errorMessageStyles,
} from "../../assets/styles/globalStyles"; // Import global styles

const Signup = () => {
  // Initialize the useForm hook for form validation and state management
  const {
    register, // To register input fields with validation
    handleSubmit, // To handle form submission
    formState: { errors }, // To get form validation errors
  } = useForm();

  // Extract signup function and state (isLoading, error) from the custom useAuth hook
  const { signup, isLoading, error } = useAuth();

  // Initialize translation hook from react-i18next for localization
  const { t } = useTranslation();

  // Hook from React Router for navigation (e.g., redirect after successful signup)
  const navigate = useNavigate();

  /**
   * onSubmit function
   * This function is called when the form is submitted. It handles user signup.
   * 
   * @param {Object} data - The form data, including username, email, and password.
   */
  const onSubmit = async (data) => {
    try {
      // Call the signup function (from useAuth hook) with form data
      await signup(data);
      // Redirect to the homepage ("/") after successful signup
      navigate("/", { replace: true });
    } catch (err) {
      // Log any unexpected errors to the console
      console.error("Signup error:", err);
    }
  };

  return (
    <div css={formContainerStyles}> {/* Apply global form container styles */}
      <h2>{t("signup.title")}</h2> {/* Localized form title */}

      {/* If there's an error during signup, display it using ErrorMessage component */}
      {error && <ErrorMessage message={error} />}

      {/* Form for user signup */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Username input field */}
          <label htmlFor="username" css={labelStyles}>
            {t("signup.usernameLabel")}
          </label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: t("signup.usernameRequired"), // Localized validation message for required field
              minLength: {
                value: 3,
                message: t("signup.usernameMinLength"), // Localized message for minimum length
              },
            })}
            css={inputFieldStyles} // Apply global input field styles
          />
          {/* If there's a validation error for username, display it */}
          {errors.username && <p css={errorMessageStyles}>{errors.username.message}</p>}
        </div>

        <div>
          {/* Email input field */}
          <label htmlFor="email" css={labelStyles}>
            {t("signup.emailLabel")}
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: t("signup.emailRequired"), // Localized validation message for required field
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regex pattern for validating email format
                message: t("signup.emailInvalid"), // Localized message for invalid email format
              },
            })}
            css={inputFieldStyles} // Apply global input field styles
          />
          {/* If there's a validation error for email, display it */}
          {errors.email && <p css={errorMessageStyles}>{errors.email.message}</p>}
        </div>

        <div>
          {/* Password input field */}
          <label htmlFor="password" css={labelStyles}>
            {t("signup.passwordLabel")}
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: t("signup.passwordRequired"), // Localized validation message for required field
              minLength: {
                value: 6,
                message: t("signup.passwordMinLength"), // Localized message for minimum length
              },
            })}
            css={inputFieldStyles} // Apply global input field styles
          />
          {/* If there's a validation error for password, display it */}
          {errors.password && <p css={errorMessageStyles}>{errors.password.message}</p>}
        </div>

        {/* Submit button with loading state */}
        <button type="submit" css={buttonStyles} disabled={isLoading}>
          {isLoading ? <Spin /> : t("signup.submit")} {/* Ant Design spinner during loading */}
        </button>
      </form>

      {/* Link to login page if the user already has an account */}
      <p>
        {t("signup.haveAccount")}{" "}
        <Link to="/login">{t("signup.loginLink")}</Link>
      </p>
    </div>
  );
};

export default Signup;
