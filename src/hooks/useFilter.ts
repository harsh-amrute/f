import {useState} from 'react';
import { filterObjects } from '../VectorFlow/Pages/MTO/Common/VFCommonFilter/workFlow';
import { FilterState } from '../VectorFlow/types/MTO';

const useFilter=()=>{


    const [multiFilter, setMultiFilter]= useState<FilterState>(filterObjects)
    


    const onDelete = (parentId:any, filterId:any, value:any) => {
        const updatedMultiFilter = { ...multiFilter };
    
        const currGroupKey = Object.keys(updatedMultiFilter).find(key => updatedMultiFilter[key as keyof FilterState]?.id === parentId);
    
        if (updatedMultiFilter && currGroupKey && updatedMultiFilter[currGroupKey as keyof FilterState]?.filters) {
            updatedMultiFilter[currGroupKey as keyof FilterState].filters = updatedMultiFilter[currGroupKey as keyof FilterState]?.filters?.filter(filter =>filter.name !== filterId || filter.value !== value) || [];
     
        }
    
        setMultiFilter(updatedMultiFilter);
        return updatedMultiFilter
    };
        
           

    return{
        state:multiFilter,
        setState:setMultiFilter,
        onDelete:onDelete
    }

}

export default useFilter