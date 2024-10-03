import { fetcher } from '../utils/fetcher';

export const authAPI = {
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

  /**
   * Additional Authentication API functions can be added here,
   * such as for password reset, password update, logout, etc.
   */
};