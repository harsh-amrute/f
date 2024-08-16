import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FullKitAssignmentService {
    export const getFullKitAssignmentDataWithGraphData = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getFullKitAssignmentDataWithGraphData/`, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params:{
                is_fullkit: false,
                load_data_after_simulation: false,
                load_graph_data: false
            }
        })
    }
}
