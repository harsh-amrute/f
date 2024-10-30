import { useMutation, } from '@tanstack/react-query'
import { getLeadTimeData,getLeadTimeExcelData } from './api';

export const useGetLeadTimeData = () => {
    return useMutation(async (data: {graphflag: any, page?: number, appliedFilters?: any}) => {
        return getLeadTimeData(data.graphflag, data?.page, data?.appliedFilters);
    })
}

export const useGetLeadTimeExcelData = () => {
    return useMutation(async (params : any) => {
        return getLeadTimeExcelData(params);
    })
}