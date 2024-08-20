import { useMutation, } from '@tanstack/react-query'
import { LeadTimeService } from './api'

export const useGetLeadTimeData = () => {
    return useMutation(async (data: {graphFlag: any, page: number}) => {
        return LeadTimeService.getLeadTimeData(data.graphFlag, data.page);
    })
}
