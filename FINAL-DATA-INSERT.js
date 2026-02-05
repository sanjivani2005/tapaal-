// FINAL SOLUTION - Clear and Insert Fresh Data
// Copy and paste this ENTIRE script in MongoDB Shell

use tapaal

// Step 1: Clear ALL existing data
print("🗑️ Clearing existing data...");
db.inwardmails.deleteMany({});
db.outwardmails.deleteMany({});
print("✅ Data cleared");

// Step 2: Insert fresh inward mails with unique IDs
print("📤 Inserting fresh inward mails...");
db.inwardmails.insertMany([
  {
    id: "INW-2024-101",
    trackingId: "TRK-20240101",
    receivedBy: "Rajesh Kumar",
    handoverTo: "Priya Sharma",
    sender: "ABC Corporation Ltd.",
    date: "2024-01-15 09:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Annual financial statements for FY 2023-24 audit review",
    referenceDetails: "FIN-2024-101",
    status: "pending",
    priority: "High",
    department: "Finance",
    attachments: [],
    createdAt: new Date("2024-01-15T09:30:00Z"),
    updatedAt: new Date("2024-01-15T09:30:00Z")
  },
  {
    id: "INW-2024-102", 
    trackingId: "TRK-20240102",
    receivedBy: "Amit Patel",
    handoverTo: "Sneha Reddy",
    sender: "XYZ Legal Services",
    date: "2024-01-16 11:45:00",
    type: "Inward",
    deliveryMode: "Post",
    details: "Legal notice regarding property dispute - Case #LP-2024-015",
    referenceDetails: "LEGAL-2024-102",
    status: "in-progress",
    priority: "Important",
    department: "Legal",
    attachments: [],
    createdAt: new Date("2024-01-16T11:45:00Z"),
    updatedAt: new Date("2024-01-16T14:30:00Z")
  },
  {
    id: "INW-2024-103",
    trackingId: "TRK-20240103", 
    receivedBy: "Neha Gupta",
    handoverTo: "Vikram Singh",
    sender: "Tech Solutions India",
    date: "2024-01-17 14:20:00",
    type: "Inward",
    deliveryMode: "Hand Delivery",
    details: "Software license renewal proposal for ERP system",
    referenceDetails: "TECH-2024-103",
    status: "approved",
    priority: "Medium",
    department: "IT",
    attachments: [],
    createdAt: new Date("2024-01-17T14:20:00Z"),
    updatedAt: new Date("2024-01-18T10:15:00Z")
  },
  {
    id: "INW-2024-104",
    trackingId: "TRK-20240104",
    receivedBy: "Kavita Nair",
    handoverTo: "Rahul Verma",
    sender: "HR Department - Head Office",
    date: "2024-01-18 10:15:00",
    type: "Inward",
    deliveryMode: "Email",
    details: "New employee onboarding documents and policies update",
    referenceDetails: "HR-2024-104",
    status: "waiting",
    priority: "Normal",
    department: "HR",
    attachments: [],
    createdAt: new Date("2024-01-18T10:15:00Z"),
    updatedAt: new Date("2024-01-18T10:15:00Z")
  },
  {
    id: "INW-2024-105",
    trackingId: "TRK-20240105",
    receivedBy: "Sanjay Mehta",
    handoverTo: "Anita Desai",
    sender: "Global Procurement Partners",
    date: "2024-01-19 16:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Vendor quotation for office supplies and equipment",
    referenceDetails: "PROC-2024-105",
    status: "pending",
    priority: "Low",
    department: "Procurement",
    attachments: [],
    createdAt: new Date("2024-01-19T16:30:00Z"),
    updatedAt: new Date("2024-01-19T16:30:00Z")
  },
  {
    id: "INW-2024-106",
    trackingId: "TRK-20240106",
    receivedBy: "Deepak Joshi",
    handoverTo: "Pooja Singh",
    sender: "Ministry of Corporate Affairs",
    date: "2024-01-20 13:45:00",
    type: "Inward",
    deliveryMode: "Post",
    details: "Compliance notice for annual filing requirements",
    referenceDetails: "MCA-2024-106",
    status: "approved",
    priority: "High",
    department: "Administration",
    attachments: [],
    createdAt: new Date("2024-01-20T13:45:00Z"),
    updatedAt: new Date("2024-01-21T09:20:00Z")
  },
  {
    id: "INW-2024-107",
    trackingId: "TRK-20240107",
    receivedBy: "Arvind Kumar",
    handoverTo: "Meera Patel",
    sender: "Client Services Department",
    date: "2024-01-21 15:00:00",
    type: "Inward",
    deliveryMode: "Email",
    details: "Customer feedback report and satisfaction survey results",
    referenceDetails: "CS-2024-107",
    status: "rejected",
    priority: "Normal",
    department: "Administration",
    attachments: [],
    createdAt: new Date("2024-01-21T15:00:00Z"),
    updatedAt: new Date("2024-01-22T11:30:00Z")
  },
  {
    id: "INW-2024-108",
    trackingId: "TRK-20240108",
    receivedBy: "Ramesh Iyer",
    handoverTo: "Lakshmi Narayan",
    sender: "Insurance Company Ltd.",
    date: "2024-01-22 12:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Insurance policy renewal documents and premium details",
    referenceDetails: "INS-2024-108",
    status: "pending",
    priority: "Medium",
    department: "Finance",
    attachments: [],
    createdAt: new Date("2024-01-22T12:30:00Z"),
    updatedAt: new Date("2024-01-22T12:30:00Z")
  }
]);

