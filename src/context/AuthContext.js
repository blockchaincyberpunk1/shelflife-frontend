import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api/authAPI'; // Import API functions for auth (login, signup, etc.)
import { tokenHandler } from '../utils/tokenHandler'; // Utility for handling tokens (localStorage, etc.)

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap around the application or specific parts of it
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the authenticated user's data
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage async operations
  const [error, setError] = useState(null); // Error state for any authentication errors

  // useEffect to check if the user is already authenticated when the app loads
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = tokenHandler.getToken(); // Retrieve token from local storage
      if (token) {
        try {
          const fetchedUser = await authAPI.getCurrentUser(token); // API call to fetch user data if token exists
          setUser(fetchedUser); // Set the user data in state
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError(err.message || 'An error occurred during authentication.'); // Handle and log any errors
        }
      }
      setIsLoading(false); // Whether user is authenticated or not, stop loading
    };

    checkAuthentication(); // Call the function to check auth on load
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to handle login
  const login = async (email, password) => {
    setIsLoading(true); // Set loading to true while performing the API call
    setError(null); // Clear any previous errors

    try {
      const token = await authAPI.login(email, password); // Call API to log in and retrieve token
      tokenHandler.setToken(token); // Store the token (e.g., in localStorage)
      const fetchedUser = await authAPI.getCurrentUser(token); // Fetch the user's data with the token
      setUser(fetchedUser); // Set the user in state
    } catch (err) {
      setError(err.message || 'Invalid email or password.'); // Set error message on failure
    } finally {
      setIsLoading(false); // Stop the loading spinner once the process completes
    }
  };

  // Function to handle signup
  const signup = async (userData) => {
    setIsLoading(true); // Set loading to true while performing the API call
    setError(null); // Clear any previous errors

    try {
      const token = await authAPI.signup(userData); // Call API to sign up and retrieve token
      tokenHandler.setToken(token); // Store the token (e.g., in localStorage)
      const fetchedUser = await authAPI.getCurrentUser(token); // Fetch the user's data with the token
      setUser(fetchedUser); // Set the user in state
    } catch (err) {
      setError(err.message || 'An error occurred during signup.'); // Set error message on failure
    } finally {
      setIsLoading(false); // Stop the loading spinner once the process completes
    }
  };

  // Function to handle logout
  const logout = () => {
    tokenHandler.removeToken(); // Remove the token from storage
    setUser(null); // Clear the user state to log out the user
  };

  // Future: Add password reset functions here when needed, e.g., request password reset, confirm password reset, etc.

  // Context value to be provided to the rest of the application
  const contextValue = {
    user, // Current user data (null if not logged in)
    isLoading, // Loading state (true while API calls are pending)
    error, // Error state for displaying error messages
    login, // Function to log in the user
    signup, // Function to sign up the user
    logout, // Function to log out the user
    // Add more functions (like password reset) when ready...
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children} {/* Render child components (usually the whole app) */}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to the AuthContext in other components
export const useAuth = () => {
  return React.useContext(AuthContext); // Return the context value so components can use auth functionality
};