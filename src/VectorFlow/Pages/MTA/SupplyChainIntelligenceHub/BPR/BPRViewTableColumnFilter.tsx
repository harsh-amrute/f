import {useState} from 'react'

import { getBPRViewTableHeaderFilterOptions } from '../../../../../helpers/utils'
import {BPRViewTableColumnFilterContainer,BPRViewTableColumnFilterInput, BPRViewTableColumnFilterSelect, BPRViewTableColumnFilterSelectOption} from './styles'


interface BPRViewTableColumnFilterProps{
    onApplyFilter:(filterString:string,query:any)=>void
    filterString:string
    dataType?:string
}

const BPRViewTableColumnFilter = (props:BPRViewTableColumnFilterProps)=>{

    const{
        onApplyFilter,
        filterString,
        dataType
    } = props

    const filterOptions = getBPRViewTableHeaderFilterOptions(dataType)

    const [filterQuery,setFilterQuery] = useState<string>(filterOptions[0].value)


    return (
        <BPRViewTableColumnFilterContainer>
            <BPRViewTableColumnFilterSelect onChange={(e)=>{
                setFilterQuery(e.target.value)
                onApplyFilter(filterString,e.target.value)
            }}>
                {filterOptions.map((f)=>{
                    return (
                        <BPRViewTableColumnFilterSelectOption 
                            value={f.value}
                        >
                            {f.label}
                        </BPRViewTableColumnFilterSelectOption>
                    )
                })}
            </BPRViewTableColumnFilterSelect>
            <BPRViewTableColumnFilterInput 
                autoFocus 
                placeholder='Filter..' 
                onChange={(e)=>{
                    onApplyFilter(e.target.value,filterQuery)
                }}
                value={filterString}
            />
            {/* <BPRViewTableColumnFilterButton onClick={()=>onApplyFilter(filterString)}>
                Apply
            </BPRViewTableColumnFilterButton> */}
        </BPRViewTableColumnFilterContainer>
    )
}

export default BPRViewTableColumnFilter