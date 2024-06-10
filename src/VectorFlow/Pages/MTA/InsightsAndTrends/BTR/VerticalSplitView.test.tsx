import { render } from '@testing-library/react';
import VerticalSplitView, { SplitViewProps } from './VerticalSplitView';

// Mocked props
const mockTechTableProps = {
  header: 'Tech Table',
  columnDefs: [], // Mocked column definitions
  rowData: [], // Mocked row data
  paginationProps:{
    selectedRows:0,
    totalRows:0,
    rowsPerPage:100,
    currentPage:1,
    handleChangePage:() => {
       return 
    }
    
}
};

const mockEcoTableProps = {
  header: 'Eco Table',
  columnDefs: [], // Mocked column definitions
  rowData: [], // Mocked row data
  paginationProps:{
    selectedRows:0,
    totalRows:0,
    rowsPerPage:100,
    currentPage:1,
    handleChangePage:() => {
       return 
    }
    
}
};

const mockSplitViewProps: SplitViewProps = {
  techTable: mockTechTableProps,
  ecoTable: mockEcoTableProps,
  isLocked:true,
  toggleLockMode:jest.fn()
};

describe('VerticalSplitView', () => {
  global.ResizeObserver = class MockedResizeObserver {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  };
  it('renders with the correct headers', () => {
    const { getByText } = render(<VerticalSplitView {...mockSplitViewProps} />);
    const techTableHeader = getByText('Tech Table');
    const ecoTableHeader = getByText('Eco Table');

    expect(techTableHeader).toBeInTheDocument();
    expect(ecoTableHeader).toBeInTheDocument();
  });

  // Add more test cases as needed
});
