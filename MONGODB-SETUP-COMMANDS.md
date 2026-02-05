# 🗄️ **MONGODB DATABASE SETUP COMMANDS**

## 🎯 **Create Departments Collection**

### **Method 1: MongoDB Shell Commands**
```javascript
// Connect to MongoDB
mongosh

// Switch to your database
use tapaal

// Create departments collection with sample data
db.departments.insertMany([
  {
    _id: ObjectId(),
    name: "Finance",
    description: "Financial operations and accounting",
    headOfDepartment: "Rajesh Kumar",
    email: "finance@company.com",
    phone: "+91-1234567890",
    location: "Floor 1, Building A",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Human Resources",
    description: "Employee management and HR operations",
    headOfDepartment: "Priya Sharma",
    email: "hr@company.com",
    phone: "+91-1234567891",
    location: "Floor 2, Building A",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Information Technology",
    description: "IT infrastructure and software development",
    headOfDepartment: "Vikram Singh",
    email: "it@company.com",
    phone: "+91-1234567892",
    location: "Floor 3, Building B",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Procurement",
    description: "Vendor management and procurement operations",
    headOfDepartment: "Anita Desai",
    email: "procurement@company.com",
    phone: "+91-1234567893",
    location: "Floor 1, Building B",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Administration",
    description: "General administrative operations",
    headOfDepartment: "Rahul Verma",
    email: "admin@company.com",
    phone: "+91-1234567894",
    location: "Floor 2, Building B",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Legal",
    description: "Legal affairs and compliance",
    headOfDepartment: "Meera Patel",
    email: "legal@company.com",
    phone: "+91-1234567895",
    location: "Floor 4, Building B",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Verify insertion
print("🏢 Departments created: " + db.departments.countDocuments());
db.departments.find().forEach(function(doc) {
  print("📋 Department: " + doc.name + " | Head: " + doc.headOfDepartment);
});
```

### **Method 2: Create Index for Performance**
```javascript
// Create indexes for better performance
db.departments.createIndex({ "name": 1 }, { unique: true });
db.departments.createIndex({ "status": 1 });
db.departments.createIndex({ "headOfDepartment": 1 });
```

## 👥 **Create Users Collection**

### **Method 1: MongoDB Shell Commands**
```javascript
// Create users collection with sample data
db.users.insertMany([
  {
    _id: ObjectId(),
    username: "admin",
    email: "admin@company.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz", // Hash this password
    firstName: "System",
    lastName: "Administrator",
    fullName: "System Administrator",
    role: "admin",
    department: "IT",
    position: "System Administrator",
    employeeId: "EMP001",
    phone: "+91-1234567890",
    address: "Office Address, City, State",
    avatar: "",
    isActive: true,
    lastLogin: new Date(),
    permissions: [
      "read_all",
      "write_all",
      "delete_all",
      "manage_users",
      "manage_departments"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    username: "john.doe",
    email: "john.doe@company.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz", // Hash this password
    firstName: "John",
    lastName: "Doe",
    fullName: "John Doe",
    role: "manager",
    department: "Finance",
    position: "Finance Manager",
    employeeId: "EMP002",
    phone: "+91-1234567891",
    address: "123 Finance Street, Mumbai, Maharashtra",
    avatar: "",
    isActive: true,
    lastLogin: new Date(),
    permissions: [
      "read_inward",
      "write_inward",
      "delete_inward",
      "read_outward",
      "write_outward",
      "delete_outward",
      "manage_finance"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    username: "jane.smith",
    email: "jane.smith@company.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz", // Hash this password
    firstName: "Jane",
    lastName: "Smith",
    fullName: "Jane Smith",
    role: "user",
    department: "HR",
    position: "HR Executive",
    employeeId: "EMP003",
    phone: "+91-1234567892",
    address: "456 HR Avenue, Delhi, Delhi",
    avatar: "",
    isActive: true,
    lastLogin: new Date(),
    permissions: [
      "read_inward",
      "write_inward",
      "read_outward",
      "write_outward",
      "manage_hr"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    username: "vikram.singh",
    email: "vikram.singh@company.com",
    password: "$2b$10$abcdefghijklmnopqrstuvwxyz", // Hash this password
    firstName: "Vikram",
    lastName: "Singh",
    fullName: "Vikram Singh",
    role: "manager",
    department: "IT",
    position: "IT Manager",
    employeeId: "EMP004",
    phone: "+91-1234567893",
    address: "789 Tech Park, Bangalore, Karnataka",
    avatar: "",
    isActive: true,
    lastLogin: new Date(),
    permissions: [
      "read_inward",
      "write_inward",
      "delete_inward",
      "read_outward",
      "write_outward",
      "delete_outward",
      "manage_it",
      "manage_system"
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Verify insertion
print("👥 Users created: " + db.users.countDocuments());
db.users.find().forEach(function(doc) {
  print("👤 User: " + doc.username + " | Role: " + doc.role + " | Dept: " + doc.department);
});
```

### **Method 2: Create Indexes for Users**
```javascript
// Create indexes for better performance
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "employeeId": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "department": 1 });
db.users.createIndex({ "isActive": 1 });
```

## 🔐 **Password Hashing (Security)**

### **Using bcrypt in Node.js**
```javascript
// Install bcrypt first
// npm install bcrypt

// Hash passwords before inserting
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Example usage
const hashedPassword = await hashPassword("yourPassword123");
console.log("Hashed password:", hashedPassword);
```

## 📊 **Create Mongoose Schemas**

### **Department Schema (server/models/Department.js)**
```javascript
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  headOfDepartment: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware
departmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Department', departmentSchema);
```

### **User Schema (server/models/User.js)**
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  permissions: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema);
```

## 🚀 **Quick Setup Commands**

### **Step 1: Create Collections**
```javascript
// Run in MongoDB Shell
use tapaal

// Create departments
db.createCollection("departments");

// Create users
db.createCollection("users");

// Insert sample data (copy from above)
// ... paste the insertMany commands here
```

### **Step 2: Verify Collections**
```javascript
// List all collections
show collections;

// Check departments
db.departments.find().pretty();
db.departments.countDocuments();

// Check users
db.users.find().pretty();
db.users.countDocuments();
```

### **Step 3: Create API Routes**
```javascript
// Create server/routes/departments.js
const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST new department
router.post('/', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.json({
      success: true,
      data: department
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
```

## 📋 **Complete Database Structure**

### **Collections Created:**
```
tapaal/
├── departments/
│   ├── _id: ObjectId
│   ├── name: String (unique)
│   ├── description: String
│   ├── headOfDepartment: String
│   ├── email: String (unique)
│   ├── phone: String
│   ├── location: String
│   ├── status: Enum ['active', 'inactive']
│   ├── createdAt: Date
│   └── updatedAt: Date
│
├── users/
│   ├── _id: ObjectId
│   ├── username: String (unique)
│   ├── email: String (unique)
│   ├── password: String (hashed)
│   ├── firstName: String
│   ├── lastName: String
│   ├── fullName: String
│   ├── role: Enum ['admin', 'manager', 'user']
│   ├── department: String
│   ├── position: String
│   ├── employeeId: String (unique)
│   ├── phone: String
│   ├── address: String
│   ├── avatar: String
│   ├── isActive: Boolean
│   ├── lastLogin: Date
│   ├── permissions: Array<String>
│   ├── createdAt: Date
│   └── updatedAt: Date
│
├── inwardmails/ (existing)
└── outwardmails/ (existing)
```

---

**🗄️ Run these commands in MongoDB Shell to create your departments and users database with proper structure and sample data!**
