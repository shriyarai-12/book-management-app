const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authenticate, authorizeRole } = require('../middleware/authmiddleware');

// ✅ Fetch all books (admin & user)
router.get('/', authenticate, async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// ✅ Create a book (admin only)
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

// ✅ Delete a book by ID (admin only)
router.delete('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});

// ✅ Get a single book by ID (for editing)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book' });
  }
});

// ✅ Update a book by ID (admin only)
router.put('/:id', authenticate, authorizeRole('admin'), async (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required' });
  }

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

module.exports = router;