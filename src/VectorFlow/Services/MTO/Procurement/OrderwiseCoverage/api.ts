import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderwiseCoverageService {
    export const getOrderwiseCoverageData = async ({page, graph, appliedFilters}: { page?: number, graph: number, appliedFilters?: any }) => {

        if(graph){
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getRMPMCoverageData/`, {
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
                },
                params: {
                    graphflag: graph
                }
            })
        }
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getRMPMCoverageData/`, 
        appliedFilters,
        {
    
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            },
            params: {
                page,
                graphflag: graph
            }
        })
    }

}
