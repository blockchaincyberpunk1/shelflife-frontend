import React, { createContext, useState, useEffect } from 'react';
import { bookAPI } from '../api/bookAPI'; // Import API functions for book-related operations

// Create the BookContext to manage the state and functions related to books
const BookContext = createContext();

// BookProvider component to wrap around the application or specific components
export const BookProvider = ({ children }) => {
  // State for storing books
  const [books, setBooks] = useState([]);
  // State for loading status while fetching books or performing actions
  const [isLoading, setIsLoading] = useState(true);
  // State for storing any errors that occur during API interactions
  const [error, setError] = useState(null);

  // Fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await bookAPI.getAllBooks(); // API call to get all books
        setBooks(fetchedBooks); // Update the state with fetched books
      } catch (err) {
        console.error('Error fetching books:', err); // Log errors
        setError(err.message || 'Failed to fetch books.'); // Set error state
      } finally {
        setIsLoading(false); // Stop loading once the data is fetched (or on failure)
      }
    };

    fetchBooks(); // Call the function to fetch books on component mount
  }, []);

  // Function to update a book's shelf
  const updateBookShelf = async (bookId, newShelfId) => {
    try {
      // 1. Update the book's shelf on the backend via API call
      const updatedBook = await bookAPI.updateBookShelf(bookId, newShelfId);

      // 2. Optimistically update the state to reflect the new shelf assignment
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, shelf: newShelfId } : book // Only update the book that matches the ID
        )
      );

      return updatedBook; // Return the updated book for potential use
    } catch (err) {
      console.error('Error updating book shelf:', err); // Log errors
      setError(err.message || 'Failed to update the book shelf.'); // Set error state
      // Optionally, revert optimistic update here if necessary
    }
  };

  // Function to add a new book
  const addBook = async (bookData) => {
    try {
      setIsLoading(true); // Start loading while adding the book
      const newBook = await bookAPI.addBook(bookData); // API call to add the book
      setBooks(prevBooks => [...prevBooks, newBook]); // Add new book to the existing books state
      return newBook; // Return the added book for further usage
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.message || 'Failed to add the book.');
    } finally {
      setIsLoading(false); // Stop loading after the book is added (or on failure)
    }
  };

  // Function to delete a book
  const deleteBook = async (bookId) => {
    try {
      setIsLoading(true); // Start loading while deleting the book
      await bookAPI.deleteBook(bookId); // API call to delete the book
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)); // Remove the book from state
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err.message || 'Failed to delete the book.');
    } finally {
      setIsLoading(false); // Stop loading after the book is deleted (or on failure)
    }
  };

  // Context value that provides state and functions to the consuming components
  const contextValue = {
    books, // The list of books
    isLoading, // Loading state
    error, // Any error that occurs during API calls
    updateBookShelf, // Function to update a book's shelf
    addBook, // Function to add a new book
    deleteBook, // Function to delete a book
  };

  return (
    <BookContext.Provider value={contextValue}>
      {children} {/* Render child components (e.g., the whole app or part of it) */}
    </BookContext.Provider>
  );
};

// Custom hook to use BookContext in other components
export const useBook = () => {
  return React.useContext(BookContext); // Use the React hook to consume the context
};