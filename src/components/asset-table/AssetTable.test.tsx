import React from 'react'

import { render } from '../../utils/test.utils'
import { AssetTable } from './AssetTable'

jest.mock('./asset-table-header', () => ({
  AssetTableHeader: () => <div>Header</div>,
}))

jest.mock('./asset-table-item', () => ({
  AssetTableItem: () => <div>Item</div>,
}))

describe('asset table component', () => {
  it('should render "No assets"', () => {
    const wrapper = render(<AssetTable />)

    expect(wrapper.getByText('No assets')).toBeTruthy()
  })

  it('should render asset table header and two items', () => {
    const assets = [
      {
        name: 'BNB',
        price: 1.3456,
        total: 2.3675126,
        available: 1.189672,
        locked: 1.1778406,
      },
      {
        name: 'HARD',
        price: 1.3456,
        total: 2.3675126,
        available: 1.189672,
        locked: 1.1778406,
      },
    ]

    const wrapper = render(<AssetTable assets={assets} />)

    expect(wrapper.getByText('Header')).toBeTruthy()
    expect(wrapper.getAllByText('Item')).toHaveLength(2)
  })
})
