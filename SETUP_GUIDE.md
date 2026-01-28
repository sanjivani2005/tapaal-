# Tapaal Mail Management System - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up the complete Tapaal mail management system with database integration and AI features.

---

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **npm** or **yarn**
3. **SQLite** (included with Prisma)
4. **Git**

---

## 🔧 Installation Steps

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd Tapaal

# Install dependencies
npm install

# Install Prisma CLI globally
npm install -g prisma
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed initial data
npx prisma db seed
```

### 3. Start the Development Servers

```bash
# Terminal 1: Start the API server
npm run dev:api

# Terminal 2: Start the React app
npm run dev
```

---

## 🗄️ Database Schema

The system uses SQLite with the following main models:

### **Mail Models**
- **InwardMail**: Incoming correspondence
- **OutwardMail**: Outgoing correspondence
- **TrackingEvent**: Mail tracking history
- **TimelineEvent**: Detailed timeline events

### **Organization Models**
- **User**: System users with roles
- **Department**: Organizational departments

### **Key Features**
- Automatic mail ID generation (INW-2024-001, OUT-2024-001)
- Tracking events for mail lifecycle
- Department-based organization
- User role management

---

## 🧠 AI Features Integration

### **Enabled AI Capabilities:**

1. **Duplicate Detection**
   - Levenshtein distance algorithm
   - Real-time similarity checking
   - Visual duplicate alerts

2. **Priority Assignment**
   - Keyword-based classification
   - Confidence scoring
   - One-click priority application

3. **Description Suggestions**
   - Government-style templates
   - Category-based suggestions
   - Professional language patterns

4. **Anomaly Detection**
   - Processing time monitoring
   - Department average tracking
   - Delay alerting system

---

## 🔌 API Endpoints

### **Mails API**
```
GET    /api/mails              # Get all mails
GET    /api/mails?type=inward  # Get inward mails
GET    /api/mails?type=outward # Get outward mails
POST   /api/mails              # Create new mail
GET    /api/mails/:id?type=inward # Get specific mail
PUT    /api/mails/:id?type=inward # Update mail
DELETE /api/mails/:id?type=inward # Delete mail
```

### **Departments API**
```
GET    /api/departments        # Get all departments
POST   /api/departments        # Create department
GET    /api/departments/:id     # Get specific department
PUT    /api/departments/:id     # Update department
DELETE /api/departments/:id     # Delete department
```

### **Dashboard API**
```
GET    /api/dashboard          # Get dashboard statistics
GET    /api/health            # Health check
```

---

## 🎯 How to Use the System

### **1. Create Departments**
1. Navigate to Departments page
2. Click "New Department"
3. Fill department details
4. Save to database

### **2. Create Inward Mail**
1. Navigate to Inward Mails page
2. Click "New Inward"
3. Fill sender and mail details
4. AI features will automatically:
   - Check for duplicates
   - Suggest priority
   - Provide description suggestions
5. Save to database

### **3. Create Outward Mail**
1. Navigate to Outward Mails page
2. Click "New Outward"
3. Fill recipient and mail details
4. AI features will assist as above
5. Save to database

### **4. Monitor with AI Dashboard**
1. View AI monitoring dashboard
2. Check for processing anomalies
3. Review duplicate alerts
4. Track priority assignments

---

## 🔍 Testing the Workflow

### **Complete CRUD Test:**

1. **Create Department**
   ```bash
   curl -X POST http://localhost:3001/api/departments \
   -H "Content-Type: application/json" \
   -d '{"name":"Test Department","code":"TEST","head":"John Doe"}'
   ```

2. **Create Inward Mail**
   ```bash
   curl -X POST http://localhost:3001/api/mails \
   -H "Content-Type: application/json" \
   -d '{
     "type":"inward",
     "sender":"Test Sender",
     "subject":"Test Subject",
     "description":"Test Description",
     "priority":"High",
     "deptId":"department-id-here"
   }'
   ```

3. **View Mails**
   ```bash
   curl http://localhost:3001/api/mails?type=inward
   ```

---

## 🎨 Frontend Components

### **Mail Creation Forms**
- `CreateInwardMail.tsx` - Full AI integration
- `CreateOutwardMail.tsx` - Full AI integration
- `CreateDepartment.tsx` - Department management

### **AI Components**
- `AIDuplicateAlert.tsx` - Duplicate detection UI
- `AIPrioritySuggestion.tsx` - Priority suggestions
- `AIDescriptionSuggestions.tsx` - Description suggestions
- `AIAnomalyAlert.tsx` - Anomaly alerts
- `AIMonitoringDashboard.tsx` - Central monitoring

### **Data Services**
- `data-service.js` - API communication layer
- `ai-service.ts` - AI processing engine

---

## 🛠️ Configuration

### **Environment Variables**
```env
# Database (SQLite - file-based)
DATABASE_URL="file:./dev.db"

