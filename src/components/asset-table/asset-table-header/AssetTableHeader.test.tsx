import React from 'react'

import { render } from '../../../utils/test.utils'
import { AssetTableHeader } from './AssetTableHeader'

describe('asset table header component', () => {
  it('should render column headers', () => {
    const wrapper = render(<AssetTableHeader />)

    expect(wrapper.getByText('Asset')).toBeTruthy()
    expect(wrapper.getByText('Total')).toBeTruthy()
    expect(wrapper.getByText('Available')).toBeTruthy()
    expect(wrapper.getByText('Locked')).toBeTruthy()
  })
})
