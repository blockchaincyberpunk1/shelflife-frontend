import { useContext } from 'react';  // Import the useContext hook from React
import { ShelfContext } from '../context/ShelfContext';  // Import the ShelfContext for accessing the ShelfProvider

/**
 * Custom hook to provide shelf-related state and actions.
 * 
 * @returns {Object} The shelf context value (shelves, createShelf, updateShelf, etc.)
 * @throws {Error} If used outside the ShelfProvider.
 */
export const useShelf = () => {
  // Access the ShelfContext, which holds the shelves and shelf-related actions.
  const context = useContext(ShelfContext);

  // If the hook is used outside the ShelfProvider, throw an error to alert the developer.
  if (!context) {
    throw new Error('useShelf must be used within a ShelfProvider');
  }

  // Return the context value so it can be accessed by components.
  return context;
};