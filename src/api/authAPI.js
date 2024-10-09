import { fetcher } from '../utils/fetcher'; // Import the fetcher utility to make API requests

export const authAPI = {
  // AUTHENTICATION-RELATED FUNCTIONS

  /**
   * Signup API function
   * Sends a POST request to create a new user
   * @param {Object} userData - The data of the new user (e.g., username, email, password, profilePicture)
   * @returns {string} - The JWT token received from the backend
   */
  signup: async (userData) => {
    try {
      const response = await fetcher('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Convert user data to JSON format
      });
      return response.token; // Assuming the backend returns the JWT token
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Login API function
   * Sends a POST request to authenticate a user
   * @param {string} email - The user's email
   * @param {string} password - The user's password
   * @returns {string} - The JWT token received from the backend
   */
  login: async (email, password) => {
    try {
      const response = await fetcher('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Convert login data to JSON format
      });
      return response.token; // Assuming the backend returns the JWT token
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Fetch a user by their unique ID
   * Sends a GET request to retrieve a user's data by their ID
   * @param {string} userId - The user's unique ID
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The user's profile data
   */
  getUserById: async (userId, token) => {
    try {
      const response = await fetcher(`/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      return response.user; // Assuming the backend returns user data
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Fetch the authenticated user's profile
   * Sends a GET request to retrieve the profile of the currently authenticated user
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The authenticated user's profile data
   */
  getUserProfile: async (token) => {
    try {
      const response = await fetcher('/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      return response.user; // Assuming the backend returns user profile data
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Update the authenticated user's profile
   * Sends a PUT request to update the user's profile with the provided data
   * @param {Object} updatedData - The updated profile information (e.g., username, email, profilePicture)
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The updated user profile data
   */
  updateUserProfile: async (updatedData, token) => {
    try {
      const response = await fetcher('/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(updatedData), // Send the updated profile data as JSON
      });
      return response.user; // Assuming the backend returns the updated user data
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Update the authenticated user's password
   * Sends a PUT request to update the user's password
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The new password to set
   * @param {string} token - The JWT token to authenticate the request
   * @returns {void}
   */
  updateUserPassword: async (currentPassword, newPassword, token) => {
    try {
      await fetcher('/users/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }), // Send current and new password as JSON
      });
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  // PASSWORD MANAGEMENT FUNCTIONS

  /**
   * Request a password reset
   * Sends a POST request to request a password reset and receive a reset token
   * @param {string} email - The email of the user requesting the password reset
   * @returns {void}
   */
  requestPasswordReset: async (email) => {
    try {
      await fetcher('/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email to request a password reset
      });
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Reset the user's password using a valid reset token
   * Sends a POST request to reset the user's password with a valid reset token
   * @param {string} resetToken - The password reset token provided via email
   * @param {string} newPassword - The new password to set
   * @returns {void}
   */
  resetPassword: async (resetToken, newPassword) => {
    try {
      await fetcher('/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: resetToken, newPassword }), // Send reset token and new password
      });
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  // USER SETTINGS FUNCTIONS

  /**
   * Update user-specific settings (e.g., notifications, email preferences)
   * Sends a PUT request to update the authenticated user's settings
   * @param {Object} settingsData - The updated settings data
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The updated user settings
   */
  updateUserSettings: async (settingsData, token) => {
    try {
      const response = await fetcher('/users/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify({ settings: settingsData }), // Send settings data as JSON
      });
      return response.settings; // Assuming the backend returns the updated settings
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Fetch the authenticated user's settings
   * Sends a GET request to retrieve the user's notification and email preferences
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The user's settings data
   */
  fetchUserSettings: async (token) => {
    try {
      const response = await fetcher('/users/settings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      return response.settings; // Assuming the backend returns the user's settings
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  // TOKEN REFRESH FUNCTION

  /**
   * Refresh the JWT token for the authenticated user
   * Sends a POST request to refresh the user's JWT token
   * @param {string} token - The old JWT token to authenticate the request
   * @returns {string} - The new refreshed JWT token
   */
  refreshToken: async (token) => {
    try {
      const response = await fetcher('/users/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      return response.token; // Assuming the backend returns a new token
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },
};
