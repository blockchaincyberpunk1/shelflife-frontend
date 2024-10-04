import React from 'react';
import { NavLink } from 'react-router-dom';
import { useShelf } from '../../context/ShelfContext'; // Import the custom hook to access shelf data

// Sidebar component for navigation between different shelves and categories of books
const Sidebar = () => {
  const { shelves } = useShelf(); // Get the user's shelves from the ShelfContext

  return (
    <aside className="sidebar">
      <h2>My Shelves</h2>
      
      <ul>
        {/* Default Shelves - These are the pre-set shelves every user has */}
        <li>
          <NavLink to="/" exact activeClassName="active">
            All Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/shelf/currentlyReading" activeClassName="active">
            Currently Reading
          </NavLink>
        </li>
        <li>
          <NavLink to="/shelf/wantToRead" activeClassName="active">
            Want to Read
          </NavLink>
        </li>
        <li>
          <NavLink to="/shelf/read" activeClassName="active">
            Read
          </NavLink>
        </li>

        {/* Dynamically Render User-Created Shelves */}
        {shelves.map((shelf) => (
          <li key={shelf._id}>
            <NavLink to={`/shelf/${shelf._id}`} activeClassName="active">
              {shelf.name} {/* Render the name of each user-created shelf */}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
