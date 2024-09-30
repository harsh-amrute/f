import { useMutation } from '@tanstack/react-query'
import { MerchandisingGridPayload } from '../../../../../VectorFlow/types/BPR';

import { MCGridService } from './api'


export const QUERY_KEYS = {

}
 


export const useGetGridHealth = () => {
return useMutation(async (payload:any) => {
    return await MCGridService.getGridHealth(payload);
});

}


export const useGetRemovalData = ()=>{
    return useMutation( async (body:MerchandisingGridPayload = {
         fulfillment:"incomplete",
         itr:"high"
   }) =>{
     return await MCGridService.getRemovalData(body)
    } ) ;
 }
 