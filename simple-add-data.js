// Simple script to add inward data using existing database
const fs = require('fs');
const path = require('path');

// Read the database file directly
const dbPath = path.join(__dirname, 'prisma', 'dev.db');

if (!fs.existsSync(dbPath)) {
    console.log('❌ Database file not found. Please run the server first to create the database.');
    process.exit(1);
}

console.log('✅ Database file found at:', dbPath);
console.log('📝 To add the inward data, please:');
console.log('1. Start the server: npm run dev:api');
console.log('2. Open your browser and go to: http://localhost:3001/api/add-inward-data');
console.log('3. Or use curl: curl -X POST http://localhost:3001/api/add-inward-data');
console.log('');
console.log('📊 The data includes 20 inward mails with:');
console.log('- Tracking IDs: INW-1HNR6ZP4OR, INW-BZ0QRKWRIF, INW-820, etc.');
console.log('- Departments: Education, General Administration, Revenue, Health');
console.log('- Status: closed, assigned, registered, in_progress, resolved');
console.log('- Subjects in both English and Marathi');
console.log('');
console.log('🔧 If the server has issues, check:');
console.log('- Database connection in prisma/schema.prisma');
console.log('- Prisma client generation: npx prisma generate');
console.log('- Database migrations: npx prisma migrate dev');
