import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Input from './Input';

afterAll(cleanup);

describe('Input', () => {
  it('matches snapshot', () => {
    const { container } = render(<Input />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

