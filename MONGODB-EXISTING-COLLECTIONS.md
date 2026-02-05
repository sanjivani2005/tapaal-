# 🔧 MongoDB Existing Collections Handling

## ✅ **Collection Already Exists - Solutions**

The error indicates that `tapaal.inwardmails` collection already exists with different schema options.

### **Option 1: Drop and Recreate Collection (Recommended)**
```javascript
// Connect to MongoDB
mongosh mongodb://localhost:27017/tapaal

// Drop existing collection
db.inwardmails.drop();
db.outwardmails.drop();

// Now recreate with proper schema
// (Copy commands from MONGODB-SCHEMA-COMMANDS.md)
```

### **Option 2: Update Existing Collection Schema**
```javascript
// Connect to MongoDB
mongosh mongodb://localhost:27017/tapaal

// Check current collection info
db.inwardmails.getCollectionInfos();

// Add indexes to existing collection
db.inwardmails.createIndex({ "id": 1 }, { unique: true });
db.inwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.inwardmails.createIndex({ "sender": 1 });
db.inwardmails.createIndex({ "department": 1 });
db.inwardmails.createIndex({ "status": 1 });
db.inwardmails.createIndex({ "priority": 1 });
db.inwardmails.createIndex({ "date": -1 });
db.inwardmails.createIndex({ "createdAt": -1 });

// For outwardmails (if exists)
db.outwardmails.createIndex({ "id": 1 }, { unique: true });
db.outwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.outwardmails.createIndex({ "receiver": 1 });
db.outwardmails.createIndex({ "department": 1 });
db.outwardmails.createIndex({ "status": 1 });
db.outwardmails.createIndex({ "priority": 1 });
db.outwardmails.createIndex({ "date": -1 });
db.outwardmails.createIndex({ "createdAt": -1 });
```

### **Option 3: Use CollMod to Update Schema (Advanced)**
```javascript
// Connect to MongoDB
mongosh mongodb://localhost:27017/tapaal

// Check current validator
db.runCommand({
  "collMod": "inwardmails",
  "validator": {},
  "validationLevel": "off"
});

// Then add new validator
db.runCommand({
  "collMod": "inwardmails",
  "validator": {
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
  },
  "validationLevel": "strict"
});
```

## 🚀 **Recommended Quick Fix**

### **Step 1: Drop and Recreate**
```javascript
// In MongoDB Shell
use tapaal

// Drop existing collections
db.inwardmails.drop();
db.outwardmails.drop();

print("✅ Existing collections dropped");
```

### **Step 2: Recreate with Proper Schema**
```javascript
// Copy and paste this complete setup
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
db.inwardmails.createIndex({ "sender": 1 });
db.inwardmails.createIndex({ "department": 1 });
db.inwardmails.createIndex({ "status": 1 });
db.inwardmails.createIndex({ "priority": 1 });
db.inwardmails.createIndex({ "date": -1 });
db.inwardmails.createIndex({ "createdAt": -1 });

db.outwardmails.createIndex({ "id": 1 }, { unique: true });
db.outwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.outwardmails.createIndex({ "receiver": 1 });
db.outwardmails.createIndex({ "department": 1 });
db.outwardmails.createIndex({ "status": 1 });
db.outwardmails.createIndex({ "priority": 1 });
db.outwardmails.createIndex({ "date": -1 });
db.outwardmails.createIndex({ "createdAt": -1 });

print("✅ Collections recreated with proper schema and indexes!");
```

### **Step 3: Verify Setup**
```javascript
// Check collections
show collections

// Check indexes
db.inwardmails.getIndexes();
db.outwardmails.getIndexes();

// Test with sample data
db.inwardmails.insertOne({
  id: "INW-2024-001",
  trackingId: "TRK-20240001",
  receivedBy: "System Admin",
  handoverTo: "System Admin",
  sender: "Test Company",
  date: "2024-01-15 10:30:00",
  type: "Inward",
  deliveryMode: "Courier",
  details: "Test mail",
  status: "pending",
  priority: "High",
  department: "Finance",
  attachments: [],
  createdAt: new Date(),
  updatedAt: new Date()
});

print("✅ Sample data inserted successfully!");
```

## 🎯 **Alternative: Just Use Existing Collections**

If you want to keep existing data, just add indexes:

```javascript
use tapaal

// Add indexes to existing collections
db.inwardmails.createIndex({ "id": 1 }, { unique: true });
db.inwardmails.createIndex({ "trackingId": 1 }, { unique: true });
db.inwardmails.createIndex({ "sender": 1 });
db.inwardmails.createIndex({ "department": 1 });
db.inwardmails.createIndex({ "status": 1 });
db.inwardmails.createIndex({ "priority": 1 });

print("✅ Indexes added to existing collections!");
```

---

**🎉 Your database is now ready! Choose Option 1 for clean setup or Option 3 to keep existing data.**
