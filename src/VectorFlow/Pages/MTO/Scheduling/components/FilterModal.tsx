import React from 'react'
import styled from 'styled-components'
import Checkbox from '../../../../../components/VectorFLOW/commons/MTO/Checkbox'
import { useUserData } from '../../../../../context'

const FilterWrapper = styled.div`
    height: 70vh;
    width: 70vw;
    background-color: white;
    position: relative;
`

const FilterHeaderWrapper = styled.div`
    height: 35px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    align-items: center;
    background: white;
    font-size: 1.2rem;
    font-weight: 500;
    `

const FilterHeaderTitle = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    gap: 8px;
    align-items: center;
`
const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 2.6rem;
    font-weight: 200px;
`

const FilterContent = styled.div`
    height: 80%;
    width: 100%;
    overflow: auto;

`

const FilterTabLayout = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px 40px;
    width: fit-content;
    height; fit-content;
`

const FilterTab = styled.div`
    padding: 8px 0;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    width: 220px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.01);
    }
    &.active {
        background: #9c0d64;
        color: white;
    }
`

const FilterTabHeader = styled.div`
    font-size: 1.1rem;
    font-weight: 500;
    padding: 4px 8px 4px 16px;
    text-align: left;
    border-bottom: 1px solid #ccc;
`

const FilterSearchBar = styled.input`
    width: 90%;
    margin: 12px auto;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 18px;
    font-size: 1rem;
    background: #f9f9f9;
    display: block;
    &:focus {
        outline: none;
        border-color: #9c0d64;
        box-shadow: 0 0 5px rgba(156, 13, 100, 0.5);
    }
`

const FilterList = styled.div`
    max-height: 190px;
    overflow-y: auto;
    margin-top: 8px;
    padding: 0 8px;
`


const FilterModal = ({setIsFilterModalOpen}:any) => {

    const Stages = ["Granulation", "Mixing", "Drying", "Compression", "Coating", "Packaging", "Quality Control", "Storage", "Distribution"];
    const themeUi = useUserData().user.user.themeUi;
  return (
    <FilterWrapper>
        <FilterHeaderWrapper>
            <FilterHeaderTitle>
                <img src="/assets/img/scheduling/filter-icon.svg" alt="Filter" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                Select Filter
            </FilterHeaderTitle>
            <CloseButton onClick={()=>{setIsFilterModalOpen(false)}}>×</CloseButton>
        </FilterHeaderWrapper>

        
        <FilterContent>
            <FilterTabLayout>
                <FilterTab>
                    <FilterTabHeader>
                        Stage
                    </FilterTabHeader>
                    <FilterSearchBar type="text" placeholder="Search Stage..." />
                    <FilterList>

                        {Stages.map((stage, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '4px 0', gap:'6px' }}>
                                <Checkbox style={{zoom: 0.5}} theme={themeUi} checked={true}/>
                                <label htmlFor={`stage-${index}`}>{stage}</label>
                            </div>
                        ))}

                    </FilterList>
                </FilterTab>
                <FilterTab>
                    <FilterTabHeader>
                        WorkStation
                    </FilterTabHeader>
                    <FilterSearchBar type="text" placeholder="Search Stage..." />
                    <FilterList>

                        {Stages.map((stage, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '4px 0', gap:'6px' }}>
                                <Checkbox style={{zoom: 0.5}} theme={themeUi} checked={true}/>
                                <label htmlFor={`stage-${index}`}>{stage}</label>
                            </div>
                        ))}

                    </FilterList>
                </FilterTab>
                <FilterTab>
                    <FilterTabHeader>
                        Job List
                    </FilterTabHeader>
                    <FilterSearchBar type="text" placeholder="Search Stage..." />
                    <FilterList>

                        {Stages.map((stage, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '4px 0', gap:'6px' }}>
                                <Checkbox style={{zoom: 0.5}} theme={themeUi} checked={true}/>
                                <label htmlFor={`stage-${index}`}>{stage}</label>
                            </div>
                        ))}

                    </FilterList>
                </FilterTab>
                <FilterTab>
                    <FilterTabHeader>
                        Action Preference
                    </FilterTabHeader>
                    <FilterList>

                        {Stages.map((stage, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '4px 0', gap:'6px' }}>
                                <Checkbox style={{zoom: 0.5}} theme={themeUi} checked={true}/>
                                <label htmlFor={`stage-${index}`}>{stage}</label>
                            </div>
                        ))}

                    </FilterList>
                </FilterTab>
            </FilterTabLayout>

        </FilterContent>
    </FilterWrapper>
  )
}

export default FilterModal