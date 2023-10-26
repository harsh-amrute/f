import { render, fireEvent,waitFor } from '@testing-library/react';
import VFFilter from './VFFilter';
import {select} from 'react-select-event'


// Mock the onClick function
const onDelete = jest.fn();

const setState = jest.fn()

const operators = [
    {
        label:'Equals to',
        value:'equals to'
    },
    {
        label:'Less than',
        value:'less than'
    }
]

const fields = [
    {
        label:'SKUName',
        value:'SKUName'
    },
    {
        label:'Quantity',
        value:'Quantity'
    }
]

const filters = [
    {
        id:'fbaksbfka',
        field:"",
        operator:"",
        text:''
    },
    {
        id:'generateRandomId()',
        field:"",
        operator:"",
        text:''
    },
    {
        id:'fkljsanfla',
        field:"",
        operator:"",
        text:''
    }
]

const currFilter = {
    field:'',
    operator:'',
    text:'',
    id:'fbaksbfka'
}

describe('Filter Component', () => {
  it('renders the component', () => {
    const { getByTestId } = render(<VFFilter operators={operators} fields={fields} onDelete={onDelete} currFilter={currFilter} filters={filters} setFilters={setState}/>);
    
    const filter = getByTestId('vffilter-wrapper');
    
    expect(filter).toBeInTheDocument();
  });

  it('calls the onDelete function when the delete icon is clicked',()=>{
    const {getByTestId} = render(
        <VFFilter 
            operators={operators} 
            fields={fields} 
            onDelete={onDelete} 
            currFilter={currFilter} 
            filters={filters} 
            setFilters={setState}
        />
    )

    const deleteIcon = getByTestId('delete-icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toBeCalled()
  })

  it('selects the field when the select component is triggered',async()=>{
    const {getAllByRole} = render(
        <VFFilter 
            operators={operators} 
            fields={fields} 
            onDelete={onDelete} 
            currFilter={currFilter} 
            filters={filters} 
            setFilters={setState}
        />
    )
    await waitFor(async () => {
        const reactSelect = getAllByRole('combobox')[0]
        expect(reactSelect).toBeInTheDocument();
        await select(reactSelect, ['SKUName']);
        expect(setState).toBeCalled();
      });
  })

  it('selects the operator when the select component is triggered',async()=>{
    const {getAllByRole} = render(
        <VFFilter 
            operators={operators} 
            fields={fields} 
            onDelete={onDelete} 
            currFilter={currFilter} 
            filters={filters} 
            setFilters={setState}
        />
    )
    await waitFor(async () => {
        const reactSelect = getAllByRole('combobox')[1]
        expect(reactSelect).toBeInTheDocument();
        await select(reactSelect, ['Equals to']);
        expect(setState).toBeCalled();
      });
  })

  it('text field calls the onChange function when text is changed',async()=>{
    const {getByTestId} = render(
        <VFFilter 
            operators={operators} 
            fields={fields} 
            onDelete={onDelete} 
            currFilter={currFilter} 
            filters={filters} 
            setFilters={setState}
        />
    )
    const textInput = getByTestId('text-input')
    fireEvent.change(textInput,{target: {value: 'a'}})
    expect(setState).toBeCalled()
  })

  });



