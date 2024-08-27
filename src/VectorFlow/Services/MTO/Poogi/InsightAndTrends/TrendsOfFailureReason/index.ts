import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { TrendsFailureReasonsService } from './api'

export const useTopFailureReasonData = () => {
    return useMutation(async () => {
        return TrendsFailureReasonsService.getTrendsFailureData();
    })
}
