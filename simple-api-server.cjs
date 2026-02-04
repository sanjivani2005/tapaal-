const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Get all mails
app.get('/api/mails', (req, res) => {
    const { type } = req.query;

    if (type === 'inward') {
        const query = `
            SELECT 
                im.*,
                d.name as departmentName,
                d.code as departmentCode
            FROM InwardMail im
            LEFT JOIN Department d ON im.deptId = d.id
            ORDER BY im.createdAt DESC
        `;

        db.all(query, (err, mails) => {
            if (err) {
                console.error('Error fetching inward mails:', err);
                return res.status(500).json({ error: 'Failed to fetch inward mails' });
            }

            // Transform data to match expected format
            const transformedMails = mails.map(mail => ({
                ...mail,
                department: mail.departmentName ? {
                    name: mail.departmentName,
                    code: mail.departmentCode
                } : null
            }));

            res.json({ data: transformedMails, type: 'inward' });
        });
    } else {
        res.status(400).json({ error: 'Only inward mails supported in simple server' });
    }
});

// Get departments
app.get('/api/departments', (req, res) => {
    db.all("SELECT * FROM Department", (err, departments) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ error: 'Failed to fetch departments' });
        }

        res.json({ data: departments });
    });
});

// Get dashboard stats
app.get('/api/dashboard', (req, res) => {
    const queries = {
        totalInward: "SELECT COUNT(*) as count FROM InwardMail",
        totalDepartments: "SELECT COUNT(*) as count FROM Department",
        pendingMails: "SELECT COUNT(*) as count FROM InwardMail WHERE status = 'PENDING'",
        closedMails: "SELECT COUNT(*) as count FROM InwardMail WHERE status = 'CLOSED'",
        recentMails: `
            SELECT 
                im.*,
                d.name as departmentName
            FROM InwardMail im
            LEFT JOIN Department d ON im.deptId = d.id
            ORDER BY im.createdAt DESC
            LIMIT 10
        `
    };

    Promise.all([
        new Promise((resolve, reject) => db.get(queries.totalInward, (err, row) => err ? reject(err) : resolve(row))),
        new Promise((resolve, reject) => db.get(queries.totalDepartments, (err, row) => err ? reject(err) : resolve(row))),
        new Promise((resolve, reject) => db.get(queries.pendingMails, (err, row) => err ? reject(err) : resolve(row))),
        new Promise((resolve, reject) => db.get(queries.closedMails, (err, row) => err ? reject(err) : resolve(row))),
        new Promise((resolve, reject) => db.all(queries.recentMails, (err, rows) => err ? reject(err) : resolve(rows)))
    ]).then(([totalInward, totalDepartments, pendingMails, closedMails, recentMails]) => {
        const stats = {
            totalInwardMails: totalInward.count,
            totalDepartments: totalDepartments.count,
            pendingMails: pendingMails.count,
            closedMails: closedMails.count,
            completedMails: closedMails.count
        };

        res.json({
            stats,
            recentInwardMails: recentMails.map(mail => ({
                ...mail,
                department: mail.departmentName ? { name: mail.departmentName } : null
            }))
        });
    }).catch(err => {
        console.error('Error fetching dashboard data:', err);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    });
});

// Create new mail
app.post('/api/mails', (req, res) => {
    const { type, ...mailData } = req.body;

    if (!type || type !== 'inward') {
        return res.status(400).json({ error: 'Only inward mails are supported' });
    }

    // Generate mail ID
    const mailId = `INW-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    const mailInternalId = `mail-${Date.now()}`;
    const now = new Date().toISOString();

    const query = `
        INSERT INTO InwardMail (
            id, mailId, subject, description, sender, senderName, 
            priority, status, deptId, isAnomaly, date, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [
        mailInternalId,
        mailId,
        mailData.subject || '',
        mailData.description || '',
        mailData.sender || '',
        mailData.senderName || '',
        mailData.priority?.toUpperCase() || 'NORMAL',
        mailData.status?.toUpperCase() || 'PENDING',
        mailData.deptId || null,
        0,
        now,
        now,
        now
    ], function (err) {
        if (err) {
            console.error('Error creating mail:', err);
            return res.status(500).json({ error: 'Failed to create mail' });
        }

        // Create tracking event
        const trackingId = `track-${Date.now()}`;
        const eventId = `TRK-INW-${Date.now()}`;

        db.run(`
            INSERT INTO TrackingEvent (
                id, eventId, inwardMailId, mailType, status, 
                subject, sender, priority, department, updatedBy, 
                createdAt, lastUpdated
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            trackingId,
            eventId,
            mailInternalId,
            'Inward',
            mailData.status?.toUpperCase() || 'PENDING',
            mailData.subject || '',
            mailData.sender || '',
            mailData.priority?.toUpperCase() || 'NORMAL',
            null, // department name will be set later
            'System',
            now,
            now
        ], function (trackErr) {
            if (trackErr) {
                console.error('Error creating tracking event:', trackErr);
            }

            // Return the created mail with department info
            const selectQuery = `
                SELECT 
                    im.*,
                    d.name as departmentName,
                    d.code as departmentCode
                FROM InwardMail im
                LEFT JOIN Department d ON im.deptId = d.id
                WHERE im.id = ?
            `;

            db.get(selectQuery, [mailInternalId], (selectErr, mail) => {
                if (selectErr) {
                    console.error('Error fetching created mail:', selectErr);
                    return res.status(500).json({ error: 'Failed to fetch created mail' });
                }

                const transformedMail = {
                    ...mail,
                    department: mail.departmentName ? {
                        name: mail.departmentName,
                        code: mail.departmentCode
                    } : null
                };

                res.status(201).json({ data: transformedMail, type: 'inward' });
            });
        });
    });
});

// Create new department
app.post('/api/departments', (req, res) => {
    const { name, code, head, description, location, status } = req.body;

    // Validate required fields
    if (!name || !code) {
        return res.status(400).json({ error: 'Name and code are required' });
    }

    // Check for duplicate department name or code
    db.get("SELECT * FROM Department WHERE name = ? OR code = ?", [name, code.toUpperCase()], (err, existingDept) => {
        if (err) {
            console.error('Error checking duplicate department:', err);
            return res.status(500).json({ error: 'Failed to validate department' });
        }

        if (existingDept) {
            if (existingDept.name === name) {
                return res.status(400).json({ error: 'Department name already exists' });
            }
            if (existingDept.code === code.toUpperCase()) {
                return res.status(400).json({ error: 'Department code already exists' });
            }
        }

        const deptId = `dept-${Date.now()}`;
        const now = new Date().toISOString();

        const query = `
            INSERT INTO Department (
                id, name, code, head, status, createdAt, updatedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(query, [
            deptId,
            name,
            code.toUpperCase(),
            head || null,
            status || 'Active',
            now,
            now
        ], function (err) {
            if (err) {
                console.error('Error creating department:', err);
                return res.status(500).json({ error: 'Failed to create department' });
            }

            // Return the created department
            db.get("SELECT * FROM Department WHERE id = ?", [deptId], (selectErr, department) => {
                if (selectErr) {
                    console.error('Error fetching created department:', selectErr);
                    return res.status(500).json({ error: 'Failed to fetch created department' });
                }

                res.status(201).json(department);
            });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Simple API Server running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
    console.log(`📧 Mails API: http://localhost:${PORT}/api/mails?type=inward`);
    console.log(`🏢 Departments API: http://localhost:${PORT}/api/departments`);
});
