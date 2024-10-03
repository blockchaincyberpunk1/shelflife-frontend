import axios from 'axios';
import { tokenHandler } from './tokenHandler';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // API base URL

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: API_URL
});

// Interceptor to include JWT token in the Authorization header, if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenHandler.getToken(); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Interceptor to handle responses (e.g., 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the response if it's successful
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the response status is 401 (Unauthorized), handle token expiration or invalidation
      console.error('Unauthorized. Redirecting to login...');
      tokenHandler.removeToken(); // Remove the token from localStorage
      // Add logic to redirect to the login page or display an unauthorized message
      window.location.href = '/login'; // Redirect to the login page (optional)
    }
    return Promise.reject(error); // Return the error for further handling
  }
);

/**
 * A function to make HTTP requests using the Axios instance.
 * It handles request errors and returns the response data.
 *
 * @param {string} url - The API endpoint to request.
 * @param {object} [options={}] - Optional Axios config (method, data, headers, etc.).
 * @returns {Promise<any>} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetcher = async (url, options = {}) => {
  try {
    const response = await axiosInstance(url, options); // Make the request using axiosInstance
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // Handle server response errors (4xx or 5xx)
      console.error('Error Response:', error.response.data, error.response.status, error.response.headers);
      throw new Error(error.response.data.message || 'An error occurred.'); // Use custom or default error message
    } else if (error.request) {
      // Handle cases where no response was received from the server
      console.error('No Response:', error.request);
      throw new Error('No response received from server.');
    } else {
      // Handle errors in setting up the request
      console.error('Request Error:', error.message);
      throw new Error('Failed to make the request.');
    }
  }
};