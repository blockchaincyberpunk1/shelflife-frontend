/**
 * SignupPage.js
 * This page handles user registration using React Hook Form for form management,
 * Ant Design for UI components, and Axios for API calls. It uses the AuthContext
 * to register a new user. React Spring is used for smooth page transitions, and
 * Emotion is used for dynamic styling.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Form management with validation
import { Link, useNavigate } from 'react-router-dom'; // Navigation and linking
import { useAuth } from '../../context/AuthContext'; // Use AuthContext for signup
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components for form handling
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling

const SignupPage = () => {
  const { signup, isLoading, error } = useAuth(); // Use AuthContext for signup and error management
  const navigate = useNavigate(); // Navigate user post-signup
  const { register, handleSubmit, formState: { errors } } = useForm(); // Form handling from react-hook-form

  // Spring animation for page transition (fade-in effect)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for styling the signup page
  const signupPageStyles = css`
    .signup-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #312c49;
      color: white;
    }
    .signup-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .form-buttons {
      display: flex;
      justify-content: flex-end;
    }
    .form-error {
      color: red;
      margin-top: 10px;
    }
  `;

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await signup(data); // Trigger signup using AuthContext
      navigate('/'); // Redirect user to homepage after successful signup
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-page" css={signupPageStyles}>
      <animated.div style={springProps} className="signup-form">
        <h2>Sign Up</h2>

        {/* Display error message if signup fails */}
        {error && <Alert message={error} type="error" showIcon />}

        {/* Ant Design form wrapped around react-hook-form for validation */}
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {/* Username field */}
          <Form.Item
            label="Username"
            validateStatus={errors.username ? 'error' : ''}
            help={errors.username ? errors.username.message : ''}
          >
            <Input
              id="username"
              {...register('username', { required: 'Username is required' })} // Register username field with validation
            />
          </Form.Item>

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

          {/* Password field */}
          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password ? errors.password.message : ''}
          >
            <Input.Password
              id="password"
              {...register('password', { required: 'Password is required' })} // Register password field with validation
            />
          </Form.Item>

          {/* Signup button */}
          <div className="form-buttons">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </div>
        </Form>

        {/* Links to login and forgot password */}
        <div style={{ marginTop: '16px' }}>
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default SignupPage;
