/**
 * BookList.js
 * This component renders a list of books by mapping over the `books` array and passing
 * each book to the `Book` component. It integrates lazy loading with animations using 
 * `react-lazyload` and `react-spring` for smooth transitions when components are fully loaded.
 * Memoization techniques (React.memo, useMemo) are used to optimize performance and avoid unnecessary re-renders.
 */

import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled'; // Emotion's styled component for reusable styles
import { Empty } from 'antd'; // Ant Design component for displaying an empty state
import LazyLoad from 'react-lazyload'; // Lazy loading component for better performance
import { useSpring, animated } from 'react-spring'; // For animations
import Book from './Book'; // Import the Book component
import { useTranslation } from 'react-i18next'; // For i18n support (translations)

// Styled UL element for the list of books using Emotion
const BookListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

// Animated List Item component for individual books using react-spring
const AnimatedListItem = styled(animated.li)`
  display: block;
`;

/**
 * BookList Component
 * Renders a list of books with lazy loading and animations. Handles empty states and updates book shelves.
 *
 * @param {Array} books - Array of book objects to be displayed.
 * @param {Function} onUpdateShelf - Function to handle updating the shelf when a book is moved.
 * @returns {JSX.Element} - Returns a list of books or an empty state.
 */
const BookList = React.memo(({ books, onUpdateShelf }) => {
  const [hasLoaded, setHasLoaded] = useState(false); // Track if lazy-loaded books are fully loaded
  const { t } = useTranslation(); // Translation hook for i18n support

  // Memoize the filtered book list to avoid unnecessary re-renders
  const filteredBooks = useMemo(() => books, [books]);

  // Define spring animation to scale in the book once it's loaded
  const animationProps = useSpring({
    opacity: hasLoaded ? 1 : 0,      // Fade in the book when it's loaded
    transform: hasLoaded ? 'scale(1)' : 'scale(0.9)',  // Scale in effect for smooth transition
    config: { tension: 250, friction: 30 }, // Control the speed and smoothness of the animation
  });

  // Function to handle when a book component finishes lazy loading
  const handleLazyLoad = () => {
    setHasLoaded(true); // Trigger the animation after lazy loading completes
  };

  return (
    <>
      {filteredBooks.length > 0 ? (
        <BookListContainer>
          {filteredBooks.map((book) => (
            <LazyLoad
              key={book.id} // Ensure each book has a unique key
              height={200} // Placeholder height for lazy loading
              offset={100} // Pre-load 100px before entering viewport
              once // Load only once when the book enters the viewport
              placeholder={<div>{t('bookList.loading')}</div>} // Show loading text (localized)
              onContentVisible={handleLazyLoad} // Trigger animation on lazy load
            >
              <AnimatedListItem style={animationProps}>
                <Book book={book} onUpdateShelf={onUpdateShelf} /> {/* Pass book data and onUpdateShelf function */}
              </AnimatedListItem>
            </LazyLoad>
          ))}
        </BookListContainer>
      ) : (
        <Empty description={t('bookList.empty')} />
      )}
    </>
  );
});

export default BookList;
