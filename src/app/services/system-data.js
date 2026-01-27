// Complete System Data Service for AI Assistant
// Aggregates data from all pages and modules

class SystemDataService {
    constructor() {
        this.inwardMails = [
            {
                id: 'INW-2024-001',
                trackingId: 'TRK-1234',
                receivedBy: 'Kumar M',
                handoverTo: 'Thuzharajan M',
                sender: 'BigEye Global Solutions - BGS',
                date: '2024-01-15 10:30:00',
                type: 'Inward',
                deliveryMode: 'Courier',
                details: 'Tax details for Q4 2023',
                referenceDetails: 'TAX-Q4-2023-045',
                status: 'pending',
                priority: 'High',
                department: 'Finance'
            },
            {
                id: 'INW-2024-002',
                trackingId: 'TRK-1235',
                receivedBy: 'Rajesh K',
                handoverTo: 'Priya S',
                sender: 'SDR Construction',
                date: '2024-01-16 11:15:00',
                type: 'Inward',
                deliveryMode: 'Hand',
                details: 'Tender documents for road construction',
                referenceDetails: 'TENDER-ROAD-2024-001',
                status: 'assigned',
                priority: 'Important',
                department: 'Revenue'
            },
            {
                id: 'INW-2024-003',
                trackingId: 'TRK-1236',
                receivedBy: 'Anand P',
                handoverTo: 'Meera R',
                sender: 'Education Department',
                date: '2024-01-17 09:45:00',
                type: 'Inward',
                deliveryMode: 'Post',
                details: 'Student scholarship applications',
                referenceDetails: 'EDU-SCHOLAR-2024-012',
                status: 'completed',
                priority: 'Normal',
                department: 'Education'
            }
        ];

        this.outwardMails = [
            {
                id: 'OUT-2024-001',
                trackingId: 'TRK-1245',
                subject: 'Tender Notice Publication',
                receiver: 'All Vendors',
                department: 'Procurement',
                sentBy: 'John Doe',
                date: '2024-01-15 14:30:00',
                deliveryMode: 'Courier',
                status: 'delivered',
                priority: 'Important',
                dueDate: '2024-01-20',
                attachments: 3
            },
            {
                id: 'OUT-2024-002',
                trackingId: 'TRK-1246',
                subject: 'Monthly Financial Report',
                receiver: 'Finance Ministry',
                department: 'Finance',
                sentBy: 'Jane Smith',
                date: '2024-01-16 16:00:00',
                deliveryMode: 'Email',
                status: 'in-transit',
                priority: 'High',
                dueDate: '2024-01-18',
                attachments: 5
            },
            {
                id: 'OUT-2024-003',
                trackingId: 'TRK-1247',
                subject: 'Employee Circular',
                receiver: 'All Departments',
                department: 'HR',
                sentBy: 'James Taylor',
                date: '2024-01-17 10:00:00',
                deliveryMode: 'Internal',
                status: 'delivered',
                priority: 'Normal',
                dueDate: '2024-01-17',
                attachments: 1
            }
        ];

        this.users = [
            { name: 'John Doe', email: 'john.doe@gov.in', role: 'Admin', department: 'Administration', status: 'Active' },
            { name: 'Jane Smith', email: 'jane.smith@gov.in', role: 'HOD', department: 'Finance', status: 'Active' },
            { name: 'Mike Johnson', email: 'mike.j@gov.in', role: 'Clerk', department: 'HR', status: 'Active' },
            { name: 'Sarah Williams', email: 'sarah.w@gov.in', role: 'Officer', department: 'IT', status: 'Active' },
            { name: 'Robert Brown', email: 'robert.b@gov.in', role: 'HOD', department: 'Operations', status: 'Active' },
            { name: 'Emily Davis', email: 'emily.d@gov.in', role: 'Clerk', department: 'Finance', status: 'Inactive' }
        ];

        this.departments = [
            { id: 'DEPT-001', name: 'Administration', code: 'ADM', head: 'Maria Garcia', status: 'Active' },
            { id: 'DEPT-002', name: 'Finance', code: 'FIN', head: 'Jane Smith', status: 'Active' },
            { id: 'DEPT-003', name: 'Human Resources', code: 'HR', head: 'James Taylor', status: 'Active' },
            { id: 'DEPT-004', name: 'Information Technology', code: 'IT', head: 'Sarah Williams', status: 'Active' },
            { id: 'DEPT-005', name: 'Operations', code: 'OPS', head: 'Robert Brown', status: 'Active' },
            { id: 'DEPT-006', name: 'Legal', code: 'LEG', head: 'David Wilson', status: 'Active' },
            { id: 'DEPT-007', name: 'Procurement', code: 'PRO', head: 'Lisa Anderson', status: 'Active' },
            { id: 'DEPT-008', name: 'Facilities', code: 'FAC', head: 'Michael Chen', status: 'Active' },
            { id: 'DEPT-009', name: 'Public Relations', code: 'PR', head: 'Emma Thompson', status: 'Active' },
            { id: 'DEPT-010', name: 'Audit & Compliance', code: 'AUD', head: 'Daniel Lee', status: 'Active' }
        ];

        this.trackingEvents = [
            {
                id: 'TRK-2401',
                mailId: 'INW-2024-001',
                mailType: 'Inward',
                subject: 'Tax details for Q4 2023',
                sender: 'BigEye Global Solutions',
                currentStatus: 'Pending',
                priority: 'High',
                department: 'Finance',
                assignedTo: 'John Doe',
                createdAt: '2024-01-15 09:00',
                lastUpdated: '2024-01-15 14:30',
                timeline: [
                    { status: 'Registered', timestamp: '2024-01-15 09:00', user: 'Clerk', remarks: 'New inward mail registered' },
                    { status: 'Assigned', timestamp: '2024-01-15 10:30', user: 'Kumar M', remarks: 'Mail assigned to Finance department' },
                    { status: 'In Progress', timestamp: '2024-01-15 14:30', user: 'John Doe', remarks: 'Processing tax documents' }
                ]
            },
            {
                id: 'TRK-2402',
                mailId: 'OUT-2024-001',
                mailType: 'Outward',
                subject: 'Tender Notice Publication',
                receiver: 'All Vendors',
                currentStatus: 'Delivered',
                priority: 'Important',
                department: 'Procurement',
                assignedTo: 'John Doe',
                createdAt: '2024-01-15 11:00',
                lastUpdated: '2024-01-16 09:00',
                timeline: [
                    { status: 'Created', timestamp: '2024-01-15 11:00', user: 'John Doe', remarks: 'Tender notice created' },
                    { status: 'Approved', timestamp: '2024-01-15 14:00', user: 'HOD', remarks: 'Approved by department head' },
                    { status: 'Dispatched', timestamp: '2024-01-15 16:00', user: 'Courier', remarks: 'Sent via courier service' },
                    { status: 'Delivered', timestamp: '2024-01-16 09:00', user: 'System', remarks: 'Successfully delivered to all vendors' }
                ]
            }
        ];
    }

