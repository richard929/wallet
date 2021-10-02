import fetchMock from 'jest-fetch-mock'
import React from 'react'

import { render, waitForSeconds } from '../../utils/test.utils'
import { Balance } from './Balance'

jest.mock('../../components/asset-table', () => ({
  AssetTable: () => <div>Asset Table</div>,
}))

jest.mock('../../components/overview', () => ({
  Overview: () => <div>Overview</div>,
}))

beforeEach((): void => {
  fetchMock.resetMocks()
})

describe('balance page', () => {
  const priceResponseData: PriceResponseData = {
    height: '414382',
    result: [
      {
        market_id: 'bnb:usd',
        price: '433.699999999999988631',
      },
    ],
  }
  const accountResponseData: AccountResponseData = {
    height: '414436',
    result: {
      type: 'cosmos-sdk/PeriodicVestingAccount',
      value: {
        address: 'kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq',
        coins: [{ denom: 'bnb', amount: '113263568' }],
        public_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: 'AsAbWjsqD1ntOiVZCNRdAm1nrSP8rwZoNNin85jPaeaY',
        },
        account_number: '13751',
        sequence: '336',
        original_vesting: [{ denom: 'hard', amount: '67896190' }],
        delegated_free: [],
        delegated_vesting: [{ denom: 'ukava', amount: '5' }],
        end_time: '1663250400',
        start_time: '1630335600',
        vesting_periods: [
          { length: '361906', amount: [{ denom: 'ukava', amount: '412655' }] },
        ],
      },
    },
  }

  it('should render Balances', async () => {
    fetchMock.mockResponses(
      JSON.stringify(priceResponseData),
      JSON.stringify(accountResponseData),
    )
    const wrapper = render(<Balance />)

    expect(wrapper.getByText('Balances')).toBeTruthy()
    expect(wrapper.getByText('Loading...')).toBeTruthy()

    await waitForSeconds(1)

    expect(wrapper.getByText('Overview')).toBeTruthy()
    expect(wrapper.getByText('Asset Table')).toBeTruthy()
  })

  it('should render error message', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'))
    fetchMock.mockReject(new Error('Internal Server Error'))
    const wrapper = render(<Balance />)

    expect(wrapper.getByText('Balances')).toBeTruthy()
    expect(wrapper.getByText('Loading...')).toBeTruthy()

    await waitForSeconds(1)

    expect(wrapper.getByText('Error fetching account data')).toBeTruthy()
  })
})
