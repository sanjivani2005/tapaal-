# 🗄️ Complete MongoDB Setup Commands

## ✅ **Current Status:**
- ✅ Database: `tapaal`
- ✅ Collection: `inwardmails` created with schema
- ❌ Missing: `outwardmails` collection and sample data

## 🚀 **Remaining Commands to Execute:**

### **Step 1: Create outwardmails Collection**
```javascript
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
```

### **Step 2: Create Indexes for outwardmails**
```javascript
db.outwardmails.createIndex({ "id": 1 }, { unique: true });
db.outwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.outwardmails.createIndex({ "receiver": 1 });
db.outwardmails.createIndex({ "department": 1 });
db.outwardmails.createIndex({ "status": 1 });
db.outwardmails.createIndex({ "priority": 1 });
db.outwardmails.createIndex({ "date": -1 });
db.outwardmails.createIndex({ "createdAt": -1 });
```

### **Step 3: Add More Indexes for inwardmails**
```javascript
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

### **Step 4: Insert Sample Data**
```javascript
// Sample inward mail
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

// Sample outward mail
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

### **Step 5: Verify Setup**
```javascript
// Check collections
show collections

// Check document counts
db.inwardmails.countDocuments();
db.outwardmails.countDocuments();

// View sample data
db.inwardmails.findOne();
db.outwardmails.findOne();

// Check indexes
db.inwardmails.getIndexes();
db.outwardmails.getIndexes();
```

## 🎯 **Expected Final Results:**
- ✅ **Collections:** `inwardmails`, `outwardmails`
- ✅ **Document Counts:** 1 each (sample data)
- ✅ **Indexes:** Multiple indexes for performance
- ✅ **Schema Validation:** Working properly

## 🚀 **After Setup Complete:**

### **Start Backend Server:**
```bash
cd server
npm start
```

### **Start Frontend:**
```bash
npm run dev:frontend
```

### **Test Application:**
1. Open http://localhost:3002/
2. Navigate to Inward Mails
3. Click "Add Inward"
4. Fill form and save
5. Verify data appears in table

---

**🎉 Execute these commands and your database will be fully ready!**