    // Get complete system overview
    getSystemOverview() {
        return {
            totalInwardMails: this.inwardMails.length,
            totalOutwardMails: this.outwardMails.length,
            totalUsers: this.users.length,
            totalDepartments: this.departments.length,
            totalTrackingEvents: this.trackingEvents.length,
            activeUsers: this.users.filter(u => u.status === 'Active').length,
            activeDepartments: this.departments.filter(d => d.status === 'Active').length,
            pendingMails: this.inwardMails.filter(m => m.status === 'pending').length,
            completedMails: this.inwardMails.filter(m => m.status === 'completed').length,
            deliveredMails: this.outwardMails.filter(m => m.status === 'delivered').length
        };
    }

    // Get inward mails with filters
    getInwardMails(filters = {}) {
        let filtered = [...this.inwardMails];

        if (filters.status) {
            filtered = filtered.filter(mail => mail.status === filters.status);
        }
        if (filters.department) {
            filtered = filtered.filter(mail => mail.department === filters.department);
        }
        if (filters.priority) {
            filtered = filtered.filter(mail => mail.priority === filters.priority);
        }

        return filtered;
    }

    // Get outward mails with filters
    getOutwardMails(filters = {}) {
        let filtered = [...this.outwardMails];

        if (filters.status) {
            filtered = filtered.filter(mail => mail.status === filters.status);
        }
        if (filters.department) {
            filtered = filtered.filter(mail => mail.department === filters.department);
        }
        if (filters.priority) {
            filtered = filtered.filter(mail => mail.priority === filters.priority);
        }

        return filtered;
    }

    // Get users with filters
    getUsers(filters = {}) {
        let filtered = [...this.users];

        if (filters.role) {
            filtered = filtered.filter(user => user.role === filters.role);
        }
        if (filters.department) {
            filtered = filtered.filter(user => user.department === filters.department);
        }
        if (filters.status) {
            filtered = filtered.filter(user => user.status === filters.status);
        }

        return filtered;
    }

    // Get departments with filters
    getDepartments(filters = {}) {
        let filtered = [...this.departments];

        if (filters.status) {
            filtered = filtered.filter(dept => dept.status === filters.status);
        }

        return filtered;
    }

