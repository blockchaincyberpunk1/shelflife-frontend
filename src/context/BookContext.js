import React, { createContext, useState, useCallback, useMemo } from 'react';
import { bookAPI } from '../api/bookAPI'; // API functions for interacting with book data

// Create the BookContext to manage the state and functions related to books
const BookContext = createContext();

// BookProvider component to wrap around the application or specific components
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]); // State to hold the list of books
  const [book, setBook] = useState(null); // State to hold details of a single book
  const [isLoading, setIsLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to hold error messages related to API calls
  const [cache, setCache] = useState(new Map()); // State to cache fetched books for optimized loading

  /**
   * Function to fetch all books from the server.
   * If books are cached, load them from the cache to avoid redundant network requests.
   */
  const fetchBooks = useCallback(async () => {
    if (cache.has('allBooks')) {
      // If books are cached, load them directly from the cache
      setBooks(cache.get('allBooks'));
      setIsLoading(false);
      return;
    }

    try {
      const fetchedBooks = await bookAPI.getAllBooks(); // Fetch books from the API
      setBooks(fetchedBooks); // Store fetched books in state
      setCache(prevCache => new Map(prevCache).set('allBooks', fetchedBooks)); // Cache the fetched books
    } catch (err) {
      console.error('Error fetching books:', err); // Log the error
      setError(err.message || 'Failed to fetch books.'); // Set error state
    } finally {
      setIsLoading(false); // End loading state
    }
  }, [cache]);

  /**
   * Function to fetch a single book by its ID.
   * If the book is cached, load it from the cache to optimize performance.
   * @param {string} bookId - The ID of the book to fetch.
   */
  const getBookById = useCallback(async (bookId) => {
    if (cache.has(bookId)) {
      // If the book is cached, load it directly from the cache
      setBook(cache.get(bookId));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const fetchedBook = await bookAPI.getBookById(bookId); // Fetch the book from the API
      setBook(fetchedBook); // Store the fetched book in state
      setCache(prevCache => new Map(prevCache).set(bookId, fetchedBook)); // Cache the fetched book
    } catch (err) {
      console.error('Error fetching book by ID:', err); // Log the error
      setError(err.message || 'Failed to fetch book details.'); // Set error state
    } finally {
      setIsLoading(false); // End loading state
    }
  }, [cache]);

  /**
   * Function to update a book's shelf.
   * Optimistically updates local state and cache to reflect changes.
   * @param {string} bookId - The ID of the book to update.
   * @param {string} newShelfId - The ID of the new shelf for the book.
   */
  const updateBookShelf = async (bookId, newShelfId) => {
    try {
      const updatedBook = await bookAPI.updateBookShelf(bookId, newShelfId); // Update the book's shelf via API

      setBooks(prevBooks => {
        // Update book list immutably: replace the specific book with an updated one
        const updatedBooks = prevBooks.map(book =>
          book.id === bookId ? { ...book, shelf: newShelfId } : book
        );
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Update cache with modified books
        return updatedBooks;
      });

      return updatedBook; // Return the updated book for further use
    } catch (err) {
      console.error('Error updating book shelf:', err); // Log the error
      setError(err.message || 'Failed to update the book shelf.'); // Set error state
    }
  };

  /**
   * Function to add a new book.
   * Updates the local state and cache to include the new book.
   * @param {Object} bookData - Data of the book to be added.
   */
  const addBook = async (bookData) => {
    try {
      setIsLoading(true); // Start loading
      const newBook = await bookAPI.addBook(bookData); // Add a new book via API

      setBooks(prevBooks => {
        // Add the new book to the current list of books
        const updatedBooks = [...prevBooks, newBook];
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the new book list
        return updatedBooks;
      });

      return newBook; // Return the added book for further use
    } catch (err) {
      console.error('Error adding book:', err); // Log the error
      setError(err.message || 'Failed to add the book.'); // Set error state
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  /**
   * Function to update an existing book's details.
   * @param {string} bookId - The ID of the book to update.
   * @param {Object} bookData - The updated book data.
   */
  const updateBook = async (bookId, bookData) => {
    try {
      setIsLoading(true); // Start loading
      const updatedBook = await bookAPI.updateBook(bookId, bookData); // Update the book via API

      setBooks(prevBooks => {
        // Replace the updated book in the current list
        const updatedBooks = prevBooks.map(book => (book.id === bookId ? updatedBook : book));
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the updated books
        return updatedBooks;
      });

      return updatedBook; // Return the updated book for further use
    } catch (err) {
      console.error('Error updating book:', err); // Log the error
      setError(err.message || 'Failed to update the book.'); // Set error state
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  /**
   * Function to delete a book.
   * Removes the book from local state and updates the cache.
   * @param {string} bookId - The ID of the book to be deleted.
   */
  const deleteBook = async (bookId) => {
    try {
      setIsLoading(true); // Start loading
      await bookAPI.deleteBook(bookId); // Delete the book via API

      setBooks(prevBooks => {
        // Remove the deleted book from the book list
        const updatedBooks = prevBooks.filter(book => book.id !== bookId);
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the updated book list
        return updatedBooks;
      });
    } catch (err) {
      console.error('Error deleting book:', err); // Log the error
      setError(err.message || 'Failed to delete the book.'); // Set error state
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  /**
   * Memoize the context value to ensure it is only recalculated when dependencies change.
   * This optimization helps prevent unnecessary re-renders in components that consume this context.
   */
  const contextValue = useMemo(() => ({
    books,
    book,
    isLoading,
    error,
    fetchBooks,
    getBookById,
    updateBookShelf,
    addBook,
    updateBook,
    deleteBook,
  }), [books, book, isLoading, error, fetchBooks, getBookById]);

  return (
    <BookContext.Provider value={contextValue}>
      {children} {/* Render the children components wrapped by the provider */}
    </BookContext.Provider>
  );
};

/**
 * Custom hook to provide easy access to the BookContext.
 * @returns {Object} - Book context value (state and functions).
 * @throws {Error} - If hook is used outside BookProvider.
 */
export const useBook = () => {
  const context = React.useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
