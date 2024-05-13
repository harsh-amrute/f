import {useMutation } from '@tanstack/react-query'
import { InTransitWhereAboutsService } from './api'


export const QUERY_KEYS = {
 
}

export const useGetInTransitWhereAboutsDataCount = () => {
  return useMutation(async () => {
    return await InTransitWhereAboutsService.getInTransitWhereAboutsDataCount()
  });
}

export const useGetInTransitWhereAboutsData = () => {
  return useMutation(async (body:{pageNumber:number,recordsPerPage:number}) => {
    return await InTransitWhereAboutsService.getInTransitWhereAboutsData(body)
  });
}

