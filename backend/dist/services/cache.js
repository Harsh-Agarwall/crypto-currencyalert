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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCache = exports.setCache = void 0;
const redis_1 = require("redis");
const dotenv = require('dotenv');
dotenv.config();
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error('REDIS_URL environment variable is not set');
}
// const redisport = 6379;
// const redisHost = '127.0.0.1'; // Default Redis host is localhost
const redisClient = (0, redis_1.createClient)({
    url: redisUrl,
});
// Handle Redis connection errors
redisClient.on('error', (err) => console.error('Redis Client Error', err));
// Connect to Redis
redisClient.connect();
// Set data in Redis with an optional TTL (Time-to-Live)
const setCache = (key_1, value_1, ...args_1) => __awaiter(void 0, [key_1, value_1, ...args_1], void 0, function* (key, value, ttl = 60) {
    try {
        yield redisClient.set(key, JSON.stringify(value), {
            EX: ttl, // Expiry time in seconds
        });
    }
    catch (err) {
        console.error('Error setting cache:', err);
    }
});
exports.setCache = setCache;
// Get data from Redis cache
const getCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisClient.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (err) {
        console.error('Error getting cache:', err);
        return null;
    }
});
exports.getCache = getCache;
