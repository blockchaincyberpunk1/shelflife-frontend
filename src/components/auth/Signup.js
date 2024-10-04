import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for form handling and validation
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation
import { useAuth } from '../../context/AuthContext'; // Use AuthContext for authentication
import ErrorMessage from '../common/ErrorMessage'; // Error message component for form errors
import { Spin } from 'antd'; // Ant Design spinner for loading states
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles

// Styled container for the signup form
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #3a3651; /* Background color from the provided palette */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #ffffff;
`;

// Styled submit button for the form
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

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // React Hook Form setup
  const { signup, isLoading, error } = useAuth(); // Use AuthContext to access signup function
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      await signup(data); // Call signup function from AuthContext with form data
      navigate('/', { replace: true }); // Redirect to homepage after successful signup
    } catch (err) {
      console.error('Signup error:', err); // Handle any unexpected errors (note: API errors handled in AuthContext)
    }
  };

  return (
    <FormContainer> {/* Form container styled with Emotion */}
      <h2>Create an Account</h2>

      {/* Display error message if signup fails */}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit(onSubmit)}> {/* React Hook Form handles validation */}
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            {...register('username', {
              required: 'Username is required', // Validation rule for username
              minLength: { value: 3, message: 'Username must be at least 3 characters long' }, // Minimum length validation
            })} 
          />
          {/* Display validation error for username */}
          {errors.username && <p className="error">{errors.username.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            {...register('email', {
              required: 'Email is required', // Validation rule for email
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation
                message: 'Enter a valid email address',
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
              minLength: { value: 6, message: 'Password must be at least 6 characters long' }, // Minimum length validation
            })} 
          />
          {/* Display validation error for password */}
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* Submit button with loading spinner */}
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? <Spin /> : 'Sign Up'} {/* Ant Design spinner for loading state */}
        </FormButton>
      </form>

      {/* Links for login and password reset */}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </FormContainer>
  );
};

export default Signup;
