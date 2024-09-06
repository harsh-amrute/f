import { useMutation, useQuery } from "@tanstack/react-query"
import { useQueries } from "react-query"
import { MerchandisingGrid } from "./api"
import { MerchandisingGridPayload } from "../../../../../VectorFlow/types/BPR";




export const QUERY_KEYS = {
    useGetSurplusRemovalData:['MerchendisingGrid.getSurplusRemovalData']
}

export const useGetRemovalData = ()=>{
   return useMutation( async (body:MerchandisingGridPayload = {
        fulfillment:"incomplete",
        itr:"high"
  }) =>{
    return await MerchandisingGrid.getRemovalData(body)
   } ) ;
}

 