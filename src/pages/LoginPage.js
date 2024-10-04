/** 
 * LoginPage.js
 * This page handles user login functionality using React Hook Form for form management,
 * Ant Design for UI components, and Axios for API calls. It leverages context management via the AuthContext 
 * to authenticate the user. React Spring is used for smooth page transitions and Emotion for styling.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for managing form state and validation
import { useNavigate, Link } from 'react-router-dom'; // React Router for navigation and links
import { useAuth } from '../../context/AuthContext'; // Use Auth context to handle authentication
import { Form, Input, Button, Alert } from 'antd'; // Ant Design components for form and UI elements
import { useSpring, animated } from 'react-spring'; // React Spring for animation effects
import { css } from '@emotion/react'; // Emotion for styling

const LoginPage = () => {
  const { login, error, isLoading } = useAuth(); // Use Auth context for login and error handling
  const { register, handleSubmit, formState: { errors } } = useForm(); // Form management from react-hook-form
  const navigate = useNavigate();

  // Spring animation for page transition (fade in)
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for styling the login page
  const loginPageStyles = css`
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #312c49;
      color: white;
    }
    .login-form {
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

  // Handle login form submission
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // Trigger login function from AuthContext
      navigate('/'); // Redirect user to the homepage after successful login
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-page" css={loginPageStyles}>
      <animated.div style={springProps} className="login-form">
        <h2>Login</h2>

        {/* Display error message if login fails */}
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

          {/* Login button */}
          <div className="form-buttons">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </Form>

        {/* Link to signup and forgot password */}
        <div style={{ marginTop: '16px' }}>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p>
            Forgot password? <Link to="/password-reset">Reset Password</Link>
          </p>
        </div>
      </animated.div>
    </div>
  );
};

export default LoginPage;
