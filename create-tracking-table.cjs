const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Creating TrackingEvent table...');

// Create TrackingEvent table
db.run(`
  CREATE TABLE IF NOT EXISTS TrackingEvent (
    id TEXT PRIMARY KEY,
    eventId TEXT UNIQUE,
    inwardMailId TEXT,
    outwardMailId TEXT,
    mailType TEXT DEFAULT 'Inward',
    status TEXT,
    remarks TEXT,
    updatedBy TEXT,
    assignedTo TEXT,
    currentStatus TEXT,
    subject TEXT,
    sender TEXT,
    receiver TEXT,
    priority TEXT,
    department TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inwardMailId) REFERENCES InwardMail(id),
    FOREIGN KEY (outwardMailId) REFERENCES OutwardMail(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating TrackingEvent table:', err);
    return;
  }
  
  console.log('✅ TrackingEvent table created successfully');
  
  // Create TimelineEvent table
  db.run(`
    CREATE TABLE IF NOT EXISTS TimelineEvent (
      id TEXT PRIMARY KEY,
      trackingId TEXT,
      event TEXT,
      remarks TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trackingId) REFERENCES TrackingEvent(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating TimelineEvent table:', err);
      return;
    }
    
    console.log('✅ TimelineEvent table created successfully');
    
    // Now add tracking events for existing inward mails
    console.log('📝 Adding tracking events for existing mails...');
    
    db.all("SELECT * FROM InwardMail", (err, mails) => {
      if (err) {
        console.error('Error fetching mails:', err);
        return;
      }
      
      let completed = 0;
      
      mails.forEach((mail, index) => {
        const trackingId = `track-${Date.now()}-${index}`;
        const eventId = `TRK-INW-${Date.now()}-${index}`;
        const now = new Date().toISOString();
        
        db.run(`
          INSERT INTO TrackingEvent (
            id, eventId, inwardMailId, mailType, status, 
            subject, sender, priority, department, updatedBy, 
            createdAt, lastUpdated
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          trackingId, eventId, mail.id, 'Inward', mail.status,
          mail.subject, mail.sender, mail.priority, mail.deptId, 'System',
          now, now
        ], function(err) {
          if (err) {
            console.error(`❌ Error creating tracking for ${mail.mailId}:`, err);
          } else {
            console.log(`✅ Created tracking event for: ${mail.mailId}`);
          }
          
          completed++;
          if (completed === mails.length) {
            console.log(`🎉 All tracking events added successfully!`);
            db.close();
          }
        });
      });
    });
  });
});
