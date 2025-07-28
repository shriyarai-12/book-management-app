# Book Management App

This project is a full-stack Book Management application with user authentication and role-based access control.

## Project Structure

- `book-backend/` - Node.js/Express backend API
  - `models/` - Mongoose models (Book, User)
  - `routes/` - Express route handlers (auth, book)
  - `middleware/` - Custom middleware (authentication, authorization)
  - `server.js` - Entry point for backend server
- `book-frontend/` - React frontend
  - `src/components/` - React components (AddBook, BookList, EditBook, Login, Navbar, PrivateRoute, Register)
  - `src/App.js` - Main React app


## Features

- User registration and login (JWT authentication)
- Role-based access (admin/user)
- Book management:
  - **Admin**: Can add, edit, and delete books
  - **User**: Can only view/read books
  
**Note:** You can change the `role` field for any user (e.g., to `admin`) to grant them admin privileges. Admins can then perform add, edit, and delete operations on books. Assign the `admin` role to the desired user(s) as needed.
- Protected routes (frontend and backend)

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB

### Backend Setup
1. Navigate to `book-backend`:
   ```sh
   cd book-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Setup
1. Navigate to `book-frontend`:
   ```sh
   cd book-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend app:
   ```sh
   npm start
   ```

## Environment Variables
- Update the JWT secret and MongoDB URI as needed in the backend.

## License
MIT

