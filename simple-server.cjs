const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const dbPath = path.join(__dirname, 'prisma', 'dev.db');

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database');
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API Server is running' });
});

// Get all inward mails
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

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error fetching inward mails:', err);
                res.status(500).json({ error: 'Failed to fetch inward mails' });
            } else {
                // Transform the data to match frontend expectations
                const transformedData = rows.map(row => ({
                    id: row.id,
                    mailId: row.mailId,
                    subject: row.subject,
                    description: row.description,
                    sender: row.sender,
                    senderName: row.senderName,
                    priority: row.priority,
                    status: row.status,
                    department: {
                        id: row.deptId,
                        name: row.departmentName,
                        code: row.departmentCode
                    },
                    isAnomaly: Boolean(row.isAnomaly),
                    date: row.date,
                    createdAt: row.createdAt,
                    updatedAt: row.updatedAt
                }));

                res.json({ data: transformedData, type: 'inward' });
            }
        });
    } else {
        res.json({ data: [], type: 'unknown' });
    }
});

// Get departments
app.get('/api/departments', (req, res) => {
    const query = 'SELECT * FROM Department ORDER BY name';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).json({ error: 'Failed to fetch departments' });
        } else {
            res.json({ data: rows });
        }
    });
});

// Create new department
app.post('/api/departments', (req, res) => {
    const { name, code, head, description, location, status } = req.body;

    // Check if department code already exists
    const checkQuery = 'SELECT * FROM Department WHERE code = ?';
    db.get(checkQuery, [code], (err, existingDept) => {
        if (err) {
            console.error('Error checking department:', err);
            return res.status(500).json({ error: 'Failed to check department' });
        }

        if (existingDept) {
            return res.status(400).json({ error: 'Department code already exists' });
        }

        // Create new department
        const id = `dept-${Date.now()}`;
        const query = `
            INSERT INTO Department (id, name, code, head, description, location, status, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.run(query, [
            id, name, code, head, description, location, status || 'Active',
            new Date().toISOString(), new Date().toISOString()
        ], function (err) {
            if (err) {
                console.error('Error creating department:', err);
                res.status(500).json({ error: 'Failed to create department' });
            } else {
                // Return the created department
                const newDepartment = {
                    id,
                    name,
                    code,
                    head,
                    description,
                    location,
                    status: status || 'Active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                res.status(201).json({ data: newDepartment });
            }
        });
    });
});

// Get single department
app.get('/api/departments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Department WHERE id = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Error fetching department:', err);
            res.status(500).json({ error: 'Failed to fetch department' });
        } else if (!row) {
            res.status(404).json({ error: 'Department not found' });
        } else {
            res.json({ data: row });
        }
    });
});

// Update department
app.put('/api/departments/:id', (req, res) => {
    const { id } = req.params;
    const { name, code, head, description, location, status } = req.body;

    // Check if department code already exists (excluding current department)
    const checkQuery = 'SELECT * FROM Department WHERE code = ? AND id != ?';
    db.get(checkQuery, [code, id], (err, existingDept) => {
        if (err) {
            console.error('Error checking department:', err);
            return res.status(500).json({ error: 'Failed to check department' });
        }

        if (existingDept) {
            return res.status(400).json({ error: 'Department code already exists' });
        }

        // Update department
        const query = `
            UPDATE Department 
            SET name = ?, code = ?, head = ?, description = ?, location = ?, status = ?, updatedAt = ?
            WHERE id = ?
        `;

        db.run(query, [
            name, code, head, description, location, status || 'Active',
            new Date().toISOString(), id
        ], function (err) {
            if (err) {
                console.error('Error updating department:', err);
                res.status(500).json({ error: 'Failed to update department' });
            } else {
                // Return the updated department
                const updatedDepartment = {
                    id,
                    name,
                    code,
                    head,
                    description,
                    location,
                    status: status || 'Active',
                    updatedAt: new Date().toISOString()
                };
                res.json({ data: updatedDepartment });
            }
        });
    });
});

// Create new inward mail
app.post('/api/mails', (req, res) => {
    const { type, ...mailData } = req.body;

    if (type === 'inward') {
        const { subject, description, sender, senderName, priority, status, deptId } = mailData;
        const mailId = `INW-${Date.now()}`;
        const id = `mail-${Date.now()}`;

        const query = `
      INSERT INTO InwardMail (id, mailId, subject, description, sender, senderName, priority, status, deptId, date, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        db.run(query, [
            id, mailId, subject, description, sender, senderName, priority, status, deptId,
            new Date().toISOString(), new Date().toISOString(), new Date().toISOString()
        ], function (err) {
            if (err) {
                console.error('Error creating mail:', err);
                res.status(500).json({ error: 'Failed to create mail' });
            } else {
                res.status(201).json({
                    data: { id, mailId, subject, description, sender, senderName, priority, status, deptId },
                    type: 'inward'
                });
            }
        });
    } else {
        res.status(400).json({ error: 'Invalid mail type' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints:`);
    console.log(`  GET  /api/health - Health check`);
    console.log(`  GET  /api/mails?type=inward - Get inward mails`);
    console.log(`  GET  /api/departments - Get departments`);
    console.log(`  POST /api/mails - Create new mail`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🔄 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
        process.exit(0);
    });
});
