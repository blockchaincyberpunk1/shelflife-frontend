// Import core React libraries and utilities
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import the router for handling routes
import AppRoutes from './routes/routes'; // Import the main routes file which contains all app routes

// Import AuthProvider, BookProvider, ShelfProvider that manage authentication, books, and shelves logic
import { AuthProvider } from './context/AuthContext'; // AuthContext provider for managing user authentication
import { BookProvider } from './context/BookContext'; // BookContext provider for managing book data
import { ShelfProvider } from './context/ShelfContext'; // ShelfContext provider for managing shelf data

// Import layout components
import Header from './components/layout/Header'; // Header component displayed on all pages
import Sidebar from './components/layout/Sidebar'; // Sidebar for navigation between different shelves
import Footer from './components/layout/Footer'; // Footer component displayed at the bottom of all pages

// Import ErrorBoundary to catch and handle errors within the app
import ErrorBoundary from './components/ui/ErrorBoundary'; // ErrorBoundary to handle and display errors gracefully

// Import global styles for consistent UI styling across the app
import { Global } from '@emotion/react'; // Import Global for applying global styles
import { globalStyles } from './assets/styles/globalStyles'; // Global CSS styles applied across the app

/**
 * App Component
 * This is the root component of the application. It manages:
 * 1. The global context providers (Auth, Book, and Shelf)
 * 2. The main layout (Header, Sidebar, Footer)
 * 3. Error handling with an ErrorBoundary
 * 4. Routing using the Router and AppRoutes component
 */
const App = () => {
  return (
    // ErrorBoundary catches errors in the component tree and displays a fallback UI
    <ErrorBoundary>
      {/* AuthProvider wraps the app to provide authentication state across all components */}
      <AuthProvider>
        {/* BookProvider wraps the app to provide book-related state and functions */}
        <BookProvider>
          {/* ShelfProvider wraps the app to provide shelf-related state and functions */}
          <ShelfProvider>
            {/* Router handles the navigation and routing within the application */}
            <Router>
              {/* Apply the global CSS styles using Emotion's Global component */}
              <Global styles={globalStyles} />
              {/* Main application layout */}
              <div className="app-container">
                {/* Header component: displayed at the top of all pages */}
                <Header />
                
                <div className="main-content-wrapper">
                  {/* Sidebar component: navigation for shelves, displayed on the left side of all pages */}
                  <Sidebar />
                  
                  {/* Main content area: defined by the routes and pages */}
                  <main className="main-content">
                    <AppRoutes /> {/* AppRoutes handles the routing between different pages (e.g., HomePage, LoginPage) */}
                  </main>
                </div>
                
                {/* Footer component: displayed at the bottom of all pages */}
                <Footer />
              </div>
            </Router>
          </ShelfProvider>
        </BookProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;