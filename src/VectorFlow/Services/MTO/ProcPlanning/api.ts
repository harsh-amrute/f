/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios'
import { ColumnHeaderConfigDataPayload } from '../../../../VectorFlow/types/ColumnHeaderConfig';


export namespace ProcPlanningService {

    export const GetProcPlanningData = async (date: string) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getProcPlanningData/?releaseDate=${date}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }


}


