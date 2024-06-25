import FilterAccordian from '../FilterAccordian';
import SearchIcon from '../../../../public/assets/img/search-icon.svg'
import './style.css';

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

    const handleChange = (event: any) => {
        console.log(event);
        handleNameChange(event);
    }

    return (isOpen ? 
        <div className="background-cover">
            <div className="modal-wrapper">
                <div className="modal-header">
                    <div className='heading'>Select Filter</div>
                    <div className='close-icon' onClick={handleClose}>X</div>
                </div>
                <div className="modal-body">
                    <div className='filter-container'>
                        <div className='filter-heading'>Resource Filters</div>
                        <div className='horizontal-line'></div>
                        <div className='search-bar'>
                            <input
                                className='plant-input'
                                name='plantName'
                                value={selectedOptions?.plantName}
                                onChange={(e) => handleChange(e)}
                            />
                            <img
                                src="/assets/img/search-icon.svg"
                                alt="search-icon"
                            />
                        </div>
                        <div className='filter-accordian'>
                            {
                                filters?.map((filter: {heading: string, options: string[]})=>(
                                    <>
                                        <div className='horizontal-line'></div>
                                        <FilterAccordian 
                                            heading={filter?.heading} 
                                            options={filter?.options} 
                                            selectedOptions={selectedOptions} 
                                            handleOptionSelect={handleOptionSelect}    
                                        />
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className='close-btn' onClick={handleClose}>Go Back!</div>
                    <button className='apply-btn' onClick={handleOkay}>Apply Filter</button>
                </div>
            </div>
        </div>: <></>
    )
}

export default FilterModal;
