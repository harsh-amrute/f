import { render,screen,fireEvent } from '@testing-library/react';
import ErrorCell from '.';

const props:any = {
    value:'dummy',
    data:{error:"SKU Code has pipe and commatesttesttest"}

}

describe("Renders Error Cell",() => {

    it("Render the component when message is more than 30 char",()=>{
        render(<ErrorCell {...props}/>);
        expect(screen.getByText('SKU Code has pipe and commates...')).toBeInTheDocument();
        
    })

    it("Renders the component with message is less than 30 char",()=>{
        const message = "dummydumm"
        props.data.error = message;
        render(<ErrorCell {...props}/>);
        expect(screen.getByText('dummydumm')).toBeInTheDocument();
        
    })

    it("Renders the Tooltip",()=>{
        const message = "dummydumm"
        props.data.error = message;
        render(<ErrorCell {...props}/>);
        fireEvent.mouseEnter(screen.getByTestId('errorImage'))
        fireEvent.mouseLeave(screen.getByTestId('errorImage'))
        
    })
    
    it("Renders an Empty fragment when message is undefined",()=>{
        props.data.error = undefined;
        render(<ErrorCell {...props}/>);
        
    })
})