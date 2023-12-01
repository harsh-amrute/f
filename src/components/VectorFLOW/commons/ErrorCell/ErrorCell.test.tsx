import { render, fireEvent, screen } from '@testing-library/react';
import { ICellRendererParams } from 'ag-grid-enterprise';
import ErrorCell from '.';

const props:any = {
    value:'dummy',
    data:{error:"SKU Code has pipe and comma"}

}

describe("Renders Error Cell",() => {

    it("Render the component when message is more than 25 char",()=>{
        render(<ErrorCell {...props}/>);
        expect(screen.getByText('SKU Code has pipe and com...')).toBeInTheDocument();
        
    })

    it("Renders the component with message is less than 25 char",()=>{
        const message = "dummydumm"
        props.data.error = message;
        render(<ErrorCell {...props}/>);
        expect(screen.getByText('dummydumm')).toBeInTheDocument();
        
    })
    it("Renders an Empty fragment when message is undefined",()=>{
        props.data.error = undefined;
        render(<ErrorCell {...props}/>);
        
    })
})