/**
 * Settings.js
 * 
 * This component allows users to update their account settings, such as email preferences and notification preferences.
 * It integrates with the `useAuth` custom hook to manage user-specific settings and uses `react-hook-form` for form handling and validation.
 * It also supports internationalization (i18n) using `react-i18next` and Ant Design for UI components.
 */

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form'; // React Hook Form for managing form state and validation
import { useAuth } from '../../hooks/useAuth'; // Custom hook for managing user-related actions and state
import { useTranslation } from 'react-i18next'; // Hook for i18n localization
import { Input, Button, Switch, Form, Spin } from 'antd'; // Ant Design components for form UI
import { css } from '@emotion/react'; // Emotion for CSS-in-JS styling
import ErrorMessage from '../ui/ErrorMessage'; // Error message component for displaying any form errors

const Settings = () => {
  // Initialize `useForm` to manage form state and validation
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  // Access user-specific settings and update logic from `useAuth` hook
  const { fetchUserSettings, updateUserSettings, isLoading, error, settings } = useAuth();

  // Access translation function from `react-i18next` for i18n support
  const { t } = useTranslation();

  /**
   * Emotion CSS for custom styling of the settings form.
   * Applied to ensure consistent UI design.
   */
  const settingsStyles = css`
    .settings-form {
      background-color: #494761;
      padding: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
      color: white;
    }
    .form-item {
      margin-bottom: 16px;
    }
    .form-buttons {
      display: flex;
      justify-content: flex-end;
    }
  `;

  /**
   * Fetch and pre-fill user settings on component mount.
   */
  useEffect(() => {
    const loadSettings = async () => {
      try {
        await fetchUserSettings(); // Fetch current user settings
        // Set form fields to fetched settings after data is loaded
        setValue('emailPreferences', settings?.emailPreferences);
        setValue('notificationsEnabled', settings?.notificationsEnabled);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    loadSettings();
  }, [fetchUserSettings, setValue, settings]);

  /**
   * onSubmit function
   * This function is called when the form is submitted. It handles the update of user settings.
   * 
   * @param {Object} data - The form data containing the updated settings.
   */
  const onSubmit = async (data) => {
    try {
      await updateUserSettings(data); // Call the update function to save new settings
      reset(data); // Reset the form after successful submission
      // Optionally, show a success notification (not implemented here)
    } catch (err) {
      console.error('Error updating settings:', err); // Handle errors during form submission
    }
  };

  return (
    <div className="settings" css={settingsStyles}>
      <h2>{t('settings.title')}</h2> {/* Localized title for the settings page */}

      {/* Display error message if there is an error */}
      {error && <ErrorMessage message={error} />}

      {/* Form to handle settings updates */}
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className="settings-form">
        
        {/* Email Preferences Input Field */}
        <Form.Item
          label={t('settings.emailPreferences')} // Localized label for email preferences
          validateStatus={errors.emailPreferences ? 'error' : ''} // Show error styling if validation fails
          help={errors.emailPreferences ? t(errors.emailPreferences.message) : ''} // Display validation error
          className="form-item"
        >
          <Input
            type="email"
            id="emailPreferences"
            defaultValue={settings?.emailPreferences} // Pre-fill the input with existing settings
            {...register('emailPreferences', {
              required: t('validation.required', { field: t('settings.emailPreferences') }), // Validation: required field
            })}
          />
        </Form.Item>

        {/* Notification Preferences Switch */}
        <Form.Item
          label={t('settings.notificationPreferences')} // Localized label for notification preferences
          className="form-item"
        >
          <Switch
            id="notificationsEnabled"
            defaultChecked={settings?.notificationsEnabled} // Pre-fill the switch with existing setting
            {...register('notificationsEnabled')} // Register switch for form submission
          />
          <span style={{ marginLeft: 8 }}>
            {settings?.notificationsEnabled
              ? t('settings.notificationsOn') // Show "On" if notifications are enabled
              : t('settings.notificationsOff')} {/* Show "Off" if notifications are disabled */}
          </span>
        </Form.Item>

        {/* Save Changes Button */}
        <div className="form-buttons">
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : t('settings.saveChanges')} {/* Ant Design spinner during loading */}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
