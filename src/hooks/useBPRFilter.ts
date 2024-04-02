import {useState} from 'react';
import { BPRFilterState} from '../VectorFlow/types/BPR';

const useBPRFilter=()=>{

    const [multiFilter, setMultiFilter]= useState<BPRFilterState>(
        {
            supplyChainFilter:{
                id:'1',
                label:'SupplyChain',
                filters:[]
            },
            locationFilter:{
                id:'2',
                label:'Location',
                filters:[]
            },
            productFilter:{
                id:'3',
                label:'Product',
                filters:[]
            },
            availabilityFilter:{
                id:'4',
                label:'Availability',
                filters:[]
            },
            coverageFilter:{
                id:'5',
                label:'Coverage',
                filters:[]
            },
            colorFilter:{
                id:'6',
                label:'Color',
                filters:[]
            },
        }
    )
    


    const onDelete = (parentId:any, filterId:any, value:any,) => {
        const updatedMultiFilter = { ...multiFilter };
    
        const currGroupKey = Object.keys(updatedMultiFilter).find(key => updatedMultiFilter[key as keyof BPRFilterState].id === parentId);
    
        if (currGroupKey && updatedMultiFilter[currGroupKey as keyof BPRFilterState].filters) {
            updatedMultiFilter[currGroupKey as keyof BPRFilterState].filters = updatedMultiFilter[currGroupKey as keyof BPRFilterState].filters.filter(filter =>filter.name !== filterId || filter.value !== value);
     
        }
    
        setMultiFilter(updatedMultiFilter);
    };
        
           

    return{
        state:multiFilter,
        setState:setMultiFilter,
        onDelete:onDelete
    }

}

export default useBPRFilter