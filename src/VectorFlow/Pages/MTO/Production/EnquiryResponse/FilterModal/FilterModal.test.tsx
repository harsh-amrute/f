import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterModal from '.';

describe('FilterModal Component', () => {
  const handleClose = jest.fn();
  const handleOkay = jest.fn();
  const handleOptionSelect = jest.fn();
  const handleNameChange = jest.fn();

  const filters = [
    { heading: 'Filter 1', options: ['Option 1', 'Option 2'] },
    { heading: 'Filter 2', options: ['Option 3', 'Option 4'] },
  ];

  const selectedOptions = {
    plantName: 'Test Plant',
    productGroup: ['Option 1'],
    department: [],
    ccrGroup: [],
    ccrName: [],
  };

  it('renders modal when isOpen is true', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    expect(screen.getByText('Select Filter')).toBeInTheDocument();
    expect(screen.getByText('Resource Filters')).toBeInTheDocument();
    expect(screen.getByText('Filter 1')).toBeInTheDocument();
    expect(screen.getByText('Filter 2')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    fireEvent.click(screen.getByText('X'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleOkay when apply button is clicked', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    fireEvent.click(screen.getByText('Apply Filter'));
    expect(handleOkay).toHaveBeenCalledTimes(1);
  });

  it('calls handleNameChange on input change', () => {
    render(
      <FilterModal
        isOpen={true}
        handleClose={handleClose}
        handleOkay={handleOkay}
        filters={filters}
        selectedOptions={selectedOptions}
        handleOptionSelect={handleOptionSelect}
        handleNameChange={handleNameChange}
      />
    );

    const input = screen.getByTestId('plntNmInput');
    fireEvent.change(input, { target: { value: 'New Plant' } });
    expect(handleNameChange).toHaveBeenCalledWith(expect.objectContaining({
        value: 'New Plant',
        name: 'plantName',
    }));
  });
});
