import React from 'react';
import { render, cleanup } from 'react-testing-library';

import Label from './Label';

const testId = 'label';

afterEach(cleanup);

describe('label', () => {
  it('displays correct text', () => {
    const text = 'Label';
    const { getByTestId } = render(<Label htmlFor="">{text}</Label>);
    const label = getByTestId(testId);
    expect(label).toHaveTextContent(text);
  });

  it('displays children', () => {
    const { getByTestId } =
      render(
        <Label htmlFor="">
          Text
          <input />
        </Label>,
      );
    const label = getByTestId(testId);
    expect(label.childNodes).toHaveLength(2);
    expect(label.childElementCount).toEqual(1);
  });

  it('has correct "for" attribute', () => {
    const htmlFor = 'input';
    const { getByTestId } =
      render(<Label htmlFor={htmlFor}>Test</Label>);
    const label = getByTestId(testId);
    expect(label).toHaveAttribute('for', htmlFor);
  });

  it('has class specified via props', () => {
    const className = 'testClass';
    const { getByTestId } =
      render(<Label htmlFor="" className={className}>Test</Label>);
    const label = getByTestId(testId);
    expect(label).toHaveClass(className);
  });

  it('matches snapshot', () => {
    const { getByTestId } =
      render(<Label className="label" htmlFor="test">Label</Label>);
    const label = getByTestId(testId);
    expect(label).toMatchSnapshot();
  });
});
