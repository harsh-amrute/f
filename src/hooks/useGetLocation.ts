import {useMemo} from 'react'

import { MultiFilterSupplyChainCheckboxList } from '../helpers/BPRConstants'

import { useGetLocationTypes } from "../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"


const useGetLocation =()=>{

    const {data,isLoading} = useGetLocationTypes()

    const locations= useMemo(()=>{
        if(isLoading)return MultiFilterSupplyChainCheckboxList
        let parsed:Array<any> = JSON.parse(data?.data.data)
        parsed = parsed.map((l)=>({label:l.lt,id:l.lt}))
        return  parsed
    },[isLoading])

    return {
        locations
    }
}

export default useGetLocation