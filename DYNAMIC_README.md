# Dynamic Tapaal Management System

## Overview

This project has been converted from static mock data to a fully dynamic database-driven system. The chatbot now uses real database queries instead of hardcoded data.

## 🚀 What's Changed

### ✅ Dynamic Features
- **Real Database**: PostgreSQL with Prisma ORM
- **Dynamic API**: RESTful endpoints for all data operations
- **Live Chatbot**: AI Assistant now queries the database in real-time
- **Fallback System**: Graceful degradation to static data if API is unavailable
- **Database Seeding**: Initial data population for testing

### 🔄 Architecture Changes

#### Before (Static)
```
User Input → Chatbot → Static Mock Data → Response
```

#### After (Dynamic)
```
User Input → Chatbot → API Calls → Database → Response
         ↘ Fallback → Static Data (if API fails)
```

## 📁 New Files Created

### Backend
- `prisma/schema.prisma` - Updated database schema
- `src/app/api/dynamic-api.js` - RESTful API endpoints
- `prisma/seed-dynamic.js` - Database seeding script
- `scripts/setup-dynamic.js` - Setup automation script

### Frontend
- `src/app/services/api-client.js` - Frontend API service
- `src/app/services/dynamic-data.js` - Backend data service

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- PostgreSQL (running locally)
- npm or yarn

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb tapaal_db

# Update .env file with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/tapaal_db"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Seed Database

```bash
# Populate with initial data
node prisma/seed-dynamic.js
```

### 6. Start Development Server

```bash
# Start both frontend and backend
npm run dev
```

## 🌐 API Endpoints

### Base URL: `http://localhost:3001/api/v1`

### System Overview
- `GET /system/overview` - Complete system statistics

### Mail Management
- `GET /mails/inward` - Get all inward mails
- `GET /mails/outward` - Get all outward mails
- `GET /mails/{type}/{id}` - Get specific mail details

### Users & Departments
- `GET /users` - Get all users
- `GET /departments` - Get all departments
- `GET /departments/stats` - Department-wise statistics

### Tracking
- `GET /tracking` - Get all tracking events
- `GET /tracking/{id}` - Get specific tracking details

### Search
- `GET /search/{query}` - Search across all modules

### User Activity
- `GET /users/activity` - User activity summary

## 🤖 Chatbot Features

### Dynamic Queries
The AI Assistant now supports real-time database queries:

```javascript
// Example queries the chatbot can handle:
"Show inward mails" → Queries database for inward mails
"INW-2024-001" → Gets specific mail details from database
"Track TRK-2401" → Retrieves tracking information
"Statistics" → Calculates live system statistics
"Search tax" → Searches across all database tables
```

### Fallback System
If the API is unavailable, the chatbot automatically falls back to static data:

```javascript
try {
    data = await dynamicApiService.getInwardMails();
} catch (error) {
    data = systemDataService.getInwardMails(); // Fallback
}
```

## 📊 Database Schema

### Core Models
- **User** - System users with roles and departments
- **Department** - Organizational departments
- **InwardMail** - Incoming mail records
- **OutwardMail** - Outgoing mail records  
- **TrackingEvent** - Mail tracking information
- **TimelineEvent** - Tracking timeline events

### Relationships
```
Department → Users, InwardMails, OutwardMails
User → Department
InwardMail → Department, TrackingEvents
OutwardMail → Department, TrackingEvents
TrackingEvent → InwardMail/OutwardMail, TimelineEvents
```

## 🔧 Configuration

### Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/tapaal_db"
API_BASE_URL="http://localhost:3001"
```

### API Configuration
- Base URL: Configurable in `src/app/services/api-client.js`
- Timeout: 10 seconds with fallback
- Error handling: Automatic fallback to static data

## 🧪 Testing

### Manual Testing
1. Start the development server
2. Open chatbot in browser
3. Try queries like:
   - "Show statistics"
   - "INW-2024-001"
   - "Users list"
   - "Search tax"

### API Testing
```bash
# Test system overview
curl http://localhost:3001/api/v1/system/overview

# Test inward mails
curl http://localhost:3001/api/v1/mails/inward

# Test specific mail
curl http://localhost:3001/api/v1/mails/inward/INW-2024-001
```

## 🔄 Migration from Static

### What Changed
- Static arrays → Database tables
- Hardcoded responses → Dynamic queries
- Mock service → Real API endpoints
- Fixed data → Live database records

### What Stayed Same
- Chatbot interface and UX
- Response formatting
- Query patterns and keywords
- Component structure

## 🚨 Troubleshooting

### Common Issues

#### Database Connection Failed
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
echo $DATABASE_URL
```

#### API Not Responding
```bash
# Check if server is running
curl http://localhost:3001/api/health

# Check server logs
npm run dev
```

#### Chatbot Using Static Data
- Check browser console for API errors
- Verify API server is accessible
- Check network tab in developer tools

### Reset Database
```bash
# Clear and reseed database
npx prisma db push --force-reset
node prisma/seed-dynamic.js
```

## 📈 Performance

### Optimizations
- Database indexing on mail IDs and tracking IDs
- Connection pooling via Prisma
- Caching in API client
- Lazy loading for large datasets

### Monitoring
- API response times logged
- Database query optimization
- Error tracking in console

## 🔮 Future Enhancements

### Planned Features
- Real-time WebSocket updates
- Advanced search with filters
- File attachments for mails
- User authentication system
- Mail workflow automation

### Scalability
- Database clustering support
- API rate limiting
- Caching layer (Redis)
- Load balancing

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Update database schema if needed
3. Add API endpoints for new features
4. Update frontend to use dynamic data
5. Test with fallback system
6. Submit pull request

### Code Style
- Use TypeScript for new components
- Follow existing API patterns
- Include error handling with fallbacks
- Add database seeding for test data

## 📞 Support

For issues with the dynamic system:
1. Check this README first
2. Review server logs
3. Test API endpoints directly
4. Verify database connection
5. Check browser console for errors

---

**Note**: The system maintains backward compatibility with static data as a fallback, ensuring the chatbot always works even if the database is unavailable.
