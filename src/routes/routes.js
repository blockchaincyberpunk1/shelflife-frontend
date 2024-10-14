/**
 * routes.js
 *
 * Defines all routes for the ShelfLife application, including both public and private routes.
 * Integrates `PrivateRoute` for routes that require user authentication.
 * Uses `react-router-dom` for route handling and navigation, with Ant Design for consistent styling.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage'; // Home page component where the user's shelves and books are displayed
import LoginPage from '../pages/LoginPage'; // Login page for user authentication
import SignupPage from '../pages/SignupPage'; // Signup page for user registration
import BookPage from '../pages/BookPage'; // Page for viewing details about a specific book
import ShelfPage from '../pages/ShelfPage'; // Page for viewing and managing a specific shelf and its books
import UserProfilePage from '../pages/UserProfilePage'; // Page for viewing and editing the user's profile
import SearchPage from '../pages/SearchPage'; // Page for searching books across the app
import BookFormPage from '../pages/BookFormPage'; // Page for creating or editing a book
import ShelfFormPage from '../pages/ShelfFormPage'; // Page for creating or editing a shelf
import NotFoundPage from '../pages/NotFoundPage'; // Page for displaying a 404 error when a route is not found
import PasswordResetPage from '../pages/PasswordResetPage'; // Page for requesting a password reset
import PrivateRoute from './PrivateRoute'; // Custom PrivateRoute component for authenticated access

/**
 * AppRoutes Component
 *
 * This component defines all routes used in the ShelfLife application.
 * It uses React Router's `<Routes>` and `<Route>` components to define paths and the associated components.
 * Routes that require authentication are wrapped using the `<PrivateRoute>` component.
 * The `PrivateRoute` ensures users are authenticated before accessing certain pages.
 */
const AppRoutes = () => (
  <Router> {/* Wraps the entire application to enable client-side routing */}
    <Routes>
      {/* Public Routes */}
      {/* Accessible to all users, including those not logged in */}
      <Route path="/login" element={<LoginPage />} /> {/* Login page for authentication */}
      <Route path="/signup" element={<SignupPage />} /> {/* Signup page for creating an account */}
      <Route path="/search" element={<SearchPage />} /> {/* Search page to find books */}
      <Route path="/password-reset" element={<PasswordResetPage />} /> {/* Password reset request page */}

      {/* Private Routes */}
      {/* Accessible only after authentication. Wrapped with `PrivateRoute` for secure access */}
      <Route path="/" element={<PrivateRoute element={<HomePage />} />} /> {/* Main homepage */}
      <Route path="/profile" element={<PrivateRoute element={<UserProfilePage />} />} /> {/* User profile page */}
      <Route path="/books/create" element={<PrivateRoute element={<BookFormPage />} />} /> {/* Create a new book */}
      <Route path="/books/:bookId" element={<PrivateRoute element={<BookPage />} />} /> {/* Book details */}
      <Route path="/books/edit/:bookId" element={<PrivateRoute element={<BookFormPage />} />} /> {/* Edit an existing book */}
      <Route path="/shelves/create" element={<PrivateRoute element={<ShelfFormPage />} />} /> {/* Create a new shelf */}
      <Route path="/shelf/:shelfId" element={<PrivateRoute element={<ShelfPage />} />} /> {/* Shelf details */}
      <Route path="/shelves/edit/:shelfId" element={<PrivateRoute element={<ShelfFormPage />} />} /> {/* Edit an existing shelf */}

      {/* Catch-all Route for 404 Page Not Found */}
      <Route path="*" element={<NotFoundPage />} /> {/* Any undefined routes will display the NotFoundPage */}
    </Routes>
  </Router>
);

export default AppRoutes; // Export the AppRoutes component to be used in the main application entry point