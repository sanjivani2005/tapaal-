// QUICK EXECUTION COMMANDS
// Copy and paste these commands in MongoDB Shell

use tapaal

// Clear existing data
db.inwardmails.deleteMany({});
db.outwardmails.deleteMany({});

// Insert sample inward mails
db.inwardmails.insertMany([
  {
    id: "INW-2024-001",
    trackingId: "TRK-20240001",
    receivedBy: "Rajesh Kumar",
    handoverTo: "Priya Sharma",
    sender: "ABC Corporation Ltd.",
    date: "2024-01-15 09:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Annual financial statements for FY 2023-24 audit review",
    referenceDetails: "FIN-2024-001",
    status: "pending",
    priority: "High",
    department: "Finance",
    attachments: [],
    createdAt: new Date("2024-01-15T09:30:00Z"),
    updatedAt: new Date("2024-01-15T09:30:00Z")
  },
  {
    id: "INW-2024-002", 
    trackingId: "TRK-20240002",
    receivedBy: "Amit Patel",
    handoverTo: "Sneha Reddy",
    sender: "XYZ Legal Services",
    date: "2024-01-16 11:45:00",
    type: "Inward",
    deliveryMode: "Post",
    details: "Legal notice regarding property dispute - Case #LP-2024-015",
    referenceDetails: "LEGAL-2024-015",
    status: "in-progress",
    priority: "Important",
    department: "Legal",
    attachments: [],
    createdAt: new Date("2024-01-16T11:45:00Z"),
    updatedAt: new Date("2024-01-16T14:30:00Z")
  },
  {
    id: "INW-2024-003",
    trackingId: "TRK-20240003", 
    receivedBy: "Neha Gupta",
    handoverTo: "Vikram Singh",
    sender: "Tech Solutions India",
    date: "2024-01-17 14:20:00",
    type: "Inward",
    deliveryMode: "Hand Delivery",
    details: "Software license renewal proposal for ERP system",
    referenceDetails: "TECH-2024-003",
    status: "approved",
    priority: "Medium",
    department: "IT",
    attachments: [],
    createdAt: new Date("2024-01-17T14:20:00Z"),
    updatedAt: new Date("2024-01-18T10:15:00Z")
  },
  {
    id: "INW-2024-004",
    trackingId: "TRK-20240004",
    receivedBy: "Kavita Nair",
    handoverTo: "Rahul Verma",
    sender: "HR Department - Head Office",
    date: "2024-01-18 10:15:00",
    type: "Inward",
    deliveryMode: "Email",
    details: "New employee onboarding documents and policies update",
    referenceDetails: "HR-2024-004",
    status: "waiting",
    priority: "Normal",
    department: "HR",
    attachments: [],
    createdAt: new Date("2024-01-18T10:15:00Z"),
    updatedAt: new Date("2024-01-18T10:15:00Z")
  },
  {
    id: "INW-2024-005",
    trackingId: "TRK-20240005",
    receivedBy: "Sanjay Mehta",
    handoverTo: "Anita Desai",
    sender: "Global Procurement Partners",
    date: "2024-01-19 16:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Vendor quotation for office supplies and equipment",
    referenceDetails: "PROC-2024-005",
    status: "pending",
    priority: "Low",
    department: "Procurement",
    attachments: [],
    createdAt: new Date("2024-01-19T16:30:00Z"),
    updatedAt: new Date("2024-01-19T16:30:00Z")
  }
]);

// Insert sample outward mails
db.outwardmails.insertMany([
  {
    id: "OUT-2024-001",
    trackingId: "TRK-20240009",
    sentBy: "Priya Sharma",
    receiver: "ABC Corporation Ltd.",
    receiverAddress: "123 Business Park, Mumbai, Maharashtra 400001",
    date: "2024-01-16 10:00:00",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Response to Financial Statements - Audit Queries",
    details: "Response to queries regarding annual financial statements for FY 2023-24 audit",
    referenceDetails: "FIN-2024-001-RESP",
    status: "delivered",
    priority: "High",
    department: "Finance",
    dueDate: "2024-01-18 00:00:00",
    cost: 250.00,
    attachments: [],
    createdAt: new Date("2024-01-16T10:00:00Z"),
    updatedAt: new Date("2024-01-17T14:20:00Z")
  },
  {
    id: "OUT-2024-002",
    trackingId: "TRK-20240010",
    sentBy: "Sneha Reddy",
    receiver: "XYZ Legal Services",
    receiverAddress: "456 Legal Complex, Delhi, 110001",
    date: "2024-01-17 14:30:00",
    type: "Outward",
    deliveryMode: "Registered Post",
    subject: "Re: Legal Notice - Property Dispute Case #LP-2024-015",
    details: "Acknowledgement and response to legal notice regarding property dispute",
    referenceDetails: "LEGAL-2024-015-RESP",
    status: "sent",
    priority: "Important",
    department: "Legal",
    dueDate: "2024-01-20 00:00:00",
    cost: 150.00,
    attachments: [],
    createdAt: new Date("2024-01-17T14:30:00Z"),
    updatedAt: new Date("2024-01-17T14:30:00Z")
  },
  {
    id: "OUT-2024-003",
    trackingId: "TRK-20240011",
    sentBy: "Vikram Singh",
    receiver: "Tech Solutions India",
    receiverAddress: "789 Tech Park, Bangalore, Karnataka 560001",
    date: "2024-01-18 11:15:00",
    type: "Outward",
    deliveryMode: "Email",
    subject: "ERP Software License Renewal - Purchase Order",
    details: "Official purchase order for ERP software license renewal for 2024-25",
    referenceDetails: "TECH-2024-003-PO",
    status: "delivered",
    priority: "Medium",
    department: "IT",
    dueDate: "2024-01-19 00:00:00",
    cost: 0.00,
    attachments: [],
    createdAt: new Date("2024-01-18T11:15:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z")
  }
]);

// Verify data
print("📊 Data Summary:");
print("📧 Inward Mails: " + db.inwardmails.countDocuments());
print("📤 Outward Mails: " + db.outwardmails.countDocuments());

print("🎉 Sample data inserted successfully!");
print("🚀 Test your frontend at: http://localhost:3002/");
