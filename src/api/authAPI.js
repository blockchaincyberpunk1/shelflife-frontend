import { fetcher } from '../utils/fetcher';

export const authAPI = {
  // AUTHENTICATION-RELATED FUNCTIONS

  /**
   * Signup API function
   * Sends a POST request to create a new user
   * @param {Object} userData - The data of the new user (e.g., username, email, password)
   * @returns {string} - The JWT token received from the backend
   */
  signup: async (userData) => {
    try {
      const response = await fetcher('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Convert user data to JSON
      });
      return response.token; // Assuming the backend returns the JWT in a token field
    } catch (error) {
      throw error; // Propagate the error to the calling function for handling
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
        body: JSON.stringify({ email, password }), // Convert login data to JSON
      });
      return response.token; // Assuming the backend returns the JWT token
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  /**
   * Fetch Current User API function
   * Sends a GET request to retrieve the current user's profile
   * @param {string} token - The JWT token to authenticate the request
   * @returns {Object} - The current user's profile data
   */
  getCurrentUser: async (token) => {
    try {
      const response = await fetcher('/users/profile', { // Assuming '/users/profile' is the protected route for getting user data
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      });
      return response.user; // Assuming the backend returns user data in a 'user' field
    } catch (error) {
      throw error; // Propagate the error for handling
    }
  },

  // USER PROFILE AND PASSWORD MANAGEMENT FUNCTIONS

  /**
   * Fetch the current user's profile
   * Sends a GET request to retrieve the profile data of the authenticated user
   * @returns {Object} - The user's profile data (excluding sensitive information like password)
   */
  getUserProfile: async () => {
    try {
      return await fetcher("/users/profile", {
        method: "GET",
      });
    } catch (error) {
      throw new Error("Failed to fetch user profile.");
    }
  },

  /**
   * Update the current user's profile
   * Sends a PUT request to update the user's profile with the provided data
   * @param {Object} updatedData - The updated profile information (e.g., username, email, profilePicture)
   * @returns {Object} - The updated user profile data
   */
  updateUserProfile: async (updatedData) => {
    try {
      return await fetcher("/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Send updated profile data as JSON
      });
    } catch (error) {
      throw new Error("Failed to update user profile.");
    }
  },

  /**
   * Update the current user's password
   * Sends a PUT request to update the user's password
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The new password to set
   * @returns {void}
   */
  updatePassword: async (currentPassword, newPassword) => {
    try {
      return await fetcher("/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword: currentPassword, newPassword }), // Send current and new password as JSON
      });
    } catch (error) {
      throw new Error("Failed to update password.");
    }
  },

  /**
   * Generate password reset token and request for a password reset
   * Sends a POST request to request a password reset and receive a reset token
   * @param {string} email - The email of the user requesting the password reset
   * @returns {void}
   */
  requestPasswordReset: async (email) => {
    try {
      return await fetcher("/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email to request a password reset
      });
    } catch (error) {
      throw new Error("Failed to request password reset.");
    }
  },

  /**
   * Reset user's password using the reset token
   * Sends a POST request to reset the user's password with a valid reset token
   * @param {string} resetToken - The password reset token provided via email
   * @param {string} newPassword - The new password to set
   * @returns {void}
   */
  resetPassword: async (resetToken, newPassword) => {
    try {
      return await fetcher(`/auth/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }), // Send new password along with reset token
      });
    } catch (error) {
      throw new Error("Failed to reset password.");
    }
  },
};
