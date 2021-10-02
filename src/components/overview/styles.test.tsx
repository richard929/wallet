import React from 'react'

import { render } from '../../utils/test.utils'
import { VSplitter } from './styles'

describe('vsplitter component', () => {
  it('should render normally', () => {
    const wrapper = render(<VSplitter />)
    expect(wrapper).toMatchSnapshot()
  })
})
