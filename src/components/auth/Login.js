import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for form handling
import { Link, useLocation, useNavigate } from 'react-router-dom'; // React Router for navigation
import { useAuth } from '../../context/AuthContext'; // Auth context to handle authentication
import ErrorMessage from '../common/ErrorMessage'; // Error message component for displaying errors
import { Spin } from 'antd'; // Ant Design spinner for loading states
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles

// Define styled components for the form container and button
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #3a3651; /* Use one of the provided colors */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #ffffff;
`;

const FormButton = styled.button`
  background-color: #494761; /* Use one of the provided colors */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3d3a54;
  }

  &:disabled {
    background-color: #312c49;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Destructure form-related methods and state from useForm
  const { login, isLoading, error } = useAuth(); // Extract login, isLoading, and error from AuthContext
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to get the current location

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password); // Call login function from AuthContext
      const from = location.state?.from?.pathname || '/'; // Get the intended redirect page or default to home
      navigate(from, { replace: true }); // Redirect after successful login
    } catch (err) {
      console.error('Login error:', err); // Handle any unexpected errors (note: API errors handled in AuthContext)
    }
  };

  return (
    <FormContainer> {/* Styled container for the form */}
      <h2>Login to ShelfLife</h2>

      {/* Display error message if login fails */}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit(onSubmit)}> {/* React Hook Form handles validation */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required', // Validation rule for email
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address', // Custom error message for invalid email format
              },
            })}
          />
          {/* Display validation error for email */}
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required', // Validation rule for password
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long', // Custom error message for password length
              },
            })}
          />
          {/* Display validation error for password */}
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Button that changes to loading state if login is in progress */}
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? <Spin /> : 'Login'} {/* Ant Design spinner for loading state */}
        </FormButton>
      </form>

      {/* Links for sign-up and password reset */}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p>
        Forgot password? <Link to="/password-reset">Reset Password</Link>
      </p>
    </FormContainer>
  );
};

export default Login;
