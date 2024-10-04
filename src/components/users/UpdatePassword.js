import React from 'react';
import { useForm } from 'react-hook-form'; // Importing react-hook-form for handling form state and validation
import { useUser } from '../../context/UserContext'; // Importing the user context to handle password update logic
import ErrorMessage from '../common/ErrorMessage'; // Component to display error messages

// UpdatePassword component for updating the user's password
const UpdatePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form
  const { updatePassword, isLoading, error } = useUser(); // Fetch necessary functions and state from UserContext

  // Function that is called when the form is submitted
  const onSubmit = async (data) => {
    try {
      // Call the updatePassword function with the current and new passwords
      await updatePassword(data.currentPassword, data.newPassword);
      // You could add additional functionality here such as displaying a success message or redirecting the user
    } catch (err) {
      console.error('Error updating password:', err);
      // Handle any error that might occur (e.g., display error message)
    }
  };

  return (
    <div className="update-password">
      <h2>Update Password</h2>

      {/* Show error message if there is an error from the API */}
      {error && <ErrorMessage message={error} />}

      {/* Password update form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Current password field */}
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input 
            type="password" 
            id="currentPassword" 
            {...register('currentPassword', { 
              required: 'Current password is required' // Validation rule
            })} 
          />
          {/* Show error message if validation fails */}
          {errors.currentPassword && <p className="error">{errors.currentPassword.message}</p>}
        </div>

        {/* New password field */}
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input 
            type="password" 
            id="newPassword" 
            {...register('newPassword', { 
              required: 'New password is required' // Validation rule
            })} 
          />
          {/* Show error message if validation fails */}
          {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
        </div>

        {/* Submit button */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating Password...' : 'Update Password'} 
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
