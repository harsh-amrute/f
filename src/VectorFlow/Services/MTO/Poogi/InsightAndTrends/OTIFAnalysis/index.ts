import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OTIFAanalysisService } from './api'

export const useGetOTIFAnalysisData = () => {
    return useMutation(async (graphFlag: any) => {
        return OTIFAanalysisService.getOTIFAnalysisData(graphFlag);
    })
}
