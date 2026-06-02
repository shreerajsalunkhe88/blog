import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_post_db';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    console.error('Connection string:', process.env.MONGODB_URI);
    // Don't exit, allow retry
    setTimeout(() => {
      connectDatabase();
    }, 5000);
  }
};

export default connectDatabase;
