/**
 * BookList Component
 * Purpose: Displays a list of books, typically used to show books from a shelf or search results.
 * Context Functions Used:
 * - fetchBooks: To retrieve all books.
 * - getBooksByShelf: To retrieve books filtered by shelf.
 * - searchBooks: If the list displays search results.
 * - deleteBook: If the component allows deleting books from the list.
 * Props:
 * - books: Array of books to be displayed in the list.
 * - shelfId: (optional) Shelf ID to fetch books filtered by shelf.
 * - searchQuery: (optional) Query to search for books by title or author.
 * - onDeleteBook: (optional) Function to delete a book from the list.
 * Additional Functionality:
 * - Pagination, lazy loading, or infinite scrolling for large lists.
 * - Filtering and sorting options based on title, author, or rating.
 */

import React, { useEffect, useState, useMemo } from 'react';
import styled from '@emotion/styled'; // For styling components using Emotion
import { Empty, Pagination, Button } from 'antd'; // Ant Design components for UI elements
import LazyLoad from 'react-lazyload'; // Lazy loading for performance optimization
import { useSpring, animated } from 'react-spring'; // Animation library for smooth transitions
import { useBook } from '../../hooks/useBook'; // Custom hook to interact with book context
import Book from './Book'; // Import the Book component to display individual books
import { useTranslation } from 'react-i18next'; // i18n for internationalization support

// Styled container for the list of books using CSS Grid for responsiveness
const BookListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Animated list item component using react-spring for smooth transitions
const AnimatedListItem = styled(animated.li)`
  display: block;
`;

/**
 * BookList Component
 * Renders a list of books with lazy loading, pagination, and animations.
 * Handles empty states, shelf filtering, and search results.
 *
 * @param {Array} books - Array of book objects to be displayed.
 * @param {String} shelfId - (Optional) Shelf ID to filter books by shelf.
 * @param {String} searchQuery - (Optional) Search query for books by title or author.
 * @param {Function} onDeleteBook - (Optional) Function to handle book deletion.
 * @returns {JSX.Element} - Returns a list of books or an empty state if no books are available.
 */
const BookList = ({ books, shelfId, searchQuery, onDeleteBook }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to manage pagination
  const [booksPerPage] = useState(10); // Books to display per page
  const [hasLoaded, setHasLoaded] = useState(false); // Track if lazy-loaded books are fully loaded
  const { t } = useTranslation(); // Translation hook for i18n support
  const { fetchBooks, getBooksByShelf, searchBooks, deleteBook } = useBook(); // Extract book-related actions from context

  useEffect(() => {
    // Fetch books based on the shelfId or searchQuery
    if (shelfId) {
      getBooksByShelf(shelfId);
    } else if (searchQuery) {
      searchBooks(searchQuery);
    } else {
      fetchBooks();
    }
  }, [fetchBooks, getBooksByShelf, searchBooks, shelfId, searchQuery]);

  // Memoize the filtered list of books to avoid unnecessary re-renders
  const filteredBooks = useMemo(() => books, [books]);

  // Pagination logic to get books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Define animation props for smooth book rendering
  const animationProps = useSpring({
    opacity: hasLoaded ? 1 : 0,
    transform: hasLoaded ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 250, friction: 30 },
  });

  // Handle lazy loading completion for animations
  const handleLazyLoad = () => {
    setHasLoaded(true);
  };

  // Handle page change in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle delete action (this uses the deleteBook function)
  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId); // Delete the book via the context function
      if (onDeleteBook) {
        onDeleteBook(bookId); // Call any parent-provided delete handler
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <>
      {currentBooks.length > 0 ? (
        <BookListContainer>
          {currentBooks.map((book) => (
            <LazyLoad
              key={book.id} // Ensure unique key for each book item
              height={200} // Placeholder height for lazy loading
              offset={100} // Preload when 100px before viewport
              once // Load each book only once
              placeholder={<div>{t('bookList.loading')}</div>} // Display loading message during lazy loading
              onContentVisible={handleLazyLoad} // Trigger animation when content is visible
            >
              <AnimatedListItem style={animationProps}>
                <Book book={book} />
                {/* If onDeleteBook is passed, display delete button */}
                {onDeleteBook && (
                  <Button
                    danger
                    onClick={() => handleDelete(book.id)} // Use handleDelete function
                    style={{ marginTop: '10px' }} // Add spacing
                  >
                    {t('bookList.deleteBook')}
                  </Button>
                )}
              </AnimatedListItem>
            </LazyLoad>
          ))}
        </BookListContainer>
      ) : (
        // If no books are available, show an empty state with a localized message
        <Empty description={t('bookList.empty')} />
      )}
      {/* Pagination component to navigate between pages */}
      {filteredBooks.length > booksPerPage && (
        <Pagination
          current={currentPage}
          pageSize={booksPerPage}
          total={filteredBooks.length}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }} // Add spacing and center alignment
        />
      )}
    </>
  );
};

export default React.memo(BookList); // Memoize the component to prevent unnecessary re-renders
