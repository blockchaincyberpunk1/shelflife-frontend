/**
 * PasswordResetPage.js
 * This page allows users to request a password reset by providing their email.
 * It uses React Hook Form for validation, Ant Design for UI elements, Axios for API requests,
 * and React Spring for smooth animations. Emotion is used for styling.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Form management with validation
import { useNavigate } from 'react-router-dom'; // Navigation to other pages
import { useAuth } from '../../context/AuthContext'; // Use AuthContext for password reset
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import { css } from '@emotion/react'; // Emotion for dynamic styling

const PasswordResetPage = () => {
  const { requestPasswordReset, isLoading, error } = useAuth(); // Access AuthContext functions and states
  const navigate = useNavigate(); // To redirect after reset link is sent
  const { register, handleSubmit, formState: { errors } } = useForm(); // Form handling from react-hook-form

  // Spring animation for page transition (fade-in effect)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for styling the page
  const passwordResetStyles = css`
    .password-reset-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #312c49;
      color: white;
    }
    .password-reset-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .form-buttons {
      display: flex;
      justify-content: flex-end;
    }
  `;

  // Handle form submission for password reset
  const onSubmit = async (data) => {
    try {
      await requestPasswordReset(data.email); // Call the context function to request password reset
      navigate('/login'); // Redirect to login page after reset link is sent
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  return (
    <div className="password-reset-page" css={passwordResetStyles}>
      <animated.div style={springProps} className="password-reset-form">
        <h2>Reset Password</h2>

        {/* Show an error message if there is one */}
        {error && <Alert message={error} type="error" showIcon />}

        {/* Ant Design form wrapped around react-hook-form for validation */}
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {/* Email field */}
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email.message : ''}
          >
            <Input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })} // Register email field with validation
            />
          </Form.Item>

          {/* Submit button to request password reset */}
          <div className="form-buttons">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </div>
        </Form>
      </animated.div>
    </div>
  );
};

export default PasswordResetPage;
