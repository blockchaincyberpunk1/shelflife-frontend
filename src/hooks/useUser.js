import { useContext } from 'react'; // Import useContext from React
import { UserContext } from '../context/UserContext'; // Import the UserContext for accessing UserProvider

/**
 * Custom hook to provide user profile and actions related to user management.
 * 
 * @returns {Object} The user context value (profile, updateProfile, updatePassword, etc.)
 * @throws {Error} If used outside the UserProvider.
 */
export const useUser = () => {
  // Access the UserContext, which holds the user-related data and actions
  const context = useContext(UserContext);

  // If the hook is used outside the UserProvider, throw an error to notify developers
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  // Return the context value to be accessed by components
  return context;
};