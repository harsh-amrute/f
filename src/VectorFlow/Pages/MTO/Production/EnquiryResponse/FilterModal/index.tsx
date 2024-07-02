import { useState } from 'react';
import FilterAccordian from '../FilterAccordian';
import { ApplyBtn, BackgroundCover, CloseBtn, CloseIcon, FilterAccordianWrapper, FilterContainer, FilterHeading, Heading, HorizontalLine, ModalBody, ModalFooter, ModalHeader, ModalWrapper, PlantInput, SearchBar } from './styles';


interface IFilterModalProps {
    isOpen: boolean;
    filters: {heading: string, options: string[]}[];
    handleOkay: () => void;
    handleClose: () => void;
    selectedOptions: any;
    handleOptionSelect: (e: any, heading: string, index: number) => void
    handleNameChange: (e: any) => void
}

const FilterModal = (props: IFilterModalProps) => {

    const {    
        isOpen, 
        handleClose, 
        handleOkay, 
        filters, 
        selectedOptions, 
        handleOptionSelect, 
        handleNameChange 
    } = props;

    const [activeAccordian, setActiveAccordian] = useState<string>('');

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        handleNameChange({ name, value });
    }


    return (isOpen ? 
        <BackgroundCover>
            <ModalWrapper>
                <ModalHeader>
                    <Heading>Select Filter</Heading>
                    <CloseIcon onClick={handleClose}>X</CloseIcon>
                </ModalHeader>
                <ModalBody>
                    <FilterContainer>
                        <FilterHeading>Resource Filters</FilterHeading>
                        <HorizontalLine></HorizontalLine>
                        <SearchBar>
                            <PlantInput
                                id={'plntNmInput'}
                                data-testid="plntNmInput"
                                name='plantName'
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
                                filters?.map((filter: {heading: string, options: string[]})=>(
                                    <>
                                        <HorizontalLine></HorizontalLine>
                                        <FilterAccordian 
                                            heading={filter?.heading} 
                                            options={filter?.options} 
                                            isOpen={activeAccordian === filter?.heading}
                                            activeAccordian={activeAccordian}
                                            setActiveAccordian={setActiveAccordian}
                                            selectedOptions={selectedOptions} 
                                            handleOptionSelect={handleOptionSelect}    
                                        />
                                    </>
                                ))
                            }
                        </FilterAccordianWrapper>
                    </FilterContainer>
                </ModalBody>
                <ModalFooter>
                    <CloseBtn onClick={handleClose}>Go Back!</CloseBtn>
                    <ApplyBtn onClick={handleOkay}>Apply Filter</ApplyBtn>
                </ModalFooter>
            </ModalWrapper>
        </BackgroundCover>: <></>
    )
}

export default FilterModal;
