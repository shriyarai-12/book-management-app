const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ import CORS
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

const app = express();
const PORT = 5000;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004',
  'http://localhost:3005',
  'http://localhost:3006',
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

// ✅ Handle preflight requests
app.options('*', cors());

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
.catch((err) => console.error('❌ MongoDB connection error:', err));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Test route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Backend running!' });
});

app.listen(PORT, () => {
  console.log( 'Server running at http://localhost:5000');
});