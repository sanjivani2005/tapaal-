const server = require('../backend/server/server');

// Export for Vercel serverless functions
module.exports = async (req, res) => {
    try {
        console.log('🚀 Serverless function called:', req.method, req.url);

        // Set CORS headers FIRST, before any other operations
        const origin = req.headers.origin;
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://tapaal-frontend.vercel.app', 'https://tapaal.vercel.app'];

        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        } else {
            res.setHeader('Access-Control-Allow-Origin', '*');
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

        // Handle preflight requests immediately
        if (req.method === 'OPTIONS') {
            console.log('✅ Handling OPTIONS preflight request');
            res.status(200).end();
            return;
        }

        // Set NODE_ENV for serverless
        process.env.NODE_ENV = 'production';
        process.env.VERCEL = 'true';

        // Handle serverless function execution
        console.log('📤 Passing request to Express server');
        server(req, res);
    } catch (error) {
        console.error('❌ Serverless function error:', error);

        // Ensure CORS headers are set even for errors
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
        });
    }
};
