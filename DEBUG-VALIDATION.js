// DEBUG VALIDATION - Copy and paste in MongoDB Shell
// This will help us find the exact validation issue

use tapaal

// First, let's check the schema validation rules
db.getCollectionInfos({name: "outwardmails"})

// Try inserting one field at a time to find the issue
print("🔍 Testing field by field...");

// Test 1: Minimal required fields only
try {
  db.outwardmails.insertOne({
    id: "OUT-2024-999",
    trackingId: "TRK-20249999",
    sentBy: "Test",
    receiver: "Test",
    receiverAddress: "Test",
    date: "2024-01-15",
    deliveryMode: "Courier",
    subject: "Test",
    details: "Test",
    department: "Finance"
  });
  print("✅ Minimal insert successful");
  db.outwardmails.deleteOne({id: "OUT-2024-999"});
} catch (e) {
  print("❌ Minimal insert failed: " + e.message);
}

// Test 2: Add priority
try {
  db.outwardmails.insertOne({
    id: "OUT-2024-998",
    trackingId: "TRK-20249998",
    sentBy: "Test",
    receiver: "Test",
    receiverAddress: "Test",
    date: "2024-01-15",
    deliveryMode: "Courier",
    subject: "Test",
    details: "Test",
    department: "Finance",
    priority: "Normal"
  });
  print("✅ Priority insert successful");
  db.outwardmails.deleteOne({id: "OUT-2024-998"});
} catch (e) {
  print("❌ Priority insert failed: " + e.message);
}

// Test 3: Add status
try {
  db.outwardmails.insertOne({
    id: "OUT-2024-997",
    trackingId: "TRK-20249997",
    sentBy: "Test",
    receiver: "Test",
    receiverAddress: "Test",
    date: "2024-01-15",
    deliveryMode: "Courier",
    subject: "Test",
    details: "Test",
    department: "Finance",
    priority: "Normal",
    status: "pending"
  });
  print("✅ Status insert successful");
  db.outwardmails.deleteOne({id: "OUT-2024-997"});
} catch (e) {
  print("❌ Status insert failed: " + e.message);
}

// Test 4: Add cost
try {
  db.outwardmails.insertOne({
    id: "OUT-2024-996",
    trackingId: "TRK-20249996",
    sentBy: "Test",
    receiver: "Test",
    receiverAddress: "Test",
    date: "2024-01-15",
    deliveryMode: "Courier",
    subject: "Test",
    details: "Test",
    department: "Finance",
    priority: "Normal",
    status: "pending",
    cost: 150.00
  });
  print("✅ Cost insert successful");
  db.outwardmails.deleteOne({id: "OUT-2024-996"});
} catch (e) {
  print("❌ Cost insert failed: " + e.message);
}

// Test 5: Add dates
try {
  db.outwardmails.insertOne({
    id: "OUT-2024-995",
    trackingId: "TRK-20249995",
    sentBy: "Test",
    receiver: "Test",
    receiverAddress: "Test",
    date: "2024-01-15",
    deliveryMode: "Courier",
    subject: "Test",
    details: "Test",
    department: "Finance",
    priority: "Normal",
    status: "pending",
    cost: 150.00,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  print("✅ Dates insert successful");
  db.outwardmails.deleteOne({id: "OUT-2024-995"});
} catch (e) {
  print("❌ Dates insert failed: " + e.message);
}

print("🔍 Debug complete! Check which test failed above.");
