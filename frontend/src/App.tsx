import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import CryptoPrices from './components/CryptoPrices';
import Alerts from './components/Alerts';
import './App.css';
const App: React.FC = () => {
  return (
    <>
    <div className='center-wrapper'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Crypto Monitor</Navbar.Brand>
        </Container>
      </Navbar>
      </div>
      <Container>
        <CryptoPrices />
        <Alerts />
      </Container>
      </>
  );
};

export default App;
