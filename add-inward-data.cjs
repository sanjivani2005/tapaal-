import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const inwardMailsData = [
    {
        mailId: 'INW-1HNR6ZP4OR',
        subject: 'Test',
        sender: 'Test Sender',
        senderName: 'Test Sender',
        priority: 'Normal',
        status: 'closed',
        department: 'Education',
        description: 'Test mail for testing purposes'
    },
    {
        mailId: 'INW-BZ0QRKWRIF',
        subject: 'Testing',
        sender: 'Testing Department',
        senderName: 'Testing Department',
        priority: 'Normal',
        status: 'assigned',
        department: 'General Administration',
        description: 'Testing mail for system validation'
    },
    {
        mailId: 'INW-820',
        subject: 'योगेश नरेंद्र वानखडे साहेब गटविकास अधिकारी धामणगाव रेल्वे यांचा अर्जित रजा',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'registered',
        department: 'Revenue',
        description: 'Revenue department official request for railway development authority'
    },
    {
        mailId: 'INW-821',
        subject: 'कल्पना जयंतराव जायभाय साहेब गटविकास अधिकारी पंचायत समिती अंजनगाव सुर्जी अजित रजा अर्ज',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'assigned',
        department: 'Revenue',
        description: 'Request for development authority panchayat committee Anjangaon Surjit Raj'
    },
    {
        mailId: 'INW-1789',
        subject: 'जिल्हास्तरीय टेन्शन अदालत उपमुख्य कार्यकारी अधिकारी यांच्या कक्षेमध्ये होण्याबाबत',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'Normal',
        status: 'in_progress',
        department: 'Health',
        description: 'Regarding District Tenancy Court Chief Executive Officer chamber matters'
    },
    {
        mailId: 'INW-819',
        subject: 'सगटविकास अधिकारी अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Sample of revenue authority application'
    },
    {
        mailId: 'INW-1291',
        subject: 'दिनांक6-1- 26 रोजी दुपारी दोन ते सायंकाळी सहा वाजेपर्यंत डॉक्टर पंजाबराव देशमुख ची उपसभा गृह अमरावती हे आढावा सभेकरिता उपलब्ध करून देणे बाबत',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Health',
        description: 'Regarding supply of medical equipment to Dr. Punjabrao Deshmukh Superspeciality Hospital Amaravati'
    },
    {
        mailId: 'INW-5930',
        subject: 'लेखाशीर्षक वीस 53 05 65 31 मधील साधेल प्रवास भक्ता खर्चाचा आवाज सादर करणेबाबत तु',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'in_progress',
        department: 'Revenue',
        description: 'Regarding objection to resident religious expenses from letter no. 53 05 65 31'
    },
    {
        mailId: 'INW-5931',
        subject: 'लेखा शीर्षक 30 53 05 65 31 वर अनुदान मिळण्याबाबत तु',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'resolved',
        department: 'Revenue',
        description: 'Regarding grant receipt from letter no. 30 53 05 65 31'
    },
    {
        mailId: 'INW-4705',
        subject: 'दिनांक एक एक 26 रोजी ची एक दिवसाची किरकोळ रजा मंजूर करणेबाबत तुषार दांडगे गटविकास अधिकारी पंचायत समिती भातकुली 31 12 25',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'Normal',
        status: 'resolved',
        department: 'Health',
        description: 'Regarding approval of one-day circular for Tushar Dhande Development Authority Panchayat Committee Bhaktuli 31 12 25'
    },
    {
        mailId: 'INW-3869',
        subject: 'आडगाव खाडे ते राज्य महामार्ग क्रमांक 24 रस्ता सुधारणा विहार क्रमांक 14 तालुका अंजनगाव सुर्जी वरील संबंधित कामाचे अंदाजानुसार होत नसल्याबाबत व कामात अनियमितता असल्याने आपल्या कार्यालयाकडून तक्रारीची चौकशी व कारवाई न झाल्यामुळे उपोषणाबाबत',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'Normal',
        status: 'assigned',
        department: 'Health',
        description: 'Regarding irregularities in road construction work at Adgaon Khade to State Highway No. 24 and bypass road no. 14 in Anjangaon Surji area and non-receipt of circular and action from our office'
    },
    {
        mailId: 'INW-825',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Sample of application for participation in organization organized movement'
    },
    {
        mailId: 'INW-818',
        subject: 'अंकिता विलास लाड साहेब गटविकास अधिकारी पंचायत समिती अमरावती यांचा विषय संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Application of Ankita Vilas Lad for participation in organization organized movement'
    },
    {
        mailId: 'INW-1689',
        subject: 'ग्रामपंचायत करजगाव येथील नाली कामाबाबत तक्रार अर्धवट काम टाळाटाळकेल्याबाबत',
        sender: 'Health Department',
        senderName: 'Health Department',
        priority: 'Normal',
        status: 'registered',
        department: 'Health',
        description: 'Regarding complaint about incomplete Nali work at Grampanchayat Karjagaon'
    },
    {
        mailId: 'INW-822',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'in_progress',
        department: 'Revenue',
        description: 'Sample application for participation in organization organized movement'
    },
    {
        mailId: 'INW-826',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Sample application for participation in organization organized movement'
    },
    {
        mailId: 'INW-817',
        subject: 'जीवनलाल मंगललाल बिलावेकर साहेब गटविकास अधिकारी यांचा अर्जित रजेचा फार आहे',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Application of Jivanlal Manglall Bilavekar for revenue authority'
    },
    {
        mailId: 'INW-823',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'resolved',
        department: 'Revenue',
        description: 'Sample application for participation in organization organized movement'
    },
    {
        mailId: 'INW-824',
        subject: 'संघटनेने आयोजित केलेलेल्या आंदोलनात सहभागी होणेकरी ता अर्जित रजेचा नमुना',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'closed',
        department: 'Revenue',
        description: 'Sample application for participation in organization organized movement'
    },
    {
        mailId: 'INW-827',
        subject: 'एक दिवसाची किरकोळ रजा मिळणे बाबत दिनांक 1/1/26 श्रीकांत मेश्राम कनिष्ठ प्रशासन अधिकारी सापुरा विजेता अमरावती',
        sender: 'Revenue Department',
        senderName: 'Revenue Department',
        priority: 'Normal',
        status: 'registered',
        department: 'Revenue',
        description: 'Regarding receipt of one-day circular from Shrikrant Meshram Kanishtha Prashan Adhikari Supura Vijeta Amaravati dated 1/1/26'
    }
];

