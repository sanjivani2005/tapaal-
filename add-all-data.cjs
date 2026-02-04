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

const remainingMailsData = [
    {
        id: 'mail-6',
        mailId: 'INW-819',
        subject: 'सगटविकास अधिकारी अर्जित रजेचा नमुना',
        description: 'Sample of revenue authority application',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-7',
        mailId: 'INW-1291',
        subject: 'दिनांक6-1- 26 रोजी दुपारी दोन ते सायंकाळी सहा वाजेपर्यंत डॉक्टर पंजाबराव देशमुख ची उपसभा गृह अमरावती हे आढावा सभेकरिता उपलब्ध करून देणे बाबत',
        description: 'Regarding supply of medical equipment to Dr. Punjabrao Deshmukh Superspeciality Hospital Amaravati',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-4',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-8',
        mailId: 'INW-5930',
        subject: 'लेखाशीर्षक वीस 53 05 65 31 मधील साधेल प्रवास भक्ता खर्चाचा आवाज सादर करणेबाबत तु',
        description: 'Regarding objection to resident religious expenses from letter no. 53 05 65 31',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'IN_PROGRESS',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-9',
        mailId: 'INW-5931',
        subject: 'लेखा शीर्षक 30 53 05 65 31 वर अनुदान मिळण्याबाबत तु',
        description: 'Regarding grant receipt from letter no. 30 53 05 65 31',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'RESOLVED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-10',
        mailId: 'INW-4705',
        subject: 'दिनांक एक एक 26 रोजी ची एक दिवसाची किरकोळ रजा मंजूर करणेबाबत तुषार दांडगे गटविकास अधिकारी पंचायत समिती भातकुली 31 12 25',
        description: 'Regarding approval of one-day circular for Tushar Dhande Development Authority Panchayat Committee Bhaktuli 31 12 25',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'RESOLVED',
        deptId: 'dept-4',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-11',
        mailId: 'INW-3869',
        subject: 'आडगाव खाडे ते राज्य महामार्ग क्रमांक 24 रस्ता सुधारणा विहार क्रमांक 14 तालुका अंजनगाव सुर्जी वरील संबंधित कामाचे अंदाजानुसार होत नसल्याबाबत व कामात अनियमितता असल्याने आपल्या कार्यालयाकडून तक्रारीची चौकशी व कारवाई न झाल्यामुळे उपोषणाबाबत',
        description: 'Regarding irregularities in road construction work at Adgaon Khade to State Highway No. 24 and bypass road no. 14 in Anjangaon Surji area and non-receipt of circular and action from our office',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'ASSIGNED',
        deptId: 'dept-4',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-12',
        mailId: 'INW-825',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Sample of application for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-13',
        mailId: 'INW-818',
        subject: 'अंकिता विलास लाड साहेब गटविकास अधिकारी पंचायत समिती अमरावती यांचा विषय संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Application of Ankita Vilas Lad for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-14',
        mailId: 'INW-1689',
        subject: 'ग्रामपंचायत करजगाव येथील नाली कामाबाबत तक्रार अर्धवट काम टाळाटाळकेल्याबाबत',
        description: 'Regarding complaint about incomplete Nali work at Grampanchayat Karjagaon',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'NORMAL',
        status: 'REGISTERED',
        deptId: 'dept-4',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-15',
        mailId: 'INW-822',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Sample application for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'IN_PROGRESS',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-16',
        mailId: 'INW-826',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Sample application for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-17',
        mailId: 'INW-817',
        subject: 'जीवनलाल मंगललाल बिलावेकर साहेब गटविकास अधिकारी यांचा अर्जित रजेचा फार आहे',
        description: 'Application of Jivanlal Manglall Bilavekar for revenue authority',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-18',
        mailId: 'INW-823',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Sample application for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'RESOLVED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-19',
        mailId: 'INW-824',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        description: 'Sample application for participation in organization organized movement',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'CLOSED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'mail-20',
        mailId: 'INW-827',
        subject: 'एक दिवसाची किरकोळ रजा मिळणे बाबत दिनांक 1/1/26 श्रीकांत मेश्राम कनिष्ठ प्रशासन अधिकारी सापुरा विजेता अमरावती',
        description: 'Regarding receipt of one-day circular from Shrikrant Meshram Kanishtha Prashan Adhikari Supura Vijeta Amaravati dated 1/1/26',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'NORMAL',
        status: 'REGISTERED',
        deptId: 'dept-3',
        isAnomaly: 0,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

async function addRemainingData() {
    try {
        console.log('🌱 Adding remaining 15 inward mail records...');

        let successCount = 0;
        for (const mail of remainingMailsData) {
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

        console.log(`🎉 Successfully added ${successCount} additional inward mails to database!`);
        console.log(`📊 Total inward mails now: ${successCount + 5} (20 total)`);

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

addRemainingData();
