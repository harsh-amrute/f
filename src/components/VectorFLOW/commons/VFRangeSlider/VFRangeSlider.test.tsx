
import { render, fireEvent } from '@testing-library/react';
import VFRangeSlider from './';

describe('VFRangeSlider', () => {
  it('renders with default props', () => {
    const { getByRole } = render(<VFRangeSlider min={0} max={100} strictMode={false} width={300} defaultValue={50} handleChange={jest.fn()} showTriangle/>);
    const inputRange = getByRole('slider');
    fireEvent.change(inputRange, { target: { value: '60' } });
    expect(inputRange).toHaveAttribute('value', '60');
    expect(inputRange).toBeInTheDocument();
    expect(inputRange).toHaveAttribute('min', '0');
    expect(inputRange).toHaveAttribute('max', '100');
    fireEvent.change(inputRange, { target: { value: '0' } });
   
  });

  it('updates value on slider change', () => {
    const { getByRole } = render(<VFRangeSlider min={0} max={100} strictMode={true} width={300} defaultValue={50}milestones={[0,30,40,60,70,100]} handleChange={jest.fn()} showTriangle={false}/>);
    const inputRange = getByRole('slider');

    fireEvent.change(inputRange, { target: { value: '75' } });
    fireEvent.change(inputRange, { target: { value: '62' } });
    fireEvent.change(inputRange, { target: { value: '69' } });
    fireEvent.change(inputRange, { target: { value: '25' } });
    fireEvent.change(inputRange, { target: { value: '' } });

  });
});
