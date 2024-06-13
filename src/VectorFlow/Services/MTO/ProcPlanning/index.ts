import { useMutation } from '@tanstack/react-query'

import { ProcPlanningService } from './api'

export const QUERY_KEYS = {
    userGetProcPlanningData: ['ProcPlanningService.userGetProcPlanningData'],
    userGetProcAfterSimulationPlanningData: ['ProcPlanningService.userGetProcAfterSimulationPlanningData'],
    UpdateBatchWiseCompAllSimulation: ['ProcPlanningService.UpdateBatchWiseCompAllSimulation']
}
export const userGetProcPlanningData = () => {
    return useMutation(async (date: string) => {
        return await ProcPlanningService.GetProcPlanningData(date);
    });
}

export const userGetProcAfterSimulationPlanningData = () => {
    return useMutation(async (date: string) => {
        return await ProcPlanningService.GetProcDataAfterSimulation(date);
    });
}

// export const UpdateBatchWiseCompAllSimulation = () => {
//     return useMutation(QUERY_KEYS.UpdateBatchWiseCompAllSimulation, async (data: [{ sno: number, on: string, lid: string, item: string, easa: number }]) => {
//         return await ProcPlanningService.UpdateBatchWiseCompAllSimulation(data);
//     })
// }
// type SimulationData = { sno: number, on: string, lid: string, item: string, easa: number };

// export const UpdateBatchWiseCompAllSimulation = () => {
//     return useMutation<any, Error, SimulationData[]>(
//         QUERY_KEYS.UpdateBatchWiseCompAllSimulation,
//         async (data: SimulationData[]) => {
//             return await ProcPlanningService.UpdateBatchWiseCompAllSimulation(data);
//         }
//     );
// }

export const UpdateBatchWiseCompAllSimulation = () => {
    return useMutation(async (body: any) => {
        return await ProcPlanningService.UpdateBatchWiseCompAllSimulation(body)
    })
}



