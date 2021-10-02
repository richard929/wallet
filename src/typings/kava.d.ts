/* eslint-disable camelcase */

interface Price {
  marketId: string
  price: number
}

interface PriceData {
  market_id: string
  price: string
}

interface PriceResponse {
  height: number
  result: Price[]
}

interface PriceResponseData {
  height: string
  result: PriceData[]
}

interface Coin {
  denom: string
  amount: number
}

interface CoinData {
  denom: string
  amount: string
}

interface PublicKey {
  type: string
  value: string
}

type PublicKeyData = PublicKey

interface VestingPeriod {
  length: number
  amount: Coin[]
}

interface VestingPeriodData {
  length: string
  amount: CoinData[]
}

interface AccountValue {
  accountNumber: number
  address: string
  publicKey: PublicKey
  sequence: number
  coins: Coin[]
  delegatedFree: Coin[]
  delegatedVesting: Coin[]
  originalVesting: Coin[]
  vestingPeriods: VestingPeriod[]
  startTime: number
  endTime: number
}

interface AccountValueData {
  account_number: string
  address: string
  public_key: PublicKeyData
  sequence: string
  coins: CoinData[]
  delegated_free: CoinData[]
  delegated_vesting: CoinData[]
  original_vesting: CoinData[]
  vesting_periods: VestingPeriodData[]
  start_time: string
  end_time: string
}

interface Account {
  type: string
  value: AccountValue
}

interface AccountData {
  type: string
  value: AccountValueData
}

interface AccountResponse {
  height: number
  result: Account
}

interface AccountResponseData {
  height: string
  result: AccountData
}
