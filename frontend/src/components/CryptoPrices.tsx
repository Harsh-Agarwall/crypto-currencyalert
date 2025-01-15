import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';

interface CryptoPrice {
  [key: string]: { usd: number };
}

const CryptoPrices: React.FC = () => {
  const [prices, setPrices] = useState<CryptoPrice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://crypto-currencyalert.onrender.com/api/crypto/prices');
        setPrices(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-1">
      <h2>Cryptocurrency Prices</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : prices ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(prices).map((crypto) => (
              <tr key={crypto}>
                <td>{crypto.toUpperCase()}</td>
                <td>${prices[crypto].usd}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default CryptoPrices;