# API Server
PORT=3001

# React App
REACT_APP_API_URL=http://localhost:3001/api
```

### **TypeScript Configuration**
```json
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["es2017", "dom"],
    "module": "esnext",
    "moduleResolution": "node"
  }
}
```

---

## 🚀 Production Deployment

### **Database Setup**
```bash
# Generate production client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build React app
npm run build
```

### **Server Configuration**
```bash
# Set production environment
NODE_ENV=production

# Start production server
npm run start
```

---

## 📊 Monitoring & Analytics

### **AI Metrics**
- Duplicate detection accuracy
- Priority assignment confidence
- Description suggestion usage
- Anomaly detection effectiveness

### **System Metrics**
- Mail processing times
- Department performance
- User activity tracking
- Database query performance

---

## 🔧 Troubleshooting

### **Common Issues**

1. **Database Connection Error**
   ```bash
   # Regenerate Prisma client
   npx prisma generate
   
   # Reset database
   npx prisma migrate reset
   ```

2. **API Server Not Responding**
   ```bash
   # Check if port 3001 is available
   netstat -an | grep 3001
   
   # Kill existing processes
   pkill -f "node server.js"
   ```

3. **AI Features Not Working**
   - Check browser console for errors
   - Verify data-service.js is properly imported
   - Ensure API server is running

4. **TypeScript Errors**
   ```bash
   # Update TypeScript
   npm install typescript@latest
   
   # Check tsconfig.json
   npx tsc --noEmit
   ```

---

## 📚 Development Guidelines

### **Code Structure**
```
src/
├── app/
│   ├── components/ui/          # Reusable UI components
│   ├── components/ai/          # AI-powered components
│   ├── pages/                  # Page components
│   ├── services/               # API and AI services
│   └── types/                  # TypeScript definitions
├── api/                        # Express API routes
├── prisma/                     # Database schema
└── public/                     # Static assets
```

### **Best Practices**
- Use TypeScript for type safety
- Follow React hooks patterns
- Implement proper error handling
- Use environment variables for configuration
- Write unit tests for AI features
- Document API endpoints

---

## 🎉 Success Criteria

Your system is fully functional when:

✅ **Database Operations**
- All CRUD operations work
- Data persists across sessions
- Relationships are maintained

✅ **AI Features**
- Duplicate detection works in real-time
- Priority assignment is accurate
- Description suggestions are helpful
- Anomaly detection triggers appropriately

✅ **User Experience**
- Forms are responsive and intuitive
- Loading states are handled
- Error messages are clear
- Navigation flows smoothly

✅ **Performance**
- API responses are fast (< 500ms)
- Database queries are optimized
- Frontend renders smoothly
- Memory usage is reasonable

---

## 📞 Support

For issues or questions:

1. Check the browser console for errors
2. Verify API server is running
3. Check database connection
4. Review this setup guide
5. Check GitHub issues for known problems

---

**🎊 Congratulations!** You now have a fully functional, AI-powered mail management system with complete database integration!
