const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed frontend origins (local + deployed frontend)
const allowedOrigins = [
  'http://localhost:3000',
  'https://book-management-app-yyf7.onrender.com' // ✅ your deployed frontend
];

// ✅ CORS setup
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options('*', cors()); // for preflight requests

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(
  'mongodb+srv://shriya:9s8h6r7i@cluster0.mpsogte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// ✅ Health check (optional)
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend running!' });
});

// ✅ Serve React frontend (in production)
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

