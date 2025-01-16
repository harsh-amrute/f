
import {useEffect, useState} from 'react'
import { useGetLastRunDate } from "../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"


const useGetlastRunData = ()=>{
   
    const {mutateAsync:getLastRunDate} = useGetLastRunDate()

    const [lastRunDate,setLastRunDate] = useState<string >("Loading")

   useEffect(()=>{
        (async()=>{
            try{
                const {data} = await getLastRunDate()
                setLastRunDate(data?.data[0].formatted)
            }catch(err){
                console.error(err)
                setLastRunDate('Date Unavailable')
            }
        })()
   },[])


    return {
        date:lastRunDate
    }
        
}

export default useGetlastRunData