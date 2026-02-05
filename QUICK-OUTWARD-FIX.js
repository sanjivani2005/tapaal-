// QUICK FIX - Copy and paste this in MongoDB Shell
// This will clear existing data and create working sample data

use tapaal

// Clear existing outward mails
db.outwardmails.deleteMany({});

// Insert working sample data
db.outwardmails.insertMany([
  {
    id: "OUT-2024-101",
    trackingId: "TRK-20240101",
    sentBy: "System Admin",
    receiver: "Test Company",
    receiverAddress: "123 Business Street, Mumbai",
    date: "2024-01-15",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Test Outward Mail Subject",
    details: "This is a test outward mail for demonstration purposes",
    referenceDetails: "REF-2024-101",
    status: "pending",
    priority: "Normal",
    department: "Finance",
    dueDate: new Date("2024-01-20"),
    cost: 150.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-102",
    trackingId: "TRK-20240102",
    sentBy: "Finance Department",
    receiver: "ABC Corporation",
    receiverAddress: "456 Corporate Avenue, Delhi",
    date: "2024-01-16",
    type: "Outward",
    deliveryMode: "Registered Post",
    subject: "Financial Statements Q4 2023",
    details: "Please find attached financial statements for Q4 2023",
    referenceDetails: "FIN-2024-102",
    status: "sent",
    priority: "High",
    department: "Finance",
    dueDate: new Date("2024-01-18"),
    cost: 200.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-103",
    trackingId: "TRK-20240103",
    sentBy: "HR Department",
    receiver: "All Employees",
    receiverAddress: "Internal Distribution",
    date: "2024-01-17",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Holiday Schedule Update 2024",
    details: "Updated holiday schedule for the year 2024",
    referenceDetails: "HR-2024-103",
    status: "delivered",
    priority: "Normal",
    department: "HR",
    dueDate: new Date("2024-01-17"),
    cost: 0.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Verify insertion
print("📤 Outward Mails: " + db.outwardmails.countDocuments());
print("✅ Sample data inserted successfully!");

// Show the data
db.outwardmails.find().forEach(function(doc) {
  print("📧 ID: " + doc.id + " | Receiver: " + doc.receiver + " | Status: " + doc.status);
});
