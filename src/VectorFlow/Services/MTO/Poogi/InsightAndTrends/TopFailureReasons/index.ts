import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { TopFailureReasonsService } from './api'

export const useTopFailureData = () => {
    return useMutation(async (graphFlag: any) => {
        return TopFailureReasonsService.getTopFailureData(graphFlag);
    })
}
