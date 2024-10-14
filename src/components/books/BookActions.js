// BookActions.js
/**
 * BookActions Component
 * 
 * This component is responsible for handling various actions a user can perform on a book, such as:
 * - Deleting the book
 * - Moving the book to a different shelf
 * - Editing the book details
 * 
 * It uses Ant Design's Modal component for confirmation dialogs and the `useBook` context for managing
 * book-related actions like deleting or updating the book's shelf.
 * 
 * Props:
 * - bookId: The ID of the book for which actions will be performed.
 * - currentShelf: The current shelf of the book (used for updating the shelf).
 * 
 * Context Functions Used:
 * - deleteBook: To delete a book.
 * - updateBookShelf: To change the book's shelf.
 * 
 * Additional Functionality:
 * - Confirmation modals for deleting and updating the book's shelf.
 * - Button group to trigger actions.
 */

import React, { useState } from 'react';
import { Modal, Button, Select, message } from 'antd'; // Ant Design components for modal, button, and select dropdown
import { useBook } from '../../hooks/useBook'; // Custom hook for accessing book context functions
import { useTranslation } from 'react-i18next'; // For i18n support (translations)
import { ExclamationCircleOutlined } from '@ant-design/icons'; // Ant Design icon for warning in confirmation dialogs

const { Option } = Select;
const { confirm } = Modal;

const BookActions = ({ bookId, currentShelf }) => {
  const { deleteBook, updateBookShelf } = useBook(); // Extract deleteBook and updateBookShelf functions from context
  const { t } = useTranslation(); // Translation hook for i18n support
  const [loading, setLoading] = useState(false); // State to track loading during actions

  /**
   * Show a confirmation modal before deleting the book.
   * If confirmed, call the `deleteBook` function to delete the book.
   */
  const showDeleteConfirm = () => {
    confirm({
      title: t('bookActions.confirmDeleteTitle'), // Localized title for confirmation modal
      icon: <ExclamationCircleOutlined />, // Warning icon for confirmation modal
      content: t('bookActions.confirmDeleteContent'), // Localized content for confirmation modal
      okText: t('bookActions.confirm'), // Localized confirm button text
      okType: 'danger', // Style the button as a danger action (red)
      cancelText: t('bookActions.cancel'), // Localized cancel button text
      onOk: async () => {
        try {
          setLoading(true); // Set loading to true while deleting
          await deleteBook(bookId); // Call deleteBook function with the book ID
          message.success(t('bookActions.deleteSuccess')); // Display success message on successful delete
        } catch (error) {
          message.error(t('bookActions.deleteError')); // Display error message if delete fails
        } finally {
          setLoading(false); // Reset loading state after action completes
        }
      },
    });
  };

  /**
   * Handle updating the book's shelf when a new shelf is selected from the dropdown.
   * 
   * @param {string} newShelf - The ID of the new shelf selected by the user.
   */
  const handleShelfChange = async (newShelf) => {
    try {
      setLoading(true); // Set loading to true while updating the shelf
      await updateBookShelf(bookId, newShelf); // Call updateBookShelf function with the book ID and new shelf
      message.success(t('bookActions.updateShelfSuccess')); // Display success message on successful shelf update
    } catch (error) {
      message.error(t('bookActions.updateShelfError')); // Display error message if update fails
    } finally {
      setLoading(false); // Reset loading state after action completes
    }
  };

  return (
    <div>
      {/* Button to trigger the delete confirmation modal */}
      <Button
        danger
        loading={loading} // Display loading indicator if action is in progress
        onClick={showDeleteConfirm} // Trigger the confirmation modal for deleting the book
        style={{ marginRight: '10px' }}
      >
        {t('bookActions.delete')} {/* Localized button text for delete action */}
      </Button>

      {/* Dropdown to select a new shelf for the book */}
      <Select
        defaultValue={currentShelf || 'none'} // Default value is the current shelf or 'none'
        onChange={handleShelfChange} // Call handleShelfChange when a new shelf is selected
        disabled={loading} // Disable dropdown while an action is in progress
        style={{ width: 150 }}
      >
        {/* Dropdown options for different shelves */}
        <Option value="currentlyReading">{t('shelves.currentlyReading')}</Option>
        <Option value="wantToRead">{t('shelves.wantToRead')}</Option>
        <Option value="read">{t('shelves.read')}</Option>
        <Option value="none">{t('shelves.none')}</Option>
      </Select>
    </div>
  );
};

export default BookActions;
