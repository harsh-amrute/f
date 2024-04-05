import { BPRFilter, BPRFilterGroup, BPRFilterState } from '../../../.././VectorFlow/types/BPR'
import {VFSelectedFiltersChip, VFSelectedFiltersFilterCloseIcon, VFSelectedFiltersFilterContent, VFSelectedFiltersFilterLabel, VFSelectedFiltersFilterValue, VFSelectedFiltersPlaceHolder,VFSelectedFiltersWrapper,VFFilterScrollBar} from './styles'

interface VFSelectedFiltersProps{
    filters:BPRFilterState
    onRemoveFilter:(parentId:string,filterId:string,value:string)=>void,
   
}


const VFSelectedFilters = (props:VFSelectedFiltersProps)=>{

    const {
        filters,
        onRemoveFilter,
    } = props

    const areFiltersValid = (groupedFilters:Array<BPRFilter>):boolean=>{
        return groupedFilters.some((f:BPRFilter)=>f.attributeName!="" && f.value!="" && f.operator!="")
    }
 
    return (
        <VFSelectedFiltersWrapper>
            <VFSelectedFiltersPlaceHolder>
                Selected Filters
            </VFSelectedFiltersPlaceHolder>
     <VFFilterScrollBar>

            {Object.keys(filters).map((key:any)=>{
               const currGroup: BPRFilterGroup = filters[key as keyof BPRFilterState];
               console.log(currGroup.label,areFiltersValid(currGroup.filters))
                if(currGroup.filters.length>0 && areFiltersValid(currGroup.filters)){
                   return(
                    <VFSelectedFiltersChip>
                    <VFSelectedFiltersFilterLabel>
                       <b>{currGroup.label + ':'}</b> 

                    </VFSelectedFiltersFilterLabel>
                    {currGroup.filters.map((filter:BPRFilter,index:number)=>{
                        const filterLength = currGroup.filters.length
                        return(
                            <VFSelectedFiltersFilterContent style={{borderRight:index===filterLength-1?'none':'solid 2px black'}}>
                                <VFSelectedFiltersFilterValue>
                                    <p>{filter.attributeName}</p> 
                                    <p style={{margin:'0px 5px 0px 5px'}}>:</p>
                                    <p>{filter.value}</p>
                                </VFSelectedFiltersFilterValue>
                                <VFSelectedFiltersFilterCloseIcon src='/assets/img/VectorFLOW/BPR/close-circle.svg' onClick={()=>onRemoveFilter(currGroup.id,filter.name,filter.value)} data-testid={'closeIcon-filter'}/>
                            </VFSelectedFiltersFilterContent>
                        )
                    })}
                </VFSelectedFiltersChip>
                   )
                }
            })
            }
     </VFFilterScrollBar>
        </VFSelectedFiltersWrapper>
    )
}

export default VFSelectedFilters