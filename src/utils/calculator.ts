const sixDecimalTokens = ['hard', 'ukava', 'usdx']

const amount2Decimal = (amount: number, denom: string): number => {
  const multiplier = 10 ** (sixDecimalTokens.indexOf(denom) > -1 ? 6 : 8)
  return amount / multiplier
}

const getLockedAmount = (account: Account, denom: string): number =>
  account.value.vestingPeriods.reduce(
    (
      { amount, vestingDuration }: { amount: number; vestingDuration: number },
      vestingPeriod: VestingPeriod,
    ) =>
      account.value.startTime + vestingDuration > new Date().getTime() / 1000
        ? { amount, vestingDuration }
        : {
            amount:
              amount -
              (vestingPeriod.amount.find(
                (vestingCoin) => vestingCoin.denom === denom,
              )?.amount || 0),
            vestingDuration: vestingDuration + vestingPeriod.length,
          },
    {
      amount:
        account.value.originalVesting.find((coin) => coin.denom === denom)
          ?.amount || 0,
      vestingDuration: 0,
    },
  ).amount

export const getAssets = (account: Account, prices?: Price[]): Asset[] => {
  const assets = account.value.coins.map((coin: Coin) => {
    const lockedAmount = getLockedAmount(account, coin.denom)
    const availableAmount = Math.min(
      coin.amount +
        (account.value.delegatedVesting.find(
          (delegatedCoin) => delegatedCoin.denom === coin.denom,
        )?.amount || 0) -
        lockedAmount,
      coin.amount,
    )

    return {
      name: coin.denom.toUpperCase(),
      price:
        prices?.find((price: Price) => price.marketId === `${coin.denom}:usd`)
          ?.price || 0,
      total: amount2Decimal(coin.amount, coin.denom),
      locked: amount2Decimal(lockedAmount, coin.denom),
      available: amount2Decimal(availableAmount, coin.denom),
    }
  })

  return assets
}

const getBalance = (
  assets: Asset[],
  type: 'total' | 'available' | 'locked',
  usd = true,
) =>
  assets.reduce(
    (sum: number, asset: Asset) => sum + asset[type] * (usd ? asset.price : 1),
    0,
  )

export const getTotalBalance = (assets: Asset[], usd = true) =>
  getBalance(assets, 'total', usd)

export const getAvailableBalance = (assets: Asset[], usd = true) =>
  getBalance(assets, 'available', usd)

export const getLockedBalance = (assets: Asset[], usd = true) =>
  getBalance(assets, 'locked', usd)
