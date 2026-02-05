// Clear existing data and insert fresh comprehensive sample data
// Copy and paste this entire script in MongoDB Shell

use tapaal

print("🗑️ Clearing existing data...");

// Clear existing collections
db.inwardmails.deleteMany({});
db.outwardmails.deleteMany({});

print("✅ Existing data cleared");

print("📤 Inserting comprehensive sample data...");

// Insert multiple inward mails
const inwardMails = [
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
    attachments: [
      {
        filename: "financial_statements.pdf",
        originalName: "ABC_Corp_Financial_Statements_2024.pdf",
        path: "uploads/inward/financial_statements.pdf",
        size: 2048576
      }
    ],
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
    attachments: [
      {
        filename: "legal_notice.pdf",
        originalName: "Property_Dispute_Legal_Notice.pdf",
        path: "uploads/inward/legal_notice.pdf",
        size: 1024000
      }
    ],
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
    attachments: [
      {
        filename: "license_proposal.pdf",
        originalName: "ERP_License_Renewal_2024.pdf",
        path: "uploads/inward/license_proposal.pdf",
        size: 1536000
      },
      {
        filename: "pricing.xlsx",
        originalName: "Software_Pricing_2024.xlsx",
        path: "uploads/inward/pricing.xlsx",
        size: 512000
      }
    ],
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
    attachments: [
      {
        filename: "onboarding_guide.pdf",
        originalName: "Employee_Onboarding_Guide_2024.pdf",
        path: "uploads/inward/onboarding_guide.pdf",
        size: 3072000
      }
    ],
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
    attachments: [
      {
        filename: "quotation.pdf",
        originalName: "Office_Supplies_Quotation_Q1_2024.pdf",
        path: "uploads/inward/quotation.pdf",
        size: 768000
      }
    ],
    createdAt: new Date("2024-01-19T16:30:00Z"),
    updatedAt: new Date("2024-01-19T16:30:00Z")
  },
  {
    id: "INW-2024-006",
    trackingId: "TRK-20240006",
    receivedBy: "Deepak Joshi",
    handoverTo: "Pooja Singh",
    sender: "Ministry of Corporate Affairs",
    date: "2024-01-20 13:45:00",
    type: "Inward",
    deliveryMode: "Post",
    details: "Compliance notice for annual filing requirements",
    referenceDetails: "MCA-2024-006",
    status: "approved",
    priority: "High",
    department: "Administration",
    attachments: [
      {
        filename: "compliance_notice.pdf",
        originalName: "MCA_Compliance_Notice_2024.pdf",
        path: "uploads/inward/compliance_notice.pdf",
        size: 1280000
      }
    ],
    createdAt: new Date("2024-01-20T13:45:00Z"),
    updatedAt: new Date("2024-01-21T09:20:00Z")
  },
  {
    id: "INW-2024-007",
    trackingId: "TRK-20240007",
    receivedBy: "Arvind Kumar",
    handoverTo: "Meera Patel",
    sender: "Client Services Department",
    date: "2024-01-21 15:00:00",
    type: "Inward",
    deliveryMode: "Email",
    details: "Customer feedback report and satisfaction survey results",
    referenceDetails: "CS-2024-007",
    status: "rejected",
    priority: "Normal",
    department: "Administration",
    attachments: [
      {
        filename: "feedback_report.pdf",
        originalName: "Customer_Feedback_Q4_2023.pdf",
        path: "uploads/inward/feedback_report.pdf",
        size: 921600
      }
    ],
    createdAt: new Date("2024-01-21T15:00:00Z"),
    updatedAt: new Date("2024-01-22T11:30:00Z")
  },
  {
    id: "INW-2024-008",
    trackingId: "TRK-20240008",
    receivedBy: "Ramesh Iyer",
    handoverTo: "Lakshmi Narayan",
    sender: "Insurance Company Ltd.",
    date: "2024-01-22 12:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Insurance policy renewal documents and premium details",
    referenceDetails: "INS-2024-008",
    status: "pending",
    priority: "Medium",
    department: "Finance",
    attachments: [
      {
        filename: "insurance_policy.pdf",
        originalName: "Office_Insurance_Policy_2024.pdf",
        path: "uploads/inward/insurance_policy.pdf",
        size: 2560000
      },
      {
        filename: "premium_details.pdf",
        originalName: "Premium_Breakdown_2024.pdf",
        path: "uploads/inward/premium_details.pdf",
        size: 640000
      }
    ],
    createdAt: new Date("2024-01-22T12:30:00Z"),
    updatedAt: new Date("2024-01-22T12:30:00Z")
  }
];

// Insert inward mails
db.inwardmails.insertMany(inwardMails);
print("✅ Inserted " + inwardMails.length + " inward mails");

