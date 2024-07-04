import { useState } from 'react';
import VFButtonOutline from '../../../../../../components/VectorFLOW/commons/VFButtonOutline';
import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFModalCard from '../../../../../../components/VectorFLOW/commons/VFModalCard';

import { ButtonContainer, ButtonFilterWrapper, FilterAccordianWrapper, FilterContainer, FilterHeading, HorizontalLine, ModalBody,Option, OptionsWrapper, PlantInput, SearchBar } from './styles';
import FilterCheckboxAccordian from '../../../../../../components/VectorFLOW/commons/MTO/FilterCheckboxAccordian';


interface IFilterModalProps {
    isOpen: boolean;
    filters: {key: string, heading: string, options: string[]}[];
    handleOkay: (selectedOptions: any) => void;
    handleClose: () => void;
    selectedOptions: any;
    handleOptionSelect: (e: any, heading: string, index: number) => void;
    handleNameChange: (e: any) => void;
    themeUi?: string;
}

const FilterModal = (props: IFilterModalProps) => {

    const {    
        isOpen, 
        handleClose, 
        handleOkay, 
        filters, 
        selectedOptions, 
        handleOptionSelect, 
        handleNameChange,
        themeUi
    } = props;

    const [activeAccordian, setActiveAccordian] = useState<string>('');

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        handleNameChange({ name, value });
    }

    const handleOptionChange =(e: any, heading: string, index: number) => {
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


    return ( 
        <VFModalCard 
            zoom={'0.73'}
            openModal={isOpen}
            headerIcon=""
            headerText="Select Filter"
            closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg" 
            closeModal={handleClose}
            paddingLeftAndRight={0}
            backgroundColor="rgb(244, 244, 244)"
        >
            <ModalBody>
                <FilterContainer>
                    <FilterHeading>Resource Filters</FilterHeading>
                    <HorizontalLine></HorizontalLine>
                    <SearchBar>
                        <PlantInput
                            id={'plntNmInput'}
                            data-testid="plntNmInput"
                            name='plantName'
                            placeholder='Plant'
                            value={selectedOptions?.plantName}
                            onChange={(e) => handleChange(e)}
                        />
                        <img
                            src="/assets/img/search-icon.svg"
                            alt="search-icon"
                        />
                    </SearchBar>
                    <FilterAccordianWrapper>
                        {
                            filters?.map((filter: {key: string, heading: string, options: string[]})=>(
                                <FilterCheckboxAccordian  filterType={filter?.heading} filterKey={filter?.key} isOpen={activeAccordian === filter?.key} setOpenStatus={setActiveAccordian}>
                                    <OptionsWrapper>
                                        {filter?.options?.map((option: string, idx: number)=>(
                                            <Option>
                                                <input 
                                                    key={option}
                                                    name={option} 
                                                    checked={getChecked(filter?.heading, option)} 
                                                    onChange={(e)=>{handleOptionChange(e, filter?.heading, idx)}} 
                                                    type='checkbox'
                                                />
                                                <label>{option}</label>
                                            </Option>
                                        ))}
                                    </OptionsWrapper>
                                </FilterCheckboxAccordian>
                            ))
                        }
                    </FilterAccordianWrapper>
                </FilterContainer>
            </ModalBody>
            <ButtonFilterWrapper>
                <ButtonContainer>
                    <VFButtonOutline themeUi={themeUi|| ''} onClick={handleClose}>Go Back!</VFButtonOutline>
                    <VFButton themeUi={themeUi || ''} onClick={()=>handleOkay(selectedOptions)}>Apply Filter</VFButton>
                </ButtonContainer>
            </ButtonFilterWrapper>
        </VFModalCard>
    )
}

export default FilterModal;
