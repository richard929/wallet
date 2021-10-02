import React from 'react'
import { Card } from 'react-bootstrap'

import {
  getAvailableBalance,
  getLockedBalance,
  getTotalBalance,
} from '../../utils/calculator'
import { toMoneyFormat } from '../../utils/formatter'
import { VSplitter } from './styles'

export interface OverviewProps {
  assets: Asset[]
}

export const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  const { assets } = props

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <p className="small mb-0">Total Balance</p>
            <p className="h3">{toMoneyFormat(getTotalBalance(assets))}</p>
          </div>
          <div className="d-flex">
            <div className="d-flex flex-column">
              <p className="small mb-0">Total Available</p>
              <p className="h5">{toMoneyFormat(getAvailableBalance(assets))}</p>
            </div>
            <VSplitter />
            <div className="d-flex flex-column">
              <p className="small mb-0">Total Locked</p>
              <p className="h5">{toMoneyFormat(getLockedBalance(assets))}</p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
