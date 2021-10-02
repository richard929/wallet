import {
  getAssets,
  getTotalBalance,
  getAvailableBalance,
  getLockedBalance,
} from './calculator.utils'

const account = {
  type: 'cosmos-sdk/PeriodicVestingAccount',
  value: {
    address: 'kava1vlpsrmdyuywvaqrv7rx6xga224sqfwz3fyfhwq',
    coins: [
      { denom: 'bnb', amount: 113263568 },
      { denom: 'hard', amount: 68801559 },
      { denom: 'unknown', amount: 0 },
    ],
    publicKey: {
      type: 'tendermint/PubKeySecp256k1',
      value: 'AsAbWjsqD1ntOiVZCNRdAm1nrSP8rwZoNNin85jPaeaY',
    },
    accountNumber: 13751,
    sequence: 336,
    originalVesting: [
      { denom: 'hard', amount: 67896190 },
      { denom: 'swp', amount: 1487 },
      { denom: 'ukava', amount: 12260813 },
    ],
    delegatedFree: [],
    delegatedVesting: [{ denom: 'ukava', amount: 5 }],
    endTime: 1663250400,
    startTime: 1630335600,
    vestingPeriods: [
      {
        length: 361906,
        amount: [{ denom: 'ukava', amount: 412655 }],
      },
      {
        length: 2399294,
        amount: [
          { denom: 'hard', amount: 11321 },
          { denom: 'ukava', amount: 436 },
        ],
      },
      { length: 1209600, amount: [{ denom: 'swp', amount: 935 }] },
      { length: 627034, amount: [{ denom: 'ukava', amount: 80451 }] },
      {
        length: 841766,
        amount: [{ denom: 'hard', amount: 1085694 }],
      },
      {
        length: 1209600,
        amount: [{ denom: 'hard', amount: 2048924 }],
      },
      {
        length: 1303275,
        amount: [{ denom: 'ukava', amount: 2936026 }],
      },
      { length: 79125, amount: [{ denom: 'hard', amount: 2262317 }] },
      {
        length: 813808,
        amount: [{ denom: 'ukava', amount: 2014684 }],
      },
      {
        length: 395792,
        amount: [{ denom: 'hard', amount: 7593449 }],
      },
      {
        length: 177625,
        amount: [{ denom: 'ukava', amount: 2098674 }],
      },
      {
        length: 514154,
        amount: [{ denom: 'ukava', amount: 485347 }],
      },
      {
        length: 777021,
        amount: [{ denom: 'hard', amount: 2027810 }],
      },
      {
        length: 1209600,
        amount: [{ denom: 'hard', amount: 7834793 }],
      },
      {
        length: 2678400,
        amount: [{ denom: 'hard', amount: 5632113 }],
      },
      {
        length: 3284120,
        amount: [{ denom: 'ukava', amount: 943554 }],
      },
      {
        length: 603880,
        amount: [{ denom: 'hard', amount: 8083727 }],
      },
      {
        length: 1209600,
        amount: [
          { denom: 'hard', amount: 3578599 },
          { denom: 'ukava', amount: 922242 },
        ],
      },
      {
        length: 1382400,
        amount: [
          { denom: 'hard', amount: 4454329 },
          { denom: 'ukava', amount: 388424 },
        ],
      },
    ],
  },
}
const prices = [
  {
    marketId: 'bnb:usd',
    price: 433.699999999999988631,
  },
  {
    marketId: 'hard:usd',
    price: 1.017300000000000093,
  },
]

const decimalPrecision = 8

it('getAssets should return assets data', () => {
  const assets = getAssets(account, prices)

  expect(assets).toStrictEqual([
    {
      name: 'BNB',
      price: 433.7,
      total: 1.13263568,
      locked: 0,
      available: 1.13263568,
    },
    {
      name: 'HARD',
      price: 1.0173,
      total: 68.801559,
      locked: 67.884869,
      available: 0.91669,
    },
    {
      name: 'UNKNOWN',
      price: 0,
      total: 0,
      locked: 0,
      available: 0,
    },
  ])
})

it('getTotalBalance should return total tokens', () => {
  const assets = getAssets(account, prices)
  const totalBalance = getTotalBalance(assets, false)

  expect(totalBalance.toFixed(decimalPrecision)).toStrictEqual(
    (69.93419468).toFixed(decimalPrecision),
  )
})

it('getTotalBalance should return total usd', () => {
  const assets = getAssets(account, prices)
  const totalBalance = getTotalBalance(assets)

  expect(totalBalance.toFixed(decimalPrecision)).toStrictEqual(
    (561.2159203867).toFixed(decimalPrecision),
  )
})

it('getAvailableBalance should return available tokens', () => {
  const assets = getAssets(account, prices)
  const availableBalance = getAvailableBalance(assets, false)

  expect(availableBalance.toFixed(decimalPrecision)).toStrictEqual(
    (2.04932568).toFixed(decimalPrecision),
  )
})

it('getAvailableBalance should return available usd', () => {
  const assets = getAssets(account, prices)
  const availableBalance = getAvailableBalance(assets)

  expect(availableBalance.toFixed(decimalPrecision)).toStrictEqual(
    (492.156643153).toFixed(decimalPrecision),
  )
})

it('getLockedBalance should return locked tokens', () => {
  const assets = getAssets(account, prices)
  const lockedBalance = getLockedBalance(assets, false)

  expect(lockedBalance.toFixed(decimalPrecision)).toStrictEqual(
    (67.884869).toFixed(decimalPrecision),
  )
})

it('getLockedBalance should return locked usd', () => {
  const assets = getAssets(account, prices)
  const lockedBalance = getLockedBalance(assets)

  expect(lockedBalance.toFixed(decimalPrecision)).toStrictEqual(
    (69.0592772337).toFixed(decimalPrecision),
  )
})
