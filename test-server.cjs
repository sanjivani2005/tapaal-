const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Mock departments data
const mockDepartments = [
    { id: 'DEPT-001', name: 'Administration', code: 'ADM', head: 'Maria Garcia', status: 'Active' },
    { id: 'DEPT-002', name: 'Finance', code: 'FIN', head: 'Jane Smith', status: 'Active' },
    { id: 'DEPT-003', name: 'Human Resources', code: 'HR', head: 'James Taylor', status: 'Active' },
    { id: 'DEPT-004', name: 'Information Technology', code: 'IT', head: 'Sarah Williams', status: 'Active' },
    { id: 'DEPT-005', name: 'Operations', code: 'OPS', head: 'Robert Brown', status: 'Active' }
];

// GET all departments
app.get('/api/departments', (req, res) => {
    res.json({ data: mockDepartments });
});

// POST new department
app.post('/api/departments', (req, res) => {
    const { name, code, head, description, location, status } = req.body;

    const newDepartment = {
        id: `DEPT-${Date.now().toString().slice(-3)}`,
        name,
        code,
        head,
        description,
        location,
        status: status || 'Active'
    };

    mockDepartments.push(newDepartment);
    res.status(201).json({ data: newDepartment });
});

// Mock outward mails data
const mockOutwardMails = [
    {
        id: 'OUT-001',
        mailId: 'OUT-2024-001',
        subject: 'Tender Notice Publication',
        receiver: 'All Vendors',
        priority: 'Important',
        status: 'delivered',
        department: { id: 'DEPT-007', name: 'Procurement', code: 'PRO' },
        date: new Date().toISOString(),
        description: 'Tender notice publication for all registered vendors'
    },
    {
        id: 'OUT-002',
        mailId: 'OUT-2024-002',
        subject: 'Appointment Letter',
        receiver: 'New Employee - Sarah Williams',
        priority: 'High',
        status: 'pending',
        department: { id: 'DEPT-003', name: 'Human Resources', code: 'HR' },
        date: new Date().toISOString(),
        description: 'Appointment letter for new employee onboarding'
    },
    {
        id: 'OUT-003',
        mailId: 'OUT-2024-003',
        subject: 'Payment Confirmation',
        receiver: 'ABC Corporation Ltd',
        priority: 'Important',
        status: 'in-transit',
        department: { id: 'DEPT-002', name: 'Finance', code: 'FIN' },
        date: new Date().toISOString(),
        description: 'Payment confirmation for services rendered'
    }
];

// Mock inward mails data
const mockInwardMails = [
    {
        id: 'INW-001',
        mailId: 'INW-2024-001',
        subject: 'Tax details for Q4 2023',
        sender: 'BigEye Global Solutions',
        senderName: 'BigEye Global Solutions',
        priority: 'High',
        status: 'pending',
        department: { id: 'DEPT-002', name: 'Finance', code: 'FIN' },
        date: new Date().toISOString(),
        description: 'Tax details for Q4 2023 - Complete financial documentation'
    },
    {
        id: 'INW-002',
        mailId: 'INW-2024-002',
        subject: 'Contract papers for new project',
        sender: 'XYZ Enterprises Pvt Ltd',
        senderName: 'XYZ Enterprises Pvt Ltd',
        priority: 'Important',
        status: 'assigned',
        department: { id: 'DEPT-006', name: 'Legal', code: 'LEG' },
        date: new Date().toISOString(),
        description: 'Contract papers for new infrastructure project'
    },
    {
        id: 'INW-003',
        mailId: 'INW-2024-003',
        subject: 'Employee onboarding documents',
        sender: 'HR Department',
        senderName: 'HR Department',
        priority: 'Medium',
        status: 'completed',
        department: { id: 'DEPT-003', name: 'Human Resources', code: 'HR' },
        date: new Date().toISOString(),
        description: 'New employee onboarding package and forms'
    },
    {
        id: 'INW-004',
        mailId: 'INW-2024-004',
        subject: 'Budget approval request',
        sender: 'Operations Manager',
        senderName: 'Operations Manager',
        priority: 'High',
        status: 'in_progress',
        department: { id: 'DEPT-005', name: 'Operations', code: 'OPS' },
        date: new Date().toISOString(),
        description: 'Q1 2024 budget approval request for operations department'
    },
    {
        id: 'INW-005',
        mailId: 'INW-2024-005',
        subject: 'Legal compliance report',
        sender: 'Legal Department',
        senderName: 'Legal Department',
        priority: 'Normal',
        status: 'pending',
        department: { id: 'DEPT-006', name: 'Legal', code: 'LEG' },
        date: new Date().toISOString(),
        description: 'Monthly legal compliance and regulatory report'
    }
];

// GET all mails
app.get('/api/mails', (req, res) => {
    const { type } = req.query;

    if (type === 'inward') {
        return res.json({ data: mockInwardMails, type: 'inward' });
    } else if (type === 'outward') {
        return res.json({ data: mockOutwardMails, type: 'outward' });
    }

    // Return all mails if no type specified
    res.json({
        data: {
            inward: mockInwardMails,
            outward: mockOutwardMails
        }
    });
});

// POST new mail
app.post('/api/mails', (req, res) => {
    const { type, ...mailData } = req.body;

    if (type === 'inward') {
        const newMail = {
            id: `INW-${Date.now().toString().slice(-3)}`,
            mailId: `INW-2024-${Date.now().toString().slice(-3)}`,
            ...mailData,
            date: new Date().toISOString()
        };

        mockInwardMails.push(newMail);
        res.status(201).json({ data: newMail });
    } else if (type === 'outward') {
        const newMail = {
            id: `OUT-${Date.now().toString().slice(-3)}`,
            mailId: `OUT-2024-${Date.now().toString().slice(-3)}`,
            ...mailData,
            date: new Date().toISOString()
        };

        mockOutwardMails.push(newMail);
        res.status(201).json({ data: newMail });
    } else {
        res.status(400).json({ error: 'Invalid mail type' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Test API Server running on http://localhost:${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📋 Departments: http://localhost:${PORT}/api/departments`);
    console.log(`📧 Mails: http://localhost:${PORT}/api/mails`);
    console.log('✅ Server is ready for testing!');
});