async function addInwardMails() {
    try {
        console.log('🌱 Adding inward mails data...');

        // Get departments to map names to IDs
        const departments = await prisma.department.findMany();
        const deptMap = {};
        departments.forEach(dept => {
            deptMap[dept.name] = dept.id;
        });

        let successCount = 0;
        let errorCount = 0;

        // Map department names and insert data
        for (const mail of inwardMailsData) {
            const deptId = deptMap[mail.department];

            if (!deptId) {
                console.warn(`⚠️  Department not found: ${mail.department}`);
                errorCount++;
                continue;
            }

            try {
                const createdMail = await prisma.inwardMail.create({
                    data: {
                        mailId: mail.mailId,
                        subject: mail.subject,
                        description: mail.description,
                        sender: mail.sender,
                        senderName: mail.senderName,
                        priority: mail.priority.toUpperCase(),
                        status: mail.status.toUpperCase(),
                        deptId: deptId,
                        isAnomaly: false,
                        date: new Date(),
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });

                // Create initial tracking event
                await prisma.trackingEvent.create({
                    data: {
                        inwardMailId: createdMail.id,
                        eventId: `TRK-INW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        mailType: 'Inward',
                        status: mail.status.toUpperCase(),
                        subject: mail.subject,
                        sender: mail.sender,
                        priority: mail.priority.toUpperCase(),
                        department: mail.department,
                        updatedBy: 'System',
                        createdAt: new Date(),
                        lastUpdated: new Date()
                    }
                });

                console.log(`✅ Created mail: ${mail.mailId} - ${mail.subject}`);
                successCount++;
            } catch (error) {
                console.error(`❌ Error creating mail ${mail.mailId}:`, error);
                errorCount++;
            }
        }

        console.log(`🎉 Inward mails data added successfully!`);
        console.log(`✅ Success: ${successCount}, ❌ Errors: ${errorCount}`);
        console.log(`📊 Total inward mails in database: ${successCount}`);

        return {
            success: true,
            message: `Successfully added ${successCount} inward mails`,
            successCount,
            errorCount
        };

    } catch (error) {
        console.error('❌ Error adding inward mails:', error);
        return {
            success: false,
            error: error.message
        };
    } finally {
        await prisma.$disconnect();
    }
}

// Export the function
module.exports = { addInwardMails };
