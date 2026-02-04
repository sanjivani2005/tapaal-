# How to Add Inward Mail Data

## 📊 Data to Add

Your provided data contains **20 inward mails** with the following structure:

### Tracking IDs:
- INW-1HNR6ZP4OR - Test (Education, closed)
- INW-BZ0QRKWRIF - Testing (General Administration, assigned)
- INW-820 - योगेश नरेंद्र वानखडे साहेब... (Revenue, registered)
- INW-821 - कल्पना जयंतराव जायभाय साहेब... (Revenue, assigned)
- INW-1789 - जिल्हास्तरीय टेन्शन अदालत... (Health, in_progress)
- INW-819 - सगटविकास अधिकारी अर्जित रजेचा नमुना (Revenue, closed)
- INW-1291 - दिनांक6-1- 26 रोजी दुपारी... (Health, closed)
- INW-5930 - लेखाशीर्षक वीस 53 05 65 31... (Revenue, in_progress)
- INW-5931 - लेखा शीर्षक 30 53 05 65 31... (Revenue, resolved)
- INW-4705 - दिनांक एक एक 26 रोजी... (Health, resolved)
- INW-3869 - आडगाव खाडे ते राज्य महामार्ग... (Health, assigned)
- INW-825 - संघटनेने आयोजित केलेलेल्या आंदोलनात... (Revenue, closed)
- INW-818 - अंकिता विलास लाड साहेब... (Revenue, closed)
- INW-1689 - ग्रामपंचायत करजगाव येथील नाली... (Health, registered)
- INW-822 - संघटनेने आयोजित केलेलेल्या आंदोलनात... (Revenue, in_progress)
- INW-826 - संघटनेने आयोजित केलेलेल्या आंदोलनात... (Revenue, closed)
- INW-817 - जीवनलाल मंगललाल बिलावेकर साहेब... (Revenue, closed)
- INW-823 - संघटनेने आयोजित केलेलेल्या आंदोलनात... (Revenue, resolved)
- INW-824 - संघटनेने आयोजित केलेलेल्या आंदोलनात... (Revenue, closed)
- INW-827 - एक दिवसाची किरकोळ रजा मिळणे बाबत... (Revenue, registered)

### Departments:
- Education
- General Administration  
- Revenue (most mails)
- Health

### Status Distribution:
- closed: 8 mails
- assigned: 3 mails
- registered: 3 mails
- in_progress: 3 mails
- resolved: 3 mails

## 🚀 Method 1: Using the API (Recommended)

1. **Start your server:**
   ```bash
   npm run dev:api
   ```

2. **Add the data via API call:**
   ```bash
   curl -X POST http://localhost:3001/api/add-inward-data
   ```

3. **Or use browser:**
   Open http://localhost:3001/api/add-inward-data in your browser

## 🔧 Method 2: Manual Database Entry

If the API doesn't work, you can manually add the data:

1. **Access your database:**
   - Use SQLite Browser or DB Browser for SQLite
   - Open the `prisma/dev.db` file

2. **Add departments first (if they don't exist):**
   ```sql
   INSERT INTO Department (id, name, code, status, createdAt, updatedAt) VALUES
   ('dept-1', 'Education', 'EDU', 'Active', datetime('now'), datetime('now')),
   ('dept-2', 'General Administration', 'GA', 'Active', datetime('now'), datetime('now')),
   ('dept-3', 'Revenue', 'REV', 'Active', datetime('now'), datetime('now')),
   ('dept-4', 'Health', 'HLT', 'Active', datetime('now'), datetime('now'));
   ```

3. **Add inward mails:**
   ```sql
   INSERT INTO InwardMail (id, mailId, subject, description, sender, senderName, priority, status, deptId, isAnomaly, date, createdAt, updatedAt) VALUES
   ('mail-1', 'INW-1HNR6ZP4OR', 'Test', 'Test mail for testing purposes', 'Test Sender', 'Test Sender', 'NORMAL', 'CLOSED', 'dept-1', 0, datetime('now'), datetime('now'), datetime('now')),
   -- Add all 20 records following this pattern
   ```

## 📋 Method 3: Using the Frontend

1. **Start both servers:**
   ```bash
   # Terminal 1: API Server
   npm run dev:api
   
   # Terminal 2: React App  
   npm run dev
   ```

2. **Navigate to Inward Mail creation:**
   - Go to http://localhost:3000
   - Click on "Inward Mails"
   - Click "New Inward"
   - Manually enter each mail using the data above

## ✅ Verification

After adding the data:

1. **Check the API:**
   ```bash
   curl http://localhost:3001/api/mails?type=inward
   ```

2. **Check the frontend:**
   - Navigate to Inward Mails page
   - You should see all 20 mails displayed

3. **Verify AI features:**
   - Try creating a new mail with similar subjects
   - AI should detect duplicates
   - AI should suggest priorities
   - AI should provide description suggestions

## 🎯 Expected Result

Your inward mails table should now contain:
- **20 total records**
- **Mixed English/Marathi subjects** 
- **Various departments and statuses**
- **Automatic tracking events**
- **AI-powered duplicate detection working**

The data will integrate seamlessly with your existing AI features and provide realistic test data for the mail management system!
