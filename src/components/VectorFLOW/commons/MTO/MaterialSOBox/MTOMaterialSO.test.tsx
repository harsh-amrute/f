import React from 'react';
import { render } from '@testing-library/react';
import MTOMaterialSO from './MTOMaterialSO';

describe('MTOMaterialSO component', () => {
  it('should render with given props', () => {
    // Arrange
    const props = {
      kit: 'No Kit',
      colors: { c1: '#FF0000', c2: "#FF0000", c3: "#FF0000" },
      height: '100px',
      text: 'Sample Text',
      orderCount: 10,
      cutCount: 5,
      orderValue: 100,
      percent: 0.5,
    };

    // Act
    const { getByText, getByAltText } = render(<MTOMaterialSO {...props} />);

    // Assert
    expect(getByText(props.text)).toBeInTheDocument();
    expect(getByAltText('Logo')).toBeInTheDocument(); // Assuming there's an image with the alt text 'Logo'
    expect(getByText(props.kit)).toBeInTheDocument();
    expect(getByText(props.orderCount.toString())).toBeInTheDocument();
    expect(getByText(props.cutCount.toString())).toBeInTheDocument();
    expect(getByText(props.orderValue.toString())).toBeInTheDocument();
  });

  it('should render without colors', () => {
    // Arrange
    const props = {
      kit: 'Partial Kit',
      colors: { c1: null, c2: null, c3: null },
      height: '100px',
      text: 'Sample Text',
      orderCount: 10,
      cutCount: 5,
      orderValue: 100,
      percent: 0.5,
    };

    // Act
    const { getByText, getByAltText } = render(<MTOMaterialSO {...props} />);

    // Assert
    expect(getByText(props.text)).toBeInTheDocument();
    expect(getByAltText('Logo')).toBeInTheDocument(); // Assuming there's an image with the alt text 'Logo'
    expect(getByText(props.kit)).toBeInTheDocument();
    expect(getByText(props.orderCount.toString())).toBeInTheDocument();
    expect(getByText(props.cutCount.toString())).toBeInTheDocument();
    expect(getByText(props.orderValue.toString())).toBeInTheDocument();
  });
  // You can write more test cases to check different scenarios and edge cases

  it('should render with FullKit', () => {
    // Arrange
    const props = {
      kit: 'Full Kit',
      colors: { c1: null, c2: null, c3: null },
      height: '100px',
      text: 'Sample Text',
      orderCount: 10,
      cutCount: 5,
      orderValue: 100,
      percent: 0.5,
    };

    // Act
    const { getByText, getByAltText } = render(<MTOMaterialSO {...props} />);

    // Assert
    expect(getByText(props.text)).toBeInTheDocument();
    expect(getByAltText('Logo')).toBeInTheDocument(); // Assuming there's an image with the alt text 'Logo'
    expect(getByText(props.kit)).toBeInTheDocument();
    expect(getByText(props.orderCount.toString())).toBeInTheDocument();
    expect(getByText(props.cutCount.toString())).toBeInTheDocument();
    expect(getByText(props.orderValue.toString())).toBeInTheDocument();
  });
});
