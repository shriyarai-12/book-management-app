const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // ✅ Added
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow CORS from specific origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-domain.com', // Replace with actual frontend domain if deployed separately
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.options('*', cors()); // preflight

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://shriya:9s8h6r7i@cluster0.mpsogte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend running!' });
});

// ✅ Paste this at the bottom
const path = require('path');
// ✅ Serve React frontend build
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
