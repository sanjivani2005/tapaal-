const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Import API routes
const mailRoutes = require('./src/api/mails.cjs');
const departmentRoutes = require('./src/api/departments.cjs');
const { addInwardMails } = require('./add-inward-data.cjs');

const app = express();
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: 'file:./prisma/dev.db'
        }
    }
});
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Add inward mails data endpoint
app.post('/api/add-inward-data', async (req, res) => {
    const result = await addInwardMails();
    res.json(result);
});

// API Routes
app.use('/api/mails', mailRoutes);
app.use('/api/departments', departmentRoutes);

// Get dashboard data
app.get('/api/dashboard', async (req, res) => {
    try {
        const [users, departments, inwardMails, outwardMails, trackingEvents] = await Promise.all([
            prisma.user.findMany({
                include: { department: true }
            }),
            prisma.department.findMany({
                include: {
                    _count: {
                        select: {
                            mails: true,
                            outwardMails: true,
                            users: true
                        }
                    }
                }
            }),
            prisma.inwardMail.findMany({
                include: { department: true },
                orderBy: { createdAt: 'desc' },
                take: 10
            }),
            prisma.outwardMail.findMany({
                include: { department: true },
                orderBy: { createdAt: 'desc' },
                take: 10
            }),
            prisma.trackingEvent.findMany({
                orderBy: { createdAt: 'desc' },
                take: 20
            })
        ]);

        // Calculate statistics
        const stats = {
            totalUsers: users.length,
            totalDepartments: departments.length,
            totalInwardMails: await prisma.inwardMail.count(),
            totalOutwardMails: await prisma.outwardMail.count(),
            pendingMails: await prisma.inwardMail.count({ where: { status: 'PENDING' } }),
            completedMails: await prisma.inwardMail.count({ where: { status: 'COMPLETED' } }),
            activeUsers: users.filter(user => user.status === 'Active').length,
            departmentsWithMails: departments.filter(dept => dept._count.mails > 0).length
        };

        res.json({
            stats,
            users,
            departments,
            recentInwardMails: inwardMails,
            recentOutwardMails: outwardMails,
            trackingEvents
        });

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`📧 Mails API: http://localhost:${PORT}/api/mails`);
    console.log(`🏢 Departments API: http://localhost:${PORT}/api/departments`);
});
