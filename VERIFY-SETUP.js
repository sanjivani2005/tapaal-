// Verification Script - Run this after RECREATE-COLLECTIONS.js
// Copy and paste in MongoDB Shell

print("🔍 Verifying Database Setup...");
print("=" .repeat(50));

// Check if we're in the right database
print("📊 Current Database:");
db.getName();

print("\n📋 Available Collections:");
show collections;

print("\n🔍 inwardmails Collection Info:");
print("Documents count:", db.inwardmails.countDocuments());
print("Indexes:", db.inwardmails.getIndexes().length);

print("\n🔍 outwardmails Collection Info:");
print("Documents count:", db.outwardmails.countDocuments());
print("Indexes:", db.outwardmails.getIndexes().length);

print("\n📄 Sample inwardmails document:");
db.inwardmails.findOne();

print("\n📄 Sample outwardmails document:");
db.outwardmails.findOne();

print("\n🔍 inwardmails Indexes:");
db.inwardmails.getIndexes().forEach(function(index) {
  print(" -", index.name, ":", JSON.stringify(index.key));
});

print("\n🔍 outwardmails Indexes:");
db.outwardmails.getIndexes().forEach(function(index) {
  print(" -", index.name, ":", JSON.stringify(index.key));
});

print("\n🧪 Testing Schema Validation:");

// Test valid inward mail
try {
  db.inwardmails.insertOne({
    id: "INW-2024-TEST",
    trackingId: "TRK-2024TEST",
    receivedBy: "Test User",
    handoverTo: "Test User",
    sender: "Test Sender",
    date: "2024-01-15 10:30:00",
    type: "Inward",
    deliveryMode: "Courier",
    details: "Test validation",
    status: "pending",
    priority: "High",
    department: "Finance",
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  print("✅ Valid inward mail insertion: SUCCESS");
  
  // Clean up test data
  db.inwardmails.deleteOne({ id: "INW-2024-TEST" });
} catch (e) {
  print("❌ Valid inward mail insertion: FAILED -", e.message);
}

// Test invalid inward mail (missing required field)
try {
  db.inwardmails.insertOne({
    id: "INW-2024-INVALID",
    sender: "Test Sender"
    // Missing required fields
  });
  print("❌ Invalid inward mail insertion: FAILED - Should have been rejected");
  db.inwardmails.deleteOne({ id: "INW-2024-INVALID" });
} catch (e) {
  print("✅ Invalid inward mail rejection: SUCCESS -", e.message);
}

print("\n🎯 Database Setup Status:");
if (db.inwardmails.countDocuments() > 0 && db.outwardmails.countDocuments() > 0) {
  print("✅ Collections created with sample data");
} else {
  print("❌ Collections missing sample data");
}

if (db.inwardmails.getIndexes().length >= 8 && db.outwardmails.getIndexes().length >= 8) {
  print("✅ Indexes created successfully");
} else {
  print("❌ Missing indexes");
}

print("\n🚀 Ready for Application!");
print("Start your backend server with: cd server && npm start");
print("Start your frontend with: npm run dev:frontend");

print("\n" + "=".repeat(50));
print("🎉 Database Verification Complete!");
