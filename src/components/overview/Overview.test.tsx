import React from 'react'

import { render } from '../../utils/test.utils'
import { Overview } from './Overview'

jest.mock('./styles', () => ({
  VSplitter: () => <div>VSplitter</div>,
}))

describe('overview component', () => {
  it('should render asset overview', () => {
    const assets = [
      {
        name: 'BNB',
        price: 1.5,
        total: 2,
        available: 1,
        locked: 1,
      },
      {
        name: 'HARD',
        price: 1,
        total: 3,
        available: 2,
        locked: 1,
      },
    ]

    const wrapper = render(<Overview assets={assets} />)

    expect(wrapper.getByText('Total Balance')).toBeTruthy()
    expect(wrapper.getByTestId('total:usd')).toHaveTextContent('$6.00')
    expect(wrapper.getByText('Total Available')).toBeTruthy()
    expect(wrapper.getByTestId('available:usd')).toHaveTextContent('$3.50')
    expect(wrapper.getByText('Total Locked')).toBeTruthy()
    expect(wrapper.getByTestId('locked:usd')).toHaveTextContent('$2.50')
  })

  it('should render vertical splitter', () => {
    const wrapper = render(<Overview />)

    expect(wrapper.getByText('VSplitter')).toBeTruthy()
  })
})
