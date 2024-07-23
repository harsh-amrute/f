import { useState } from 'react';
import VFButtonOutline from '../../../../../../components/VectorFLOW/commons/VFButtonOutline';
import VFButton from '../../../../../../components/VectorFLOW/commons/VFButton';
import VFModalCard from '../../../../../../components/VectorFLOW/commons/VFModalCard';

import { AccordianContainer, ButtonContainer, ButtonFilterWrapper, FilterAccordianWrapper, FilterContainer, FilterHeading, HorizontalLine, ModalBody, ModalWrapper, Option, OptionsWrapper, } from './styles';
import FilterCheckboxAccordian from '../../../../../../components/VectorFLOW/commons/MTO/FilterCheckboxAccordian';
import { DropdownGroupWrapper, SelectDropdownComponent } from '../../../../../../components/VectorFLOW/commons/VFMultiFilter/style';
import VFMasterFieldSearch from '../../../../../../components/VectorFLOW/commons/VFMasterFieldSearch';
import Select from 'react-select';
// import VFMasterFieldSearch from '../../../../../../components/VectorFLOW/commons/VFMasterFieldSearch';


const FilterSelectDropdown = ({ placeholder, options, hideDropdownArrow, onChange, filterId, value }: any) => {


    const customStylesClose = {
        control: (baseStyles: any) => (
            {
                ...baseStyles,
                height: '39px',
                borderRadius: ' 20px 20px 20px 20px',
                background: '#F2F2F2 0% 0% no-repeat padding-box',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',



            }
        ),
        indicatorsContainer: () => ({
            paddingRight: '10px',
        }),
        option: (baseStyles: any) => (
            {
                ...baseStyles,
                color: '#313131',
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '12px',
                // marginTop:'5px',
                // marginBottom:'5px',
                // marginLeft:'5px',
                paddingTop: '3px',
                paddingBottom: '3px',
                cursor: 'pointer',
                borderTop: '1px solid #B7B7B7',
            }
        ),
        menuList: (baseStyles: any) => (
            {
                ...baseStyles,
                borderRadius: '0px 0px 20px 20px',
                background: '#F2F2F2 0% 0% no-repeat padding-box',
                paddingLeft: '5px',
                marginTop: '0px',
                overflowY: 'overlay',
                overflowX: 'hidden',

                '&::-webkit-scrollbar': {
                    width: '7px',
                },
                '&::-webkit-scrollbar-track': {
                    borderRadius: '30px',
                    opacity: 1,
                },
                '&::-webkit-scrollbar-thumb': {
                    width: '7px',
                    background: '#D1D1D1 0% 0% no-repeat padding-box',
                    boxShadow: '0px 6px 9px #F8F8F8',
                    borderRadius: '30px',
                    opacity: 1,
                },
            }
        ),
        placeholder: (baseStyles: any) => (
            {
                ...baseStyles,
                // marginLeft:hideDropdownArrow ? '' : '23px',
                color: '#313131',
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '12px',
                textAlign: hideDropdownArrow ? 'center' : '',
                padding: '0 5px',
                boxSizing: "border-box"
            }
        ),
        singleValue: (baseStyles: any) => (
            {
                ...baseStyles,
                // marginLeft:'23px',
                // marginRight:hideDropdownArrow ? '23px' : '23px',
                color: '#313131',
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '12px',
                textAlign: hideDropdownArrow ? 'center' : '',
                padding: '0 5px',
                boxSizing: "border-box"
            }
        ),

    }

    const customStylesOpen = {
        ...customStylesClose,
        control: (baseStyles: any) => ({
            ...baseStyles,
            height: '39px',
            borderRadius: ' 20px 20px 0px 0px',
            background: '#F2F2F2 0% 0% no-repeat padding-box',
        })
    }

    const [customStyles, setCustomStyles] = useState(customStylesClose);

    const handleMenuOpen = () => {
        setCustomStyles(customStylesOpen);
    }

    const handleMenuClose = () => {
        setCustomStyles(customStylesClose);
    }

    return (
        <Select
            options={options}
            isClearable={false}
            unstyled={true}
            styles={customStyles}
            placeholder={placeholder}
            isSearchable={false}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            onChange={onChange}
            aria-label={filterId}
            value={value}
        // menuIsOpen={true}
        />
    )
}
const FilterTextInput = ({ placeholder, onChange, disabled = false, value }: any) => {
    return (
        <input type="text" disabled={disabled} style={{ width: '100%', height: '38px', background: '#F2F2F2 0% 0% no-repeat padding-box', borderRadius: '20px', outline: 'none', color: '#313131', fontFamily: 'Roboto', fontWeight: '300', fontSize: '12px', textAlign: 'center', border: 'none' }} placeholder={placeholder} onChange={onChange} value={value} />
    )
}


