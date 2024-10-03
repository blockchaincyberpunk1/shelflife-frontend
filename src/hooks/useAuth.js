import { useContext } from 'react';  // Import the useContext hook from React
import { AuthContext } from '../context/AuthContext';  // Import the AuthContext for accessing the AuthProvider

/**
 * Custom hook to provide authentication-related state and actions.
 * 
 * @returns {Object} The authentication context value (user, login, logout, etc.)
 * @throws {Error} If used outside the AuthProvider.
 */
export const useAuth = () => {
  // Access the AuthContext, which holds the user, login, logout, and other authentication-related values.
  const context = useContext(AuthContext);

  // If the hook is used outside the AuthProvider, throw an error to alert the developer.
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  // Return the context value so it can be accessed by components.
  return context;
};