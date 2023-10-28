

import { render, screen } from '@testing-library/react';
import MRCard from '.';

const sampleData = {
  id: 1,
  name: 'Sample Card',
  fields: [{displayName:'SKU Name',key:'sku_name',visible:true},{displayName:'City',key:'city',visible:true},{displayName:'MRP',key:'mrp',visible:true}],
};

const selectedFields = ['SKU Name']
const selectedColor = 'rgb(244, 244, 244)'; 

describe('MRCard Component', () => {
  it('renders card header with the correct name', () => {
    render(<MRCard data={sampleData} selectedFields={selectedFields}/>);
    const cardHeader = screen.getByText('Sample Card');
    expect(cardHeader).toBeInTheDocument();
  });


  it('renders card list items with the correct titles', () => {
    render(<MRCard data={sampleData} selectedFields={selectedFields} />);
    const field1 = screen.getByText('SKU Name');
    const field2 = screen.getByText('City');
    const field3 = screen.getByText('MRP');
    
    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();
    expect(field3).toBeInTheDocument();
  });

  it('applies "isSelected" background color to selected fields', () => {
    render(<MRCard data={sampleData} selectedFields={selectedFields} />);

    const field1 = screen.getByText('SKU Name');
    const field2 = screen.getByText('City');
    const field3 = screen.getByText('MRP');
    
   

    expect(getComputedStyle(field1).backgroundColor).toBe(selectedColor);
    expect(getComputedStyle(field2).backgroundColor).not.toBe(selectedColor);
    expect(getComputedStyle(field3).backgroundColor).not.toBe(selectedColor);
  });

  it('handles empty selectedFields', () => {
    render(<MRCard data={sampleData} selectedFields={[]} />);
    const field1 = screen.getByText('SKU Name');
    const field2 = screen.getByText('City');
    const field3 = screen.getByText('MRP');


    expect(getComputedStyle(field1).backgroundColor).not.toBe(selectedColor);
    expect(getComputedStyle(field2).backgroundColor).not.toBe(selectedColor);
    expect(getComputedStyle(field3).backgroundColor).not.toBe(selectedColor);
  });

  it('handles empty data fields', () => {
    const emptyData = {
      id: 1,
      name: 'Empty Card',
      fields: [],
    };
    const {getByTestId} = render(<MRCard data={emptyData} selectedFields={selectedFields} />);
    
    expect(getByTestId('list-container').children.length).toBe(0)
    
  });
});
