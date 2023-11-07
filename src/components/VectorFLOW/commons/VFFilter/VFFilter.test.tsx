import { render, fireEvent,waitFor } from '@testing-library/react';
import VFFilter from '.';
import {select} from 'react-select-event'
import { store } from '../../../../redux/store/store';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

// Mock the onClick function
const onDelete = jest.fn();

const contextWrapper = (children:ReactNode) => {
    return(
      <Provider store={store}>
            {children}
      </Provider>
        
    )
  }


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
        masterId:2,
        field:"",
        operator:"",
        text:''
    },
    {
        id:'generateRandomId()',
        field:"",
        masterId:2,
        operator:"",
        text:''
    },
    {
        id:'fkljsanfla',
        field:"",
        masterId:3,
        operator:"",
        text:''
    }
]

const currFilter = {
    field:'',
    operator:'',
    text:'',
    id:'fbaksbfka',
    masterId:1
}

const props = {
    operators,
    fields,
    onDelete,
    currFilter,
    filters
}

describe('Filter Component', () => {
  it('renders the component', () => {
    const { getByTestId } = render(contextWrapper(<VFFilter {...props}/>));
    
    const filter = getByTestId('vffilter-wrapper');
    
    expect(filter).toBeInTheDocument();
  });

  it('calls the onDelete function when the delete icon is clicked',()=>{
    const {getByTestId} = render(contextWrapper(<VFFilter {...props}/>));

    const deleteIcon = getByTestId('delete-icon')

    fireEvent.click(deleteIcon)
    expect(onDelete).toBeCalled()
  })

  it('selects the field when the select component is triggered',async()=>{
    const {getAllByRole} = render(contextWrapper(<VFFilter {...props} />))
    await waitFor(async () => {
        const reactSelect = getAllByRole('combobox')[0]
        expect(reactSelect).toBeInTheDocument();
        await select(reactSelect, ['SKUName']);
      });
  })

  it('selects the operator when the select component is triggered',async()=>{
    const {getAllByRole} = render(contextWrapper(<VFFilter {...props}/>));
    await waitFor(async () => {
        const reactSelect = getAllByRole('combobox')[1]
        expect(reactSelect).toBeInTheDocument();
        await select(reactSelect, ['Equals to']);
      });
  })

  it('text field calls the onChange function when text is changed',async()=>{
    const {getByTestId} = render(contextWrapper(<VFFilter {...props}/>))
    const textInput = getByTestId('text-input')
    fireEvent.change(textInput,{target: {value: 'a'}})
  })

  });



