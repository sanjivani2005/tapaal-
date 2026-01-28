const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database');
});

const inwardMailsData = [
    {
        id: 'mail-1',
        mailId: 'INW-1HNR6ZP4OR',
        subject: 'Test',
        description: 'Test mail for testing purposes',
        sender: 'Test Sender',
        senderName: 'Test Sender',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-1',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-2',
        mailId: 'INW-BZ0QRKWRIF',
        subject: 'Testing',
        description: 'Testing mail for system validation',
        sender: 'Testing Department',
        senderName: 'Testing Department',
        priority: 'NORMAL',
        status: 'ASSIGNED',
        deptId: 'dept-2',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-3',
        mailId: 'INW-820',
        subject: 'योगेश नरेंद्र वानखडे साहेब गटविकास अधिकारी धामणगाव रेल्वे यांचा अर्जित रजा',
        description: 'Revenue department official request for railway development authority',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'REGISTERED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-4',
        mailId: 'INW-821',
        subject: 'कल्पना जयंतराव जायभाय साहेब गटविकास अधिकारी पंचायत समिती अंजनगाव सुर्जी अजित रजा अर्ज',
        description: 'Request for development authority panchayat committee Anjangaon Surjit Raj',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'ASSIGNED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-5',
        mailId: 'INW-1789',
        subject: 'जिल्हास्तरीय टेन्शन अदालत उपमुख्य कार्यकारी अधिकारी यांच्या कक्षेमध्ये होण्याबाबत',
        description: 'Regarding District Tenancy Court Chief Executive Officer chamber matters',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'IN_PROGRESS',
        deptId: 'dept-4',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

async function addData() {
    try {
        console.log('🌱 Adding inward mail data...');

        // Create tables if they don't exist
        await new Promise((resolve, reject) => {
            db.serialize(() => {
                // Create Department table
                db.run(`CREATE TABLE IF NOT EXISTS Department (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          code TEXT,
          head TEXT,
          description TEXT,
          location TEXT,
          status TEXT DEFAULT 'Active',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

                // Create InwardMail table
                db.run(`CREATE TABLE IF NOT EXISTS InwardMail (
          id TEXT PRIMARY KEY,
          mailId TEXT UNIQUE NOT NULL,
          subject TEXT NOT NULL,
          description TEXT,
          sender TEXT NOT NULL,
          senderName TEXT,
          priority TEXT NOT NULL,
          status TEXT NOT NULL,
          deptId TEXT,
          isAnomaly INTEGER DEFAULT 0,
          date DATETIME,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (deptId) REFERENCES Department(id)
        )`);

                resolve();
            });
        });

        // Add departments first
        const departments = [
            { id: 'dept-1', name: 'Education', code: 'EDU', status: 'Active' },
            { id: 'dept-2', name: 'General Administration', code: 'GA', status: 'Active' },
            { id: 'dept-3', name: 'Revenue', code: 'REV', status: 'Active' },
            { id: 'dept-4', name: 'Health', code: 'HLT', status: 'Active' }
        ];

        for (const dept of departments) {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT OR REPLACE INTO Department (id, name, code, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)`,
                    [dept.id, dept.name, dept.code, dept.status, new Date().toISOString(), new Date().toISOString()],
                    function (err) {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        }

        console.log('✅ Departments added successfully');

        // Add inward mails
        let successCount = 0;
        for (const mail of inwardMailsData) {
            await new Promise((resolve, reject) => {
                db.run(
                    `INSERT OR REPLACE INTO InwardMail (id, mailId, subject, description, sender, senderName, priority, status, deptId, isAnomaly, date, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        mail.id, mail.mailId, mail.subject, mail.description,
                        mail.sender, mail.senderName, mail.priority, mail.status,
                        mail.deptId, mail.isAnomaly, mail.date, mail.createdAt, mail.updatedAt
                    ],
                    function (err) {
                        if (err) {
                            console.error(`❌ Error adding mail ${mail.mailId}:`, err);
                            reject(err);
                        } else {
                            console.log(`✅ Added mail: ${mail.mailId}`);
                            successCount++;
                            resolve();
                        }
                    }
                );
            });
        }

        console.log(`🎉 Successfully added ${successCount} inward mails to database!`);

    } catch (error) {
        console.error('❌ Error adding data:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('✅ Database connection closed');
            }
        });
    }
}

addData();
