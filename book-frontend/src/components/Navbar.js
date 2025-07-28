// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/books" style={{ marginRight: '10px' }}>Books</Link>
      {role === 'admin' && (
        <Link to="/add-book" style={{ marginRight: '10px' }}>Add Book</Link>
      )}
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login" style={{ marginLeft: '10px' }}>Login</Link>
      )}
    </nav>
  );
}

export default Navbar;
