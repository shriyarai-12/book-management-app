 REACT DEVELOPER TASK-14
 Implement User Roles an permissions forAuthentication System

A full-stack web application for managing books with user authentication and role-based access control (RBAC).
Admins can add, edit, and delete books, while regular users can only view the book list.

 ## Features:
User registration and login with JWT authentication
Role-based access control: Admin vs User
CRUD operations on books (Create, Read, Update, Delete) for admins
Read-only access for regular users
Admin: Can add, edit, and delete books
User: Can only view/read books
Backend API deployed on Render
Frontend built with React (can be deployed on Netlify, Vercel, etc.)

    *Note: You can change the 'role' field for any user (e.g., to 'admin') to grant them admin privileges. Admins can then perform add, edit, and delete operations on books. Assign the 'admin' role to the desired user(s) as needed in mongodb,because if we give role option in register then any one can acess so in mongo db you can edit any one user to admin.eg i gave admin role name:hira,password:hira access add,delete,udate.

## Technologies Used:
   Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
   Frontend: React.js, Axios, React Router
   Deployment: Render (backend), (frontend deployment platform of your choice)

 ## Backend Setup:
1. Navigate to book-backend:
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

 ## Frontend Setup:
1. Navigate to book-frontend:
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
## Getting Started:
Prerequisites:
Node.js and npm installed
MongoDB Atlas account or local MongoDB server
Render account for deployment

## Setup Locally
Clone the repository:
[https://github.com/shriyarai-12/book-management-app]
cd book-mangement-app

## Install backend dependencies
cd backend
npm install

## Create a .env file in the backend folder with the following variables:

*MONGO_URI=mongodb+srv://shriya:9s8h6r7i@cluster0.mpsogte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

*JWT_SECRET=book_app_2025_secret_token

PORT=5000

## Configure API URL:

Open the file where API base URL is defined (e.g., src/config.js or inside API service files).

Make sure it points to your backend API URL, for example:
export const API_BASE_URL = ['https://book-backend-bmpr.onrender.com/api'];

## Run the app:
npm start

Open http://localhost:3000 in your browser.
 Environment Variables
 Update the JWT secret and MongoDB URI as needed in the backend.

Deployment
Build the app for production:

npm run build

Deploy the build folder to hosting platforms like Netlify, Vercel, GitHub Pages, or any static server.

Update the API URL in the deployed app to point to your live backend.


## *Deployment link:
REACT_APP_API_BASE_URL=[https://book-backend-bmpr.onrender.com/api]

License
MIT

