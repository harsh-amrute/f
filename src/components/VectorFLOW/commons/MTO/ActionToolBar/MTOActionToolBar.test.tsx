import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import MTOActionToolBar from './MTOActionToolBar';
import moment from 'moment';

describe('MTOActionToolBar Component', () => {
  // Mock functions
  const mockHandleGoBack = jest.fn();
  const mockOnDateChange = jest.fn();
  const mockSubmitDate = jest.fn();
  const mockSetIsGridView = jest.fn();
  const mockOnAddFilter = jest.fn();


  const selectedFilters = [
    { label: 'Plant Name', values: ['Plant 1', 'Plant 2'] },
    { label: 'Location', values: ['Location 1'] },
  ];

  const date = moment(new Date()).format('YYYY-MM-DD');

  test('renders without crashing', () => {
    render(<MTOActionToolBar />);
  });

  test('calls handleGoBack function when Go Back button is clicked', () => {
    render(<MTOActionToolBar isGoBackButton handleGoBack={mockHandleGoBack} />);
    fireEvent.click(screen.getByText('Go Back'));
    expect(mockHandleGoBack).toHaveBeenCalled();
  });

  test('calls onDateChange function with selected date', () => {
    render(<MTOActionToolBar isReleaseDate onDateChange={mockOnDateChange} date={date} />);
    const dateInput = screen.getByTestId('datepicker');
    fireEvent.change(dateInput, { target: { value: '2024-06-28' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('2024-06-28');
  });

  test('calls submitDate function when Submit button is clicked', () => {
    render(<MTOActionToolBar isReleaseDate submitDate={mockSubmitDate} date={date} />);
    const submitButton = screen.getByAltText(/Group 627/);
    fireEvent.click(submitButton);
    expect(mockSubmitDate).toHaveBeenCalled();
  });

  test('calls setIsGridView function when Chart View or Grid View toggle button is clicked', () => {
    render(<MTOActionToolBar isChartGridToggle setIsGridView={mockSetIsGridView} isGridView />);
    fireEvent.click(screen.getByText('Chart View'));
    expect(mockSetIsGridView).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Grid View'));
    expect(mockSetIsGridView).toHaveBeenCalled();
  });

  test('renders Go Back button when isGoBackButton is true', () => {
    render(<MTOActionToolBar isGoBackButton handleGoBack={mockHandleGoBack} />);
    const goBackButton = screen.getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();
    fireEvent.click(goBackButton);
    expect(mockHandleGoBack).toHaveBeenCalled();
  });

  test('renders date picker and submit button when isReleaseDate is true', () => {
    render(<MTOActionToolBar isReleaseDate onDateChange={mockOnDateChange} submitDate={mockSubmitDate} date="2024-06-28" />);
    const datePicker = screen.getByTestId('datepicker');
    expect(datePicker).toBeInTheDocument();
    fireEvent.change(datePicker, { target: { value: '2024-06-29' } });
    expect(mockOnDateChange).toHaveBeenCalledWith('2024-06-29');
    const submitButton = screen.getByAltText(/Group 627/);
    fireEvent.click(submitButton);
    expect(mockSubmitDate).toHaveBeenCalled();
  });

  test('renders As on Date when isAsOnDate is true', () => {
    render(<MTOActionToolBar isAsOnDate />);
    expect(screen.getByText('As on Date')).toBeInTheDocument();
  });

  test('renders Add/Edit Filter button and calls onAddFilter when clicked', () => {
    render(<MTOActionToolBar isAddFilterButton onAddFilter={mockOnAddFilter} selectedFilters={selectedFilters} />);
    expect(screen.getByText('Edit Filter')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Edit Filter'));
    expect(mockOnAddFilter).toHaveBeenCalled();

    render(<MTOActionToolBar isAddFilterButton onAddFilter={mockOnAddFilter} />);
    expect(screen.getByText('+ Add Filter')).toBeInTheDocument();
    fireEvent.click(screen.getByText('+ Add Filter'));
    expect(mockOnAddFilter).toHaveBeenCalled();
  });



});
