import fetchMock from 'jest-fetch-mock'

import { setupApiStore } from '../utils/test.utils'
import { kavaApi, kavaURL } from './kava'

beforeEach((): void => {
  fetchMock.resetMocks()
})

describe('get prices', () => {
  const priceResponseData: PriceResponseData = {
    height: '414382',
    result: [
      {
        market_id: 'bnb:usd',
        price: '433.699999999999988631',
      },
    ],
  }
  const priceResponse: PriceResponse = {
    height: 414382,
    result: [
      {
        marketId: 'bnb:usd',
        price: 433.699999999999988631,
      },
    ],
  }

  test('request is correct', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockResponse(JSON.stringify(priceResponseData))
    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getPrices.initiate(undefined))
        .then(() => {
          expect(fetchMock).toBeCalledTimes(1)
          const { method, url } = fetchMock.mock.calls[0][0] as Request

          expect(method).toBe('GET')
          expect(url).toBe(`${kavaURL}pricefeed/prices`)
        })
    )
  })

  test('successful response', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockResponse(JSON.stringify(priceResponseData))

    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getPrices.initiate(undefined))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((action: any) => {
          const { status, data, isSuccess } = action
          expect(status).toBe('fulfilled')
          expect(isSuccess).toBe(true)
          expect(data).toStrictEqual(priceResponse)
        })
    )
  })

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockReject(new Error('Internal Server Error'))

    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getPrices.initiate(undefined))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((action: any) => {
          const {
            status,
            error: { error },
            isError,
          } = action
          expect(status).toBe('rejected')
          expect(isError).toBe(true)
          expect(error).toBe('Error: Internal Server Error')
        })
    )
  })
})

describe('get account data by address', () => {
  const address = 'kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq'
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
  const accountResponse: AccountResponse = {
    height: 414436,
    result: {
      type: 'cosmos-sdk/PeriodicVestingAccount',
      value: {
        address: 'kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq',
        coins: [{ denom: 'bnb', amount: 113263568 }],
        publicKey: {
          type: 'tendermint/PubKeySecp256k1',
          value: 'AsAbWjsqD1ntOiVZCNRdAm1nrSP8rwZoNNin85jPaeaY',
        },
        accountNumber: 13751,
        sequence: 336,
        originalVesting: [{ denom: 'hard', amount: 67896190 }],
        delegatedFree: [],
        delegatedVesting: [{ denom: 'ukava', amount: 5 }],
        endTime: 1663250400,
        startTime: 1630335600,
        vestingPeriods: [
          { length: 361906, amount: [{ denom: 'ukava', amount: 412655 }] },
        ],
      },
    },
  }

  test('request is correct', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockResponse(JSON.stringify(accountResponseData))

    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getAccountByAddress.initiate(address))
        .then(() => {
          expect(fetchMock).toBeCalledTimes(1)
          const { method, url } = fetchMock.mock.calls[0][0] as Request

          expect(method).toBe('GET')
          expect(url).toBe(`${kavaURL}auth/accounts/${address}`)
        })
    )
  })

  test('successful response', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockResponse(JSON.stringify(accountResponseData))

    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getAccountByAddress.initiate(address))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((action: any) => {
          const { status, data, isSuccess } = action
          expect(status).toBe('fulfilled')
          expect(isSuccess).toBe(true)
          expect(data).toStrictEqual(accountResponse)
        })
    )
  })

  test('unsuccessful response', () => {
    const storeRef = setupApiStore(kavaApi)
    fetchMock.mockReject(new Error('Internal Server Error'))

    return (
      storeRef.store
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .dispatch<any>(kavaApi.endpoints.getAccountByAddress.initiate(address))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((action: any) => {
          const {
            status,
            error: { error },
            isError,
          } = action
          expect(status).toBe('rejected')
          expect(isError).toBe(true)
          expect(error).toBe('Error: Internal Server Error')
        })
    )
  })
})
