# 🗄️ MongoDB Schema Creation Commands

## 📋 **Database Setup Commands**

### **Step 1: Connect to MongoDB**
```bash
# Open MongoDB Shell
mongosh

# Or connect directly to tapaal database
mongosh mongodb://localhost:27017/tapaal
```

### **Step 2: Create Database and Switch to It**
```javascript
// In MongoDB Shell
use tapaal
```

### **Step 3: Create Collections with Schema Validation**

#### **Inward Mails Collection**
```javascript
// Create inwardmails collection with schema validation
db.createCollection("inwardmails", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "trackingId", "receivedBy", "handoverTo", "sender", "date", "type", "deliveryMode", "details", "status", "priority", "department"],
      properties: {
        id: {
          bsonType: "string",
          description: "Unique inward mail ID (INW-YYYY-NNN)"
        },
        trackingId: {
          bsonType: "string",
          description: "Tracking ID (TRK-YYYYNNNN)"
        },
        receivedBy: {
          bsonType: "string",
          description: "Name of person who received the mail"
        },
        handoverTo: {
          bsonType: "string",
          description: "Name of person mail was handed over to"
        },
        sender: {
          bsonType: "string",
          description: "Sender name or organization"
        },
        date: {
          bsonType: "string",
          description: "Date received (YYYY-MM-DD HH:MM:SS)"
        },
        type: {
          bsonType: "string",
          enum: ["Inward"],
          description: "Mail type"
        },
        deliveryMode: {
          bsonType: "string",
          enum: ["Courier", "Post", "Hand Delivery", "Email", "Fax"],
          description: "Mode of delivery"
        },
        details: {
          bsonType: "string",
          description: "Mail content or description"
        },
        referenceDetails: {
          bsonType: "string",
          description: "Reference number or details"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "approved", "waiting", "in-progress", "rejected"],
          description: "Current status of the mail"
        },
        priority: {
          bsonType: "string",
          enum: ["Low", "Normal", "Medium", "High", "Important"],
          description: "Priority level"
        },
        department: {
          bsonType: "string",
          enum: ["Finance", "HR", "Procurement", "Administration", "IT", "Legal", "Accounts"],
          description: "Department handling the mail"
        },
        attachments: {
          bsonType: "array",
          description: "Array of file attachments",
          items: {
            bsonType: "object",
            required: ["filename", "path", "size"],
            properties: {
              filename: { bsonType: "string" },
              path: { bsonType: "string" },
              size: { bsonType: "number" },
              mimetype: { bsonType: "string" }
            }
          }
        },
        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});
```

#### **Outward Mails Collection**
```javascript
// Create outwardmails collection with schema validation
db.createCollection("outwardmails", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "trackingId", "sentBy", "receiver", "date", "type", "deliveryMode", "subject", "details", "status", "priority", "department"],
      properties: {
        id: {
          bsonType: "string",
          description: "Unique outward mail ID (OUT-YYYY-NNN)"
        },
        trackingId: {
          bsonType: "string",
          description: "Tracking ID (TRK-YYYYNNNN)"
        },
        sentBy: {
          bsonType: "string",
          description: "Name of person who sent the mail"
        },
        receiver: {
          bsonType: "string",
          description: "Recipient name or organization"
        },
        receiverAddress: {
          bsonType: "string",
          description: "Full recipient address"
        },
        date: {
          bsonType: "string",
          description: "Date sent (YYYY-MM-DD HH:MM:SS)"
        },
        type: {
          bsonType: "string",
          enum: ["Outward"],
          description: "Mail type"
        },
        deliveryMode: {
          bsonType: "string",
          enum: ["Courier", "Post", "Hand Delivery", "Email", "Fax"],
          description: "Mode of delivery"
        },
        subject: {
          bsonType: "string",
          description: "Mail subject"
        },
        details: {
          bsonType: "string",
          description: "Mail content or description"
        },
        referenceDetails: {
          bsonType: "string",
          description: "Reference number or details"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "sent", "delivered", "returned", "cancelled"],
          description: "Current status of the mail"
        },
        priority: {
          bsonType: "string",
          enum: ["Low", "Normal", "Medium", "High", "Important"],
          description: "Priority level"
        },
        department: {
          bsonType: "string",
          enum: ["Finance", "HR", "Procurement", "Administration", "IT", "Legal", "Accounts"],
          description: "Department sending the mail"
        },
        dueDate: {
          bsonType: "string",
          description: "Expected delivery date"
        },
        cost: {
          bsonType: "number",
          description: "Cost of sending the mail"
        },
        attachments: {
          bsonType: "array",
          description: "Array of file attachments",
          items: {
            bsonType: "object",
            required: ["filename", "path", "size"],
            properties: {
              filename: { bsonType: "string" },
              path: { bsonType: "string" },
              size: { bsonType: "number" },
              mimetype: { bsonType: "string" }
            }
          }
        },
        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        }
      }
    }
  }
});
```

### **Step 4: Create Indexes for Performance**

