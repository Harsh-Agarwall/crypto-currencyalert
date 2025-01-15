import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchCryptoPrices, addAlert } from './controllers/cryptoController';
import { checkAndSendAlerts } from './services/alerts';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/crypto/prices', fetchCryptoPrices);
app.post('/api/crypto/alerts', addAlert);

// Cron Job to Check Alerts
cron.schedule('* * * * *', checkAndSendAlerts);

export default app;
