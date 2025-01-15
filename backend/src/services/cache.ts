import { createClient } from 'redis';
const dotenv=require('dotenv');
dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL environment variable is not set');
}
// const redisport = 6379;
// const redisHost = '127.0.0.1'; // Default Redis host is localhost
const redisClient = createClient({
  url: redisUrl,
});

// Handle Redis connection errors
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
redisClient.connect();

// Set data in Redis with an optional TTL (Time-to-Live)
export const setCache = async (key: string, value: any, ttl: number = 60) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: ttl, // Expiry time in seconds
    });
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

// Get data from Redis cache
export const getCache = async (key: string) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
};
