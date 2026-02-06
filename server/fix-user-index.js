require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Drop the problematic index
    mongoose.connection.db.collection('users').dropIndex('employeeId_1')
      .then(() => {
        console.log('✅ Dropped employeeId_1 index successfully');
      })
      .catch((err) => {
        console.log('❌ Error dropping index:', err.message);
      })
      .finally(() => {
        process.exit(0);
      });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
