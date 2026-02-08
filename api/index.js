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

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Tapaal Backend API is running',
        timestamp: new Date().toISOString(),
        connected: isConnected,
        endpoints: [
            '/api/users',
            '/api/departments',
            '/api/inward-mails',
            '/api/outward-mails'
        ]
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        available: ['/api/health', '/api/users', '/api/departments', '/api/inward-mails']
    });
});

// Export for serverless
module.exports = serverless(app);
