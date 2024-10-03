import { fetcher } from '../utils/fetcher';

export const shelfAPI = {
  /**
   * Fetch all shelves for a specific user
   * Sends a GET request to retrieve all shelves associated with the provided user ID
   * @param {string} userId - The ID of the user whose shelves to fetch
   * @returns {Array} - Array of shelves for the specified user
   */
  getShelvesByUserId: async (userId) => {
    try {
      return await fetcher(`/shelves?userId=${userId}`); // Assuming the backend fetches shelves based on userId as query param
    } catch (error) {
      throw new Error(`Failed to fetch shelves for user ${userId}.`);
    }
  },

  /**
   * Fetch a specific shelf by its ID
   * Sends a GET request to retrieve the details of a specific shelf
   * @param {string} shelfId - The ID of the shelf to fetch
   * @returns {Object} - The shelf object
   */
  getShelfById: async (shelfId) => {
    try {
      return await fetcher(`/shelves/${shelfId}`); // Fetch a specific shelf by its ID
    } catch (error) {
      throw new Error(`Failed to fetch shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Create a new shelf for the user
   * Sends a POST request to create a new shelf with the provided data
   * @param {Object} shelfData - The data for the new shelf (e.g., userId, name)
   * @returns {Object} - The newly created shelf object
   */
  createShelf: async (shelfData) => {
    try {
      return await fetcher('/shelves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shelfData), // Send the new shelf data as JSON
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
   * @returns {Object} - The updated shelf object
   */
  updateShelf: async (shelfId, updateData) => {
    try {
      return await fetcher(`/shelves/${shelfId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData), // Send the updated shelf data as JSON
      });
    } catch (error) {
      throw new Error(`Failed to update shelf with ID ${shelfId}.`);
    }
  },

  /**
   * Delete a shelf
   * Sends a DELETE request to remove the shelf by its ID
   * @param {string} shelfId - The ID of the shelf to delete
   * @returns {void}
   */
  deleteShelf: async (shelfId) => {
    try {
      return await fetcher(`/shelves/${shelfId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw new Error(`Failed to delete shelf with ID ${shelfId}.`);
    }
  },
};