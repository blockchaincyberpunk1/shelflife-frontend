const TOKEN_KEY = 'shelflife-token'; // The key used for storing the token in localStorage

/**
 * Retrieve the JWT token from localStorage.
 * 
 * @returns {string|null} - The JWT token, or null if no token is found.
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY); // Get the token from localStorage
};

/**
 * Store the JWT token in localStorage.
 *
 * @param {string} token - The JWT token to store.
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token); // Set the token in localStorage
};

/**
 * Remove the JWT token from localStorage.
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY); // Remove the token from localStorage
};