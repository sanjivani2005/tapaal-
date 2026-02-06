const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// MongoDB Models
const InwardMail = require('../models/InwardMail');
const OutwardMail = require('../models/OutwardMail');
const User = require('../models/User');
const Department = require('../models/Department');

// Gemini Init
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Debug: Check API Key
console.log('🔑 Gemini API Key:', process.env.GEMINI_API_KEY ? 'Set' : 'NOT SET');

router.post('/chat', async (req, res) => {
    try {
        console.log('🤖 Chatbot request received:', req.body);
        const { message } = req.body;
        const currentTime = new Date().toLocaleString();

        if (!message) {
            return res.status(400).json({ response: 'Message is required' });
        }

        // Fetch ALL MongoDB Data for AI
        const [
            inwardMails,
            outwardMails,
            users,
            departments
        ] = await Promise.all([
            InwardMail.find().populate('department').lean(),
            OutwardMail.find().populate('department').lean(),
            User.find().populate('department').lean(),
            Department.find().lean()
        ]);

        // System Stats
        const systemStats = {
            totalInwardMails: inwardMails.length,
            totalOutwardMails: outwardMails.length,
            totalUsers: users.length,
            totalDepartments: departments.length,
            activeUsers: users.filter(u => u.isActive).length
        };

        // Comprehensive AI Prompt with ALL data
        const prompt = `
You are an intelligent AI assistant for a Government Tapaal (Mail Management) System. You have access to complete real-time database information.

IMPORTANT RULES:
1. ALWAYS respond to EVERY message professionally and helpfully
2. Use the provided MongoDB data for accurate answers
3. Be conversational, friendly, and professional
4. Use emojis for better visual presentation
5. If specific data is requested but not found, say so politely
6. Handle greetings naturally and offer assistance
7. For mail tracking, search through the provided mail data
8. For statistics, use the systemStats provided
9. Always be helpful and guide users to available features

CURRENT SYSTEM DATA (${currentTime})

📥 INWARD MAILS (${inwardMails.length} total):
${inwardMails.map(m => 
    `ID: ${m._id}
 Subject: ${m.subject || m.details || 'No Subject'}
 Sender: ${m.sender || 'Unknown'}
 Department: ${m.department?.name || 'N/A'}
 Status: ${m.status || 'Unknown'}
 Priority: ${m.priority || 'Normal'}
 Date: ${m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Unknown'}
---`
).join('\n')}

📤 OUTWARD MAILS (${outwardMails.length} total):
${outwardMails.map(m => 
    `ID: ${m._id}
 Subject: ${m.subject || 'No Subject'}
 Receiver: ${m.receiver || 'Unknown'}
 Department: ${m.department?.name || 'N/A'}
 Status: ${m.status || 'Unknown'}
 Priority: ${m.priority || 'Normal'}
 Date: ${m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Unknown'}
---`
).join('\n')}

👥 USERS (${users.length} total):
${users.map(u => 
    `Name: ${u.fullName || u.name || 'Unknown'}
 Email: ${u.email || 'N/A'}
 Role: ${u.role || 'User'}
 Department: ${u.department?.name || 'N/A'}
 Status: ${u.isActive ? 'Active' : 'Inactive'}
---`
).join('\n')}

🏢 DEPARTMENTS (${departments.length} total):
${departments.map(d => 
    `Name: ${d.name || 'Unknown'}
 Code: ${d.code || 'N/A'}
 Head: ${d.head || 'N/A'}
 Status: ${d.status || 'Unknown'}
---`
).join('\n')}

📊 SYSTEM STATISTICS:
- Total Inward Mails: ${systemStats.totalInwardMails}
- Total Outward Mails: ${systemStats.totalOutwardMails}
- Total Users: ${systemStats.totalUsers}
- Active Users: ${systemStats.activeUsers}
- Total Departments: ${systemStats.totalDepartments}
- Total Mails: ${systemStats.totalInwardMails + systemStats.totalOutwardMails}

USER MESSAGE:
"${message}"

INSTRUCTIONS:
1. Respond naturally and professionally
2. If user asks for mail status/tracking, search through the mail data by ID or content
3. If user asks for statistics, use the systemStats
4. If user asks for users, departments, or mails, list them from the data
5. For greetings, respond warmly and offer help
6. For help requests, show available capabilities
7. Always be helpful and guide the user
8. Use clear formatting with emojis
9. If you can't find specific information, say so politely and suggest alternatives

Please provide a helpful, accurate response based on the data above.
`;

        // AI Call
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('🤖 AI response sent successfully');
        return res.json({ response: responseText });

    } catch (error) {
        console.error('🔥 AI ERROR:', error);
        console.error('🔥 ERROR STACK:', error.stack);
        
        // Check for specific Gemini errors
        if (error.message?.includes('API_KEY')) {
            return res.json({
                response: '🔑 Gemini API key issue. Please check configuration and try again.'
            });
        }
        
        if (error.message?.includes('quota')) {
            return res.json({
                response: '📊 AI quota exceeded. Please try again later.'
            });
        }
        
        // Generic fallback
        return res.json({
            response: '🤖 AI service temporarily unavailable. Please try again in a moment.'
        });
    }
});

module.exports = router;
