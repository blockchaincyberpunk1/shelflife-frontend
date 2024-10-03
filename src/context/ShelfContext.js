import React, { createContext, useState, useEffect } from 'react';
import { shelfAPI } from '../api/shelfAPI';
import { useAuth } from './AuthContext'; // Import the useAuth hook for user authentication

// Create the ShelfContext to manage shelf-related state and functions
const ShelfContext = createContext();

export const ShelfProvider = ({ children }) => {
  // Get the authenticated user from the AuthContext
  const { user } = useAuth(); 

  // State for storing shelves
  const [shelves, setShelves] = useState([]);
  // State for loading status (true while fetching or updating shelves)
  const [isLoading, setIsLoading] = useState(true);
  // State for storing any errors that occur during API interactions
  const [error, setError] = useState(null);

  // Fetch shelves when the component mounts or when the user logs in/out
  useEffect(() => {
    const fetchShelves = async () => {
      if (user) { // Ensure a user is logged in before fetching shelves
        try {
          const fetchedShelves = await shelfAPI.getShelvesByUserId(user._id); // API call to get user's shelves
          setShelves(fetchedShelves); // Update state with fetched shelves
        } catch (err) {
          console.error('Error fetching shelves:', err); // Log error
          setError(err.message || 'Failed to fetch shelves.'); // Set error message
        }
      }
      setIsLoading(false); // Stop loading after the fetch operation is complete
    };

    fetchShelves(); // Fetch shelves on component mount or user login
  }, [user]); // Re-run effect when the user changes (e.g., login/logout)

  // Function to create a new shelf
  const createShelf = async (shelfName) => {
    try {
      const newShelf = await shelfAPI.createShelf({ userId: user._id, name: shelfName }); // API call to create shelf
      setShelves([...shelves, newShelf]); // Add new shelf to the current list of shelves
    } catch (err) {
      console.error('Error creating shelf:', err); // Log error
      setError(err.message || 'Failed to create shelf.'); // Set error message
    }
  };

  // Function to update an existing shelf
  const updateShelf = async (shelfId, updateData) => {
    try {
      const updatedShelf = await shelfAPI.updateShelf(shelfId, user._id, updateData); // API call to update shelf
      // Update the shelf in the state
      setShelves(prevShelves => prevShelves.map(shelf => 
        shelf._id === shelfId ? updatedShelf : shelf // Replace the updated shelf
      ));
    } catch (err) {
      console.error('Error updating shelf:', err); // Log error
      setError(err.message || 'Failed to update shelf.'); // Set error message
    }
  };

  // Function to delete a shelf
  const deleteShelf = async (shelfId) => {
    try {
      await shelfAPI.deleteShelf(shelfId, user._id); // API call to delete the shelf
      // Remove the deleted shelf from the state
      setShelves(prevShelves => prevShelves.filter(shelf => shelf._id !== shelfId));
    } catch (err) {
      console.error('Error deleting shelf:', err); // Log error
      setError(err.message || 'Failed to delete shelf.'); // Set error message
    }
  };

  // Context value that provides state and functions to consuming components
  const contextValue = {
    shelves, // List of shelves
    isLoading, // Loading state
    error, // Any error that occurs
    createShelf, // Function to create a shelf
    updateShelf, // Function to update a shelf
    deleteShelf, // Function to delete a shelf
  };

  // Return the provider with the context value passed to children components
  return (
    <ShelfContext.Provider value={contextValue}>
      {children} {/* Render child components */}
    </ShelfContext.Provider>
  );
};

// Custom hook to use ShelfContext in other components
export const useShelf = () => {
  return React.useContext(ShelfContext); // Use the React hook to consume the context
};