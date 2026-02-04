// Simple test to check if API connection works
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
    console.log('🔍 Testing API connection...');

    try {
        // Try to connect to database
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: 'file:./prisma/dev.db'
                }
            }
        });

        // Test database connection
        const departmentCount = await prisma.department.count();
        console.log(`✅ Database connected! Found ${departmentCount} departments`);

        // Test inward mails
        const mailCount = await prisma.inwardMail.count();
        console.log(`📧 Found ${mailCount} inward mails`);

        if (mailCount === 0) {
            console.log('📝 No inward mails found. You need to add the data.');
            console.log('📋 To add data, run: curl -X POST http://localhost:3001/api/add-inward-data');
        } else {
            console.log('🎉 Inward mails are available in the database!');

            // Show first few mails
            const mails = await prisma.inwardMail.findMany({
                take: 5,
                include: { department: true }
            });

            console.log('\n📊 Sample mails:');
            mails.forEach(mail => {
                console.log(`  - ${mail.mailId}: ${mail.subject.substring(0, 50)}... (${mail.department?.name})`);
            });
        }

        await prisma.$disconnect();
        console.log('\n✅ Test completed successfully!');

    } catch (error) {
        console.error('❌ Connection test failed:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('1. Make sure the database file exists: prisma/dev.db');
        console.log('2. Check Prisma configuration');
        console.log('3. Run: npx prisma generate');
        console.log('4. Run: npx prisma migrate dev');
    }
}

testConnection();
