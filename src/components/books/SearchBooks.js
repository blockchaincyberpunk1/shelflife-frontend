// SearchBooks.js
/**
 * SearchBooks Component
 * This component allows users to search for books by title or author. It uses the `searchBooks` function from the context
 * and displays the results using the `BookList` component.
 */

import React, { useState, useCallback } from "react";
import { Input, Button } from "antd"; // Ant Design components for the search input and button
import { useTranslation } from "react-i18next"; // For translations
import { useBook } from "../../hooks/useBook"; // Import the custom hook to handle book-related actions
import BookList from "./BookList"; // Import the BookList component to display search results
import styled from "@emotion/styled"; // Emotion for styling

// Styled container for search input and button
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

// Styled input for the search bar
const SearchInput = styled(Input)`
  width: 300px;
  margin-right: 10px;
`;

/**
 * SearchBooks Component
 * Handles searching for books by title or author and displaying the results.
 */
const SearchBooks = () => {
  const [query, setQuery] = useState(""); // State to store the search query
  const [searchedBooks, setSearchedBooks] = useState([]); // State to store the search results
  const [isSearching, setIsSearching] = useState(false); // State to manage the loading state during a search
  const { t } = useTranslation(); // Hook for i18n translations
  const { searchBooks } = useBook(); // Extract the searchBooks function from the useBook hook

  /**
   * Handle input change and update the query state
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query state as the user types
  };

  /**
   * Handle the search action when the user submits the query.
   * This function triggers the `searchBooks` context function and updates the search results.
   */
  const handleSearch = useCallback(async () => {
    if (query.trim() === "") return; // Prevent empty search queries
    setIsSearching(true); // Start the loading state
    try {
      const results = await searchBooks(query); // Call the context function to search for books
      setSearchedBooks(results); // Update the state with search results
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setIsSearching(false); // End the loading state
    }
  }, [query, searchBooks]);

  return (
    <div>
      {/* Search Input and Button */}
      <SearchContainer>
        {/* Input field for the search query */}
        <SearchInput
          placeholder={t("searchBooks.enterQuery")} // Localized placeholder
          value={query} // Controlled input tied to the query state
          onChange={handleInputChange} // Update query on input change
        />
        {/* Button to trigger the search action */}
        <Button type="primary" onClick={handleSearch} loading={isSearching}>
          {t("searchBooks.searchButton")} {/* Localized button text */}
        </Button>
      </SearchContainer>

      {/* Display the BookList component with the search results */}
      {searchedBooks.length > 0
        ? {
            /* Display the list of searched books */
          }(<BookList books={searchedBooks} />)
        : !isSearching && (
            <p>{t("searchBooks.noResults")}</p>
          ) // Show "no results" message when there are no books
      }
    </div>
  );
};

export default SearchBooks;
