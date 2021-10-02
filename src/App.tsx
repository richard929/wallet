import React from 'react';
import { Container } from 'react-bootstrap';
import { AssetTable } from './components/asset-table';
import { Overview } from './components/overview';

function App() {
  return (
    <Container>
      <h3 className="m-3">Balances</h3>
      <div className="mt-3 mb-5">
        <Overview balance={536.62} available={378.31} locked={158.31} />
      </div>
      <AssetTable
        assets={[
          {
            name: 'KAVA',
            price: 6.95,
            total: 31.18571385,
            available: 147.68,
            locked: 68.8,
          },
          {
            name: 'HARD',
            price: 2.23,
            total: 40.3107,
            available: 0.36,
            locked: 89.51,
          },
        ]}
      />
    </Container>
  );
}

export default App;
