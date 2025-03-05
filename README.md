# Crypto Price Alert System

A cryptocurrency price alert system that allows users to set price thresholds for Bitcoin, Ethereum, and other cryptocurrencies. When the price reaches the specified threshold, the system sends an email notification.

## Features
- Fetches real-time cryptocurrency prices using the [CoinGecko API](https://www.coingecko.com/en/api).
- Users can set alerts for price conditions (greater than or less than a threshold).
- Redis caching is used to optimize API requests.
- Automated email notifications using **Nodemailer**.
- Backend hosted on **Render**, Redis service integrated.
- Frontend built with **React.js**.

---

## Tech Stack

**Frontend:**
- React.js
- TypeScript
- Bootstrap

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis (for caching)
- Nodemailer (for email alerts)
- CoinGecko API (for real-time prices)
- Render (for deployment)

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **MongoDB** (Local or Cloud Atlas)
- **Redis** (Cloud Redis on Render or local)

### 1. Clone the Repository
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/crypto-alert.git
cd crypto-alert
```

### 2. Install Dependencies
Run the following command in both the frontend and backend directories:

```sh
npm install
```

### 3. Configure Environment Variables
Create a **.env** file in the backend directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
COINGECKO_API=https://api.coingecko.com/api/v3/simple/price
```

### 4. Start the Backend Server
```sh
npm run dev
```

### 5. Start the Frontend
Navigate to the frontend folder and start the React app:

```sh
npm start
```

---

## Deployment (Render)

### 1. Deploy Backend on Render
- Push your code to GitHub.
- Go to **Render**, create a new Web Service.
- Connect your GitHub repository.
- Set **build command**: `npm install && npm run build`
- Set **start command**: `npm start`
- Add your **environment variables**.

### 2. Deploy Redis on Render
- Go to **Render Dashboard** → New Redis Service.
- Set **internal database name**.
- Use the provided Redis **URL** in `.env`.

### 3. Deploy Frontend (Optional)
You can deploy the frontend on **Netlify**, **Vercel**, or **Render**.

---

## Usage
1. Visit the deployed frontend.
2. Set an alert for your preferred cryptocurrency.
3. When the price crosses the threshold, you will receive an email notification.
4. The alert triggers only **once per condition**.

---

## Contributing
Pull requests are welcome. Please open an issue first to discuss any changes.

---

## License
This project is open-source and available under the **MIT License**.

---
