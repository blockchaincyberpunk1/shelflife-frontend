/**
 * Book Component
 * This component renders a single book with its title, author, cover image, and a dropdown to change its shelf.
 * It uses Emotion for styling, react-i18next for internationalization, and Ant Design for UI components.
 * The component is memoized to prevent unnecessary re-renders when the props don't change.
 */

import React, { memo, useCallback } from 'react'; // Memoize the component and use useCallback to prevent unnecessary renders
import { useTranslation } from 'react-i18next'; // Hook for handling internationalization
import { Select, Card } from 'antd'; // Ant Design components for UI - Select for dropdown and Card for book layout
import LazyLoad from 'react-lazyload'; // LazyLoad to improve performance by loading images only when visible
import { useBook } from '../../hooks/useBook'; // Custom hook to handle book-related actions (like updating the shelf)
import {
  bookCardStyles,
  bookCoverStyles,
  bookTitleStyles,
  bookAuthorsStyles,
  dropdownStyles,
} from '../../assets/styles/globalStyles'; // Import global styles from the shared styles file

// Destructure Option component from Ant Design's Select for convenience
const { Option } = Select;

/**
 * The `Book` component renders a single book's details: title, author(s), cover image, and shelf selection.
 * @param {Object} props - Props passed down to the Book component.
 * @param {Object} props.book - The book object containing details like title, authors, coverImageUrl, and shelf.
 */
const Book = memo(({ book }) => {
  const { updateBookShelf } = useBook(); // Extract the function to update the book's shelf from the custom useBook hook
  const { t } = useTranslation(); // Hook for accessing the translation function

  /**
   * Handles the change in the selected shelf from the dropdown.
   * This function is memoized using `useCallback` to optimize rendering.
   * @param {string} value - The selected shelf value (e.g., 'currentlyReading', 'wantToRead', 'read', or 'none').
   */
  const handleShelfChange = useCallback(
    (value) => {
      updateBookShelf(book.id, value); // Call the updateBookShelf function to update the shelf for the selected book
    },
    [book.id, updateBookShelf] // Recompute the function only if the book's ID or the updateBookShelf function changes
  );

  return (
    <Card
      hoverable
      css={bookCardStyles} // Apply global styles for the book card (from Emotion's CSS-in-JS)
      cover={
        <LazyLoad height={200} offset={100} once> {/* Lazy load the book cover to optimize performance */}
          <img
            css={bookCoverStyles} // Apply global styles for the book cover
            src={book.coverImageUrl || 'https://via.placeholder.com/150'} // If no cover image exists, display a placeholder
            alt={book.title} // Set the alt attribute for accessibility
          />
        </LazyLoad>
      }
    >
      {/* Render the book's title with the appropriate styles */}
      <h3 css={bookTitleStyles}>{book.title}</h3>

      {/* Render the book's authors. If no authors are provided, display a translated 'No Authors' message */}
      <p css={bookAuthorsStyles}>
        {book.authors?.length > 0 ? book.authors.join(', ') : t('book.noAuthors')}
      </p>

      {/* Render a dropdown for selecting the book's shelf */}
      <Select
        defaultValue={book.shelf || 'none'} // Set the default value of the dropdown based on the book's current shelf
        onChange={handleShelfChange} // Call handleShelfChange when the selected shelf changes
        css={dropdownStyles} // Apply global styles for the dropdown (from Emotion's CSS-in-JS)
      >
        {/* Render each shelf option in the dropdown, with labels translated via i18n */}
        <Option value="currentlyReading">{t('shelves.currentlyReading')}</Option>
        <Option value="wantToRead">{t('shelves.wantToRead')}</Option>
        <Option value="read">{t('shelves.read')}</Option>
        <Option value="none">{t('shelves.none')}</Option>
      </Select>
    </Card>
  );
});

export default Book;
