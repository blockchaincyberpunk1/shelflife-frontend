/**
 * UserProfile.js
 * This component allows the user to view and update their profile details.
 * It integrates with the UserContext and handles form submissions with react-hook-form.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // Library to manage form validation and submission
import { useUser } from '../../context/UserContext'; // Hook to access user-related state and actions
import ErrorMessage from '../common/ErrorMessage'; // Component for displaying error messages
import { Input, Button, Form, Alert, Spin } from 'antd'; // Ant Design components for form elements and feedback

const UserProfile = () => {
  const { profile, isLoading, error, updateProfile } = useUser(); // Access user data and actions from context
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: profile || {}, // Pre-fill form with existing profile data (empty if profile is null)
  });

  /**
   * Handle form submission to update user profile.
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
    try {
      await updateProfile(data); // Call the updateProfile function to submit changes
      reset(data); // Reset the form with the updated profile data
      // Optionally, display a success message (e.g., toast notification)
    } catch (err) {
      console.error('Error updating profile:', err); // Log any errors
    }
  };

  // Render a loading spinner while the profile is loading
  if (isLoading) {
    return <Spin tip="Loading profile..." />;
  }

  // Display error message if there's an issue fetching or updating the profile
  if (error) {
    return <ErrorMessage message={error} />; // Use ErrorMessage to display errors
  }

  // Render a message if the profile is not found
  if (!profile) {
    return <Alert message="Profile not found" type="warning" showIcon />;
  }

  return (
    <div className="user-profile">
      <h2>My Profile</h2>

      {/* Form to update user profile */}
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        
        {/* Username Field */}
        <Form.Item
          label="Username"
          validateStatus={errors.username ? 'error' : ''}
          help={errors.username ? errors.username.message : ''}
        >
          <Input 
            id="username" 
            {...register('username', { required: 'Username is required' })} 
          />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email ? errors.email.message : ''}
        >
          <Input 
            id="email" 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
          />
        </Form.Item>

        {/* Add more fields as needed (e.g., profile picture, bio, etc.) */}

        {/* Save Changes Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfile;