// Step 3: Insert fresh outward mails with unique IDs
print("📤 Inserting fresh outward mails...");
db.outwardmails.insertMany([
  {
    id: "OUT-2024-101",
    trackingId: "TRK-20240109",
    sentBy: "Priya Sharma",
    receiver: "ABC Corporation Ltd.",
    receiverAddress: "123 Business Park, Mumbai, Maharashtra 400001",
    date: "2024-01-16 10:00:00",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Response to Financial Statements - Audit Queries",
    details: "Response to queries regarding annual financial statements for FY 2023-24 audit",
    referenceDetails: "FIN-2024-101-RESP",
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
    id: "OUT-2024-102",
    trackingId: "TRK-20240110",
    sentBy: "Sneha Reddy",
    receiver: "XYZ Legal Services",
    receiverAddress: "456 Legal Complex, Delhi, 110001",
    date: "2024-01-17 14:30:00",
    type: "Outward",
    deliveryMode: "Registered Post",
    subject: "Re: Legal Notice - Property Dispute Case #LP-2024-015",
    details: "Acknowledgement and response to legal notice regarding property dispute",
    referenceDetails: "LEGAL-2024-102-RESP",
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
    id: "OUT-2024-103",
    trackingId: "TRK-20240111",
    sentBy: "Vikram Singh",
    receiver: "Tech Solutions India",
    receiverAddress: "789 Tech Park, Bangalore, Karnataka 560001",
    date: "2024-01-18 11:15:00",
    type: "Outward",
    deliveryMode: "Email",
    subject: "ERP Software License Renewal - Purchase Order",
    details: "Official purchase order for ERP software license renewal for 2024-25",
    referenceDetails: "TECH-2024-103-PO",
    status: "delivered",
    priority: "Medium",
    department: "IT",
    dueDate: "2024-01-19 00:00:00",
    cost: 0.00,
    attachments: [],
    createdAt: new Date("2024-01-18T11:15:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z")
  },
  {
    id: "OUT-2024-104",
    trackingId: "TRK-20240112",
    sentBy: "Rahul Verma",
    receiver: "All Branch Managers",
    receiverAddress: "Multiple Locations",
    date: "2024-01-19 09:00:00",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Q1 2024 - HR Policy Updates and Guidelines",
    details: "Updated HR policies and employee guidelines for Q1 2024",
    referenceDetails: "HR-2024-104-CIRC",
    status: "delivered",
    priority: "Normal",
    department: "HR",
    dueDate: "2024-01-19 00:00:00",
    cost: 0.00,
    attachments: [],
    createdAt: new Date("2024-01-19T09:00:00Z"),
    updatedAt: new Date("2024-01-19T17:30:00Z")
  },
  {
    id: "OUT-2024-105",
    trackingId: "TRK-20240113",
    sentBy: "Anita Desai",
    receiver: "Global Procurement Partners",
    receiverAddress: "321 Procurement Hub, Chennai, Tamil Nadu 600001",
    date: "2024-01-20 15:45:00",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Re: Office Supplies Quotation - Order Confirmation",
    details: "Order confirmation for office supplies based on quotation Q1-2024",
    referenceDetails: "PROC-2024-105-ORDER",
    status: "sent",
    priority: "Low",
    department: "Procurement",
    dueDate: "2024-01-25 00:00:00",
    cost: 320.00,
    attachments: [],
    createdAt: new Date("2024-01-20T15:45:00Z"),
    updatedAt: new Date("2024-01-20T15:45:00Z")
  },
  {
    id: "OUT-2024-106",
    trackingId: "TRK-20240114",
    sentBy: "Pooja Singh",
    receiver: "Ministry of Corporate Affairs",
    receiverAddress: "CGO Complex, New Delhi, 110001",
    date: "2024-01-21 13:00:00",
    type: "Outward",
    deliveryMode: "Speed Post",
    subject: "Annual Filing Compliance - Form MGT-7",
    details: "Annual return filing for FY 2023-24 as per MCA regulations",
    referenceDetails: "MCA-2024-106-FILING",
    status: "delivered",
    priority: "High",
    department: "Administration",
    dueDate: "2024-01-22 00:00:00",
    cost: 180.00,
    attachments: [],
    createdAt: new Date("2024-01-21T13:00:00Z"),
    updatedAt: new Date("2024-01-22T10:15:00Z")
  }
]);

// Step 4: Verify results
print("📊 FINAL RESULTS:");
print("📧 Inward Mails: " + db.inwardmails.countDocuments());
print("📤 Outward Mails: " + db.outwardmails.countDocuments());

print("\n📈 Status Distribution:");
db.inwardmails.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  Inward - " + doc._id + ": " + doc.count));

db.outwardmails.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  Outward - " + doc._id + ": " + doc.count));

print("\n🏢 Department Distribution:");
db.inwardmails.aggregate([
  { $group: { _id: "$department", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  Inward - " + doc._id + ": " + doc.count));

print("\n🎉 SUCCESS! Database populated with fresh data!");
print("🚀 Test your frontend at: http://localhost:3002/");
