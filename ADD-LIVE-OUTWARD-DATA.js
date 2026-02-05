// LIVE OUTWARD MAIL DATA - Copy and paste in MongoDB Shell
// This will add realistic sample data to your API

use tapaal

// Clear existing data (optional - comment out if you want to keep existing data)
db.outwardmails.deleteMany({});

// Insert realistic live data
db.outwardmails.insertMany([
  {
    id: "OUT-2024-001",
    trackingId: "TRK-20240001",
    sentBy: "Rajesh Kumar",
    receiver: "ABC Corporation Ltd.",
    receiverAddress: "123 Business Park, Mumbai, Maharashtra 400001",
    date: "2024-01-15",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Financial Statements Q4 2023",
    details: "Please find attached audited financial statements for the quarter ending December 2023. The documents include balance sheet, profit & loss statement, and cash flow statement.",
    referenceDetails: "FIN-2024-001",
    status: "delivered",
    priority: "High",
    department: "Finance",
    dueDate: new Date("2024-01-18"),
    cost: 250.00,
    attachments: [
      {
        filename: "financial_statements.pdf",
        originalName: "ABC_Corp_Financial_Statements_Q4_2023.pdf",
        path: "uploads/outward/financial_statements.pdf",
        size: 2048576
      }
    ],
    createdAt: new Date("2024-01-15T10:30:00Z"),
    updatedAt: new Date("2024-01-16T14:20:00Z")
  },
  {
    id: "OUT-2024-002",
    trackingId: "TRK-20240002",
    sentBy: "Priya Sharma",
    receiver: "XYZ Legal Services",
    receiverAddress: "456 Legal Complex, Delhi, 110001",
    date: "2024-01-16",
    type: "Outward",
    deliveryMode: "Registered Post",
    subject: "Response to Legal Notice - Property Dispute Case #LP-2024-015",
    details: "In response to your legal notice dated January 10, 2024, regarding the property dispute, we have reviewed the matter and hereby submit our response with supporting documents.",
    referenceDetails: "LEGAL-2024-002-RESP",
    status: "sent",
    priority: "Important",
    department: "Legal",
    dueDate: new Date("2024-01-20"),
    cost: 180.00,
    attachments: [
      {
        filename: "legal_response.pdf",
        originalName: "Property_Dispute_Response_2024.pdf",
        path: "uploads/outward/legal_response.pdf",
        size: 1536000
      }
    ],
    createdAt: new Date("2024-01-16T11:45:00Z"),
    updatedAt: new Date("2024-01-16T11:45:00Z")
  },
  {
    id: "OUT-2024-003",
    trackingId: "TRK-20240003",
    sentBy: "Vikram Singh",
    receiver: "Tech Solutions India",
    receiverAddress: "789 Tech Park, Bangalore, Karnataka 560001",
    date: "2024-01-17",
    type: "Outward",
    deliveryMode: "Email",
    subject: "ERP Software License Renewal - Purchase Order",
    details: "Official purchase order for ERP software license renewal for the period 2024-25. Please process the renewal and send updated license keys.",
    referenceDetails: "TECH-2024-003-PO",
    status: "delivered",
    priority: "Medium",
    department: "IT",
    dueDate: new Date("2024-01-19"),
    cost: 0.00,
    attachments: [
      {
        filename: "purchase_order.pdf",
        originalName: "ERP_Software_PO_2024.pdf",
        path: "uploads/outward/purchase_order.pdf",
        size: 512000
      }
    ],
    createdAt: new Date("2024-01-17T14:30:00Z"),
    updatedAt: new Date("2024-01-18T09:15:00Z")
  },
  {
    id: "OUT-2024-004",
    trackingId: "TRK-20240004",
    sentBy: "Rahul Verma",
    receiver: "All Branch Managers",
    receiverAddress: "Multiple Locations - Internal Distribution",
    date: "2024-01-18",
    type: "Outward",
    deliveryMode: "Email",
    subject: "Q1 2024 - HR Policy Updates and Guidelines",
    details: "Updated HR policies and employee guidelines for Q1 2024. All branch managers are requested to circulate this information among their teams and ensure compliance.",
    referenceDetails: "HR-2024-004-CIRC",
    status: "delivered",
    priority: "Normal",
    department: "HR",
    dueDate: new Date("2024-01-18"),
    cost: 0.00,
    attachments: [
      {
        filename: "policy_updates.pdf",
        originalName: "HR_Policy_Updates_Q1_2024.pdf",
        path: "uploads/outward/policy_updates.pdf",
        size: 2048000
      }
    ],
    createdAt: new Date("2024-01-18T09:00:00Z"),
    updatedAt: new Date("2024-01-18T17:30:00Z")
  },
  {
    id: "OUT-2024-005",
    trackingId: "TRK-20240005",
    sentBy: "Anita Desai",
    receiver: "Global Procurement Partners",
    receiverAddress: "321 Procurement Hub, Chennai, Tamil Nadu 600001",
    date: "2024-01-19",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Office Supplies Quotation - Order Confirmation",
    details: "Order confirmation for office supplies based on your quotation Q1-2024. Please deliver the items as per the agreed schedule and specifications.",
    referenceDetails: "PROC-2024-005-ORDER",
    status: "sent",
    priority: "Low",
    department: "Procurement",
    dueDate: new Date("2024-01-25"),
    cost: 320.00,
    attachments: [
      {
        filename: "order_confirmation.pdf",
        originalName: "Office_Supplies_Order_2024.pdf",
        path: "uploads/outward/order_confirmation.pdf",
        size: 768000
      }
    ],
    createdAt: new Date("2024-01-19T15:45:00Z"),
    updatedAt: new Date("2024-01-19T15:45:00Z")
  },
  {
    id: "OUT-2024-006",
    trackingId: "TRK-20240006",
    sentBy: "Pooja Singh",
    receiver: "Ministry of Corporate Affairs",
    receiverAddress: "CGO Complex, New Delhi, 110001",
    date: "2024-01-20",
    type: "Outward",
    deliveryMode: "Speed Post",
    subject: "Annual Filing Compliance - Form MGT-7",
    details: "Annual return filing for FY 2023-24 as per MCA regulations. All required documents and forms are attached for your reference and processing.",
    referenceDetails: "MCA-2024-006-FILING",
    status: "delivered",
    priority: "High",
    department: "Administration",
    dueDate: new Date("2024-01-22"),
    cost: 180.00,
    attachments: [
      {
        filename: "annual_return.pdf",
        originalName: "MGT7_Annual_Return_2024.pdf",
        path: "uploads/outward/annual_return.pdf",
        size: 3072000
      }
    ],
    createdAt: new Date("2024-01-20T13:00:00Z"),
    updatedAt: new Date("2024-01-22T10:15:00Z")
  },
  {
    id: "OUT-2024-007",
    trackingId: "TRK-20240007",
    sentBy: "Arvind Kumar",
    receiver: "Client Services Department",
    receiverAddress: "789 Client Center, Mumbai, Maharashtra 400001",
    date: "2024-01-21",
    type: "Outward",
    deliveryMode: "Hand Delivery",
    subject: "Customer Feedback Report - Q4 2023",
    details: "Comprehensive customer feedback report for Q4 2023 including satisfaction scores, complaints resolution, and improvement suggestions.",
    referenceDetails: "CS-2024-007-REPORT",
    status: "pending",
    priority: "Normal",
    department: "Administration",
    dueDate: new Date("2024-01-23"),
    cost: 0.00,
    attachments: [
      {
        filename: "feedback_report.pdf",
        originalName: "Customer_Feedback_Q4_2023.pdf",
        path: "uploads/outward/feedback_report.pdf",
        size: 921600
      }
    ],
    createdAt: new Date("2024-01-21T15:00:00Z"),
    updatedAt: new Date("2024-01-21T15:00:00Z")
  },
  {
    id: "OUT-2024-008",
    trackingId: "TRK-20240008",
    sentBy: "Meera Patel",
    receiver: "Insurance Company Ltd.",
    receiverAddress: "456 Insurance Tower, Mumbai, Maharashtra 400001",
    date: "2024-01-22",
    type: "Outward",
    deliveryMode: "Courier",
    subject: "Insurance Policy Renewal - Office Assets",
    details: "Request for renewal of office insurance policies including fire insurance, theft insurance, and employee liability coverage for the year 2024-25.",
    referenceDetails: "INS-2024-008-RENEWAL",
    status: "pending",
    priority: "Medium",
    department: "Finance",
    dueDate: new Date("2024-01-25"),
    cost: 150.00,
    attachments: [
      {
        filename: "insurance_request.pdf",
        originalName: "Office_Insurance_Renewal_2024.pdf",
        path: "uploads/outward/insurance_request.pdf",
        size: 1280000
      },
      {
        filename: "asset_list.pdf",
        originalName: "Office_Assets_List_2024.pdf",
        path: "uploads/outward/asset_list.pdf",
        size: 640000
      }
    ],
    createdAt: new Date("2024-01-22T12:30:00Z"),
    updatedAt: new Date("2024-01-22T12:30:00Z")
  }
]);

// Verify insertion and show results
print("📤 Outward Mails Added: " + db.outwardmails.countDocuments());
print("🎯 Status Distribution:");
db.outwardmails.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("🏢 Department Distribution:");
db.outwardmails.aggregate([
  { $group: { _id: "$department", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("📊 Priority Distribution:");
db.outwardmails.aggregate([
  { $group: { _id: "$priority", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]).forEach(doc => print("  - " + doc._id + ": " + doc.count));

print("✅ Live data successfully added to outward mails collection!");
print("🚀 Now test your API: http://localhost:5001/api/outward-mails");
