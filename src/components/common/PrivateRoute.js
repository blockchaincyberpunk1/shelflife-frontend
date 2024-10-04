import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; // Import navigation helpers from react-router-dom
import { useAuth } from '../../context/AuthContext'; // Import authentication context to check user state
import Spinner from '../layout/Spinner'; // Import a loading spinner from your layout components

/**
 * PrivateRoute Component
 * This component is used to protect certain routes that require the user to be authenticated.
 * If the user is not authenticated, it redirects to the login page.
 * If the user is authenticated, it renders the desired component (children).
 * @param {ReactNode} children - The child components that should be rendered if the user is authenticated.
 */
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth(); // Get user and loading status from the authentication context
  const location = useLocation(); // Get the current location to pass it along for redirection after login

  // While the authentication status is still loading (e.g., checking JWT), show the loading spinner
  if (isLoading) {
    return <Spinner message="Checking authentication..." />; // Customize the loading message
  }

  // If the user is authenticated, allow access to the protected route by rendering the children
  if (user) {
    return children;
  }

  // If the user is not authenticated, redirect to the login page
  // `state={{ from: location }}` allows the app to remember the last page the user tried to visit
  // and redirect them back to that page after successful login.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
