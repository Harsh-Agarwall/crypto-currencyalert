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
exports.checkAndSendAlerts = void 0;
const email_1 = __importDefault(require("../config/email"));
const cache_1 = require("./cache");
const alert_1 = __importDefault(require("../models/alert"));
const checkAndSendAlerts = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const alerts = yield alert_1.default.find();
    const prices = yield (0, cache_1.getCache)('crypto_prices');
    if (!prices)
        return;
    for (const alert of alerts) {
        const { email, crypto, condition, threshold } = alert;
        const currentPrice = (_a = prices[crypto]) === null || _a === void 0 ? void 0 : _a.usd;
        if (!currentPrice)
            continue;
        let sendAlert = false;
        if (condition === 'greater' && currentPrice > threshold) {
            sendAlert = true;
        }
        else if (condition === 'less' && currentPrice < threshold) {
            sendAlert = true;
        }
        if (sendAlert) {
            yield email_1.default.sendMail({
                from: '"Crypto Alerts" <your-email@gmail.com>',
                to: email,
                subject: `Alert: ${crypto.toUpperCase()} Price Reached`,
                text: `The price of ${crypto.toUpperCase()} is now ${currentPrice}, meeting your alert condition.`,
            });
            console.log(`Alert sent to ${email} for ${crypto}`);
        }
    }
});
exports.checkAndSendAlerts = checkAndSendAlerts;