    // Get tracking events with filters
    getTrackingEvents(filters = {}) {
        let filtered = [...this.trackingEvents];

        if (filters.mailType) {
            filtered = filtered.filter(event => event.mailType === filters.mailType);
        }
        if (filters.status) {
            filtered = filtered.filter(event => event.currentStatus === filters.status);
        }
        if (filters.department) {
            filtered = filtered.filter(event => event.department === filters.department);
        }

        return filtered;
    }

    // Get detailed mail information
    getMailDetails(mailId, mailType) {
        if (mailType === 'inward') {
            return this.inwardMails.find(mail => mail.id === mailId);
        } else if (mailType === 'outward') {
            return this.outwardMails.find(mail => mail.id === mailId);
        }
        return null;
    }

    // Get user details
    getUserDetails(userName) {
        return this.users.find(user => user.name === userName);
    }

    // Get department details
    getDepartmentDetails(deptId) {
        return this.departments.find(dept => dept.id === deptId);
    }

    // Get tracking details
    getTrackingDetails(trackingId) {
        return this.trackingEvents.find(event => event.id === trackingId);
    }

    // Get department-wise statistics
    getDepartmentStats() {
        const stats = {};

        this.departments.forEach(dept => {
            const deptUsers = this.users.filter(u => u.department === dept.name);
            const deptInwardMails = this.inwardMails.filter(m => m.department === dept.name);
            const deptOutwardMails = this.outwardMails.filter(m => m.department === dept.name);
            const deptTracking = this.trackingEvents.filter(t => t.department === dept.name);

            stats[dept.name] = {
                department: dept.name,
                head: dept.head,
                users: deptUsers.length,
                inwardMails: deptInwardMails.length,
                outwardMails: deptOutwardMails.length,
                trackingEvents: deptTracking.length,
                pendingMails: deptInwardMails.filter(m => m.status === 'pending').length,
                completedMails: deptInwardMails.filter(m => m.status === 'completed').length
            };
        });

        return stats;
    }

    // Get user activity summary
    getUserActivitySummary() {
        const activity = {};

        this.users.forEach(user => {
            const userInwardMails = this.inwardMails.filter(m =>
                m.receivedBy === user.name || m.handoverTo === user.name
            );
            const userOutwardMails = this.outwardMails.filter(m => m.sentBy === user.name);
            const userTracking = this.trackingEvents.filter(t => t.assignedTo === user.name);

            activity[user.name] = {
                user: user.name,
                role: user.role,
                department: user.department,
                status: user.status,
                email: user.email,
                inwardMailsHandled: userInwardMails.length,
                outwardMailsSent: userOutwardMails.length,
                trackingEvents: userTracking.length
            };
        });

        return activity;
    }

    // Search across all modules
    searchAll(query) {
        const results = {
            inwardMails: [],
            outwardMails: [],
            users: [],
            departments: [],
            tracking: []
        };

        const lowerQuery = query.toLowerCase();

        // Search inward mails
        results.inwardMails = this.inwardMails.filter(mail =>
            mail.subject?.toLowerCase().includes(lowerQuery) ||
            mail.sender?.toLowerCase().includes(lowerQuery) ||
            mail.details?.toLowerCase().includes(lowerQuery) ||
            mail.trackingId?.toLowerCase().includes(lowerQuery)
        );

        // Search outward mails
        results.outwardMails = this.outwardMails.filter(mail =>
            mail.subject?.toLowerCase().includes(lowerQuery) ||
            mail.receiver?.toLowerCase().includes(lowerQuery) ||
            mail.trackingId?.toLowerCase().includes(lowerQuery)
        );

        // Search users
        results.users = this.users.filter(user =>
            user.name?.toLowerCase().includes(lowerQuery) ||
            user.email?.toLowerCase().includes(lowerQuery) ||
            user.role?.toLowerCase().includes(lowerQuery) ||
            user.department?.toLowerCase().includes(lowerQuery)
        );

        // Search departments
        results.departments = this.departments.filter(dept =>
            dept.name?.toLowerCase().includes(lowerQuery) ||
            dept.code?.toLowerCase().includes(lowerQuery) ||
            dept.head?.toLowerCase().includes(lowerQuery)
        );

        // Search tracking
        results.tracking = this.trackingEvents.filter(event =>
            event.subject?.toLowerCase().includes(lowerQuery) ||
            event.mailId?.toLowerCase().includes(lowerQuery) ||
            event.currentStatus?.toLowerCase().includes(lowerQuery)
        );

        return results;
    }
}

// Export singleton instance
export const systemDataService = new SystemDataService();
export default systemDataService;
