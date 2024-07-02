import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterAccordian from '.';

// Mock props for testing
const mockProps = {
  heading: 'Test Heading',
  options: ['Option 1', 'Option 2', 'Option 3'],
  selectedOptions: {
    productGroup: ['Option 1'],
    department: {
      'Option 2': true,
      'Option 3': false,
    },
    ccrGroup: {
      'Option 1': false,
      'Option 2': true,
    },
    ccrName: {
      'Option 1': true,
      'Option 3': true,
    },
  },
  handleOptionSelect: jest.fn(),
  activeAccordian: 'Test Heading',
  setActiveAccordian: jest.fn(),
  isOpen: true,
};

describe('FilterAccordian', () => {
  it('renders heading and options correctly', () => {
    render(<FilterAccordian {...mockProps} />);

    // Assert heading is rendered
    expect(screen.getByText('Test Heading')).toBeInTheDocument();

    // Assert all options are rendered
    mockProps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('toggles accordion open/close on header click', () => {
    render(<FilterAccordian {...mockProps} />);

    const header = screen.getByText('Test Heading');

    // Initially isOpen is true, so should show UpArrowIcon
    expect(screen.getByAltText('up-arrow-icon')).toBeInTheDocument();

    // Click to close accordion
    fireEvent.click(header);
    expect(mockProps.setActiveAccordian).toHaveBeenCalledWith('');

  });

});
