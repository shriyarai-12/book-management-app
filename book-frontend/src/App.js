import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Login from './components/Login';
import EditBook from './components/EditBook';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register'; // ✅ Import Register

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add this line */}

        <Route
          path="/books"
          element={
            <PrivateRoute allowedRoles={['admin', 'user']}>
              <BookList />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-book"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AddBook />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-book/:id"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <EditBook />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
