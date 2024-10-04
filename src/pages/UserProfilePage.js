/** UserProfilePage.js
 * Page to display and update the user's profile.
 * Integrates Ant Design for layout and form components, Emotion for styling, React Hook Form for form handling, 
 * Axios for API requests, and context management via the UserContext.
 * Supports localization with react-i18next and animations using react-spring for smooth transitions.
 */

import React from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for form validation and handling
import { useUser } from '../../context/UserContext'; // Context for accessing user-related state and actions
import { Layout, Form, Input, Button, Spin } from 'antd'; // Ant Design for form and layout components
import { useSpring, animated } from 'react-spring'; // React Spring for animations
import { css } from '@emotion/react'; // Emotion for styling
import ErrorMessage from '../common/ErrorMessage'; // Component to display errors

const { Content } = Layout;

const UserProfilePage = () => {
  const { profile, isLoading, error, updateProfile } = useUser(); // Access the user's profile, loading state, and actions
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: profile, // Pre-fill form fields with user profile data
  });

  // React Spring animation for form transitions
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for custom styling
  const userProfilePageStyles = css`
    .user-profile-page {
      background-color: #312c49;
      padding: 24px;
      min-height: 100vh;
      color: white;
    }
    .profile-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .form-item {
      margin-bottom: 16px;
    }
    .form-buttons {
      display: flex;
      justify-content: flex-end;
    }
  `;

  const onSubmit = async (data) => {
    try {
      await updateProfile(data); // Call the function to update the profile
      // Optionally show a success message or redirect
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  if (isLoading) {
    return <Spin size="large" />; // Show loading spinner if profile data is being fetched
  }

  if (error) {
    return <ErrorMessage message={error} />; // Show error message if there's an error
  }

  if (!profile) {
    return <div>Profile not found.</div>; // Handle case where profile data is not available
  }

  return (
    <Layout className="user-profile-page" css={userProfilePageStyles}>
      <Content>
        <animated.div style={springProps} className="profile-form">
          <h2>My Profile</h2>

          <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
            {/* Username field */}
            <Form.Item
              label="Username"
              className="form-item"
              validateStatus={errors.username ? 'error' : ''}
              help={errors.username ? errors.username.message : ''}
            >
              <Input
                type="text"
                id="username"
                {...register('username', { required: 'Username is required' })}
                defaultValue={profile.username}
              />
            </Form.Item>

            {/* Email field */}
            <Form.Item
              label="Email"
              className="form-item"
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email ? errors.email.message : ''}
            >
              <Input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
                defaultValue={profile.email}
              />
            </Form.Item>

            {/* You can add additional fields like phone number, address, etc. */}
            
            <div className="form-buttons">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </animated.div>
      </Content>
    </Layout>
  );
};

export default UserProfilePage;
