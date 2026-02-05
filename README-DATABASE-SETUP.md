# Tapaal Management System - Database Setup

## 🚀 Complete Real-Time Database Integration

This guide will help you set up the complete real-time database functionality for the Tapaal Management System.

## 📋 Prerequisites

### 1. MongoDB Installation
```bash
# Install MongoDB Community Server
# Download from: https://www.mongodb.com/try/download/community

# For Windows:
# 1. Download and run the MSI installer
# 2. Choose "Complete" installation
# 3. Install MongoDB Compass (optional GUI tool)
# 4. Configure MongoDB as a Windows Service

# For macOS:
brew install mongodb-community

# For Linux (Ubuntu):
sudo apt-get install -y mongodb
```

### 2. Node.js Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the backend server
npm start
```

## 🗄️ Database Configuration

### MongoDB Connection
The server connects to MongoDB using the following configuration:

**File:** `server/.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tapaal
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Database Collections
The system creates the following collections automatically:

1. **inwardmails** - Stores all inward mail records
2. **outwardmails** - Stores all outward mail records

## 🌐 API Endpoints

### Inward Mails API
- `GET /api/inward-mails` - Get all inward mails with pagination and filters
- `GET /api/inward-mails/:id` - Get single inward mail
- `POST /api/inward-mails` - Create new inward mail
- `PUT /api/inward-mails/:id` - Update inward mail
- `DELETE /api/inward-mails/:id` - Delete inward mail
- `GET /api/inward-mails/stats/summary` - Get statistics

### Outward Mails API
- `GET /api/outward-mails` - Get all outward mails
- `GET /api/outward-mails/:id` - Get single outward mail
- `POST /api/outward-mails` - Create new outward mail
- `PUT /api/outward-mails/:id` - Update outward mail
- `DELETE /api/outward-mails/:id` - Delete outward mail
- `GET /api/outward-mails/stats/summary` - Get statistics

### Health Check
- `GET /api/health` - Server health status

## 📱 Frontend Integration

### API Services
The frontend uses the following service files:

1. **`src/services/api-service.js`** - Base API service
2. **`src/services/inward-mail-service.js`** - Inward mail operations
3. **`src/services/outward-mail-service.js`** - Outward mail operations

### Real-Time Features
- ✅ **Live Data Fetching** - Automatically fetches from database
- ✅ **Pagination** - Server-side pagination support
- ✅ **Filtering** - Real-time filtering by status, priority, department
- ✅ **Search** - Full-text search functionality
- ✅ **File Uploads** - Support for multiple file attachments
- ✅ **CRUD Operations** - Complete Create, Read, Update, Delete

## 🔧 How to Use

### 1. Start MongoDB
```bash
# Windows (as Administrator)
net start MongoDB

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Start Backend Server
```bash
cd server
npm start
```

### 3. Start Frontend
```bash
# In root directory
npm run dev:frontend
```

### 4. Test the System
1. Open http://localhost:3002/
2. Navigate to "Inward Mails"
3. Click "Add Inward" button
4. Fill in the form details
5. Click "Save Inward Mail"
6. The new mail will be saved to MongoDB and appear in the table

## 📊 Database Schema

### Inward Mail Document
```javascript
{
  id: "INW-2024-001",
  trackingId: "TRK-1234",
  receivedBy: "System Admin",
  handoverTo: "System Admin",
  sender: "ABC Corporation",
  date: "2024-01-15T10:30:00Z",
  type: "Inward",
  deliveryMode: "Courier",
  details: "Invoice documents for December",
  referenceDetails: "INV-2023-045",
  status: "pending",
  priority: "High",
  department: "Finance",
  attachments: [],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z"
}
```

### Outward Mail Document
```javascript
{
  id: "OUT-2024-001",
  trackingId: "TRK-1235",
  sentBy: "System Admin",
  receiver: "XYZ Company",
  receiverAddress: "123 Main St, City",
  date: "2024-01-16T14:20:00Z",
  type: "Outward",
  deliveryMode: "Courier",
  subject: "Contract Agreement",
  details: "Signed contract documents",
  referenceDetails: "CON-2024-089",
  status: "sent",
  priority: "Important",
  department: "Legal",
  dueDate: "2024-01-20T00:00:00Z",
  cost: 150.00,
  attachments: [],
  createdAt: "2024-01-16T14:20:00Z",
  updatedAt: "2024-01-16T14:20:00Z"
}
```

## 🔄 Real-Time Workflow

### Create Inward Mail Flow
1. User clicks "Add Inward" button
2. Form opens with AI-powered suggestions
3. User fills in details and uploads files
4. Frontend sends data to `/api/inward-mails` POST endpoint
5. Backend validates data and saves to MongoDB
6. Backend returns success response with saved mail data
7. Frontend redirects back to Inward Mails list
8. List automatically refreshes to show new mail

### Data Persistence
- ✅ All mails are stored in MongoDB
- ✅ Files are uploaded to `server/uploads/` directory
- ✅ Automatic ID generation (INW-YYYY-NNN, OUT-YYYY-NNN)
- ✅ Tracking ID generation (TRK-YYYYNNNN)
- ✅ Timestamps for creation and updates

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify MongoDB is accessible on port 27017

2. **Server Not Starting**
   - Check if port 5000 is available
   - Verify all dependencies are installed
   - Check for syntax errors in server files

3. **Frontend API Errors**
   - Ensure backend server is running
   - Check CORS configuration
   - Verify API endpoints are correct

4. **File Upload Issues**
   - Check `uploads/` directory permissions
   - Verify file size limits (max 5MB)
   - Ensure allowed file types (images, documents, PDFs)

## 🚀 Next Steps

1. **Authentication System** - Add user authentication and authorization
2. **Real-Time Updates** - Implement WebSocket for live updates
3. **Email Notifications** - Add email notifications for mail status changes
4. **Advanced Search** - Implement full-text search with indexing
5. **Dashboard Analytics** - Real-time statistics and charts
6. **Mobile App** - React Native mobile application

## 📞 Support

For any issues or questions:
1. Check the MongoDB logs
2. Check the server console output
3. Verify network connectivity
4. Test API endpoints directly with Postman or curl

---

**🎉 Congratulations! Your Tapaal Management System now has complete real-time database functionality!**
