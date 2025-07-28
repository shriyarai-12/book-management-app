const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authenticate, authorizeRole } = require('../middleware/authmiddleware');

// ✅ Only admin can create a book
router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }

  try {
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

// ✅ Only admin can delete
router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// ✅ Everyone can view books
router.get('/', authenticate, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

module.exports = router;