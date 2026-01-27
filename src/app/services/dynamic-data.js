// Dynamic Database Service for AI Assistant
// Replaces static mock data with real database queries

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class DynamicDataService {
    constructor() {
        this.prisma = prisma;
    }

    // Get complete system overview
    async getSystemOverview() {
        try {
            const [
                totalInwardMails,
                totalOutwardMails,
                totalUsers,
                totalDepartments,
                totalTrackingEvents,
                activeUsers,
                activeDepartments,
                pendingMails,
                completedMails,
                deliveredMails
            ] = await Promise.all([
                this.prisma.inwardMail.count(),
                this.prisma.outwardMail.count(),
                this.prisma.user.count(),
                this.prisma.department.count(),
                this.prisma.trackingEvent.count(),
                this.prisma.user.count({ where: { status: 'Active' } }),
                this.prisma.department.count({ where: { status: 'Active' } }),
                this.prisma.inwardMail.count({ where: { status: 'PENDING' } }),
                this.prisma.inwardMail.count({ where: { status: 'COMPLETED' } }),
                this.prisma.outwardMail.count({ where: { status: 'DELIVERED' } })
            ]);

            return {
                totalInwardMails,
                totalOutwardMails,
                totalUsers,
                totalDepartments,
                totalTrackingEvents,
                activeUsers,
                activeDepartments,
                pendingMails,
                completedMails,
                deliveredMails,
                totalMails: totalInwardMails + totalOutwardMails
            };
        } catch (error) {
            console.error('Error getting system overview:', error);
            throw error;
        }
    }

    // Get inward mails with filters
    async getInwardMails(filters = {}) {
        try {
            const where = {};

            if (filters.status) {
                where.status = filters.status;
            }
            if (filters.department) {
                where.department = { name: filters.department };
            }
            if (filters.priority) {
                where.priority = filters.priority;
            }

            const mails = await this.prisma.inwardMail.findMany({
                where,
                include: {
                    department: true,
                    tracking: true
                },
                orderBy: { createdAt: 'desc' }
            });

            return mails.map(mail => ({
                id: mail.mailId || mail.id,
                trackingId: mail.trackingId,
                subject: mail.subject,
                details: mail.details || mail.description,
                sender: mail.sender || mail.senderName,
                date: mail.date || mail.createdAt,
                status: mail.status.toLowerCase(),
                priority: mail.priority,
                department: mail.department?.name,
                receivedBy: mail.receivedBy,
                handoverTo: mail.handoverTo,
                deliveryMode: mail.deliveryMode,
                referenceDetails: mail.referenceDetails,
                type: mail.type
            }));
        } catch (error) {
            console.error('Error getting inward mails:', error);
            throw error;
        }
    }

    // Get outward mails with filters
    async getOutwardMails(filters = {}) {
        try {
            const where = {};

            if (filters.status) {
                where.status = filters.status;
            }
            if (filters.department) {
                where.department = { name: filters.department };
            }
            if (filters.priority) {
                where.priority = filters.priority;
            }

            const mails = await this.prisma.outwardMail.findMany({
                where,
                include: {
                    department: true,
                    tracking: true
                },
                orderBy: { createdAt: 'desc' }
            });

            return mails.map(mail => ({
                id: mail.mailId || mail.id,
                trackingId: mail.trackingId,
                subject: mail.subject,
                receiver: mail.receiver,
                date: mail.date || mail.createdAt,
                status: mail.status.toLowerCase().replace('_', '-'),
                priority: mail.priority,
                department: mail.department?.name,
                sentBy: mail.sentBy,
                deliveryMode: mail.deliveryMode,
                dueDate: mail.dueDate,
                attachments: mail.attachments,
                type: mail.type
            }));
        } catch (error) {
            console.error('Error getting outward mails:', error);
            throw error;
        }
    }

    // Get users with filters
    async getUsers(filters = {}) {
        try {
            const where = {};

            if (filters.role) {
                where.role = filters.role;
            }
            if (filters.department) {
                where.department = { name: filters.department };
            }
            if (filters.status) {
                where.status = filters.status;
            }

            const users = await this.prisma.user.findMany({
                where,
                include: {
                    department: true
                },
                orderBy: { name: 'asc' }
            });

            return users.map(user => ({
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department?.name,
                status: user.status
            }));
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

    // Get departments with filters
    async getDepartments(filters = {}) {
        try {
            const where = {};

            if (filters.status) {
                where.status = filters.status;
            }

            const departments = await this.prisma.department.findMany({
                where,
                include: {
                    users: true,
                    mails: true,
                    outwardMails: true
                },
                orderBy: { name: 'asc' }
            });

            return departments.map(dept => ({
                id: dept.id,
                name: dept.name,
                code: dept.code,
                head: dept.head,
                status: dept.status,
                userCount: dept.users.length,
                mailCount: dept.mails.length + dept.outwardMails.length
            }));
        } catch (error) {
            console.error('Error getting departments:', error);
            throw error;
        }
    }

    // Get tracking events with filters
    async getTrackingEvents(filters = {}) {
        try {
            const where = {};

            if (filters.mailType) {
                where.mailType = filters.mailType;
            }
            if (filters.status) {
                where.status = filters.status;
            }
            if (filters.department) {
                where.department = filters.department;
            }

            const events = await this.prisma.trackingEvent.findMany({
                where,
                include: {
                    inwardMail: {
                        include: { department: true }
                    },
                    outwardMail: {
                        include: { department: true }
                    },
                    timeline: true
                },
                orderBy: { createdAt: 'desc' }
            });

            return events.map(event => {
                const mail = event.inwardMail || event.outwardMail;
                return {
                    id: event.eventId || event.id,
                    mailId: mail?.mailId || mail?.id,
                    mailType: event.mailType,
                    subject: event.subject || mail?.subject,
                    sender: event.sender || (event.inwardMail?.sender || event.inwardMail?.senderName),
                    receiver: event.receiver || event.outwardMail?.receiver,
                    currentStatus: event.currentStatus || event.status,
                    priority: event.priority || mail?.priority,
                    department: event.department || mail?.department?.name,
                    assignedTo: event.assignedTo,
                    createdAt: event.createdAt,
                    lastUpdated: event.lastUpdated,
                    timeline: event.timeline.map(t => ({
                        status: t.event,
                        timestamp: t.timestamp,
                        user: t.updatedBy || 'System',
                        remarks: t.remarks
                    }))
                };
            });
        } catch (error) {
            console.error('Error getting tracking events:', error);
            throw error;
        }
    }

    // Get detailed mail information
    async getMailDetails(mailId, mailType) {
        try {
            if (mailType === 'inward') {
                const mail = await this.prisma.inwardMail.findFirst({
                    where: {
                        OR: [
                            { mailId: mailId },
                            { id: mailId }
                        ]
                    },
                    include: {
                        department: true,
                        tracking: {
                            include: { timeline: true }
                        }
                    }
                });

                if (!mail) return null;

                return {
                    id: mail.mailId || mail.id,
                    trackingId: mail.trackingId,
                    subject: mail.subject,
                    details: mail.details || mail.description,
                    sender: mail.sender || mail.senderName,
                    date: mail.date || mail.createdAt,
                    status: mail.status.toLowerCase(),
                    priority: mail.priority,
                    department: mail.department?.name,
                    receivedBy: mail.receivedBy,
                    handoverTo: mail.handoverTo,
                    deliveryMode: mail.deliveryMode,
                    referenceDetails: mail.referenceDetails,
                    type: mail.type
                };
            } else if (mailType === 'outward') {
                const mail = await this.prisma.outwardMail.findFirst({
                    where: {
                        OR: [
                            { mailId: mailId },
                            { id: mailId }
                        ]
                    },
                    include: {
                        department: true,
                        tracking: {
                            include: { timeline: true }
                        }
                    }
                });

                if (!mail) return null;

                return {
                    id: mail.mailId || mail.id,
                    trackingId: mail.trackingId,
                    subject: mail.subject,
                    receiver: mail.receiver,
                    date: mail.date || mail.createdAt,
                    status: mail.status.toLowerCase().replace('_', '-'),
                    priority: mail.priority,
                    department: mail.department?.name,
                    sentBy: mail.sentBy,
                    deliveryMode: mail.deliveryMode,
                    dueDate: mail.dueDate,
                    attachments: mail.attachments,
                    type: mail.type
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting mail details:', error);
            throw error;
        }
    }

    // Get tracking details
    async getTrackingDetails(trackingId) {
        try {
            const event = await this.prisma.trackingEvent.findFirst({
                where: {
                    OR: [
                        { eventId: trackingId },
                        { id: trackingId }
                    ]
                },
                include: {
                    inwardMail: {
                        include: { department: true }
                    },
                    outwardMail: {
                        include: { department: true }
                    },
                    timeline: true
                }
            });

            if (!event) return null;

            const mail = event.inwardMail || event.outwardMail;

            return {
                id: event.eventId || event.id,
                mailId: mail?.mailId || mail?.id,
                mailType: event.mailType,
                subject: event.subject || mail?.subject,
                sender: event.sender || (event.inwardMail?.sender || event.inwardMail?.senderName),
                receiver: event.receiver || event.outwardMail?.receiver,
                currentStatus: event.currentStatus || event.status,
                priority: event.priority || mail?.priority,
                department: event.department || mail?.department?.name,
                assignedTo: event.assignedTo,
                createdAt: event.createdAt,
                lastUpdated: event.lastUpdated,
                timeline: event.timeline.map(t => ({
                    status: t.event,
                    timestamp: t.timestamp,
                    user: t.updatedBy || 'System',
                    remarks: t.remarks
                }))
            };
        } catch (error) {
            console.error('Error getting tracking details:', error);
            throw error;
        }
    }

    // Get department-wise statistics
    async getDepartmentStats() {
        try {
            const departments = await this.prisma.department.findMany({
                include: {
                    users: true,
                    mails: true,
                    outwardMails: true
                }
            });

            const stats = {};

            for (const dept of departments) {
                const deptInwardMails = dept.mails;
                const deptOutwardMails = dept.outwardMails;
                const deptTracking = await this.prisma.trackingEvent.findMany({
                    where: { department: dept.name }
                });

                stats[dept.name] = {
                    department: dept.name,
                    head: dept.head,
                    users: dept.users.length,
                    inwardMails: deptInwardMails.length,
                    outwardMails: deptOutwardMails.length,
                    trackingEvents: deptTracking.length,
                    pendingMails: deptInwardMails.filter(m => m.status === 'PENDING').length,
                    completedMails: deptInwardMails.filter(m => m.status === 'COMPLETED').length
                };
            }

            return stats;
        } catch (error) {
            console.error('Error getting department stats:', error);
            throw error;
        }
    }

    // Get user activity summary
    async getUserActivitySummary() {
        try {
            const users = await this.prisma.user.findMany({
                include: {
                    department: true
                }
            });

            const activity = {};

            for (const user of users) {
                const userInwardMails = await this.prisma.inwardMail.findMany({
                    where: {
                        OR: [
                            { receivedBy: user.name },
                            { handoverTo: user.name }
                        ]
                    }
                });

                const userOutwardMails = await this.prisma.outwardMail.findMany({
                    where: { sentBy: user.name }
                });

                const userTracking = await this.prisma.trackingEvent.findMany({
                    where: { assignedTo: user.name }
                });

                activity[user.name] = {
                    user: user.name,
                    role: user.role,
                    department: user.department?.name,
                    status: user.status,
                    email: user.email,
                    inwardMailsHandled: userInwardMails.length,
                    outwardMailsSent: userOutwardMails.length,
                    trackingEvents: userTracking.length
                };
            }

            return activity;
        } catch (error) {
            console.error('Error getting user activity summary:', error);
            throw error;
        }
    }

    // Search across all modules
    async searchAll(query) {
        try {
            const lowerQuery = query.toLowerCase();

            const [
                inwardMails,
                outwardMails,
                users,
                departments,
                tracking
            ] = await Promise.all([
                this.prisma.inwardMail.findMany({
                    where: {
                        OR: [
                            { subject: { contains: query, mode: 'insensitive' } },
                            { sender: { contains: query, mode: 'insensitive' } },
                            { senderName: { contains: query, mode: 'insensitive' } },
                            { details: { contains: query, mode: 'insensitive' } },
                            { description: { contains: query, mode: 'insensitive' } },
                            { trackingId: { contains: query, mode: 'insensitive' } },
                            { mailId: { contains: query, mode: 'insensitive' } }
                        ]
                    },
                    include: { department: true }
                }),
                this.prisma.outwardMail.findMany({
                    where: {
                        OR: [
                            { subject: { contains: query, mode: 'insensitive' } },
                            { receiver: { contains: query, mode: 'insensitive' } },
                            { trackingId: { contains: query, mode: 'insensitive' } },
                            { mailId: { contains: query, mode: 'insensitive' } }
                        ]
                    },
                    include: { department: true }
                }),
                this.prisma.user.findMany({
                    where: {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { email: { contains: query, mode: 'insensitive' } },
                            { role: { contains: query, mode: 'insensitive' } }
                        ]
                    },
                    include: { department: true }
                }),
                this.prisma.department.findMany({
                    where: {
                        OR: [
                            { name: { contains: query, mode: 'insensitive' } },
                            { code: { contains: query, mode: 'insensitive' } },
                            { head: { contains: query, mode: 'insensitive' } }
                        ]
                    }
                }),
                this.prisma.trackingEvent.findMany({
                    where: {
                        OR: [
                            { subject: { contains: query, mode: 'insensitive' } },
                            { eventId: { contains: query, mode: 'insensitive' } },
                            { currentStatus: { contains: query, mode: 'insensitive' } }
                        ]
                    }
                })
            ]);

            return {
                inwardMails: inwardMails.map(mail => ({
                    ...mail,
                    department: mail.department?.name
                })),
                outwardMails: outwardMails.map(mail => ({
                    ...mail,
                    department: mail.department?.name
                })),
                users: users.map(user => ({
                    ...user,
                    department: user.department?.name
                })),
                departments,
                tracking
            };
        } catch (error) {
            console.error('Error searching:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const dynamicDataService = new DynamicDataService();
export default dynamicDataService;
