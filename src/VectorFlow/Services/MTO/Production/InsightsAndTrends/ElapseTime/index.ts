import { useMutation, } from '@tanstack/react-query'
import { getElapsedDaysforDeptPlantData, getElapsedTimeData } from './api';


export const useGetElapsedTimeData = () => {
    return useMutation(async (params: {graphflag: any, page?: number, appliedFilters?: any}) => {
        return getElapsedTimeData(params);
    })
}


export const useGetElapsedDaysforDeptPlantData = () => {
    return useMutation(async (data: {plant: number, dept: number}) => {
        return getElapsedDaysforDeptPlantData(data.plant, data?.dept);
    })
}