// Insert multiple outward mails
const outwardMails = [
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
    attachments: [
      {
        filename: "audit_response.pdf",
        originalName: "Financial_Audit_Response_2024.pdf",
        path: "uploads/outward/audit_response.pdf",
        size: 1024000
      }
    ],
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
    attachments: [
      {
        filename: "legal_response.pdf",
        originalName: "Property_Dispute_Response_2024.pdf",
        path: "uploads/outward/legal_response.pdf",
        size: 1536000
      }
    ],
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
    attachments: [
      {
        filename: "purchase_order.pdf",
        originalName: "ERP_Software_PO_2024.pdf",
        path: "uploads/outward/purchase_order.pdf",
        size: 512000
      }
    ],
    createdAt: new Date("2024-01-18T11:15:00Z"),
    updatedAt: new Date("2024-01-18T16:45:00Z")
  },
  {
    id: "OUT-2024-004",
    trackingId: "TRK-20240012",
    sentBy: "Rahul Verma",
    receiver: "All Branch Managers",
    receiverAddress: "Multiple Locations",
    date: "2024-01-19 09:00:00",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Q1 2024 - HR Policy Updates and Guidelines",
    details: "Updated HR policies and employee guidelines for Q1 2024",
    referenceDetails: "HR-2024-004-CIRC",
    status: "delivered",
    priority: "Normal",
    department: "HR",
    dueDate: "2024-01-19 00:00:00",
    cost: 0.00,
    attachments: [
      {
        filename: "policy_updates.pdf",
        originalName: "HR_Policy_Updates_Q1_2024.pdf",
        path: "uploads/outward/policy_updates.pdf",
        size: 2048000
      }
    ],
    createdAt: new Date("2024-01-19T09:00:00Z"),
    updatedAt: new Date("2024-01-19T17:30:00Z")
  },
  {
    id: "OUT-2024-005",
    trackingId: "TRK-20240013",
    sentBy: "Anita Desai",
    receiver: "Global Procurement Partners",
    receiverAddress: "321 Procurement Hub, Chennai, Tamil Nadu 600001",
    date: "2024-01-20 15:45:00",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Re: Office Supplies Quotation - Order Confirmation",
    details: "Order confirmation for office supplies based on quotation Q1-2024",
    referenceDetails: "PROC-2024-005-ORDER",
    status: "sent",
    priority: "Low",
    department: "Procurement",
    dueDate: "2024-01-25 00:00:00",
    cost: 320.00,
    attachments: [
      {
        filename: "order_confirmation.pdf",
        originalName: "Office_Supplies_Order_2024.pdf",
        path: "uploads/outward/order_confirmation.pdf",
        size: 768000
      }
    ],
    createdAt: new Date("2024-01-20T15:45:00Z"),
    updatedAt: new Date("2024-01-20T15:45:00Z")
  },
  {
    id: "OUT-2024-006",
    trackingId: "TRK-20240014",
    sentBy: "Pooja Singh",
    receiver: "Ministry of Corporate Affairs",
    receiverAddress: "CGO Complex, New Delhi, 110001",
    date: "2024-01-21 13:00:00",
    type: "Outward",
    deliveryMode: "Speed Post",
    subject: "Annual Filing Compliance - Form MGT-7",
    details: "Annual return filing for FY 2023-24 as per MCA regulations",
    referenceDetails: "MCA-2024-006-FILING",
    status: "delivered",
    priority: "High",
    department: "Administration",
    dueDate: "2024-01-22 00:00:00",
    cost: 180.00,
    attachments: [
      {
        filename: "annual_return.pdf",
        originalName: "MGT7_Annual_Return_2024.pdf",
        path: "uploads/outward/annual_return.pdf",
        size: 3072000
      }
    ],
    createdAt: new Date("2024-01-21T13:00:00Z"),
    updatedAt: new Date("2024-01-22T10:15:00Z")
  }
];

// Insert outward mails
db.outwardmails.insertMany(outwardMails);
print("✅ Inserted " + outwardMails.length + " outward mails");

print("📊 Database Summary:");
print("📧 Inward Mails: " + db.inwardmails.countDocuments());
print("📤 Outward Mails: " + db.outwardmails.countDocuments());

print("\n📈 Status Distribution:");
print("Inward Mails by Status:");
db.inwardmails.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("Outward Mails by Status:");
db.outwardmails.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("\n🏢 Department Distribution:");
print("Inward Mails by Department:");
db.inwardmails.aggregate([
  { $group: { _id: "$department", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("Outward Mails by Department:");
db.outwardmails.aggregate([
  { $group: { _id: "$department", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("\n🎯 Priority Distribution:");
print("Inward Mails by Priority:");
db.inwardmails.aggregate([
  { $group: { _id: "$priority", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("🎉 Comprehensive sample data insertion completed successfully!");
print("🚀 Your Tapaal application now has rich test data for testing!");
print("📱 Test your frontend at: http://localhost:3002/");
