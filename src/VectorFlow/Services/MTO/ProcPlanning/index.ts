import { useQuery, useMutation } from '@tanstack/react-query'
import { ColumnHeaderConfigDataPayload } from '../../../../VectorFlow/types/ColumnHeaderConfig';

import { ProcPlanningService } from './api'


export const QUERY_KEYS = {
    userGetProcPlanningData: ['ProcPlanningService.userGetProcPlanningData'],
}
export const userGetProcPlanningData = () => {
    return useMutation(async (date: string) => {
        return await ProcPlanningService.GetProcPlanningData(date);
    });
}



