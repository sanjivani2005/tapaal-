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

// Department schema
const DepartmentSchema = new mongoose.Schema({
  name: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Department = mongoose.models.Department || mongoose.model('Department', DepartmentSchema);

// Routes
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching departments',
      error: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Departments API is running',
    timestamp: new Date().toISOString(),
    connected: isConnected
  });
});

// Export for serverless
module.exports = serverless(app);
