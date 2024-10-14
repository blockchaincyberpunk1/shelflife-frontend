import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { shelfAPI } from '../api/shelfAPI'; // API functions for shelf operations
import { useAuth } from './AuthContext'; // Hook for accessing authenticated user data

// Create the ShelfContext to provide shelf-related data and actions to other components
const ShelfContext = createContext();

export const ShelfProvider = ({ children }) => {
  const { user } = useAuth(); // Access the authenticated user from AuthContext
  const [shelves, setShelves] = useState([]); // Holds the list of shelves
  const [isLoading, setIsLoading] = useState(true); // Manages loading state
  const [error, setError] = useState(null); // Holds any error messages from API requests
  const [cache, setCache] = useState(new Map()); // Map for caching API responses

  /**
   * Fetch shelves from the API or cache if available, ensuring we only fetch if a user is authenticated.
   * Uses the user’s ID to create a cache key specific to them.
   */
  const fetchShelves = useCallback(async () => {
    if (!user) return; // Avoid fetching if no user is authenticated

    const cacheKey = `shelves-${user._id}`;
    if (cache.has(cacheKey)) {
      setShelves(cache.get(cacheKey)); // Load shelves from cache if available
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const fetchedShelves = await shelfAPI.getShelvesByUserId(user._id); // Fetch shelves from API
      setShelves(fetchedShelves); // Update state with fetched shelves
      setCache(prevCache => new Map(prevCache).set(cacheKey, fetchedShelves)); // Cache the result
    } catch (err) {
      console.error('Error fetching shelves:', err);
      setError(err.message || 'Failed to fetch shelves.');
    } finally {
      setIsLoading(false); // Stop loading after the fetch completes
    }
  }, [user, cache]);

  // Fetch shelves whenever the component mounts or the user changes
  useEffect(() => {
    fetchShelves();
  }, [fetchShelves]);

  /**
   * Fetch a specific shelf by its ID.
   * @param {string} shelfId - The ID of the shelf to fetch.
   * @returns {Promise<Object>} - The fetched shelf object.
   */
  const getShelfById = useCallback(async (shelfId) => {
    if (!user) return;

    setError(null);
    try {
      return await shelfAPI.getShelfById(shelfId);
    } catch (err) {
      console.error('Error fetching shelf by ID:', err);
      setError(err.message || `Failed to fetch shelf with ID ${shelfId}.`);
      throw err;
    }
  }, [user]);

  /**
   * Creates a new shelf for the authenticated user.
   * Updates the shelves state and cache with the newly created shelf.
   * @param {string} shelfName - The name of the new shelf.
   */
  const createShelf = useCallback(async (shelfName) => {
    if (!user) return;

    setError(null);
    try {
      const newShelf = await shelfAPI.createShelf({ userId: user._id, name: shelfName });
      setShelves(prevShelves => {
        const updatedShelves = [...prevShelves, newShelf];
        setCache(prevCache => new Map(prevCache).set(`shelves-${user._id}`, updatedShelves));
        return updatedShelves;
      });
    } catch (err) {
      console.error('Error creating shelf:', err);
      setError(err.message || 'Failed to create shelf.');
    }
  }, [user]);

  /**
   * Updates an existing shelf by shelf ID and updates the state and cache immutably.
   * @param {string} shelfId - ID of the shelf to be updated.
   * @param {object} updateData - Data to update the shelf with.
   */
  const updateShelf = useCallback(async (shelfId, updateData) => {
    if (!user) return;

    setError(null);
    try {
      const updatedShelf = await shelfAPI.updateShelf(shelfId, updateData);
      setShelves(prevShelves => {
        const updatedShelves = prevShelves.map(shelf => 
          shelf._id === shelfId ? updatedShelf : shelf
        );
        setCache(prevCache => new Map(prevCache).set(`shelves-${user._id}`, updatedShelves));
        return updatedShelves;
      });
    } catch (err) {
      console.error('Error updating shelf:', err);
      setError(err.message || 'Failed to update shelf.');
    }
  }, [user]);

  /**
   * Deletes a shelf by ID and updates the state and cache immutably.
   * @param {string} shelfId - ID of the shelf to delete.
   */
  const deleteShelf = useCallback(async (shelfId) => {
    if (!user) return;

    setError(null);
    try {
      await shelfAPI.deleteShelf(shelfId);
      setShelves(prevShelves => {
        const updatedShelves = prevShelves.filter(shelf => shelf._id !== shelfId);
        setCache(prevCache => new Map(prevCache).set(`shelves-${user._id}`, updatedShelves));
        return updatedShelves;
      });
    } catch (err) {
      console.error('Error deleting shelf:', err);
      setError(err.message || 'Failed to delete shelf.');
    }
  }, [user]);

  /**
   * Adds a book to a specific shelf.
   * Updates the shelf's state with the new book.
   * @param {string} shelfId - ID of the shelf to add the book to.
   * @param {string} bookId - ID of the book to add.
   */
  const addBookToShelf = useCallback(async (shelfId, bookId) => {
    if (!user) return;

    setError(null);
    try {
      const updatedShelf = await shelfAPI.addBookToShelf(shelfId, bookId);
      setShelves(prevShelves => {
        const updatedShelves = prevShelves.map(shelf => 
          shelf._id === shelfId ? updatedShelf : shelf
        );
        setCache(prevCache => new Map(prevCache).set(`shelves-${user._id}`, updatedShelves));
        return updatedShelves;
      });
    } catch (err) {
      console.error('Error adding book to shelf:', err);
      setError(err.message || 'Failed to add book to shelf.');
    }
  }, [user]);

  /**
   * Removes a book from a specific shelf.
   * Updates the shelf's state without the removed book.
   * @param {string} shelfId - ID of the shelf to remove the book from.
   * @param {string} bookId - ID of the book to remove.
   */
  const removeBookFromShelf = useCallback(async (shelfId, bookId) => {
    if (!user) return;

    setError(null);
    try {
      const updatedShelf = await shelfAPI.removeBookFromShelf(shelfId, bookId);
      setShelves(prevShelves => {
        const updatedShelves = prevShelves.map(shelf => 
          shelf._id === shelfId ? updatedShelf : shelf
        );
        setCache(prevCache => new Map(prevCache).set(`shelves-${user._id}`, updatedShelves));
        return updatedShelves;
      });
    } catch (err) {
      console.error('Error removing book from shelf:', err);
      setError(err.message || 'Failed to remove book from shelf.');
    }
  }, [user]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({
    shelves,
    isLoading,
    error,
    createShelf,
    updateShelf,
    deleteShelf,
    addBookToShelf,
    removeBookFromShelf,
    getShelfById
  }), [shelves, isLoading, error, createShelf, updateShelf, deleteShelf, addBookToShelf, removeBookFromShelf, getShelfById]);

  return (
    <ShelfContext.Provider value={contextValue}>
      {children}
    </ShelfContext.Provider>
  );
};

/**
 * Custom hook for accessing ShelfContext, ensuring it is used within a ShelfProvider.
 * @returns {object} - The context value from ShelfProvider.
 * @throws {Error} - If hook is used outside ShelfProvider.
 */
export const useShelf = () => {
  const context = React.useContext(ShelfContext);
  if (!context) {
    throw new Error('useShelf must be used within a ShelfProvider');
  }
  return context;
};