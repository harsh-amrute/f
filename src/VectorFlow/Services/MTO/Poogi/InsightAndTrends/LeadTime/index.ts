import { useMutation, } from '@tanstack/react-query'
import { getLeadTimeData } from './api';

export const useGetLeadTimeData = () => {
    return useMutation(async (data: {graphFlag: any, page?: number}) => {
        return getLeadTimeData(data.graphFlag, data?.page);
    })
}
