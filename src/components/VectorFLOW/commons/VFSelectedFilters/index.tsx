import React from 'react'
import { BPRFilter, BPRFilterGroup, BPRFilterState } from '../../../.././VectorFlow/types/BPR'
import {VFSelectedFiltersChip, VFSelectedFiltersFilterCloseIcon, VFSelectedFiltersFilterContent, VFSelectedFiltersFilterLabel, VFSelectedFiltersFilterValue, VFSelectedFiltersPlaceHolder,VFSelectedFiltersWrapper} from './styles'

interface VFSelectedFiltersProps{
    filters:BPRFilterState
    onRemoveFilter:(parentId:string,filterId:string)=>void
}


const VFSelectedFilters = (props:VFSelectedFiltersProps)=>{

    const {
        filters,
        onRemoveFilter
    } = props


    return (
        <VFSelectedFiltersWrapper>
            <VFSelectedFiltersPlaceHolder>
                Selected Filters
            </VFSelectedFiltersPlaceHolder>
            {Object.keys(filters).map((key:any)=>{
               const currGroup: BPRFilterGroup = filters[key as keyof BPRFilterState];
                if(currGroup.filters.length>0){
                   return(
                    <VFSelectedFiltersChip>
                    <VFSelectedFiltersFilterLabel>
                        {currGroup.label} <b>: </b>
                    </VFSelectedFiltersFilterLabel>
                    {currGroup.filters.map((filter:BPRFilter,index:number)=>{
                        const filterLength = currGroup.filters.length
                        return(
                            <VFSelectedFiltersFilterContent style={{borderRight:index===filterLength-1?'none':'solid 2px black'}}>
                                <VFSelectedFiltersFilterValue>
                                    {filter.attributeName} : {filter.value}
                                </VFSelectedFiltersFilterValue>
                                <VFSelectedFiltersFilterCloseIcon src='/assets/img/VectorFLOW/BPR/close-circle.svg' onClick={()=>onRemoveFilter(currGroup.id,filter.name)} data-testid={'closeIcon-filter'}/>
                            </VFSelectedFiltersFilterContent>
                        )
                    })}
                </VFSelectedFiltersChip>
                   )
                }
            })}
        </VFSelectedFiltersWrapper>
    )
}

export default VFSelectedFilters