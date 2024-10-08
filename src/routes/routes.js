import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import HomePage from '../pages/HomePage'; // Home page component
import LoginPage from '../pages/LoginPage'; // Login page component
import SignupPage from '../pages/SignupPage'; // Signup page component
import BookPage from '../pages/BookPage'; // Book details page component
import ShelfPage from '../pages/ShelfPage'; // Shelf details page component
import UserProfilePage from '../pages/UserProfilePage'; // User profile page component
import SearchPage from '../pages/SearchPage'; // Search page component
import CreateBookPage from '../pages/CreateBookPage'; // Page for creating a new book
import CreateShelfPage from '../pages/CreateShelfPage'; // Page for creating a new shelf
import NotFoundPage from '../pages/NotFoundPage'; // Page for handling 404 errors
import PrivateRoute from './PrivateRoute'; // Custom PrivateRoute for authenticated access

/**
 * AppRoutes component
 * Defines all routes for the application, including both public and private routes.
 * Uses `PrivateRoute` for routes that require authentication.
 */
const AppRoutes = () => (
  <Router> {/* Wraps all routes in a Router component, enabling routing in the app */}
    <Routes>
      {/* Public Routes */}
      {/* Login, Signup, and Search pages can be accessed without authentication */}
      <Route path="/login" element={<LoginPage />} /> {/* Route for login page */}
      <Route path="/signup" element={<SignupPage />} /> {/* Route for signup page */}
      <Route path="/search" element={<SearchPage />} /> {/* Route for search page */}

      {/* Private Routes */}
      {/* These routes are protected and only accessible to authenticated users */}
      
      {/* Home page route - accessible only after authentication */}
      <Route path="/" element={<PrivateRoute element={<HomePage />} />} />

      {/* User profile route - displays user-specific data */}
      <Route path="/profile" element={<PrivateRoute element={<UserProfilePage />} />} />

      {/* Route for creating a new book */}
      <Route path="/books/create" element={<PrivateRoute element={<CreateBookPage />} />} />

      {/* Route for displaying individual book details */}
      <Route path="/books/:bookId" element={<PrivateRoute element={<BookPage />} />} />

      {/* Route for creating a new shelf */}
      <Route path="/shelves/create" element={<PrivateRoute element={<CreateShelfPage />} />} />

      {/* Route for displaying details of a specific shelf */}
      <Route path="/shelf/:shelfId" element={<PrivateRoute element={<ShelfPage />} />} />

      {/* 404 Route - catches all undefined routes and shows the NotFoundPage */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);

export default AppRoutes;