import express from 'express';
import cors from 'cors';

// Import PrismaClient with import
// import { PrismaClient } from '@prisma/client';

// Import dynamic API routes
// import dynamicApiRoutes from './src/app/api/dynamic-api.js';

const app = express();
// const prisma = new PrismaClient({ 
//   datasources: {
//     db: {
//       url: "file:./dev.db"
//     }
//   }
// });
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Use dynamic API routes
app.use('/api/v1', dynamicApiRoutes);

// Get dashboard data
app.get('/api/dashboard', async (req, res) => {
    try {
        const [users, departments, mails, trackingEvents, recentMails] = await Promise.all([
            prisma.user.findMany({
                include: { department: true }
            }),
            prisma.department.findMany(),
            prisma.inwardMail.findMany({
                include: { department: true }
            }),
            prisma.trackingEvent.findMany({
                include: { mail: true }
            }),
            prisma.inwardMail.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5
            })
        ]);

        // Calculate real stats
        const stats = {
            totalUsers: users.length,
            totalDepartments: departments.length,
            totalMails: mails.length,
            totalTrackingEvents: trackingEvents.length,
            pendingMails: mails.filter(m => m.status === 'PENDING').length,
            assignedMails: mails.filter(m => m.status === 'ASSIGNED').length,
            registeredMails: mails.filter(m => m.status === 'REGISTERED').length,
        };

        // Status distribution
        const statusData = [
            { name: 'Registered', value: stats.registeredMails, color: '#3b82f6' },
            { name: 'Assigned', value: stats.assignedMails, color: '#f59e0b' },
            { name: 'Pending', value: stats.pendingMails, color: '#ef4444' },
        ];

        // Monthly data
        const monthlyData = [
            { name: 'Jan', inward: Math.floor(Math.random() * 50) + 100, outward: Math.floor(Math.random() * 30) + 50 },
            { name: 'Feb', inward: Math.floor(Math.random() * 50) + 120, outward: Math.floor(Math.random() * 30) + 70 },
            { name: 'Mar', inward: Math.floor(Math.random() * 50) + 110, outward: Math.floor(Math.random() * 30) + 80 },
            { name: 'Apr', inward: Math.floor(Math.random() * 50) + 140, outward: Math.floor(Math.random() * 30) + 90 },
            { name: 'May', inward: Math.floor(Math.random() * 50) + 130, outward: Math.floor(Math.random() * 30) + 100 },
            { name: 'Jun', inward: stats.totalMails, outward: Math.floor(Math.random() * 30) + 110 },
        ];

        const realData = {
            stats,
            statusData,
            monthlyData,
            recentMails: recentMails.map(m => ({
                id: m.id,
                subject: m.subject,
                senderName: m.senderName,
                status: m.status,
                department: m.department?.name || 'Unknown',
                priority: m.priority
            }))
        };

        res.json({
            success: true,
            data: {
                stats: {
                    totalUsers: stats.totalUsers,
                    totalDepartments: stats.totalDepartments,
                    totalMails: stats.totalMails,
                    totalTrackingEvents: stats.totalTrackingEvents,
                },
                realData
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Add sample data
app.post('/api/dashboard', async (req, res) => {
    try {
        const { action } = req.body;

        if (action === 'addSampleData') {
            // 1. Add Departments
            const deptData = [
                { id: 'dept_01', code: 'GAT', name: 'General Administration' },
                { id: 'dept_02', code: 'REV', name: 'Revenue' },
                { id: 'dept_03', code: 'HLT', name: 'Health' },
                { id: 'dept_04', code: 'EDU', name: 'Education' },
                { id: 'dept_05', code: 'PW', name: 'Public Works' },
            ];

            for (const dept of deptData) {
                await prisma.department.upsert({
                    where: { code: dept.code },
                    update: {},
                    create: dept,
                });
            }

            // 2. Add Users
            const userData = [
                { id: 'user_01', name: 'System Admin', email: 'admin@tapaal.local', role: 'ADMIN', deptId: 'dept_01' },
                { id: 'user_02', name: 'Tejaswini Patil', email: 'tejaswini123@gmail.com', role: 'OFFICER', deptId: 'dept_03' },
                { id: 'user_03', name: 'Revenue HOD', email: 'revenuehod@tapaal.in', role: 'HOD', deptId: 'dept_02' },
                { id: 'user_04', name: 'Ed Dept Clerk', email: 'edclerk@tapaal.local', role: 'CLERK', deptId: 'dept_04' },
            ];

            for (const user of userData) {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: user,
                });
            }

            // 3. Add Inward Mails
            const mailData = [
                {
                    id: 'mail_01',
                    subject: 'Tender Notice: Road Construction',
                    senderName: 'SDR Construction',
                    priority: 'IMPORTANT',
                    status: 'PENDING',
                    deptId: 'dept_02',
                    isAnomaly: false,
                },
                {
                    id: 'mail_02',
                    subject: 'Water Leakage Complaint',
                    senderName: 'Residents of Nagpur',
                    priority: 'HIGH',
                    status: 'ASSIGNED',
                    deptId: 'dept_01',
                    isAnomaly: false,
                },
                {
                    id: 'mail_03',
                    subject: 'Leave Application: Yogesh Narendra',
                    senderName: 'Yogesh Narendra',
                    priority: 'NORMAL',
                    status: 'REGISTERED',
                    deptId: 'dept_04',
                    isAnomaly: false,
                },
            ];

            for (const mail of mailData) {
                await prisma.inwardMail.upsert({
                    where: { id: mail.id },
                    update: {},
                    create: mail,
                });
            }

            // 4. Add Tracking Events
            const trackingData = [
                { mailId: 'mail_01', status: 'REGISTERED', remarks: 'Inward registered in system', updatedBy: 'System Admin' },
                { mailId: 'mail_01', status: 'ASSIGNED', remarks: 'Sent to Revenue Dept Head', updatedBy: 'System Admin' },
                { mailId: 'mail_02', status: 'REGISTERED', remarks: 'Complaint received', updatedBy: 'System Admin' },
            ];

            for (const event of trackingData) {
                await prisma.trackingEvent.create({
                    data: event,
                });
            }

            // Get updated dashboard data
            const [userCount, deptCount, mailCount, trackingCount] = await Promise.all([
                prisma.user.count(),
                prisma.department.count(),
                prisma.inwardMail.count(),
                prisma.trackingEvent.count(),
            ]);

            const verification = {
                counts: {
                    users: userCount,
                    departments: deptCount,
                    mails: mailCount,
                    trackingEvents: trackingCount
                }
            };

            res.json({
                success: true,
                message: 'Sample data saved to database successfully!',
                verification,
                data: {
                    stats: {
                        totalUsers: userCount,
                        totalDepartments: deptCount,
                        totalMails: mailCount,
                        totalTrackingEvents: trackingCount,
                    }
                }
            });
        } else {
            res.status(400).json({ success: false, error: 'Invalid action' });
        }
    } catch (error) {
        console.error('Error adding sample data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
});
