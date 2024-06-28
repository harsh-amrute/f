import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import MTOActionToolBar from './MTOActionToolBar';

describe('MTOActionToolBar Component', () => {
  // Mock functions
  const mockHandleGoBack = jest.fn();
  const mockOnDateChange = jest.fn();
  const mockSubmitDate = jest.fn();
  const mockSetIsGridView = jest.fn();

  // Test case 1: Default render test
  it('renders without crashing', () => {
    render(<MTOActionToolBar comp="default" />);
  });

  // Test case 2: Handle Go Back test
  it('calls handleGoBack function when Go Back button is clicked', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="default" handleGoBack={mockHandleGoBack} />
    );
    fireEvent.click(getByText('Go Back'));
    expect(mockHandleGoBack).toHaveBeenCalled();
  });

  // Test case 3: Date change test
  it('calls onDateChange function with selected date', () => {
    const { getByDisplayValue } = render(
      <MTOActionToolBar comp="default" onDateChange={mockOnDateChange} />
    );
    const dateInput = getByDisplayValue('');
    fireEvent.change(dateInput, { target: { value: '2024-06-28' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('2024-06-28');
  });

  // Test case 4: Submit Date test
  it('calls submitDate function when Submit button is clicked', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="default" submitDate={mockSubmitDate} />
    );
    fireEvent.click(getByText('Submit'));
    expect(mockSubmitDate).toHaveBeenCalled();
  });

  // Test case 5: Toggle Grid View test
  it('calls setIsGridView function when Chart View or Grid View toggle button is clicked', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="rmpm" setIsGridView={mockSetIsGridView} />
    );
    fireEvent.click(getByText('Chart View'));
    expect(mockSetIsGridView).toHaveBeenCalled();
  });

  // Add more test cases for other functionalities as needed
  it('renders Go Back button when comp is not MaterialCov, rmpm, or MaterialRequirement', () => {
    const { getByText, queryByTestId } = render(
      <MTOActionToolBar comp="someOtherComp" handleGoBack={mockHandleGoBack} />
    );
    const goBackButton = getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();
  
    // Simulate click on Go Back button
    fireEvent.click(goBackButton);
    expect(mockHandleGoBack).toHaveBeenCalled();
  
    // Ensure no other element with testId 'closeIcon-filter' exists
    expect(queryByTestId('closeIcon-filter')).toBeNull();
  });

  it('renders Go Back button when comp is not MaterialCov, rmpm, or MaterialRequirement but the function is not passed', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="someOtherComp"/>
    );
    const goBackButton = getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();
  
    // Simulate click on Go Back button
    fireEvent.click(goBackButton);
  });

  it('renders date picker and submit button when comp is not MaterialCov, rmpm, or MaterialCovDetailData', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="someOtherComp" onDateChange={mockOnDateChange} submitDate={mockSubmitDate} date="2024-06-28" />
    );
  
    const datePicker = screen.getByTestId("datepicker");
    expect(datePicker).toBeInTheDocument();
    fireEvent.change(datePicker, { target: { value: '2024-06-29' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('2024-06-29');
  
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
    expect(mockSubmitDate).toHaveBeenCalled();
  });

  it('renders toggle buttons for Chart View and Grid View when comp is "rmpm"', () => {
    const { getByText } = render(
      <MTOActionToolBar comp="rmpm" setIsGridView={mockSetIsGridView} isGridView={true} />
    );
  
    const chartViewButton = getByText('Chart View');
    fireEvent.click(chartViewButton);
    expect(mockSetIsGridView).toHaveBeenCalled();
  
    const gridViewButton = getByText('Grid View');
    fireEvent.click(gridViewButton);
    expect(mockSetIsGridView).toHaveBeenCalled();
  });
  

});
