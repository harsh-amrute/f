import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderwiseCoverageService {
    export const getOrderwiseCoverageData = async (props: { page: number, graph: number }) => {

        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getRMPMCoverageData/`, {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params: {
                page: props.page,
                graphflag: props.graph
            }
        })
    }

}
