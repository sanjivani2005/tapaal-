const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// MongoDB Models
const InwardMail = require('../models/InwardMail');
const OutwardMail = require('../models/OutwardMail');
const User = require('../models/User');
const Department = require('../models/Department');

// Gemini Init (USE DEFAULT MODEL)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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

        // ✅ HYBRID: Intent Detection for Simple Queries
        const lower = message.toLowerCase();

        if (lower.includes('user')) {
            console.log('🎯 User intent detected - using direct DB query');
            const users = await User.find().lean();
            
            if (!users.length) {
                return res.json({ response: '👥 No users found in the system.' });
            }
            
            const userText = users.map(u => 
                `• ${u.fullName || u.name || 'Unknown'} (${u.email || 'N/A'}) - Role: ${u.role || 'User'}, Dept: ${u.department || 'N/A'}, Status: ${u.isActive ? 'Active' : 'Inactive'}`
            ).join('\n');
            
            return res.json({
                response: `👥 Users List (${new Date().toLocaleTimeString()})\n\n${userText}\n\nTotal: ${users.length} users`
            });
        }

        // ✅ Fetch ALL MongoDB Data (COMPLETE DATA RESTORED)
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

        // ✅ System Stats
        const systemStats = {
            totalInwardMails: inwardMails.length,
            totalOutwardMails: outwardMails.length,
            totalUsers: users.length,
            totalDepartments: departments.length,
            activeUsers: users.filter(u => u.isActive).length
        };

        // ✅ Gemini System Prompt (VERY IMPORTANT)
        const prompt = `
You are an intelligent AI assistant for a Government Tapaal (Mail Management) System. You are trained to handle ALL types of user queries professionally.

IMPORTANT RULES:
1. ALWAYS respond to EVERY message - never say "I don't understand"
2. Use the provided MongoDB data for accurate answers
3. Be helpful, conversational, and professional
4. If data is missing, say "This information is not currently available in the system"
5. Handle greetings, help requests, and general conversation
6. For statistics, provide complete system overview
7. For user queries, show detailed user information
8. For mail queries, provide mail details and status
9. Use emojis and clear formatting for better readability

CURRENT SYSTEM SNAPSHOT (${currentTime})

📥 INWARD MAILS:
${inwardMails.length > 0
                ? inwardMails.map(m =>
                    `- ${m.mailId || m._id}
  Subject: ${m.subject || m.details}
  Sender: ${m.sender}
  Department: ${m.department?.name || 'N/A'}
  Status: ${m.status}
  Priority: ${m.priority}`
                ).join('\n')
                : 'No inward mails found in database.'}

📤 OUTWARD MAILS:
${outwardMails.length > 0
                ? outwardMails.map(m =>
                    `- ${m.mailId || m._id}
  Subject: ${m.subject}
  Receiver: ${m.receiver}
  Department: ${m.department?.name || 'N/A'}
  Status: ${m.status}
  Priority: ${m.priority}`
                ).join('\n')
                : 'No outward mails found in database.'}

👥 USERS:
${users.length > 0
                ? users.map(u =>
                    `- ${u.fullName || u.name || 'Unknown'}
  Email: ${u.email || 'N/A'}
  Role: ${u.role || 'User'}
  Department: ${u.department?.name || 'N/A'}
  Status: ${u.isActive ? 'Active' : 'Inactive'}`
                ).join('\n')
                : 'No users found in database.'}

🏢 DEPARTMENTS:
${departments.length > 0
                ? departments.map(d =>
                    `- ${d.name} (${d.code})
  Head: ${d.head || 'N/A'}
  Status: ${d.status}`
                ).join('\n')
                : 'No departments found in database.'}

📊 SYSTEM STATISTICS:
- Total Inward Mails: ${systemStats.totalInwardMails}
- Total Outward Mails: ${systemStats.totalOutwardMails}
- Total Users: ${systemStats.totalUsers}
- Active Users: ${systemStats.activeUsers}
- Total Departments: ${systemStats.totalDepartments}

USER QUESTION:
"${message}"

INSTRUCTIONS FOR AI:
1. ALWAYS respond to every user message professionally
2. For greetings (hello, hi, etc.) → respond warmly and offer help
3. For "statistics" or "system status" → provide complete overview using systemStats
4. For "users" or "show users" → list all users with details
5. For "departments" → list all departments with information
6. For "mail" queries → search through inward/outward mails
7. For "help" → show available commands and capabilities
8. For general questions → be helpful and guide users to available features
9. Use emojis for better visual presentation
10. If specific data is requested but not found → say "This information is not available"
11. Always be conversational and professional
`;

        // ✅ Gemini Call
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('🤖 Chatbot response sent:', responseText);
        return res.json({ response: responseText });

    } catch (error) {
        console.error('🤖 AI ERROR FULL:', error?.response?.data || error.message);
        console.error('🤖 ERROR STACK:', error.stack);
        
        // Check for specific Gemini errors
        if (error.message?.includes('API_KEY')) {
            return res.status(500).json({
                response: '🔑 Gemini API key issue. Please check configuration.'
            });
        }
        
        if (error.message?.includes('quota')) {
            return res.status(500).json({
                response: '📊 AI quota exceeded. Please try again later.'
            });
        }
        
        return res.status(500).json({
            response: '🤖 AI service error. Please try again later.'
        });
    }
});

module.exports = router;
