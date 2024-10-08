import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Import navigation helpers from react-router-dom
import { useAuth } from '../hooks/useAuth'; // Use the authentication hook to get user state and loading status
import Spinner from '../components/ui/Spinner'; // Import a loading spinner component from your UI components

/**
 * PrivateRoute Component
 * Protects routes that require user authentication.
 * If the user is authenticated, renders the child components (i.e., the protected page).
 * If not, it redirects the user to the login page.
 * 
 * @param {ReactNode} element - The component to render if the user is authenticated.
 * @returns {JSX.Element} - The rendered component or a redirection to the login page.
 */
const PrivateRoute = ({ element }) => {
  const { user, isLoading } = useAuth(); // Extract the user and loading status from the authentication context
  const location = useLocation(); // Capture the current location to redirect the user after successful login

  // Display a spinner while checking the authentication status
  if (isLoading) {
    return <Spinner message="Checking authentication..." />; // Render a spinner with a customizable message
  }

  // If the user is authenticated, allow access to the protected route by rendering the provided element
  if (user) {
    return element;
  }

  // If the user is not authenticated, redirect to the login page
  // `state={{ from: location }}` saves the user's current location so they can be redirected back after login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
