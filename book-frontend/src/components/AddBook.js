import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  // Role check - only admin can access
  if (role !== 'admin') {
    return <h2>Access Denied</h2>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/books',
        { title, author },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/books');
    } catch (err) {
      console.error('Error adding book:', err);
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        /><br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;


