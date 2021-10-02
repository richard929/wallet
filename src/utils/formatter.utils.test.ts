import { coinData2Coin, toMoneyFormat, toTokenFormat } from './formatter.utils'

it('toMoneyFormat should return $2.36', () => {
  const moneyFormat = toMoneyFormat(2.356)
  expect(moneyFormat).toStrictEqual('$2.36')
})

it('toMoneyFormat should return $2.4', () => {
  const moneyFormat = toMoneyFormat(2.356, '$', 1)
  expect(moneyFormat).toStrictEqual('$2.4')
})

it('toMoneyFormat should return €2.36', () => {
  const moneyFormat = toMoneyFormat(2.356, '€', 2)
  expect(moneyFormat).toStrictEqual('€2.36')
})

it('toTokenFormat should return 2.3603 KAVA', () => {
  const tokenFormat = toTokenFormat(2.360256)
  expect(tokenFormat).toStrictEqual('2.3603 KAVA')
})

it('toTokenFormat should return 2.36 KAVA', () => {
  const tokenFormat = toTokenFormat(2.360256, 'KAVA', 2)
  expect(tokenFormat).toStrictEqual('2.36 KAVA')
})

it('toTokenFormat should return 2.3603 BNB', () => {
  const tokenFormat = toTokenFormat(2.360256, 'BNB', 4)
  expect(tokenFormat).toStrictEqual('2.3603 BNB')
})

it('coinData2Coin should return number amount', () => {
  const coin = coinData2Coin({ denom: 'BNB', amount: '1.362362346' })
  expect(coin).toStrictEqual({ denom: 'BNB', amount: 1.362362346 })
})
