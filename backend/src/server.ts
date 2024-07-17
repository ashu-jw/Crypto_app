import express from 'express';
import mongoose from 'mongoose';
import stockRoutes from './routes/stockRoutes';
import cors from 'cors';
import cron from 'node-cron';
import { fetchAndSaveData } from './pollData';
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stockdata';

const connectDB = async () => {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
};

connectDB();

app.use(express.json());
app.use('/api/stocks', stockRoutes);

cron.schedule('*/5 * * * * *', fetchAndSaveData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
