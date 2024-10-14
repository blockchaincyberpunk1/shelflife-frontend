import { fetcher } from '../utils/fetcher';

export const bookAPI = {
  /**
   * Fetch all books
   * Sends a GET request to retrieve all books
   * @returns {Array} - Array of books
   */
  getAllBooks: async () => {
    try {
      return await fetcher('/books', { method: 'GET' });
    } catch (error) {
      throw new Error('Failed to fetch books.');
    }
  },

  /**
   * Fetch a book by its ID
   * Sends a GET request to retrieve a book by its ID
   * @param {string} bookId - The ID of the book to fetch
   * @returns {Object} - The retrieved book object
   */
  getBookById: async (bookId) => {
    try {
      return await fetcher(`/books/${bookId}`, { method: 'GET' });
    } catch (error) {
      throw new Error(`Failed to fetch book with ID ${bookId}.`);
    }
  },

  /**
   * Fetch books by shelf
   * Sends a GET request to retrieve books associated with a specific shelf
   * @param {string} shelfId - The ID of the shelf
   * @returns {Array} - Array of books for the specified shelf
   */
  getBooksByShelf: async (shelfId) => {
    try {
      return await fetcher(`/books/shelf/${shelfId}`, { method: 'GET' });
    } catch (error) {
      throw new Error(`Failed to fetch books for shelf ${shelfId}.`);
    }
  },

  /**
   * Update a book's shelf
   * Sends a PUT request to update the shelf associated with a book
   * @param {string} bookId - The ID of the book to update
   * @param {string} newShelfId - The ID of the new shelf to assign the book to
   * @returns {Object} - The updated book object
   */
  updateBookShelf: async (bookId, newShelfId) => {
    try {
      return await fetcher(`/books/${bookId}/shelf`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shelf: newShelfId }), // Include the new shelf ID in the request body
      });
    } catch (error) {
      throw new Error('Failed to update the book shelf.');
    }
  },

  /**
   * Create a new book
   * Sends a POST request to add a new book
   * @param {Object} bookData - The data of the book to create (e.g., title, authors, etc.)
   * @returns {Object} - The newly created book object
   */
  createBook: async (bookData) => {
    try {
      return await fetcher('/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData), // Include the book data in the request body
      });
    } catch (error) {
      throw new Error('Failed to create the book.');
    }
  },

  /**
   * Update a book's details
   * Sends a PUT request to update a book's details
   * @param {string} bookId - The ID of the book to update
   * @param {Object} updatedData - The updated data of the book (e.g., title, authors, etc.)
   * @returns {Object} - The updated book object
   */
  updateBook: async (bookId, updatedData) => {
    try {
      return await fetcher(`/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Include the updated book data in the request body
      });
    } catch (error) {
      throw new Error(`Failed to update book with ID ${bookId}.`);
    }
  },

  /**
   * Delete a book
   * Sends a DELETE request to delete a book by its ID
   * @param {string} bookId - The ID of the book to delete
   * @returns {Object} - The deleted book object
   */
  deleteBook: async (bookId) => {
    try {
      return await fetcher(`/books/${bookId}`, { method: 'DELETE' });
    } catch (error) {
      throw new Error(`Failed to delete book with ID ${bookId}.`);
    }
  },

  /**
   * Search for books
   * Sends a GET request to search books by title or author
   * @param {string} query - The search query (e.g., part of the title or author's name)
   * @returns {Array} - Array of books matching the search query
   */
  searchBooks: async (query) => {
    try {
      return await fetcher(`/books/search?q=${query}`, { method: 'GET' });
    } catch (error) {
      throw new Error(`Failed to search for books with query "${query}".`);
    }
  },

  /**
   * Add a review to a book
   * Sends a POST request to add a review to a book
   * @param {string} bookId - The ID of the book to review
   * @param {Object} reviewData - The review data (rating and comment)
   * @returns {Object} - The updated book object with the review
   */
  addReview: async (bookId, reviewData) => {
    try {
      return await fetcher(`/books/${bookId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData), // Include the review data in the request body
      });
    } catch (error) {
      throw new Error('Failed to add review to the book.');
    }
  },
};
