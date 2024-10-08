import jwtDecode from 'jwt-decode'; // JavaScript library used to decode JSON Web Tokens (JWTs) without requiring them to be validated or verified. It extracts the payload of a JWT, which contains information like the token's expiration time, user roles, and other claims.
const TOKEN_KEY = 'shelflife-token'; // The key used for storing the token in localStorage
const REFRESH_TOKEN_KEY = 'shelflife-refresh-token'; // The key for storing the refresh token

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

/**
 * Store the refresh token in localStorage.
 *
 * @param {string} refreshToken - The refresh token to store.
 */
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Remove the refresh token from localStorage.
 */
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Check if the token is expired.
 *
 * @param {string} token - The JWT token to check.
 * @returns {boolean} - True if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const { exp } = jwtDecode(token); // Decode token to get expiration time
  return exp * 1000 < Date.now(); // Check if token is expired
};

/**
 * Retrieve a new token using the refresh token.
 * 
 * @returns {Promise<string|null>} - A promise that resolves to the new token or null if refresh fails.
 */
export const refreshAuthToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  try {
    const response = await fetch('/auth/refresh', { // Replace with actual refresh endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error('Failed to refresh token');

    const data = await response.json();
    const { token, refreshToken: newRefreshToken } = data;

    setToken(token); // Update stored token
    if (newRefreshToken) setRefreshToken(newRefreshToken); // Update refresh token if available

    return token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    removeToken(); // Remove tokens if refresh fails
    removeRefreshToken();
    return null;
  }
};
