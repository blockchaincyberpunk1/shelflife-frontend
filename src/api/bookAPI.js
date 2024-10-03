import { fetcher } from '../utils/fetcher';

export const bookAPI = {
  /**
   * Fetch all books
   * Sends a GET request to retrieve all books
   * @returns {Array} - Array of books
   */
  getAllBooks: async () => {
    try {
      return await fetcher('/books'); // Assuming this is the endpoint to get all books
    } catch (error) {
      throw new Error('Failed to fetch books.');
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
      return await fetcher(`/books/shelf/${shelfId}`); // Assuming this is the endpoint to get books by shelf
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
      return await fetcher(`/books/${bookId}`, {
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
   * @param {Object} bookData - The data of the book to create (e.g., title, authors, shelf, etc.)
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
   * Search for books
   * Sends a GET request to search books by title or author
   * @param {string} query - The search query (e.g., part of the title or author's name)
   * @returns {Array} - Array of books matching the search query
   */
  searchBooks: async (query) => {
    try {
      return await fetcher(`/books/search?q=${query}`); // Assuming this is the endpoint for book search
    } catch (error) {
      throw new Error(`Failed to search for books with query "${query}".`);
    }
  },
};