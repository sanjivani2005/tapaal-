// DEBUG TABLE DATA - Copy and paste in MongoDB Shell
// This will help debug why data is not showing in table

use tapaal

// Check current data
print("🔍 Current outward mails count: " + db.outwardmails.countDocuments());

// Show all data with structure
print("📊 All outward mails:");
db.outwardmails.find().forEach(function(doc) {
  print("📧 Mail ID: " + doc.id);
  print("   - Sent By: " + doc.sentBy);
  print("   - Receiver: " + doc.receiver);
  print("   - Subject: " + doc.subject);
  print("   - Status: " + doc.status);
  print("   - Priority: " + doc.priority);
  print("   - Department: " + doc.department);
  print("   - Date: " + doc.date);
  print("   ---");
});

// Check if data structure matches frontend expectations
print("🎯 Checking data structure:");
db.outwardmails.find().limit(1).forEach(function(doc) {
  print("Required fields check:");
  print("   - id: " + (doc.id ? "✅" : "❌"));
  print("   - sentBy: " + (doc.sentBy ? "✅" : "❌"));
  print("   - receiver: " + (doc.receiver ? "✅" : "❌"));
  print("   - subject: " + (doc.subject ? "✅" : "❌"));
  print("   - status: " + (doc.status ? "✅" : "❌"));
  print("   - priority: " + (doc.priority ? "✅" : "❌"));
  print("   - department: " + (doc.department ? "✅" : "❌"));
  print("   - date: " + (doc.date ? "✅" : "❌"));
});

// Test API directly
print("🌐 Testing API response:");
print("Run this in browser console to test API:");
print("fetch('http://localhost:5001/api/outward-mails').then(r => r.json()).then(console.log)");
