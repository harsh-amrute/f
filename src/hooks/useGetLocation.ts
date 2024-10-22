import {useMemo} from 'react'
import { notifyError } from '../helpers/notify'

import { MultiFilterSupplyChainCheckboxList } from '../helpers/BPRConstants'

import { useGetLocationTypes } from "../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"


const useGetLocation =()=>{

    const {data,isLoading} = useGetLocationTypes()

    const locations= useMemo(()=>{
        try{
            if(isLoading)return MultiFilterSupplyChainCheckboxList
            let parsed:Array<any> = JSON.parse(data?.data.data)
            parsed = parsed.map((l)=>({label:l.lt,id:l.lt}))
            return  parsed
        }catch(err){
            notifyError('Failed To Fetch Location Types')
            return []
        }
    },[isLoading])

    return {
        locations
    }
}

export default useGetLocation