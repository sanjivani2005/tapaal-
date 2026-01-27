// Quick data insertion using direct database connection
import { PrismaClient } from '@prisma/client';

// Use environment variable or fallback
const DATABASE_URL = "postgresql://c7855a5d5783c9487b7410a02847bfbb49af1c83bacd4dcf9a1cba8e5f7ba082:sk_lBtWtytB-esCpAoiWB0kx@db.prisma.io:5432/postgres?sslmode=require";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL
        }
    }
});

async function addData() {
    try {
        console.log('🌱 Adding sample data...');

        // Add Departments
        await prisma.department.createMany({
            data: [
                { id: 'dept_01', code: 'GAT', name: 'General Administration' },
                { id: 'dept_02', code: 'REV', name: 'Revenue' },
                { id: 'dept_03', code: 'HLT', name: 'Health' },
                { id: 'dept_04', code: 'EDU', name: 'Education' },
                { id: 'dept_05', code: 'PW', name: 'Public Works' },
            ],
            skipDuplicates: true
        });
        console.log('✅ Departments added!');

        // Add Users
        await prisma.user.createMany({
            data: [
                { id: 'user_01', name: 'System Admin', email: 'admin@tapaal.local', role: 'ADMIN', deptId: 'dept_01' },
                { id: 'user_02', name: 'Tejaswini Patil', email: 'tejaswini123@gmail.com', role: 'OFFICER', deptId: 'dept_03' },
                { id: 'user_03', name: 'Revenue HOD', email: 'revenuehod@tapaal.in', role: 'HOD', deptId: 'dept_02' },
                { id: 'user_04', name: 'Ed Dept Clerk', email: 'edclerk@tapaal.local', role: 'CLERK', deptId: 'dept_04' },
            ],
            skipDuplicates: true
        });
        console.log('✅ Users added!');

        // Add Inward Mails
        await prisma.inwardMail.createMany({
            data: [
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
            ],
            skipDuplicates: true
        });
        console.log('✅ Inward Mails added!');

        // Add Tracking Events
        await prisma.trackingEvent.createMany({
            data: [
                { mailId: 'mail_01', status: 'REGISTERED', remarks: 'Inward registered in system', updatedBy: 'System Admin' },
                { mailId: 'mail_01', status: 'ASSIGNED', remarks: 'Sent to Revenue Dept Head', updatedBy: 'System Admin' },
                { mailId: 'mail_02', status: 'REGISTERED', remarks: 'Complaint received', updatedBy: 'System Admin' },
            ],
            skipDuplicates: true
        });
        console.log('✅ Tracking Events added!');

        console.log('🎉 All data added successfully!');
        console.log('📊 Check Prisma Studio at http://localhost:5555');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

addData();
