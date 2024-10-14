import { fetcher } from '../utils/fetcher';

export const shelfAPI = {
  /**
   * Fetch all shelves for the authenticated user
   * Sends a GET request to retrieve all shelves associated with the authenticated user
   * @returns {Promise<Array>} - Array of shelf objects
   */
  getAllShelves: async () => {
    try {
      // Fetch all shelves for the authenticated user
      return await fetcher('/shelves');
    } catch (error) {
      throw new Error('Failed to fetch shelves for the user.');
    }
  },

  /**
   * Fetch a specific shelf by its ID
   * Sends a GET request to retrieve the details of a specific shelf
   * @param {string} shelfId - The ID of the shelf to fetch
   * @returns {Promise<Object>} - The shelf object
   */
  getShelfById: async (shelfId) => {
    try {
      // Ensure the shelf ID is provided
      if (!shelfId) {
        throw new Error('Shelf ID is required to fetch shelf details.');
      }
      return await fetcher(`/shelves/${shelfId}`);
    } catch (error) {
      throw new Error(`Failed to fetch shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Create a new shelf for the authenticated user
   * Sends a POST request to create a new shelf with the provided data
   * @param {Object} shelfData - The data for the new shelf (e.g., name, books)
   * @returns {Promise<Object>} - The newly created shelf object
   */
  createShelf: async (shelfData) => {
    try {
      // Validate shelf data before making the request
      if (!shelfData || !shelfData.name) {
        throw new Error('Shelf data must include a name.');
      }
      return await fetcher('/shelves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shelfData),
      });
    } catch (error) {
      throw new Error('Failed to create shelf.');
    }
  },

  /**
   * Update an existing shelf
   * Sends a PUT request to update the shelf with the provided data
   * @param {string} shelfId - The ID of the shelf to update
   * @param {Object} updateData - The data to update the shelf with (e.g., name, books)
   * @returns {Promise<Object>} - The updated shelf object
   */
  updateShelf: async (shelfId, updateData) => {
    try {
      // Ensure the shelf ID and update data are provided
      if (!shelfId) {
        throw new Error('Shelf ID is required to update the shelf.');
      }
      if (!updateData) {
        throw new Error('Update data is required to update the shelf.');
      }
      return await fetcher(`/shelves/${shelfId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    } catch (error) {
      throw new Error(`Failed to update shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Delete a shelf
   * Sends a DELETE request to remove the shelf by its ID
   * @param {string} shelfId - The ID of the shelf to delete
   * @returns {Promise<void>} - Resolves when the shelf is successfully deleted
   */
  deleteShelf: async (shelfId) => {
    try {
      // Ensure the shelf ID is provided
      if (!shelfId) {
        throw new Error('Shelf ID is required to delete the shelf.');
      }
      await fetcher(`/shelves/${shelfId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`Failed to delete shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Add a book to a shelf
   * Sends a POST request to add a book to a specific shelf
   * @param {string} shelfId - The ID of the shelf to add the book to
   * @param {string} bookId - The ID of the book to add
   * @returns {Promise<Object>} - The updated shelf object
   */
  addBookToShelf: async (shelfId, bookId) => {
    try {
      // Ensure the shelf ID and book ID are provided
      if (!shelfId || !bookId) {
        throw new Error('Shelf ID and Book ID are required to add a book to the shelf.');
      }
      return await fetcher(`/shelves/${shelfId}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });
    } catch (error) {
      throw new Error(`Failed to add book with ID ${bookId} to shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Remove a book from a shelf
   * Sends a DELETE request to remove a book from a specific shelf
   * @param {string} shelfId - The ID of the shelf to remove the book from
   * @param {string} bookId - The ID of the book to remove
   * @returns {Promise<Object>} - The updated shelf object
   */
  removeBookFromShelf: async (shelfId, bookId) => {
    try {
      // Ensure the shelf ID and book ID are provided
      if (!shelfId || !bookId) {
        throw new Error('Shelf ID and Book ID are required to remove a book from the shelf.');
      }
      return await fetcher(`/shelves/${shelfId}/books`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });
    } catch (error) {
      throw new Error(`Failed to remove book with ID ${bookId} from shelf with ID ${shelfId}.`);
    }
  },
};