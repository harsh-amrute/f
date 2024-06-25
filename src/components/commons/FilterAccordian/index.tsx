import { useState } from 'react';
import './style.css';

interface IFilterAccordianProps {
    heading: string;
    options: string[];
    selectedOptions: any;
    handleOptionSelect: (e: any, heading: string, index: number) => void
}

const FilterAccordian = (props: IFilterAccordianProps) => {

    const { heading, options, selectedOptions, handleOptionSelect } = props; 
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleAccordian = () => {
        setIsOpen(!isOpen)
    }

    const handleChange =(e: any, heading: string, index: number) => {
        handleOptionSelect(e, heading, index)
    }

    const getChecked = (heading: string, option: string ) => {
        if(heading === 'Product Group'){
            return selectedOptions?.productGroup?.includes(option);
        }
    
        if(heading === 'Department'){
            return selectedOptions?.department?.includes(option);
        }
    
        if(heading === 'CCR Group'){
            return selectedOptions?.ccrGroup?.includes(option);
        }
    
        if(heading === 'CCR'){
            return selectedOptions?.ccrName?.includes(option);
        }
    }

    return(
        <div key={heading} className="accordian-wrapper">
            <div onClick={()=>toggleAccordian()} className="accordian-header">
                <div className="accordian-heading">{heading}</div>
                {isOpen ? <div className="arrow-icon">^</div> : <div className="arrow-icon">⌄</div>}
            </div>
            {isOpen && <div  className="options-wrapper">
                {options?.map((option: string, idx: number)=>(
                    <div key={option} className='option'>
                        <input 
                            name={option} 
                            checked={getChecked(heading, option)} 
                            onChange={(e)=>{
                                console.log('se')
                                handleChange(e, heading, idx)}} 
                            type='checkbox'
                        />
                        <div>{option}</div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default FilterAccordian;