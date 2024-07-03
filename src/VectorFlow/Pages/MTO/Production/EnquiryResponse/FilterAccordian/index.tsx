import { Dispatch } from 'react';
import { AccordianHeader, AccordianHeading, DownArrowIcon, Option, OptionsWrapper, UpArrowIcon } from './styles';
import { useSpring, animated } from "react-spring";

interface IFilterAccordianProps {
    heading: string;
    options: string[];
    isOpen: boolean;
    activeAccordian: string;
    setActiveAccordian: Dispatch<React.SetStateAction<string>>;
    selectedOptions: any;
    handleOptionSelect: (e: any, heading: string, index: number) => void
}

const FilterAccordian = (props: IFilterAccordianProps) => {

    const { heading, options, selectedOptions, handleOptionSelect, activeAccordian, setActiveAccordian, isOpen } = props; 
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleActiveAccordian = (category: string) => {
        if(activeAccordian === category){
            setActiveAccordian('')
        }else{
            setActiveAccordian(category)
        }
    }

    const handleChange =(e: any, heading: string, index: number) => {
        handleOptionSelect(e, heading, index)
    }

    const getChecked = (heading: string, option: string ) => {
        if(heading === 'Product Group'){
            return selectedOptions?.productGroup?.includes(option);
        }
    
        if(heading === 'Department'){
            return selectedOptions?.department[option]
        }
    
        if(heading === 'CCR Group'){
            return selectedOptions?.ccrGroup[option]
        }
    
        if(heading === 'CCR'){
            return selectedOptions?.ccrName[option]
        }
    }

    const closeAnimation = useSpring<any>({
        from: { opacity: "0", maxHeight: "0px" },
        to: { opacity: "1", maxHeight: isOpen ? "144px" : "0px" },
        config: { duration: "300" },
    });

    const openAnimation = useSpring<any>({
        from: { opacity: "0", maxHeight: "40px" },
        to: { opacity: "1", maxHeight: isOpen ? "200px" : "40px" },
        config: { duration: "300" },   
    });
    

    return(
        <animated.div className="filter-accordian" style={openAnimation} key={heading}>
            <AccordianHeader onClick={()=>handleActiveAccordian(heading)}>
                <AccordianHeading >{heading}</AccordianHeading>
                {isOpen ? <UpArrowIcon><img src='/assets/img/down-icon.svg' alt='up-arrow-icon'/></UpArrowIcon> : <DownArrowIcon><img src='/assets/img/down-icon.svg' alt='down-arrow-icon'/></DownArrowIcon>}
            </AccordianHeader>
            <animated.div className='accordian-body  custom-scrollbar'  style={closeAnimation}>
                {isOpen && <OptionsWrapper>
                    {options?.map((option: string, idx: number)=>(
                        <Option>
                            <input 
                                key={option}
                                name={option} 
                                checked={getChecked(heading, option)} 
                                onChange={(e)=>{handleChange(e, heading, idx)}} 
                                type='checkbox'
                            />
                            <label>{option}</label>
                        </Option>
                    ))}
                </OptionsWrapper>}
            </animated.div>
        </animated.div>
    )
}

export default FilterAccordian;
