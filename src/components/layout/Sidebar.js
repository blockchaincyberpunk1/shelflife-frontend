/**
 * Sidebar.js
 * 
 * This component renders a sidebar navigation for the app, displaying default shelves (e.g., "Currently Reading", "Want to Read", "Read")
 * as well as user-created custom shelves. It uses `useShelf` from the `hooks` folder to fetch the list of shelves and `react-router-dom`
 * for navigation. The `NavLink` component is used to enable navigation between different shelves and categories.
 */

import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import { useShelf } from '../../hooks/useShelf'; // Custom hook for managing shelf data

// Sidebar component for navigating between different book shelves
const Sidebar = () => {
  const { shelves } = useShelf(); // Get shelf data (both default and custom shelves) from the useShelf hook

  return (
    <aside className="sidebar">
      <h2>My Shelves</h2> {/* Sidebar heading */}

      {/* List of default shelves */}
      <ul>
        {/* Navigation link to show all books */}
        <li>
          <NavLink to="/" exact activeClassName="active"> {/* Highlight the active link */}
            All Books
          </NavLink>
        </li>

        {/* Default shelf: Currently Reading */}
        <li>
          <NavLink to="/shelf/currentlyReading" activeClassName="active">
            Currently Reading
          </NavLink>
        </li>

        {/* Default shelf: Want to Read */}
        <li>
          <NavLink to="/shelf/wantToRead" activeClassName="active">
            Want to Read
          </NavLink>
        </li>

        {/* Default shelf: Read */}
        <li>
          <NavLink to="/shelf/read" activeClassName="active">
            Read
          </NavLink>
        </li>

        {/* Render dynamically created shelves (custom shelves created by the user) */}
        {shelves.map((shelf) => (
          <li key={shelf._id}> {/* Use the shelf ID as the unique key */}
            <NavLink to={`/shelf/${shelf._id}`} activeClassName="active">
              {shelf.name} {/* Display the name of the custom shelf */}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
