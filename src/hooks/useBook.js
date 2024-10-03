import { useContext } from 'react';  // Import the useContext hook from React
import { BookContext } from '../context/BookContext';  // Import the BookContext for accessing the BookProvider

/**
 * Custom hook to provide book-related state and actions.
 * 
 * @returns {Object} The book context value (books, updateBookShelf, etc.)
 * @throws {Error} If used outside the BookProvider.
 */
export const useBook = () => {
  // Access the BookContext, which holds the books and book-related actions.
  const context = useContext(BookContext);

  // If the hook is used outside the BookProvider, throw an error to alert the developer.
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }

  // Return the context value so it can be accessed by components.
  return context;
};