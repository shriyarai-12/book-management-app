import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [book, setBook] = useState({ title: '', author: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBook(res.data))
      .catch((err) => console.error('Fetch failed:', err));
  }, [id, token]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/books/${id}`, book, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => navigate('/books'))
      .catch((err) => console.error('Update failed:', err));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Book</h2>
      <input
        type="text"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        placeholder="Author"
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditBook;