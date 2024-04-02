import React from 'react'
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
        fireEvent.mouseEnter(screen.getByTestId('tooltip-wrapper'))
        fireEvent.mouseLeave(screen.getByTestId('errorImage'))
        
    })
    
    it("Renders an Empty fragment when message is undefined",()=>{
        props.data.error = undefined;
        render(<ErrorCell {...props}/>);
        
    })
})

describe('ErrorCell component', () => {
    test('tooltip repositioning when overflow occurs', () => {
      // Mock window.innerHeight
      const originalInnerHeight:any = Object.getOwnPropertyDescriptor(window, 'innerHeight');
      Object.defineProperty(window, 'innerHeight', { value: 10 });
  
      const props:any = {
        data: {
          error: 'This is a test error message.'
        }
      };
  
      const { getByTestId } = render(<ErrorCell {...props} />);
  
      const errorImage = getByTestId('errorImage');
  
      fireEvent.mouseEnter(errorImage);
  
      // You can assert the repositioned tooltip position here
    //   expect(tooltipWrapper.style.top).toBe('approximately expected value');
  
      // Restore the original window.innerHeight
      Object.defineProperty(window, 'innerHeight', originalInnerHeight);
    });
  });