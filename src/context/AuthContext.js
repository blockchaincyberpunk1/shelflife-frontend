import React, { createContext, useState, useEffect, useCallback } from 'react';
import jwtDecode from 'jwt-decode'; // Utility to decode JWT tokens
import { authAPI } from '../api/authAPI'; // API functions for authentication and user profile management
import { getToken, setToken, removeToken, isTokenExpired } from '../utils/tokenHandler'; // Token handling utilities

// Create AuthContext to provide authentication data to other components
const AuthContext = createContext();

/**
 * AuthProvider component to manage authentication and user profile data
 * Provides methods for login, logout, signup, profile fetching, settings, etc.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds authenticated user data
  const [profile, setProfile] = useState(null); // Holds user profile data
  const [isLoading, setIsLoading] = useState(true); // Manages loading state during async operations
  const [error, setError] = useState(null); // Holds any authentication-related errors
  const [settings, setSettings] = useState(null); // Holds user settings (email preferences, etc.)

  /**
   * Refresh the JWT token to prevent session expiry
   */
  const refreshToken = useCallback(async () => {
    try {
      const newToken = await authAPI.refreshToken(getToken()); // Request new token from the server
      setToken(newToken); // Store new token in localStorage
      const decoded = jwtDecode(newToken); // Decode new token to get user data
      setUser(decoded); // Update user state with decoded data
    } catch (refreshError) {
      console.error('Token refresh failed:', refreshError);
      logout(); // Log out the user if token refresh fails
    }
  }, []);

  /**
   * Initialize authentication on component mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken(); // Retrieve token from localStorage
      if (token) {
        if (isTokenExpired(token)) {
          await refreshToken(); // Refresh token if expired
        } else {
          try {
            const userData = jwtDecode(token); // Decode token to extract user data
            setUser(userData); // Set user data in state
          } catch (decodeError) {
            console.error('Token decoding failed:', decodeError);
            logout(); // Log out if token decoding fails
          }
        }
      }
      setIsLoading(false); // Stop loading once authentication check is complete
    };

    initializeAuth(); // Run the authentication check on component mount
  }, [refreshToken]);

  /**
   * Log in the user and store their JWT token
   * @param {string} email - User email
   * @param {string} password - User password
   */
  const login = async (email, password) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const token = await authAPI.login(email, password); // Authenticate user and retrieve token
      setToken(token); // Store token in localStorage
      const userData = jwtDecode(token); // Decode token to get user data
      setUser(userData); // Set user data in state
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  /**
   * Sign up a new user and store their JWT token
   * @param {Object} userData - Data for new user registration
   */
  const signup = async (userData) => {
    setIsLoading(true); // Start loading
    setError(null); // Clear previous errors

    try {
      const token = await authAPI.signup(userData); // Register user and retrieve token
      setToken(token); // Store token in localStorage
      const user = jwtDecode(token); // Decode token to get user data
      setUser(user); // Set user data in state
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  /**
   * Log out the user and clear their data
   */
  const logout = () => {
    removeToken(); // Remove token from localStorage
    setUser(null); // Clear user state
    setProfile(null); // Clear profile state
    setSettings(null); // Clear settings state
  };

  /**
   * Fetch the user's profile
   */
  const fetchUserProfile = async () => {
    try {
      const token = getToken();
      const userProfile = await authAPI.getUserProfile(token); // Fetch user profile using API
      setProfile(userProfile); // Store profile in state
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err.message || 'Failed to fetch user profile.');
    }
  };

  /**
   * Update the user's profile (e.g., username, email, profile picture)
   * @param {Object} updatedData - Updated profile data
   */
  const updateProfile = async (updatedData) => {
    try {
      const token = getToken();
      const updatedProfile = await authAPI.updateUserProfile(updatedData, token); // Update user profile using API
      setProfile(updatedProfile); // Store updated profile in state
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile.');
    }
  };

  /**
   * Update the user's password
   * @param {string} currentPassword - The user's current password
   * @param {string} newPassword - The new password to set
   */
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const token = getToken();
      await authAPI.updateUserPassword(currentPassword, newPassword, token); // Update password using API
      logout(); // Automatically log out the user after a successful password update
    } catch (err) {
      console.error('Error updating password:', err);
      setError(err.message || 'Failed to update password.');
    }
  };

  // PASSWORD MANAGEMENT FUNCTIONS

  /**
   * Request a password reset
   * @param {string} email - The email of the user requesting the password reset
   */
  const requestPasswordReset = async (email) => {
    try {
      await authAPI.requestPasswordReset(email); // Request password reset
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError(err.message || 'Failed to request password reset.');
    }
  };

  /**
   * Reset the user's password using a valid reset token
   * @param {string} resetToken - The password reset token provided via email
   * @param {string} newPassword - The new password to set
   */
  const resetPassword = async (resetToken, newPassword) => {
    try {
      await authAPI.resetPassword(resetToken, newPassword); // Reset password using token
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err.message || 'Failed to reset password.');
    }
  };

  // USER SETTINGS FUNCTIONS

  /**
   * Fetch user-specific settings (e.g., notification preferences)
   */
  const fetchUserSettings = async () => {
    try {
      const token = getToken();
      const userSettings = await authAPI.fetchUserSettings(token); // Fetch user settings from API
      setSettings(userSettings); // Store user settings in state
    } catch (err) {
      console.error('Error fetching user settings:', err);
      setError(err.message || 'Failed to fetch user settings.');
    }
  };

  /**
   * Update user-specific settings (e.g., email preferences, notifications)
   * @param {Object} updatedSettings - Updated user settings
   */
  const updateUserSettings = async (updatedSettings) => {
    try {
      const token = getToken();
      const newSettings = await authAPI.updateUserSettings(updatedSettings, token); // Update user settings using API
      setSettings(newSettings); // Store updated settings in state
    } catch (err) {
      console.error('Error updating user settings:', err);
      setError(err.message || 'Failed to update user settings.');
    }
  };

  /**
   * Fetch a user by their unique ID
   * @param {string} userId - The user's unique ID
   */
  const getUserById = async (userId) => {
    try {
      const token = getToken();
      const userData = await authAPI.getUserById(userId, token); // Fetch user by ID using API
      return userData;
    } catch (err) {
      console.error('Error fetching user by ID:', err);
      setError(err.message || 'Failed to fetch user by ID.');
    }
  };

  // Provide authentication state, profile state, and functions to other components
  const contextValue = {
    user,
    profile,
    settings,
    isLoading,
    error,
    login,
    signup,
    logout,
    fetchUserProfile,
    updateProfile,
    updatePassword,
    requestPasswordReset,
    resetPassword,
    fetchUserSettings,
    updateUserSettings,
    getUserById,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children} {/* Render children components wrapped by AuthContext */}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to provide easy access to the AuthContext
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
