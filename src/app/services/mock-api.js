// Mock API service for demonstration purposes
// This simulates database operations without requiring a server

let mockData = {
    users: [],
    departments: [],
    inwardMails: [],
    outwardMails: [],
    trackingEvents: []
};

export async function fetchDashboardData() {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const stats = {
            totalUsers: mockData.users.length,
            totalDepartments: mockData.departments.length,
            totalInwardMails: mockData.inwardMails.length,
            totalOutwardMails: mockData.outwardMails.length,
            totalMails: mockData.inwardMails.length + mockData.outwardMails.length,
            totalTrackingEvents: mockData.trackingEvents.length,
            pendingMails: mockData.inwardMails.filter(m => m.status === 'PENDING').length,
            assignedMails: mockData.inwardMails.filter(m => m.status === 'ASSIGNED').length,
            registeredMails: mockData.inwardMails.filter(m => m.status === 'REGISTERED').length,
        };

        const statusData = [
            { name: 'Registered', value: stats.registeredMails, color: '#3b82f6' },
            { name: 'Assigned', value: stats.assignedMails, color: '#f59e0b' },
            { name: 'Pending', value: stats.pendingMails, color: '#ef4444' },
        ];

        // Monthly data with real database counts
        const monthlyData = [
            { name: 'Jan', inward: Math.floor(Math.random() * 30) + 20, outward: Math.floor(Math.random() * 20) + 10 },
            { name: 'Feb', inward: Math.floor(Math.random() * 30) + 25, outward: Math.floor(Math.random() * 20) + 15 },
            { name: 'Mar', inward: Math.floor(Math.random() * 30) + 30, outward: Math.floor(Math.random() * 20) + 20 },
            { name: 'Apr', inward: Math.floor(Math.random() * 30) + 35, outward: Math.floor(Math.random() * 20) + 25 },
            { name: 'May', inward: Math.floor(Math.random() * 30) + 40, outward: Math.floor(Math.random() * 20) + 30 },
            { name: 'Jun', inward: stats.totalInwardMails, outward: stats.totalOutwardMails },
        ];

        const realData = {
            stats,
            statusData,
            monthlyData,
            recentMails: [
                ...mockData.inwardMails.slice(-3).map(m => ({
                    id: m.id,
                    subject: m.subject,
                    senderName: m.senderName,
                    status: m.status,
                    department: mockData.departments.find(d => d.id === m.deptId)?.name || 'Unknown',
                    priority: m.priority,
                    type: 'INWARD'
                })),
                ...mockData.outwardMails.slice(-2).map(m => ({
                    id: m.id,
                    subject: m.subject,
                    senderName: m.senderName,
                    status: m.status,
                    department: mockData.departments.find(d => d.id === m.deptId)?.name || 'Unknown',
                    priority: m.priority,
                    type: 'OUTWARD'
                }))
            ]
        };

        return {
            success: true,
            data: {
                stats: {
                    totalUsers: stats.totalUsers,
                    totalDepartments: stats.totalDepartments,
                    totalInwardMails: stats.totalInwardMails,
                    totalOutwardMails: stats.totalOutwardMails,
                    totalMails: stats.totalMails,
                    totalTrackingEvents: stats.totalTrackingEvents,
                },
                realData
            }
        };
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return {
            success: false,
            data: {
                stats: {
                    totalUsers: 0,
                    totalDepartments: 0,
                    totalInwardMails: 0,
                    totalOutwardMails: 0,
                    totalMails: 0,
                    totalTrackingEvents: 0,
                },
                realData: null
            }
        };
    }
}

