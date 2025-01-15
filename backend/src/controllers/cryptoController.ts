import { Request, Response } from 'express';
import Alert from '../models/alert';
import { setCache ,getCache} from '../services/cache';
import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price';

export const fetchCryptoPrices = async (req: Request, res: Response):Promise<any> => {
    try {
        // Check if data exists in the cache
        const cachedPrices = await getCache('crypto_prices');

        if (cachedPrices) {
            console.log('Cache hit: Serving data from Redis');
            return res.json(cachedPrices); // Serve data from cache
        }

        console.log('Cache miss: Fetching data from CoinGecko API');
        const response = await axios.get(COINGECKO_API, {
            params: { ids: 'bitcoin,ethereum', vs_currencies: 'usd' },
        });

        // Cache the fetched data
        await setCache('crypto_prices', response.data, 60); // Cache for 60 seconds
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch prices', error });
    }
};

export const addAlert = async (req: Request, res: Response) => {
    try {
        const { email, crypto, condition, threshold } = req.body;

        const newAlert = new Alert({ email, crypto, condition, threshold });
        await newAlert.save();

        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create alert', error });
    }
};
