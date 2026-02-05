# 📋 **CURL COMMANDS FOR USERS API**

## 🎯 **Problem Solved:**
- ✅ **Windows PowerShell:** Correct curl commands for Windows
- ✅ **JSON Data:** Proper JSON formatting for user creation
- ✅ **Headers:** Correct Content-Type headers
- ✅ **Quotes:** Proper escaping for PowerShell

## 🔧 **Correct PowerShell Commands:**

### **1. Test Users API (GET):**
```powershell
curl http://localhost:5001/api/users
```

### **2. Test Users API (POST):**
```powershell
curl -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@company.com","fullName":"Test User","role":"user","department":"Finance","position":"Finance Executive"}'
```

### **3. Test Users API (PUT):**
```powershell
curl -X PUT http://localhost:5001/api/users/userId -H "Content-Type: application/json" -d '{"fullName":"Updated Test User","role":"manager"}'
```

### **4. Test Users API (DELETE):**
```powershell
curl -X DELETE http://localhost:5001/api/users/userId
```

## 🚀 **Step-by-Step Testing:**

### **Step 1: Test GET Request:**
```powershell
# Test getting all users
curl http://localhost:5001/api/users

# Expected response:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "username": "admin",
      "email": "admin@company.com",
      "fullName": "System Administrator",
      "role": "admin",
      "department": "IT",
      "position": "System Administrator",
      "isActive": true,
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### **Step 2: Test POST Request:**
```powershell
# Test creating new user
curl -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@company.com","fullName":"Test User","role":"user","department":"Finance","position":"Finance Executive","password":"password123","employeeId":"emp-001","phone":"+918484815642","address":"123 Test Street","country":"India","zipCode":"441108"}'

# Expected response:
{
  "success": true,
  "data": {
    "_id": "...",
    "username": "testuser",
    "email": "test@company.com",
    "fullName": "Test User",
    "role": "user",
    "department": "Finance",
    "position": "Finance Executive",
    "isActive": true,
    "createdAt": "2024-01-15T12:00:00Z"
  }
}
```

### **Step 3: Test PUT Request:**
```powershell
# Test updating user
curl -X PUT http://localhost:5001/api/users/actualUserId -H "Content-Type: application/json" -d '{"fullName":"Updated Test User","role":"manager"}'

# Expected response:
{
  "success": true,
  "data": {
    "_id": "actualUserId",
    "username": "testuser",
    "fullName": "Updated Test User",
    "role": "manager",
    "department": "Finance",
    "position": "Finance Executive",
    "isActive": true,
    "updatedAt": "2024-01-15T12:30:00Z"
  }
}
```

### **Step 4: Test DELETE Request:**
```powershell
# Test deleting user
curl -X DELETE http://localhost:5001/api/users/actualUserId

# Expected response:
{
  "success": true,
  "message": "User deleted successfully"
}
```

## 📊 **Expected Console Output:**

### **✅ Server Logs:**
```javascript
🔍 GET /api/users - Fetching all users
📥 Found users: 3
🔍 POST /api/users - Creating user: testuser
✅ User created successfully: testuser
🔍 PUT /api/users/:id - Updating user: actualUserId
✅ User updated successfully: Updated Test User
🔍 DELETE /api/users/:id - Deleting user: actualUserId
✅ User deleted successfully
```

### **✅ Frontend Integration:**
```typescript
// UsersList.tsx should now show:
✅ Real database users
✅ Create, Edit, Delete operations working
✅ Real-time updates when data changes
✅ Professional UI with all user fields
```

## 🔍 **Troubleshooting:**

### **If GET Request Fails:**
```powershell
# Check if server is running
curl http://localhost:5001/api/health

# Check if users route is registered
curl http://localhost:5001/api/users -v

# Expected: Should show server logs
```

### **If POST Request Fails:**
```powershell
# Test with verbose output
curl -v -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d '{"username":"testuser","email":"test@company.com"}'

# Check JSON data format
echo '{"username":"testuser","email":"test@company.com"}' | ConvertTo-Json
```

### **Common PowerShell Issues:**
```powershell
# Issue: Quotes not recognized
# Solution: Use double quotes for outer string
curl -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d "{ ""username"": ""testuser"" }"

# Issue: JSON parsing errors
# Solution: Escape quotes properly
curl -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d '{\"username\": \"testuser\"}'
```

## 🎯 **Quick Test Commands:**

### **Test All Users API:**
```powershell
# Complete API test
curl http://localhost:5001/api/users && echo "✅ GET users working"

curl -X POST http://localhost:5001/api/users -H "Content-Type: application/json" -d '{"username":"test","email":"test@test.com"}' && echo "✅ POST users working"

curl -X PUT http://localhost:5001/api/users/testId -H "Content-Type: application/json" -d '{"role":"manager"}' && echo "✅ PUT users working"

curl -X DELETE http://localhost:5001/api/users/testId && echo "✅ DELETE users working"
```

---

**🎉 Use these PowerShell commands to test your users API! The server should now respond correctly with database data and the frontend UsersList component will display real users with full CRUD functionality.**
