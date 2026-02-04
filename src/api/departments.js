const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                _count: {
                    select: {
                        mails: true,
                        outwardMails: true,
                        users: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        });

        return res.json({ data: departments });

    } catch (error) {
        console.error('Error fetching departments:', error);
        return res.status(500).json({ error: 'Failed to fetch departments' });
    }
};

// POST new department
exports.createDepartment = async (req, res) => {
    try {
        const { name, code, head, description, location, employeeCount, budget, status, parentDepartment } = req.body;

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

        return res.status(201).json({ data: newDepartment });

    } catch (error) {
        console.error('Error creating department:', error);
        return res.status(500).json({ error: 'Failed to create department' });
    }
};

// GET single department
exports.getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await prisma.department.findUnique({
            where: { id },
            include: {
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        status: true
                    }
                },
                mails: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                },
                outwardMails: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                },
                _count: {
                    select: {
                        mails: true,
                        outwardMails: true,
                        users: true
                    }
                }
            }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        return res.json({ data: department });

    } catch (error) {
        console.error('Error fetching department:', error);
        return res.status(500).json({ error: 'Failed to fetch department' });
    }
};

// PUT update department
exports.updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if code is being updated and if it conflicts
        if (updateData.code) {
            const existingDept = await prisma.department.findFirst({
                where: {
                    code: updateData.code,
                    id: { not: id }
                }
            });

            if (existingDept) {
                return res.status(400).json({ error: 'Department code already exists' });
            }
        }

        const department = await prisma.department.update({
            where: { id },
            data: {
                ...updateData,
                updatedAt: new Date()
            }
        });

        return res.json({ data: department });

    } catch (error) {
        console.error('Error updating department:', error);
        return res.status(500).json({ error: 'Failed to update department' });
    }
};

// DELETE department
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if department has associated mails or users
        const [mailCount, userCount] = await Promise.all([
            prisma.inwardMail.count({ where: { deptId: id } }),
            prisma.user.count({ where: { deptId: id } })
        ]);

        if (mailCount > 0 || userCount > 0) {
            return res.status(400).json({
                error: 'Cannot delete department with associated mails or users'
            });
        }

        await prisma.department.delete({
            where: { id }
        });

        return res.json({ message: 'Department deleted successfully' });

    } catch (error) {
        console.error('Error deleting department:', error);
        return res.status(500).json({ error: 'Failed to delete department' });
    }
};
