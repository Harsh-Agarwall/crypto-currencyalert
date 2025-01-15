import transporter from '../config/email';
import { getCache } from './cache';
import Alert from '../models/alert';

export const checkAndSendAlerts = async () => {
    const alerts = await Alert.find();
    const prices = await getCache('crypto_prices');

    if (!prices) return;

    for (const alert of alerts) {
        const { email, crypto, condition, threshold ,triggered} = alert;
        const currentPrice = prices[crypto]?.usd;

        if (!currentPrice) continue;
        if (triggered) continue;

        let sendAlert = false;

        if (condition === 'greater' && currentPrice > threshold) {
            sendAlert = true;
        } else if (condition === 'less' && currentPrice < threshold) {
            sendAlert = true;
        }

        if (sendAlert) {
            await transporter.sendMail({
                from: '"Crypto Alerts" <your-email@gmail.com>',
                to: email,
                subject: `Alert: ${crypto.toUpperCase()} Price Reached`,
                text: `The price of ${crypto.toUpperCase()} is now ${currentPrice}, meeting your alert condition.`,
            });

            console.log(`Alert sent to ${email} for ${crypto}`);
            alert.triggered = true;
            await alert.save();
        }
    }
};
