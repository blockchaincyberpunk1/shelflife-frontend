/**
 * SearchPage.js
 * 
 * This page allows users to search for books and displays the results.
 * It uses Ant Design for layout, React Hook Form for managing the search form, 
 * and the BookContext to handle book search-related actions. 
 * Lazy loading and animations are implemented with `react-lazyload` and `react-spring`,
 * and react-i18next is used for internationalization.
 */

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form'; // For form handling
import { useTranslation } from 'react-i18next'; // For internationalization
import { Input, Button, Layout, Pagination } from 'antd'; // Ant Design components for UI elements
import { css } from '@emotion/react'; // For styling
import { useSpring, animated } from 'react-spring'; // For animations
import LazyLoad from 'react-lazyload'; // For lazy loading
import { useBook } from '../../hooks/useBook'; // Custom hook for book-related logic
import BookList from '../../components/books/BookList'; // Component to display a list of books
import LoadingErrorWrapper from '../../components/common/LoadingErrorWrapper'; // Reusable component for loading/error states
import { buttonStyles, inputFieldStyles, formContainerStyles } from '../../assets/styles/globalStyles'; // Global styles

const { Content } = Layout; // Ant Design Layout component

const SearchPage = () => {
  const { t } = useTranslation(); // Translation hook from react-i18next
  const { searchBooks, books, isLoading, error } = useBook(); // Extract necessary methods and state from useBook
  const { register, handleSubmit } = useForm(); // React Hook Form setup
  const [currentPage, setCurrentPage] = useState(1); // State for pagination

  // Memoize the filtered books to prevent unnecessary re-renders
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * 10; // Pagination logic (10 books per page)
    return books.slice(startIndex, startIndex + 10);
  }, [books, currentPage]);

  // Animation for book results section
  const springProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
  });

  // Emotion CSS for custom styling
  const searchPageStyles = css`
    .search-page {
      background-color: #312c49;
      color: white;
      padding: 24px;
      min-height: 100vh;
    }
    .search-form {
      ${formContainerStyles}; /* Apply global form container styles */
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .book-list {
      margin-top: 20px;
    }
    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  `;

  // Handle form submission for searching books
  const onSubmit = async (data) => {
    try {
      await searchBooks(data.query); // Trigger search function from BookContext
      setCurrentPage(1); // Reset to first page after a new search
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <Layout className="search-page" css={searchPageStyles}>
      <Content>
        <div className="search-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input field for search */}
            <Input
              {...register('query')}
              css={inputFieldStyles}
              placeholder={t('searchPage.searchPlaceholder')}
            />
            {/* Search button */}
            <Button type="primary" htmlType="submit" css={buttonStyles}>
              {t('searchPage.searchButton')}
            </Button>
          </form>
        </div>

        {/* Loading and error handling using reusable wrapper */}
        <LoadingErrorWrapper isLoading={isLoading} error={error}>
          <div className="book-list">
            <LazyLoad height={200} offset={100}>
              <animated.div style={springProps}>
                <BookList books={paginatedBooks} onUpdateShelf={() => {}} /> {/* Display paginated books */}
              </animated.div>
            </LazyLoad>
          </div>
        </LoadingErrorWrapper>

        {/* Pagination component */}
        {books.length > 0 && (
          <Pagination
            className="pagination"
            current={currentPage}
            total={books.length}
            pageSize={10}
            onChange={page => setCurrentPage(page)}
          />
        )}
      </Content>
    </Layout>
  );
};

export default SearchPage;
