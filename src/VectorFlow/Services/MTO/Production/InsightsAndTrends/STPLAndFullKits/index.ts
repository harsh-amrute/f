import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { STPLAndFullKitService } from './api'

export const useGetSTPLAndFullKitData = () => {
    return useMutation(async (graphFlag: any) => {
        return STPLAndFullKitService.getSTPLandFullkitInDaysData(graphFlag);
    })
}
