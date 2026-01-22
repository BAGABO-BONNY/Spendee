const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error('MongoDB connection failed: MONGO_URI is not defined in .env file');
            console.error('Please add MONGO_URI to your .env file');
            console.error('Example: MONGO_URI=mongodb://localhost:27017/spendee');
            process.exit(1);
        }

        if (!mongoURI.startsWith('mongodb://') && !mongoURI.startsWith('mongodb+srv://')) {
            console.error('MongoDB connection failed: Invalid connection string format');
            console.error('Connection string must start with "mongodb://" or "mongodb+srv://"');
            console.error('Current value:', mongoURI ? '***' : 'undefined');
            process.exit(1);
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
