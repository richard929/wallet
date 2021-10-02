export const toMoneyFormat = (amount: number, currency = '$', decimal = 2): string => `${currency}${amount.toFixed(decimal)}`

export const toTokenFormat = (amount: number, token = 'KAVA', decimal = 4): string => `${amount.toFixed(decimal)} ${token}`
