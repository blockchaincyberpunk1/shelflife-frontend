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
  const [searchResults, setSearchResults] = useState([]); // State to hold search results

  /**
   * Function to fetch all books from the server.
   * If books are cached, load them from the cache to avoid redundant network requests.
   */
  const fetchBooks = useCallback(async () => {
    if (cache.has('allBooks')) {
      setBooks(cache.get('allBooks'));
      setIsLoading(false);
      return;
    }

    try {
      const fetchedBooks = await bookAPI.getAllBooks(); // Fetch books from the API
      setBooks(fetchedBooks);
      setCache(prevCache => new Map(prevCache).set('allBooks', fetchedBooks)); // Cache the fetched books
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message || 'Failed to fetch books.');
    } finally {
      setIsLoading(false);
    }
  }, [cache]);

  /**
   * Function to fetch a single book by its ID.
   * If the book is cached, load it from the cache to optimize performance.
   * @param {string} bookId - The ID of the book to fetch.
   */
  const getBookById = useCallback(async (bookId) => {
    if (cache.has(bookId)) {
      setBook(cache.get(bookId));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const fetchedBook = await bookAPI.getBookById(bookId); // Fetch the book from the API
      setBook(fetchedBook);
      setCache(prevCache => new Map(prevCache).set(bookId, fetchedBook)); // Cache the fetched book
    } catch (err) {
      console.error('Error fetching book by ID:', err);
      setError(err.message || 'Failed to fetch book details.');
    } finally {
      setIsLoading(false);
    }
  }, [cache]);

  /**
   * Function to fetch books by shelf ID.
   * If the books for the shelf are cached, load them from the cache to avoid redundant network requests.
   * @param {string} shelfId - The ID of the shelf to fetch books from.
   */
  const getBooksByShelf = useCallback(async (shelfId) => {
    if (cache.has(shelfId)) {
      setBooks(cache.get(shelfId));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const booksByShelf = await bookAPI.getBooksByShelf(shelfId); // Fetch books by shelf from the API
      setBooks(booksByShelf);
      setCache(prevCache => new Map(prevCache).set(shelfId, booksByShelf)); // Cache the books for the shelf
    } catch (err) {
      console.error('Error fetching books by shelf:', err);
      setError(err.message || `Failed to fetch books for shelf ID ${shelfId}.`);
    } finally {
      setIsLoading(false);
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
        const updatedBooks = prevBooks.map(book =>
          book.id === bookId ? { ...book, shelf: newShelfId } : book
        );
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Update cache with modified books
        return updatedBooks;
      });

      return updatedBook;
    } catch (err) {
      console.error('Error updating book shelf:', err);
      setError(err.message || 'Failed to update the book shelf.');
    }
  };

  /**
   * Function to add a new book.
   * Updates the local state and cache to include the new book.
   * @param {Object} bookData - Data of the book to be added.
   */
  const addBook = async (bookData) => {
    try {
      setIsLoading(true);
      const newBook = await bookAPI.createBook(bookData); // Add a new book via API

      setBooks(prevBooks => {
        const updatedBooks = [...prevBooks, newBook];
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the new book list
        return updatedBooks;
      });

      return newBook;
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.message || 'Failed to add the book.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function to update an existing book's details.
   * @param {string} bookId - The ID of the book to update.
   * @param {Object} bookData - The updated book data.
   */
  const updateBook = async (bookId, bookData) => {
    try {
      setIsLoading(true);
      const updatedBook = await bookAPI.updateBook(bookId, bookData); // Update the book via API

      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => (book.id === bookId ? updatedBook : book));
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the updated books
        return updatedBooks;
      });

      return updatedBook;
    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.message || 'Failed to update the book.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function to delete a book.
   * Removes the book from local state and updates the cache.
   * @param {string} bookId - The ID of the book to be deleted.
   */
  const deleteBook = async (bookId) => {
    try {
      setIsLoading(true);
      await bookAPI.deleteBook(bookId); // Delete the book via API

      setBooks(prevBooks => {
        const updatedBooks = prevBooks.filter(book => book.id !== bookId);
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the updated book list
        return updatedBooks;
      });
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err.message || 'Failed to delete the book.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function to search for books by title or author.
   * Updates search results in local state.
   * @param {string} query - The search query (e.g., part of the title or author's name).
   */
  const searchBooks = async (query) => {
    try {
      setIsLoading(true);
      const results = await bookAPI.searchBooks(query); // Search books via API
      setSearchResults(results); // Update search results in state
    } catch (err) {
      console.error('Error searching for books:', err);
      setError(err.message || `Failed to search for books with query "${query}".`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Function to add a review to a book.
   * Updates the specific book in the cache after adding the review.
   * @param {string} bookId - The ID of the book to review.
   * @param {Object} reviewData - The review data (rating and comment).
   */
  const addReview = async (bookId, reviewData) => {
    try {
      const updatedBook = await bookAPI.addReview(bookId, reviewData); // Add review via API

      setBooks(prevBooks => {
        const updatedBooks = prevBooks.map(book => (book.id === bookId ? updatedBook : book));
        setCache(prevCache => new Map(prevCache).set('allBooks', updatedBooks)); // Cache the updated books
        return updatedBooks;
      });

      return updatedBook;
    } catch (err) {
      console.error('Error adding review:', err);
      setError(err.message || 'Failed to add review.');
    }
  };

  /**
   * Memoize the context value to ensure it is only recalculated when dependencies change.
   * This optimization helps prevent unnecessary re-renders in components that consume this context.
   */
  const contextValue = useMemo(() => ({
    books,
    book,
    searchResults,
    isLoading,
    error,
    fetchBooks,
    getBookById,
    getBooksByShelf, 
    updateBookShelf,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    addReview,
  }), [books, book, searchResults, isLoading, error, fetchBooks, getBookById, getBooksByShelf]);

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
