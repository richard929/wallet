// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { coinData2Coin } from '../utils/formatter.utils'

export const kavaURL = 'https://api.kava.io/'

// Define a service using a base URL and expected endpoints
export const kavaApi = createApi({
  reducerPath: 'kavaApi',
  baseQuery: fetchBaseQuery({ baseUrl: kavaURL }),
  endpoints: (builder) => ({
    getPrices: builder.query<PriceResponse, undefined>({
      query: () => `pricefeed/prices`,
      transformResponse: (data: PriceResponseData) => ({
        height: +data.height,
        result: data.result.map((priceData: PriceData) => ({
          marketId: priceData.market_id,
          price: +priceData.price,
        })),
      }),
    }),
    getAccountByAddress: builder.query<AccountResponse, string>({
      query: (address) => `auth/accounts/${address}`,
      transformResponse: (data: AccountResponseData) => ({
        height: +data.height,
        result: {
          type: data.result.type,
          value: {
            accountNumber: +data.result.value.account_number,
            address: data.result.value.address,
            publicKey: data.result.value.public_key,
            sequence: +data.result.value.sequence,
            coins: data.result.value.coins.map(coinData2Coin),
            delegatedFree: data.result.value.delegated_free.map(coinData2Coin),
            delegatedVesting:
              data.result.value.delegated_vesting.map(coinData2Coin),
            originalVesting:
              data.result.value.original_vesting.map(coinData2Coin),
            vestingPeriods: data.result.value.vesting_periods.map(
              (vestingPeriodData: VestingPeriodData) => ({
                length: +vestingPeriodData.length,
                amount: vestingPeriodData.amount.map(coinData2Coin),
              }),
            ),
            startTime: +data.result.value.start_time,
            endTime: +data.result.value.end_time,
          },
        },
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPricesQuery, useGetAccountByAddressQuery } = kavaApi
