const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173", 
    "https://tapaal-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "tapaal",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    isConnected = false;
  }
};

// Connect before handling requests
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDB();
  }
  next();
});

// Inward Mail schema
const InwardMailSchema = new mongoose.Schema({
  trackingId: String,
  sender: String,
  subject: String,
  department: String,
  status: String,
  createdAt: { type: Date, default: Date.now }
});

const InwardMail = mongoose.models.InwardMail || mongoose.model('InwardMail', InwardMailSchema);

// Routes
app.get('/api/inward-mails', async (req, res) => {
  try {
    const mails = await InwardMail.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: mails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inward mails',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Inward Mails API is running',
    timestamp: new Date().toISOString(),
    connected: isConnected
  });
});

// Export for serverless
module.exports = serverless(app);
