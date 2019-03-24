import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Button from './Button';

const testId = 'btn';

const renderButton = (
  children = 'Test',
  onClick = () => {},
  className = '',
) => render(<Button onClick={onClick} className={className}>{children}</Button>);

afterEach(cleanup);

describe('Button', () => {
  it('displays correct text', () => {
    const buttonText = 'Button';
    const { getByTestId } = renderButton(buttonText);
    const button = getByTestId(testId);
    expect(button).toHaveTextContent(buttonText);
  });

  it('fires onClick function', () => {
    const onClick = jest.fn();
    const { getByTestId } = renderButton('test', onClick);
    const button = getByTestId(testId);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('has class specified via props', () => {
    const className = 'testClass';
    const { getByTestId } = renderButton('test', () => {}, className);
    const button = getByTestId(testId);
    expect(button).toHaveClass(className);
  });

  it('matches snapshot', () => {
    const { getByTestId } = renderButton();
    const button = getByTestId(testId);
    expect(button).toMatchSnapshot();
  });
});

