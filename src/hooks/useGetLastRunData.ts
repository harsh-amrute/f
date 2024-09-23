import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"
import {format} from 'date-fns'

import {useMemo} from 'react'
import { useGetlastRunDate } from "../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"


const useGetlastRunData = ()=>{
   
    const {data,isLoading,isError} = useGetlastRunDate()

    const formattedLastRunDate = useMemo(()=>{
        const runDate = data?.data?.data
        if(runDate && Array.isArray(runDate) &&runDate.length>0)return runDate[0].formatted
        return '-'
    },[data])


    return {
        date:formattedLastRunDate
    }
        
}

export default useGetlastRunData