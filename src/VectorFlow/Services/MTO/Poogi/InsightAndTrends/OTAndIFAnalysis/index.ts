import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OTAndIFAanalysisService } from './api'

export const useGetOTAndIFAnalysisData = () => {
    return useMutation(async (graphFlag: any) => {
        return OTAndIFAanalysisService.getOTAndIFAnalysisData(graphFlag);
    })
}
