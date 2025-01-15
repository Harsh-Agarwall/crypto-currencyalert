import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const Alerts: React.FC = () => {
  const [email, setEmail] = useState('');
  const [crypto, setCrypto] = useState('bitcoin');
  const [condition, setCondition] = useState<'greater' | 'less'>('greater');
  const [threshold, setThreshold] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/crypto/alerts', { email, crypto, condition, threshold });
      setMessage('Alert created successfully!');
      setEmail('');
      setCrypto('bitcoin');
      setCondition('greater');
      setThreshold(0);
    } catch (error) {
      console.error('Error creating alert:', error);
      setMessage('Failed to create alert.');
    }
  };

  return (
    <div className="mt-1">
      <h2>Set Price Alerts</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="crypto" className="mt-1">
          <Form.Label>Cryptocurrency</Form.Label>
          <Form.Select value={crypto} onChange={(e) => setCrypto(e.target.value)} required>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="condition" className="mt-1">
          <Form.Label>Condition</Form.Label>
          <Form.Select value={condition} onChange={(e) => setCondition(e.target.value as 'greater' | 'less')} required>
            <option value="greater">Greater than</option>
            <option value="less">Less than</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="threshold" className="mt-1">
          <Form.Label>Threshold Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price in USD"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Set Alert
        </Button>
      </Form>

      {message && <Alert variant="info" className="mt-3">{message}</Alert>}
    </div>
  );
};

export default Alerts;
