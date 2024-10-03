# ShelfLife Frontend

This is the frontend application for ShelfLife, a book tracking app built with the MERN stack.

## Table of Contents

- [ShelfLife Frontend](#shelflife-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the App](#running-the-app)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)

## Features

- User authentication (signup/login)
- View books on different shelves (Currently Reading, Want to Read, Read)
- Search for books and add them to shelves
- Create custom shelves 
- Update user profile
- Reset password

## Technologies Used

- **Frontend:**
  - React.js
  - Ant Design (UI library)
  - Emotion (CSS-in-JS)
  - React Spring (animations)
  - React Icons
  - React Lazy Load
  - React Hook Form
  - Redux (for state management)
  - React Router (for routing)
  - Axios (for HTTP requests)
  - Firebase Authentication
  - react-i18next
- **Backend:** 
  - Node.js
  - Express.js
  - MongoDB

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your system.

### Installation

1. Clone the repository: 
   ```bash
   git clone https://github.com/blockchaincyberpunk1/shelflife-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shelflife-frontend
   ```
3. Install dependencies:
   ```bash
   npm install 
   ```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
REACT_APP_API_URL=your_backend_api_url  // Example: http://localhost:5000/api
# ... other environment variables as needed 
```

* Replace the placeholders with your actual values.

### Running the App

* **Development Mode:**
   ```bash
   npm start
   ```
   This will start the development server, and your app will be accessible in your browser at `http://localhost:3000`. 

## Project Structure

The project follows a component-based structure:

- `public/`: Contains the main `index.html` file and other static assets.
- `src/`:
  - `components/`:  Reusable UI components organized by feature or category.
  - `pages/`: Page-level components (e.g., Home, Search, Profile).
  - `services/`:  Logic for interacting with the backend API.
  - `context/`:  Context providers and custom hooks for state management.
  - `utils/`:  Utility functions and helpers.
  - `App.js`:  The main application component that sets up routing and the overall structure.
  - `index.js`: The entry point for rendering the React app.

## Contributing

Contributions are welcome!  Please open an issue or submit a pull request if you would like to contribute to this project.


