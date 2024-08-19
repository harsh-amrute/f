import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FullKitAssignmentService {
    export const getFullKitAssignmentDataWithGraphData = async (is_fullkit: boolean, load_data_after_simulation: boolean, load_graph_data: boolean, page: number) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getFullKitAssignmentDataWithGraphData/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params:{
                is_fullkit,
                load_data_after_simulation,
                load_graph_data,
                page
            }
        })
    }
}
