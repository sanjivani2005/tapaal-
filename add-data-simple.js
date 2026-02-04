const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

const inwardMailsData = [
    {
        mailId: 'INW-1HNR6ZP4OR',
        subject: 'Test',
        sender: 'Test Sender',
        senderName: 'Test Sender',
        priority: 'NORMAL',
        status: 'CLOSED',
        department: 'Education',
        description: 'Test mail for testing purposes'
    },
    {
        mailId: 'INW-BZ0QRKWRIF',
        subject: 'Testing',
        sender: 'Testing Department',
        senderName: 'Testing Department',
        priority: 'NORMAL',
        status: 'ASSIGNED',
        department: 'General Administration',
        description: 'Testing mail for system validation'
    },
    {
        mailId: 'INW-820',
        subject: 'योगेश नरेंद्र वानखडे साहेब गटविकास अधिकारी धामणगाव रेल्वे यांचा अर्जित रजा',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'REGISTERED',
        department: 'Revenue',
        description: 'Revenue department official request for railway development authority'
    },
    {
        mailId: 'INW-821',
        subject: 'कल्पना जयंतराव जायभाय साहेब गटविकास अधिकारी पंचायत समिती अंजनगाव सुर्जी अजित रजा अर्ज',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'ASSIGNED',
        department: 'Revenue',
        description: 'Request for development authority panchayat committee Anjangaon Surjit Raj'
    },
    {
        mailId: 'INW-1789',
        subject: 'जिल्हास्तरीय टेन्शन अदालत उपमुख्य कार्यकारी अधिकारी यांच्या कक्षेमध्ये होण्याबाबत',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'IN_PROGRESS',
        department: 'Health',
        description: 'Regarding District Tenancy Court Chief Executive Officer chamber matters'
    }
];

async function addInwardMails() {
    return new Promise((resolve, reject) => {
        console.log('🌱 Adding inward mails data...');
        
        // First get departments
        db.all("SELECT * FROM Department", (err, departments) => {
            if (err) {
                console.error('Error fetching departments:', err);
                return reject(err);
            }
            
            const deptMap = {};
            departments.forEach(dept => {
                deptMap[dept.name] = dept.id;
            });
            
            let successCount = 0;
            let errorCount = 0;
            let completed = 0;
            
            // Insert each mail
            inwardMailsData.forEach((mail, index) => {
                const deptId = deptMap[mail.department];
                
                if (!deptId) {
                    console.warn(`⚠️  Department not found: ${mail.department}`);
                    errorCount++;
                    completed++;
                    if (completed === inwardMailsData.length) {
                        finish();
                    }
                    return;
                }
                
                const mailId = `mail-${Date.now()}-${index}`;
                const eventId = `TRK-INW-${Date.now()}-${index}`;
                const now = new Date().toISOString();
                
                // Insert mail
                db.run(`
                    INSERT INTO InwardMail (
                        id, mailId, subject, description, sender, senderName, 
                        priority, status, deptId, isAnomaly, date, createdAt, updatedAt
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [
                    mailId, mail.mailId, mail.subject, mail.description, 
                    mail.sender, mail.senderName, mail.priority, mail.status,
                    deptId, 0, now, now, now
                ], function(err) {
                    if (err) {
                        console.error(`❌ Error creating mail ${mail.mailId}:`, err);
                        errorCount++;
                    } else {
                        // Create tracking event
                        db.run(`
                            INSERT INTO TrackingEvent (
                                id, eventId, inwardMailId, mailType, status, 
                                subject, sender, priority, department, updatedBy, 
                                createdAt, lastUpdated
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `, [
                            `track-${Date.now()}-${index}`, eventId, mailId, 'Inward',
                            mail.status, mail.subject, mail.sender, mail.priority,
                            mail.department, 'System', now, now
                        ], function(trackErr) {
                            if (trackErr) {
                                console.error(`❌ Error creating tracking for ${mail.mailId}:`, trackErr);
                                errorCount++;
                            } else {
                                console.log(`✅ Created mail: ${mail.mailId} - ${mail.subject}`);
                                successCount++;
                            }
                            
                            completed++;
                            if (completed === inwardMailsData.length) {
                                finish();
                            }
                        });
                    }
                });
            });
            
            function finish() {
                console.log(`🎉 Inward mails data added successfully!`);
                console.log(`✅ Success: ${successCount}, ❌ Errors: ${errorCount}`);
                console.log(`📊 Total inward mails in database: ${successCount}`);
                
                db.close((err) => {
                    if (err) {
                        console.error('Error closing database:', err);
                        return reject(err);
                    }
                    resolve({
                        success: true,
                        message: `Successfully added ${successCount} inward mails`,
                        successCount,
                        errorCount
                    });
                });
            }
        });
    });
}

// Run the function
addInwardMails().catch(console.error);
