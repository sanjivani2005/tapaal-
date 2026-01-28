const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all mails
exports.getAllMails = async (req, res) => {
    try {
        const { type, department, status, priority, search } = req.query;

        let whereClause = {};

        if (type === 'inward') {
            const inwardMails = await prisma.inwardMail.findMany({
                where: {
                    ...(department && { department: { name: { contains: department } } }),
                    ...(status && { status: { contains: status } }),
                    ...(priority && { priority: { contains: priority } }),
                    ...(search && {
                        OR: [
                            { subject: { contains: search } },
                            { sender: { contains: search } },
                            { description: { contains: search } }
                        ]
                    })
                },
                include: {
                    department: true,
                    tracking: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            return res.json({ data: inwardMails, type: 'inward' });
        } else if (type === 'outward') {
            const outwardMails = await prisma.outwardMail.findMany({
                where: {
                    ...(department && { department: { name: { contains: department } } }),
                    ...(status && { status: { contains: status } }),
                    ...(priority && { priority: { contains: priority } }),
                    ...(search && {
                        OR: [
                            { subject: { contains: search } },
                            { receiver: { contains: search } },
                            { description: { contains: search } }
                        ]
                    })
                },
                include: {
                    department: true,
                    tracking: {
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    }
                },
                orderBy: { createdAt: 'desc' }
            });

            return res.json({ data: outwardMails, type: 'outward' });
        }

        // Return all mails if no type specified
        const [inwardMails, outwardMails] = await Promise.all([
            prisma.inwardMail.findMany({
                include: { department: true },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.outwardMail.findMany({
                include: { department: true },
                orderBy: { createdAt: 'desc' }
            })
        ]);

        return res.json({
            inward: inwardMails,
            outward: outwardMails
        });

    } catch (error) {
        console.error('Error fetching mails:', error);
        return res.status(500).json({ error: 'Failed to fetch mails' });
    }
};

// POST new mail
exports.createMail = async (req, res) => {
    try {
        const { type, ...mailData } = req.body;

        if (!type || (type !== 'inward' && type !== 'outward')) {
            return res.status(400).json({
                error: 'Invalid mail type. Must be "inward" or "outward"'
            });
        }

        let newMail;

        if (type === 'inward') {
            // Generate mail ID
            const mailCount = await prisma.inwardMail.count();
            const mailId = `INW-${new Date().getFullYear()}-${String(mailCount + 1).padStart(3, '0')}`;

            newMail = await prisma.inwardMail.create({
                data: {
                    ...mailData,
                    mailId,
                    deptId: mailData.deptId || mailData.departmentId
                },
                include: {
                    department: true
                }
            });

            // Create initial tracking event
            await prisma.trackingEvent.create({
                data: {
                    inwardMailId: newMail.id,
                    eventId: `TRK-INW-${Date.now()}`,
                    mailType: 'Inward',
                    status: newMail.status,
                    subject: newMail.subject,
                    sender: newMail.sender,
                    priority: newMail.priority,
                    department: newMail.department?.name,
                    updatedBy: 'System'
                }
            });
        } else {
            // Generate mail ID
            const mailCount = await prisma.outwardMail.count();
            const mailId = `OUT-${new Date().getFullYear()}-${String(mailCount + 1).padStart(3, '0')}`;

            newMail = await prisma.outwardMail.create({
                data: {
                    ...mailData,
                    mailId,
                    deptId: mailData.deptId || mailData.departmentId
                },
                include: {
                    department: true
                }
            });

            // Create initial tracking event
            await prisma.trackingEvent.create({
                data: {
                    outwardMailId: newMail.id,
                    eventId: `TRK-OUT-${Date.now()}`,
                    mailType: 'Outward',
                    status: newMail.status,
                    subject: newMail.subject,
                    receiver: newMail.receiver,
                    priority: newMail.priority,
                    department: newMail.department?.name,
                    updatedBy: 'System'
                }
            });
        }

        return res.status(201).json({ data: newMail, type });

    } catch (error) {
        console.error('Error creating mail:', error);
        return res.status(500).json({ error: 'Failed to create mail' });
    }
};

// GET single mail
exports.getMailById = async (req, res) => {
    try {
        const { id, type } = req.params;

        let mail;
        if (type === 'inward') {
            mail = await prisma.inwardMail.findUnique({
                where: { id },
                include: {
                    department: true,
                    tracking: {
                        orderBy: { createdAt: 'desc' }
                    }
                }
            });
        } else if (type === 'outward') {
            mail = await prisma.outwardMail.findUnique({
                where: { id },
                include: {
                    department: true,
                    tracking: {
                        orderBy: { createdAt: 'desc' }
                    }
                }
            });
        }

        if (!mail) {
            return res.status(404).json({ error: 'Mail not found' });
        }

        return res.json({ data: mail });

    } catch (error) {
        console.error('Error fetching mail:', error);
        return res.status(500).json({ error: 'Failed to fetch mail' });
    }
};

// PUT update mail
exports.updateMail = async (req, res) => {
    try {
        const { id, type } = req.params;
        const updateData = req.body;

        let mail;
        if (type === 'inward') {
            mail = await prisma.inwardMail.update({
                where: { id },
                data: {
                    ...updateData,
                    updatedAt: new Date()
                },
                include: {
                    department: true
                }
            });
        } else if (type === 'outward') {
            mail = await prisma.outwardMail.update({
                where: { id },
                data: {
                    ...updateData,
                    updatedAt: new Date()
                },
                include: {
                    department: true
                }
            });
        }

        // Create tracking event for status change
        if (updateData.status) {
            await prisma.trackingEvent.create({
                data: {
                    ...(type === 'inward'
                        ? { inwardMailId: id, eventId: `TRK-INW-${Date.now()}` }
                        : { outwardMailId: id, eventId: `TRK-OUT-${Date.now()}` }
                    ),
                    mailType: type.charAt(0).toUpperCase() + type.slice(1),
                    status: updateData.status,
                    subject: mail.subject,
                    ...(type === 'inward' ? { sender: mail.sender } : { receiver: mail.receiver }),
                    priority: mail.priority,
                    department: mail.department?.name,
                    updatedBy: 'System'
                }
            });
        }

        return res.json({ data: mail });

    } catch (error) {
        console.error('Error updating mail:', error);
        return res.status(500).json({ error: 'Failed to update mail' });
    }
};

// DELETE mail
exports.deleteMail = async (req, res) => {
    try {
        const { id, type } = req.params;

        if (type === 'inward') {
            // Delete tracking events first
            await prisma.trackingEvent.deleteMany({
                where: { inwardMailId: id }
            });
            await prisma.inwardMail.delete({
                where: { id }
            });
        } else if (type === 'outward') {
            // Delete tracking events first
            await prisma.trackingEvent.deleteMany({
                where: { outwardMailId: id }
            });
            await prisma.outwardMail.delete({
                where: { id }
            });
        }

        return res.json({ message: 'Mail deleted successfully' });

    } catch (error) {
        console.error('Error deleting mail:', error);
        return res.status(500).json({ error: 'Failed to delete mail' });
    }
};
