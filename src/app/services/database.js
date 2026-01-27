import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function addSampleData() {
    try {
        console.log('🌱 Adding sample data to database...');

        // 1. Add Departments
        const departments = [
            { id: 'dept_01', code: 'GAT', name: 'General Administration' },
            { id: 'dept_02', code: 'REV', name: 'Revenue' },
            { id: 'dept_03', code: 'HLT', name: 'Health' },
            { id: 'dept_04', code: 'EDU', name: 'Education' },
            { id: 'dept_05', code: 'PW', name: 'Public Works' },
        ];

        for (const dept of departments) {
            await prisma.department.upsert({
                where: { code: dept.code },
                update: {},
                create: dept,
            });
        }
        console.log('✅ Departments saved to database!');

        // 2. Add Users
        const users = [
            { id: 'user_01', name: 'System Admin', email: 'admin@tapaal.local', role: 'ADMIN', deptId: 'dept_01' },
            { id: 'user_02', name: 'Tejaswini Patil', email: 'tejaswini123@gmail.com', role: 'OFFICER', deptId: 'dept_03' },
            { id: 'user_03', name: 'Revenue HOD', email: 'revenuehod@tapaal.in', role: 'HOD', deptId: 'dept_02' },
            { id: 'user_04', name: 'Ed Dept Clerk', email: 'edclerk@tapaal.local', role: 'CLERK', deptId: 'dept_04' },
        ];

        for (const user of users) {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: user,
            });
        }
        console.log('✅ Users saved to database!');

        // 3. Add Inward Mails
        const mails = [
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

        for (const mail of mails) {
            await prisma.inwardMail.upsert({
                where: { id: mail.id },
                update: {},
                create: mail,
            });
        }
        console.log('✅ Inward Mails saved to database!');

        // 4. Add Tracking Events
        const trackingEvents = [
            { mailId: 'mail_01', status: 'REGISTERED', remarks: 'Inward registered in system', updatedBy: 'System Admin' },
            { mailId: 'mail_01', status: 'ASSIGNED', remarks: 'Sent to Revenue Dept Head', updatedBy: 'System Admin' },
            { mailId: 'mail_02', status: 'REGISTERED', remarks: 'Complaint received', updatedBy: 'System Admin' },
        ];

        for (const event of trackingEvents) {
            await prisma.trackingEvent.create({
                data: event,
            });
        }
        console.log('✅ Tracking Events saved to database!');

        // Verify data was saved
        const verification = await verifyDataInDatabase();

        console.log('🎉 All data successfully saved to database!');
        return {
            success: true,
            message: 'Sample data saved to database successfully!',
            verification: verification
        };

    } catch (error) {
        console.error('❌ Error saving data to database:', error);
        return { success: false, error: error.message };
    } finally {
        await prisma.$disconnect();
    }
}

export async function verifyDataInDatabase() {
    try {
        const [users, departments, mails, trackingEvents] = await Promise.all([
            prisma.user.findMany(),
            prisma.department.findMany(),
            prisma.inwardMail.findMany(),
            prisma.trackingEvent.findMany(),
        ]);

        return {
            users: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })),
            departments: departments.map(d => ({ id: d.id, code: d.code, name: d.name })),
            mails: mails.map(m => ({ id: m.id, subject: m.subject, status: m.status })),
            trackingEvents: trackingEvents.map(t => ({ mailId: t.mailId, status: t.status })),
            counts: {
                users: users.length,
                departments: departments.length,
                mails: mails.length,
                trackingEvents: trackingEvents.length
            }
        };
    } catch (error) {
        console.error('Error verifying data:', error);
        return null;
    }
}

export async function getDashboardData() {
    try {
        const [users, departments, mails, trackingEvents] = await Promise.all([
            prisma.user.count(),
            prisma.department.count(),
            prisma.inwardMail.count(),
            prisma.trackingEvent.count(),
        ]);

        return {
            totalUsers: users,
            totalDepartments: departments,
            totalMails: mails,
            totalTrackingEvents: trackingEvents,
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return {
            totalUsers: 0,
            totalDepartments: 0,
            totalMails: 0,
            totalTrackingEvents: 0,
        };
    }
}

// NEW: Get real data from database for charts
export async function getRealDashboardData() {
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

        // Department-wise mail distribution
        const departmentMails = departments.map(dept => ({
            name: dept.name,
            count: mails.filter(m => m.deptId === dept.id).length
        }));

        // Status distribution
        const statusData = [
            { name: 'Registered', value: stats.registeredMails, color: '#3b82f6' },
            { name: 'Assigned', value: stats.assignedMails, color: '#f59e0b' },
            { name: 'Pending', value: stats.pendingMails, color: '#ef4444' },
        ];

        // Monthly data (mock for now, can be enhanced with real dates)
        const monthlyData = [
            { name: 'Jan', inward: Math.floor(Math.random() * 50) + 100, outward: Math.floor(Math.random() * 30) + 50 },
            { name: 'Feb', inward: Math.floor(Math.random() * 50) + 120, outward: Math.floor(Math.random() * 30) + 70 },
            { name: 'Mar', inward: Math.floor(Math.random() * 50) + 110, outward: Math.floor(Math.random() * 30) + 80 },
            { name: 'Apr', inward: Math.floor(Math.random() * 50) + 140, outward: Math.floor(Math.random() * 30) + 90 },
            { name: 'May', inward: Math.floor(Math.random() * 50) + 130, outward: Math.floor(Math.random() * 30) + 100 },
            { name: 'Jun', inward: stats.totalMails, outward: Math.floor(Math.random() * 30) + 110 },
        ];

        return {
            stats,
            departmentMails,
            statusData,
            monthlyData,
            recentMails: recentMails.map(m => ({
                id: m.id,
                subject: m.subject,
                senderName: m.senderName,
                status: m.status,
                department: m.department?.name || 'Unknown',
                priority: m.priority
            })),
            users: users.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                role: u.role,
                department: u.department?.name || 'Not Assigned'
            }))
        };
    } catch (error) {
        console.error('Error fetching real dashboard data:', error);
        return null;
    }
}
