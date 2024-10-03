import React, { createContext, useState, useEffect } from 'react';
import { userAPI } from '../api/userAPI'; // Import the user-related API calls
import { useAuth } from './AuthContext'; // Import AuthContext to use authentication

// Create the UserContext to manage user profile and password update state
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, logout } = useAuth(); // Get the authenticated user and logout function from AuthContext
  const [profile, setProfile] = useState(null); // State to store the user's profile
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch the user's profile data when the component mounts or the user changes (login/logout)
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) { // Only attempt to fetch the profile if the user is logged in
        try {
          const fetchedProfile = await userAPI.getUserProfile(); // API call to get the user's profile
          setProfile(fetchedProfile); // Store the fetched profile in state
        } catch (err) {
          console.error('Error fetching user profile:', err); // Log error for debugging
          setError(err.message || 'Failed to fetch user profile.'); // Update error state
        }
      }
      setIsLoading(false); // Stop loading once the data is fetched or when there's no user
    };

    fetchUserProfile(); // Fetch profile on mount or when the user state changes
  }, [user]); // Dependency on the `user` state to refetch profile on login/logout

  // Function to update the user's profile (e.g., username, email, profile picture)
  const updateProfile = async (updatedData) => {
    try {
      const updatedProfile = await userAPI.updateUserProfile(updatedData); // API call to update user profile
      setProfile(updatedProfile); // Update the profile in the state after a successful response
    } catch (err) {
      console.error('Error updating profile:', err); // Log error for debugging
      setError(err.message || 'Failed to update profile.'); // Update error state
    }
  };

  // Function to update the user's password
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await userAPI.updatePassword(currentPassword, newPassword); // API call to update user password
      logout(); // Automatically log out the user after a successful password update
    } catch (err) {
      console.error('Error updating password:', err); // Log error for debugging
      setError(err.message || 'Failed to update password.'); // Update error state
    }
  };

  // Value passed to the context, providing state and functions for managing user profile and password
  const contextValue = {
    profile, // The user's profile data
    isLoading, // Loading status
    error, // Error state
    updateProfile, // Function to update profile
    updatePassword, // Function to update password
  };

  // Render the provider with the value and pass it down to all child components
  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext in other components
export const useUser = () => {
  return React.useContext(UserContext); // Use the React hook to consume the context
};