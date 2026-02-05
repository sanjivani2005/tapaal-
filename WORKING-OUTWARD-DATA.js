// WORKING OUTWARD MAIL DATA - Copy and paste in MongoDB Shell
// This data matches the schema exactly

use tapaal

// Clear existing data
db.outwardmails.deleteMany({});

// Insert working data that matches schema
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
    referenceDetails: "",
    status: "pending",
    priority: "Normal",
    department: "Finance",
    dueDate: null,
    cost: 150.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-102",
    trackingId: "TRK-20240102",
    sentBy: "Rajesh Kumar",
    receiver: "ABC Corporation",
    receiverAddress: "456 Corporate Avenue, Delhi",
    date: "2024-01-16",
    type: "Outward",
    deliveryMode: "Registered Post",
    subject: "Financial Documents",
    details: "Please find attached financial documents for review",
    referenceDetails: "FIN-2024-102",
    status: "sent",
    priority: "High",
    department: "Finance",
    dueDate: new Date("2024-01-20"),
    cost: 200.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-103",
    trackingId: "TRK-20240103",
    sentBy: "Priya Sharma",
    receiver: "Tech Solutions",
    receiverAddress: "789 Tech Park, Bangalore",
    date: "2024-01-17",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Software License Renewal",
    details: "ERP software license renewal for 2024-25",
    referenceDetails: "TECH-2024-103",
    status: "delivered",
    priority: "Medium",
    department: "IT",
    dueDate: new Date("2024-01-19"),
    cost: 0.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-104",
    trackingId: "TRK-20240104",
    sentBy: "Vikram Singh",
    receiver: "All Employees",
    receiverAddress: "Internal Distribution",
    date: "2024-01-18",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Holiday Schedule Update",
    details: "Updated holiday schedule for 2024",
    referenceDetails: "HR-2024-104",
    status: "delivered",
    priority: "Normal",
    department: "HR",
    dueDate: new Date("2024-01-18"),
    cost: 0.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "OUT-2024-105",
    trackingId: "TRK-20240105",
    sentBy: "Anita Desai",
    receiver: "Global Procurement",
    receiverAddress: "321 Procurement Hub, Chennai",
    date: "2024-01-19",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Office Supplies Order",
    details: "Order confirmation for office supplies",
    referenceDetails: "PROC-2024-105",
    status: "pending",
    priority: "Low",
    department: "Procurement",
    dueDate: new Date("2024-01-25"),
    cost: 320.00,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Verify insertion
print("📤 Outward Mails Added: " + db.outwardmails.countDocuments());

// Show the data
db.outwardmails.find().forEach(function(doc) {
  print("📧 ID: " + doc.id + " | Receiver: " + doc.receiver + " | Status: " + doc.status);
});

print("✅ Working data successfully added!");
print("🚀 Now test your API: http://localhost:5001/api/outward-mails");
