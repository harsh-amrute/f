import { useMutation, } from '@tanstack/react-query'
import { getElapsedDaysforDeptPlantData, getElapsedTimeData } from './api';


export const useGetElapsedTimeData = () => {
    return useMutation(async (data: {graphFlag: any, page?: number}) => {
        return getElapsedTimeData(data.graphFlag, data?.page);
    })
}


export const useGetElapsedDaysforDeptPlantData = () => {
    return useMutation(async (data: {plant: number, dept: number}) => {
        return getElapsedDaysforDeptPlantData(data.plant, data?.dept);
    })
}