interface IFilterModalProps {
    isOpen: boolean;
    filters: { key: string, heading: string, options: string[] }[];
    handleOkay: (selectedOptions: any) => void;
    handleClose: () => void;
    selectedOptions: any;
    handleOptionSelect: (e: any, heading: string, index: number) => void;
    handleNameChange: (e: any) => void;
    themeUi?: string;
}


const AvailabilityFilter = ({ placeholder, header, onChange, filterId, filterState }: any) => {




    const filterProductOptions = [
        { value: 'p1', label: 'P1' },
        { value: 'p2', label: 'P2' },
        { value: 'p3', label: 'P3' },
        { value: 'p4', label: 'P4' },
        { value: 'p5', label: 'P5' },
    ]

    const colorFilterOptions = [
        { value: 'black', label: 'Black' },
        { value: 'black/red', label: 'Black/Red' },
        { value: 'red', label: 'Red' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
        { value: 'white', label: 'White' },
    ]

    const colorTypeFilterOptions = [
        { value: 'colorcount', label: 'Color Count' },
        { value: 'colorage', label: 'Color Age' },
    ]

    const comparisionOptions = [
        { value: 'equalto', label: 'Equal to' },
        { value: 'notequalto', label: 'Not Equal to' },
        { value: 'greaterthan', label: '>' },
        { value: 'greaterthanequalto', label: '>=' },
        { value: 'smallerthan', label: '<' },
        { value: 'smallerthanequalto', label: '<=' },
    ]

    const getOperatorValue = () => {
        const doesFilterExist = filterState.find((filter: any) => filter.name === filterId)
        if (doesFilterExist) {
            return comparisionOptions.find((c: any) => c.value === doesFilterExist.operator)
        }
        return comparisionOptions[5]
    }

    const getValue = () => {
        const doesFilterExist = filterState.find((o: any) => o.name == filterId)
        if (doesFilterExist) {
            return doesFilterExist.value
        }
        return ''
    }


    const getDropDownValue = (options: any) => {
        const doesFilterExist = filterState.find((m: any) => m.name == filterId)
        if (doesFilterExist) {
            if (options === 'colorFilterOptions') return colorFilterOptions.find((n: any) => n.value == doesFilterExist.attributeName)
            if (options === 'filterLocationOptions') {
                return "FOL"
            }
            if (options === 'filterProductOptions') {
                return filterProductOptions.find((n: any) => n.value == doesFilterExist.attributeName)
            }
            if (options === 'colorTypeFilterOptions') {
                return colorTypeFilterOptions.find((n: any) => n.value == doesFilterExist.type)
            }

        }

    }


    return (
        <>
            <DropdownGroupWrapper>
                {
                    header === "Availabilty Filter" ?
                        <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                            <FilterTextInput disabled={true} placeholder={placeholder} />
                        </SelectDropdownComponent>
                        :
                        <SelectDropdownComponent data-testid="BPR-filter-dropdown">

                            {(header !== "Location Filter" && header !== "Color Filter") && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={filterProductOptions} onChange={(e: any) => onChange(e, 'attributeName')} filterId={filterId} value={getDropDownValue('filterProductOptions')} />}
                            {header === "Location Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} onChange={(e: any) => onChange(e, 'attributeName')} filterId={filterId} value={getDropDownValue('filterLocationOptions')} />}
                            {header === "Color Filter" && <FilterSelectDropdown className="custom-scrollbar" placeholder={placeholder} options={colorTypeFilterOptions} onChange={(e: any) => onChange(e, 'type')} filterId={filterId} value={getDropDownValue('colorTypeFilterOptions')} />}
                        </SelectDropdownComponent>
                }
                {header === "Color Filter" && (
                    <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                        <FilterSelectDropdown className="custom-scrollbar" placeholder={"Color"} options={colorFilterOptions} hideDropdownArrow onChange={(e: any) => onChange(e, 'attributeName')} filterId={filterId} value={getDropDownValue('colorFilterOptions')} />
                    </SelectDropdownComponent>
                )}

                <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                    <FilterSelectDropdown className="custom-scrollbar" placeholder={"<="} options={comparisionOptions} hideDropdownArrow onChange={(e: any) => onChange(e, 'operator')} filterId={filterId} value={getOperatorValue()} />
                </SelectDropdownComponent>
                <SelectDropdownComponent data-testid="BPR-filter-dropdown">
                    <FilterTextInput placeholder={'Value'} onChange={(e: any) => onChange(e, 'value')} header={header} value={getValue()} />
                </SelectDropdownComponent>
            </DropdownGroupWrapper>
        </>
    )
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

        handleNameChange({ name: 'plantName', value: event.value });
    }

    const handleOptionChange = (e: any, heading: string, index: number) => {
        handleOptionSelect(e, heading, index)
    }

    const getChecked = (heading: string, option: string) => {
        if (heading === 'Product Group') {
            return selectedOptions?.productGroup?.includes(option);
        }

        if (heading === 'Department') {
            return selectedOptions?.department[option]
        }

        if (heading === 'CCR Group') {
            return selectedOptions?.ccrGroup[option]
        }

        if (heading === 'CCR') {
            return selectedOptions?.ccrName[option]
        }
    }

    const handleToggleAccordian = (key: string) => {
        if (key === activeAccordian) {
            setActiveAccordian('');
        } else {
            setActiveAccordian(key);
        }
    }


    return (
        <VFModalCard
            zoom={'0.7'}
            openModal={isOpen}
            headerIcon=""
            headerText="Select Filter"
            closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
            closeModal={handleClose}
            paddingLeftAndRight={0}
            backgroundColor="rgb(244, 244, 244)"
        >
            <ModalWrapper>

                <ModalBody>
                    <FilterContainer>
                        <FilterHeading>Resource Filters</FilterHeading>
                        <HorizontalLine></HorizontalLine>
                        {/* <SearchBar>
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
                        </SearchBar> */}
                        <FilterAccordianWrapper>

                            <VFMasterFieldSearch
                                value={selectedOptions?.plantName.name}
                                setValue={(e: any) => {
                                    if (e) {

                                        console.log(e);
                                        if (e.length > 0) {

                                            handleChange(e[0])
                                        }
                                    }
                                }}

                                options={filters[0].options}
                                placeholder={''}
                                handleListChild={() => null}
                                maxToShow={3}
                                backgroundColor={'#F2F2F2'}
                                borderRadius={40}
                                disabled={false}
                                boxShadow={'0'}
                            />
                        </FilterAccordianWrapper>
                        <FilterAccordianWrapper>
                            {
                                filters?.map((filter: { key: string, heading: string, options: string[] }) => {
                                    if (filter.key === "plnm") return null
                                    return (
                                        <AccordianContainer>
                                            <FilterCheckboxAccordian filterType={filter?.heading} filterKey={filter?.key} isOpen={activeAccordian === filter?.key} handleToggleAccordian={handleToggleAccordian}>
                                                <OptionsWrapper>
                                                    {filter?.options?.map((option: string, idx: number) => (
                                                        <Option>
                                                            <input
                                                                key={option}
                                                                name={option}
                                                                checked={getChecked(filter?.heading, option)}
                                                                onChange={(e) => { handleOptionChange(e, filter?.heading, idx) }}
                                                                type={`${filter.key === 'prdGrp' ? 'radio' : 'checkbox'}`}
                                                            />
                                                            <label>{option}</label>
                                                        </Option>
                                                    ))}
                                                </OptionsWrapper>
                                            </FilterCheckboxAccordian>
                                        </AccordianContainer>)
                                })
                            }

                        </FilterAccordianWrapper>

                    </FilterContainer>
                </ModalBody>
            </ModalWrapper>

            <ButtonFilterWrapper>
                <ButtonContainer>
                    <VFButtonOutline themeUi={themeUi || ''} onClick={handleClose}>Go Back!</VFButtonOutline>
                    <VFButton themeUi={themeUi || ''} onClick={() => handleOkay(selectedOptions)}>Apply Filter</VFButton>
                </ButtonContainer>
            </ButtonFilterWrapper>
        </VFModalCard>
    )
}

export default FilterModal;
