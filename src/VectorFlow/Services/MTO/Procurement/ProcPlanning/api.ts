/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'

export namespace ProcPlanningService {

    export const GetProcPlanningData = async (date: string, pageNum: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getProcPlanningData/?releaseDate=${date}&page=${pageNum}&ca=1`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    export const GetProcDataAfterSimulation = async (date: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getProdDataAfterSimulation/?releaseDate=${date}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    export const UpdateBatchWiseCompAllSimulation = async (body: any) => {
        return await axios.patch(process.env.REACT_APP_VF_API_HOST_MTO + `/updateBatchwiseCompAllocAtSimulation/`, JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    export const UpdateProcurementSimulationData = async (body: any) => {
        return await axios.post(process.env.REACT_APP_VF_API_HOST_MTO + `/updateProcurementPlanningSimulatedQty/`, JSON.stringify(body), {
            headers: { 'Content-Type': 'application/json' }
        })
    }

}