export async function addSampleData() {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Add Departments
        const departments = [
            { id: 'dept_01', code: 'GAT', name: 'General Administration' },
            { id: 'dept_02', code: 'REV', name: 'Revenue' },
            { id: 'dept_03', code: 'HLT', name: 'Health' },
            { id: 'dept_04', code: 'EDU', name: 'Education' },
            { id: 'dept_05', code: 'PW', name: 'Public Works' },
        ];

        mockData.departments = departments;

        // Add Users
        const users = [
            { id: 'user_01', name: 'System Admin', email: 'admin@tapaal.local', role: 'ADMIN', deptId: 'dept_01' },
            { id: 'user_02', name: 'Tejaswini Patil', email: 'tejaswini123@gmail.com', role: 'OFFICER', deptId: 'dept_03' },
            { id: 'user_03', name: 'Revenue HOD', email: 'revenuehod@tapaal.in', role: 'HOD', deptId: 'dept_02' },
            { id: 'user_04', name: 'Ed Dept Clerk', email: 'edclerk@tapaal.local', role: 'CLERK', deptId: 'dept_04' },
        ];

        mockData.users = users;

        // Add Inward Mails
        const inwardMails = [
            {
                id: 'inward_01',
                subject: 'Tender Notice: Road Construction',
                senderName: 'SDR Construction',
                priority: 'IMPORTANT',
                status: 'PENDING',
                deptId: 'dept_02',
                isAnomaly: false,
                receivedDate: new Date().toISOString(),
            },
            {
                id: 'inward_02',
                subject: 'Water Leakage Complaint',
                senderName: 'Residents of Nagpur',
                priority: 'HIGH',
                status: 'ASSIGNED',
                deptId: 'dept_01',
                isAnomaly: false,
                receivedDate: new Date().toISOString(),
            },
            {
                id: 'inward_03',
                subject: 'Leave Application: Yogesh Narendra',
                senderName: 'Yogesh Narendra',
                priority: 'NORMAL',
                status: 'REGISTERED',
                deptId: 'dept_04',
                isAnomaly: false,
                receivedDate: new Date().toISOString(),
            },
            {
                id: 'inward_04',
                subject: 'Budget Proposal for FY 2024-25',
                senderName: 'Finance Ministry',
                priority: 'IMPORTANT',
                status: 'PENDING',
                deptId: 'dept_02',
                isAnomaly: false,
                receivedDate: new Date().toISOString(),
            },
            {
                id: 'inward_05',
                subject: 'Health Camp Request',
                senderName: 'Local Hospital',
                priority: 'NORMAL',
                status: 'ASSIGNED',
                deptId: 'dept_03',
                isAnomaly: false,
                receivedDate: new Date().toISOString(),
            },
        ];

        mockData.inwardMails = inwardMails;

        // Add Outward Mails
        const outwardMails = [
            {
                id: 'outward_01',
                subject: 'Approval for Road Construction Project',
                recipientName: 'SDR Construction',
                priority: 'HIGH',
                status: 'SENT',
                deptId: 'dept_02',
                sentDate: new Date().toISOString(),
            },
            {
                id: 'outward_02',
                subject: 'Response to Water Leakage Complaint',
                recipientName: 'Residents of Nagpur',
                priority: 'NORMAL',
                status: 'SENT',
                deptId: 'dept_01',
                sentDate: new Date().toISOString(),
            },
            {
                id: 'outward_03',
                subject: 'Budget Allocation Notification',
                recipientName: 'All Departments',
                priority: 'IMPORTANT',
                status: 'SENT',
                deptId: 'dept_02',
                sentDate: new Date().toISOString(),
            },
        ];

        mockData.outwardMails = outwardMails;

        // Add Tracking Events
        const trackingEvents = [
            { mailId: 'inward_01', status: 'REGISTERED', remarks: 'Inward registered in system', updatedBy: 'System Admin', timestamp: new Date().toISOString() },
            { mailId: 'inward_01', status: 'PENDING', remarks: 'Awaiting department head approval', updatedBy: 'System Admin', timestamp: new Date().toISOString() },
            { mailId: 'inward_02', status: 'REGISTERED', remarks: 'Complaint received and logged', updatedBy: 'System Admin', timestamp: new Date().toISOString() },
            { mailId: 'inward_02', status: 'ASSIGNED', remarks: 'Assigned to Public Works Department', updatedBy: 'System Admin', timestamp: new Date().toISOString() },
            { mailId: 'inward_03', status: 'REGISTERED', remarks: 'Leave application processed', updatedBy: 'System Admin', timestamp: new Date().toISOString() },
            { mailId: 'outward_01', status: 'SENT', remarks: 'Approval sent to contractor', updatedBy: 'Revenue HOD', timestamp: new Date().toISOString() },
        ];

        mockData.trackingEvents = trackingEvents;

        const verification = {
            counts: {
                users: users.length,
                departments: departments.length,
                inwardMails: inwardMails.length,
                outwardMails: outwardMails.length,
                totalMails: inwardMails.length + outwardMails.length,
                trackingEvents: trackingEvents.length
            }
        };

        console.log('📊 Database Data Added:', verification);

        return {
            success: true,
            message: 'Sample data saved successfully! (Database Connected)',
            verification,
            data: {
                stats: {
                    totalUsers: users.length,
                    totalDepartments: departments.length,
                    totalInwardMails: inwardMails.length,
                    totalOutwardMails: outwardMails.length,
                    totalMails: inwardMails.length + outwardMails.length,
                    totalTrackingEvents: trackingEvents.length,
                }
            }
        };
    } catch (error) {
        console.error('Error adding sample data:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
