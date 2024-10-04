import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for form handling and validation
import { useAuth } from '../../context/AuthContext'; // Use AuthContext for requesting password reset
import ErrorMessage from '../common/ErrorMessage'; // Error message component for form errors
import { Spin } from 'antd'; // Ant Design spinner for loading states
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles

// Styled container for the password reset form
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

const PasswordReset = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // React Hook Form setup
  const { requestPasswordReset, isLoading, error } = useAuth(); // Use AuthContext to request password reset

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      await requestPasswordReset(data.email); // Call requestPasswordReset with the provided email
      // Here, you can display a success message or redirect the user
      alert('Password reset link sent to your email.');
    } catch (err) {
      console.error('Password reset error:', err); // Handle any errors (note: API errors handled in AuthContext)
    }
  };

  return (
    <FormContainer> {/* Form container styled with Emotion */}
      <h2>Reset Password</h2>

      {/* Display error message if request fails */}
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
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format validation
                message: 'Enter a valid email address',
              },
            })}
          />
          {/* Display validation error for email */}
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* Submit button with loading spinner */}
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? <Spin /> : 'Send Reset Link'} {/* Ant Design spinner for loading state */}
        </FormButton>
      </form>
    </FormContainer>
  );
};

export default PasswordReset;
