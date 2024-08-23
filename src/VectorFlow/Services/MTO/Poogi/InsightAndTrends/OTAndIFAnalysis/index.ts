import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { OTAndIFAanalysisService } from './api'

export const useGetOTAndIFAnalysisData = () => {
    return useMutation(async (params: any) => {
        return OTAndIFAanalysisService.getOTAndIFAnalysisData(params);
    })
}
