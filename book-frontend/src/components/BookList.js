import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('🔒 Please login first!');
      return navigate('/login');
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.role?.trim().toLowerCase();

      if (!role) {
        alert('Invalid token. Role missing.');
        return navigate('/login');
      }

      setUserRole(role);

      // ✅ Fetch books after role is set
      fetchBooks(token);
    } catch (err) {
      console.error('❌ Invalid token:', err);
      alert('Invalid or expired token. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  const fetchBooks = async (token) => {
    try {
      const response = await axios.get('https://book-backend-bmpr.onrender.com/api/books',  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('❌ Error fetching books:', error);
      alert('Failed to load books. You may not be authorized.');
    }
  };

  const handleDelete = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error('❌ Error deleting book:', error);
      alert('Error deleting book. Check permissions.');
    }
  };
const handleUpdate = (book) => {
  navigate(`/edit-book/${book._id}`);
};

    // You can navigate to edit-book route here if you have one

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>📚 Book List</h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🚪 Logout
        </button>
      </div>

      {userRole === 'admin' && (
        <button
          onClick={() => navigate('/add-book')}
          style={{
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#2ecc71',
            border: 'none',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ➕ Add Book
        </button>
      )}

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <div
            key={book._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3 style={{ marginBottom: '5px' }}>{book.title}</h3>
            <p style={{ marginBottom: '10px' }}>by {book.author}</p>
            {userRole === 'admin' && (
              <>
                <button
                  onClick={() => handleUpdate(book)}
                  style={{ marginRight: '10px' }}
                >
                  ✏️ Update
                </button>
                <button onClick={() => handleDelete(book._id)}>🗑️ Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BookList;
