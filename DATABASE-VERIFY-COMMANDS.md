# 🗄️ Database Connection Verification

## ✅ **Current Status:**
- ✅ **Server:** Running on port 5000
- ✅ **MongoDB:** Connected successfully
- ✅ **Database:** `tapaal`

## 🔍 **Verify Database Connection:**

### **Method 1: MongoDB Shell**
```bash
# Open MongoDB Shell
mongosh

# Switch to tapaal database
use tapaal

# Check collections
show collections

# Check documents
db.inwardmails.find().pretty()
db.outwardmails.find().pretty()

# Check document counts
db.inwardmails.countDocuments()
db.outwardmails.countDocuments()
```

### **Method 2: Test API Endpoints**
```bash
# Test health check
curl http://localhost:5000/api/health

# Test get inward mails
curl http://localhost:5000/api/inward-mails

# Test create inward mail
curl -X POST http://localhost:5000/api/inward-mails \
  -H "Content-Type: application/json" \
  -d '{
    "receivedBy": "System Admin",
    "handoverTo": "System Admin", 
    "sender": "Test Company",
    "deliveryMode": "Courier",
    "details": "Test mail details",
    "priority": "High",
    "department": "Finance"
  }'
```

### **Method 3: Browser Test**
```
Open: http://localhost:5000/api/health
Open: http://localhost:5000/api/inward-mails
```

## 🚀 **If Database is Empty:**

### **Create Sample Data:**
```javascript
// In MongoDB Shell
use tapaal

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

print("✅ Sample data inserted!");
```

## 📊 **Expected Results:**

### **Server Console:**
```
Connected to MongoDB successfully
🚀 Tapaal Server is running on port 5000
```

### **MongoDB Shell:**
```
tapaal> show collections
inwardmails
outwardmails

tapaal> db.inwardmails.countDocuments()
1
```

### **API Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

## 🎯 **Complete Setup Verification:**

### **1. Check Server Status**
```bash
cd server
npm start
```

### **2. Check Database**
```bash
mongosh
use tapaal
show collections
```

### **3. Test Frontend**
```
Open: http://localhost:3002/
Navigate: Inward Mails
```

### **4. Test Mail Creation**
- Click "Add Inward"
- Fill form
- Save mail
- Verify in table

---

**🎉 Your database is properly connected! Verify with these commands.**
