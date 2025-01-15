"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const cryptoController_1 = require("./controllers/cryptoController");
const alerts_1 = require("./services/alerts");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5000;
// MongoDB Connection
mongoose_1.default
    .connect(process.env.MONGO_URI || '')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Routes
app.get('/api/crypto/prices', cryptoController_1.fetchCryptoPrices);
app.post('/api/crypto/alerts', cryptoController_1.addAlert);
// Cron Job to Check Alerts
node_cron_1.default.schedule('* * * * *', alerts_1.checkAndSendAlerts);
exports.default = app;
