import React from 'react'

import { render } from '../../../utils/test.utils'
import { AssetTableItem } from './AssetTableItem'

describe('asset table item component', () => {
  const asset = {
    name: 'BNB',
    price: 1.3456,
    total: 2.3675126,
    available: 1.189672,
    locked: 1.1778406,
  }

  it('should render asset item', () => {
    const wrapper = render(<AssetTableItem asset={asset} />)

    expect(wrapper.getByText('BNB')).toBeTruthy()
    expect(wrapper.getByTestId('bnb:price')).toHaveTextContent('$1.35')
    expect(wrapper.getByTestId('bnb:total')).toHaveTextContent('2.3675 BNB')
    expect(wrapper.getByTestId('bnb:total-usd')).toHaveTextContent('$3.19')
    expect(wrapper.getByTestId('bnb:available-usd')).toHaveTextContent('$1.60')
    expect(wrapper.getByTestId('bnb:locked-usd')).toHaveTextContent('$1.58')
  })
})
