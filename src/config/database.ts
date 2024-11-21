/*
 * Filename: database.ts
 * Version: 1.0.0
 * Last modified: 20/11/2024
 * Description: [Brief overview of the file]
 */

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb://admin:password123@localhost:27017/authme';

    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Error conectando a MongoDB', error);
    process.exit(1);
  }
};

export default connectDB;
