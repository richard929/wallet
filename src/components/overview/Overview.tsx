import React from 'react';
import { Card } from 'react-bootstrap';

import { toMoneyFormat } from '../../utils/formatter';
import { VSplitter } from './styles';

export interface OverviewProps {
  balance: number;
  available: number;
  locked: number;
}

export const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const { balance, available, locked } = props;

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <p className="small mb-0">Total Balance</p>
            <p className="h3">{toMoneyFormat(balance)}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <p className="small mb-0">Total Available</p>
              <p className="h5">{toMoneyFormat(available)}</p>
            </div>
            <VSplitter />
            <div className="d-flex flex-column">
              <p className="small mb-0">Total Locked</p>
              <p className="h5">{toMoneyFormat(locked)}</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
