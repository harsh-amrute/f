import { useMutation } from '@tanstack/react-query'

import { ProcPlanningService } from './api'

export const QUERY_KEYS = {
    userGetProcPlanningData: ['ProcPlanningService.userGetProcPlanningData'],
    userGetProcAfterSimulationPlanningData: ['ProcPlanningService.userGetProcAfterSimulationPlanningData'],
    UpdateBatchWiseCompAllSimulation: ['ProcPlanningService.UpdateBatchWiseCompAllSimulation']
}
export const userGetProcPlanningData = () => {
    return useMutation(async (data: { date: string, pageNum: string }) => {
        return await ProcPlanningService.GetProcPlanningData(data.date, data.pageNum);
    });
}

export const userGetProcAfterSimulationPlanningData = () => {
    return useMutation(async (date: string) => {
        return await ProcPlanningService.GetProcDataAfterSimulation(date);
    });
}

export const UpdateBatchWiseCompAllSimulation = () => {
    return useMutation(async (body: any) => {
        return await ProcPlanningService.UpdateBatchWiseCompAllSimulation(body)
    })
}

export const putUpdateProcurementSimulationData = () => {
    return useMutation(async (body: any) => {
        return await ProcPlanningService.UpdateProcurementSimulationData(body);
    })
}


