const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Checking departments in database...');

db.all("SELECT * FROM Department", (err, departments) => {
    if (err) {
        console.error('Error fetching departments:', err);
        return;
    }
    
    console.log(`\n📊 Departments (${departments.length} total):`);
    departments.forEach(dept => {
        console.log(`  - ${dept.name} (${dept.code}) - ID: ${dept.id} - Head: ${dept.head || 'N/A'} - Status: ${dept.status}`);
    });
    
    db.close();
});
