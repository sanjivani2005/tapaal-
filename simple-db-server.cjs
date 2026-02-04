const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialize Prisma Client with proper configuration
let prisma;
try {
    prisma = new PrismaClient();
} catch (error) {
    console.error('Error initializing Prisma:', error);
    process.exit(1);
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// GET all departments
app.get('/api/departments', async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            orderBy: { name: 'asc' }
        });
        res.json({ data: departments });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
});

// POST new department
app.post('/api/departments', async (req, res) => {
    try {
        const { name, code, head, description, location, status } = req.body;

        // Check if department code already exists
        const existingDept = await prisma.department.findFirst({
            where: { code }
        });

        if (existingDept) {
            return res.status(400).json({ error: 'Department code already exists' });
        }

        const newDepartment = await prisma.department.create({
            data: {
                name,
                code,
                head,
                description,
                location,
                status: status || 'Active'
            }
        });

        res.status(201).json({ data: newDepartment });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Failed to create department' });
    }
});

// GET single department
app.get('/api/departments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const department = await prisma.department.findUnique({
            where: { id }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        res.json({ data: department });
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ error: 'Failed to fetch department' });
    }
});

// PUT update department
app.put('/api/departments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const department = await prisma.department.update({
            where: { id },
            data: updateData
        });

        res.json({ data: department });
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Failed to update department' });
    }
});

// DELETE department
app.delete('/api/departments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.department.delete({
            where: { id }
        });
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ error: 'Failed to delete department' });
    }
});

// GET all mails
app.get('/api/mails', async (req, res) => {
    try {
        const { type, department, status, priority, search } = req.query;

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
                    department: true
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
                    department: true
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

        res.json({
            data: {
                inward: inwardMails,
                outward: outwardMails
            }
        });
    } catch (error) {
        console.error('Error fetching mails:', error);
        res.status(500).json({ error: 'Failed to fetch mails' });
    }
});

// POST new mail
app.post('/api/mails', async (req, res) => {
    try {
        const { type, ...mailData } = req.body;

        if (type === 'inward') {
            const newMail = await prisma.inwardMail.create({
                data: {
                    ...mailData,
                    type: 'Inward'
                }
            });
            res.status(201).json({ data: newMail });
        } else if (type === 'outward') {
            const newMail = await prisma.outwardMail.create({
                data: {
                    ...mailData,
                    type: 'Outward'
                }
            });
            res.status(201).json({ data: newMail });
        } else {
            res.status(400).json({ error: 'Invalid mail type' });
        }
    } catch (error) {
        console.error('Error creating mail:', error);
        res.status(500).json({ error: 'Failed to create mail' });
    }
});

// GET single mail
app.get('/api/mails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (type === 'inward') {
            const mail = await prisma.inwardMail.findUnique({
                where: { id },
                include: { department: true }
            });
            res.json({ data: mail });
        } else if (type === 'outward') {
            const mail = await prisma.outwardMail.findUnique({
                where: { id },
                include: { department: true }
            });
            res.json({ data: mail });
        } else {
            res.status(400).json({ error: 'Invalid mail type' });
        }
    } catch (error) {
        console.error('Error fetching mail:', error);
        res.status(500).json({ error: 'Failed to fetch mail' });
    }
});

// DELETE mail
app.delete('/api/mails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query;

        if (type === 'inward') {
            await prisma.inwardMail.delete({ where: { id } });
        } else if (type === 'outward') {
            await prisma.outwardMail.delete({ where: { id } });
        } else {
            res.status(400).json({ error: 'Invalid mail type' });
            return;
        }

        res.json({ message: 'Mail deleted successfully' });
    } catch (error) {
        console.error('Error deleting mail:', error);
        res.status(500).json({ error: 'Failed to delete mail' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Database API Server running on http://localhost:${PORT}`);
    console.log(`📊 Database connected to: ./prisma/dev.db`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Departments: http://localhost:${PORT}/api/departments`);
    console.log(`📧 Mails: http://localhost:${PORT}/api/mails`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('🔄 Shutting down gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});
