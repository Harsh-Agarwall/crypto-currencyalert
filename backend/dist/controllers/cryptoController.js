"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAlert = exports.fetchCryptoPrices = void 0;
const alert_1 = __importDefault(require("../models/alert"));
const cache_1 = require("../services/cache");
const axios_1 = __importDefault(require("axios"));
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const fetchCryptoPrices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(COINGECKO_API, {
            params: { ids: 'bitcoin,ethereum', vs_currencies: 'usd' },
        });
        yield (0, cache_1.setCache)('crypto_prices', response.data, 60);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch prices', error });
    }
});
exports.fetchCryptoPrices = fetchCryptoPrices;
const addAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, crypto, condition, threshold } = req.body;
        const newAlert = new alert_1.default({ email, crypto, condition, threshold });
        yield newAlert.save();
        res.status(201).json(newAlert);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create alert', error });
    }
});
exports.addAlert = addAlert;