#### **Inward Mails Indexes**
```javascript
// Create indexes for inwardmails collection
db.inwardmails.createIndex({ "id": 1 }, { unique: true });
db.inwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.inwardmails.createIndex({ "sender": 1 });
db.inwardmails.createIndex({ "department": 1 });
db.inwardmails.createIndex({ "status": 1 });
db.inwardmails.createIndex({ "priority": 1 });
db.inwardmails.createIndex({ "date": -1 });
db.inwardmails.createIndex({ "createdAt": -1 });
db.inwardmails.createIndex({ 
  "sender": "text", 
  "details": "text", 
  "referenceDetails": "text" 
}, { 
  name: "inward_search_index" 
});
```

#### **Outward Mails Indexes**
```javascript
// Create indexes for outwardmails collection
db.outwardmails.createIndex({ "id": 1 }, { unique: true });
db.outwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.outwardmails.createIndex({ "receiver": 1 });
db.outwardmails.createIndex({ "department": 1 });
db.outwardmails.createIndex({ "status": 1 });
db.outwardmails.createIndex({ "priority": 1 });
db.outwardmails.createIndex({ "date": -1 });
db.outwardmails.createIndex({ "createdAt": -1 });
db.outwardmails.createIndex({ 
  "receiver": "text", 
  "subject": "text", 
  "details": "text", 
  "referenceDetails": "text" 
}, { 
  name: "outward_search_index" 
});
```

### **Step 5: Insert Sample Data (Optional)**

#### **Sample Inward Mail**
```javascript
db.inwardmails.insertOne({
  id: "INW-2024-001",
  trackingId: "TRK-20240001",
  receivedBy: "System Admin",
  handoverTo: "System Admin",
  sender: "Test Company",
  date: "2024-01-15 10:30:00",
  type: "Inward",
  deliveryMode: "Courier",
  details: "Test inward mail for demonstration",
  referenceDetails: "REF-2024-001",
  status: "pending",
  priority: "High",
  department: "Finance",
  attachments: [],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

#### **Sample Outward Mail**
```javascript
db.outwardmails.insertOne({
  id: "OUT-2024-001",
  trackingId: "TRK-20240002",
  sentBy: "System Admin",
  receiver: "Test Recipient",
  receiverAddress: "123 Test Street, Test City",
  date: "2024-01-16 14:20:00",
  type: "Outward",
  deliveryMode: "Courier",
  subject: "Test Outward Mail",
  details: "Test outward mail for demonstration",
  referenceDetails: "REF-2024-002",
  status: "sent",
  priority: "Important",
  department: "Administration",
  dueDate: "2024-01-20 00:00:00",
  cost: 150.00,
  attachments: [],
  createdAt: new Date(),
  updatedAt: new Date()
});
```

### **Step 6: Verify Schema Creation**
```javascript
// List all collections
show collections

// Check collection schema
db.inwardmails.getIndexes();
db.outwardmails.getIndexes();

// View sample data
db.inwardmails.find().pretty();
db.outwardmails.find().pretty();
```

## 🚀 **Quick Start Commands**

### **One-Command Setup:**
```bash
# Copy and paste this entire block in MongoDB Shell
use tapaal

// Create inwardmails collection
db.createCollection("inwardmails", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "trackingId", "receivedBy", "handoverTo", "sender", "date", "type", "deliveryMode", "details", "status", "priority", "department"],
      properties: {
        id: { bsonType: "string" },
        trackingId: { bsonType: "string" },
        receivedBy: { bsonType: "string" },
        handoverTo: { bsonType: "string" },
        sender: { bsonType: "string" },
        date: { bsonType: "string" },
        type: { bsonType: "string", enum: ["Inward"] },
        deliveryMode: { bsonType: "string" },
        details: { bsonType: "string" },
        referenceDetails: { bsonType: "string" },
        status: { bsonType: "string", enum: ["pending", "approved", "waiting", "in-progress", "rejected"] },
        priority: { bsonType: "string", enum: ["Low", "Normal", "Medium", "High", "Important"] },
        department: { bsonType: "string" },
        attachments: { bsonType: "array" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create outwardmails collection
db.createCollection("outwardmails", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["id", "trackingId", "sentBy", "receiver", "date", "type", "deliveryMode", "subject", "details", "status", "priority", "department"],
      properties: {
        id: { bsonType: "string" },
        trackingId: { bsonType: "string" },
        sentBy: { bsonType: "string" },
        receiver: { bsonType: "string" },
        receiverAddress: { bsonType: "string" },
        date: { bsonType: "string" },
        type: { bsonType: "string", enum: ["Outward"] },
        deliveryMode: { bsonType: "string" },
        subject: { bsonType: "string" },
        details: { bsonType: "string" },
        referenceDetails: { bsonType: "string" },
        status: { bsonType: "string", enum: ["pending", "sent", "delivered", "returned", "cancelled"] },
        priority: { bsonType: "string", enum: ["Low", "Normal", "Medium", "High", "Important"] },
        department: { bsonType: "string" },
        dueDate: { bsonType: "string" },
        cost: { bsonType: "number" },
        attachments: { bsonType: "array" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.inwardmails.createIndex({ "id": 1 }, { unique: true });
db.inwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.outwardmails.createIndex({ "id": 1 }, { unique: true });
db.outwardmails.createIndex({ "trackingId": 1 }, { unique: true });

print("✅ Database schema created successfully!");
```

---

**🎉 Your MongoDB database is now ready with proper schema and indexes!**
