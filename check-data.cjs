const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Checking current data in database...');

// Check departments
db.all("SELECT * FROM Department", (err, departments) => {
    if (err) {
        console.error('Error fetching departments:', err);
        return;
    }
    
    console.log('\n📊 Departments:');
    departments.forEach(dept => {
        console.log(`  - ${dept.name} (${dept.id})`);
    });
    
    // Check inward mails
    db.all("SELECT * FROM InwardMail", (err, mails) => {
        if (err) {
            console.error('Error fetching mails:', err);
            return;
        }
        
        console.log(`\n📧 Inward Mails (${mails.length} total):`);
        mails.forEach(mail => {
            console.log(`  - ${mail.mailId}: ${mail.subject} (${mail.status})`);
        });
        
        // Check tracking events
        db.all("SELECT * FROM TrackingEvent", (err, events) => {
            if (err) {
                console.error('Error fetching tracking events:', err);
                return;
            }
            
            console.log(`\n📍 Tracking Events (${events.length} total):`);
            events.forEach(event => {
                console.log(`  - ${event.eventId}: ${event.status} for ${event.subject}`);
            });
            
            db.close();
        });
    });
});
