import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OTIFAanalysisService {

    export const getOTIFAnalysisData = async ({graphflag, page, appliedFilters}: any) => {
        if(graphflag){
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTIFAnalysisData/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params:{
                    graphflag
                }
            })
        }
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTIFAnalysisData/`, 
        appliedFilters,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            params:{
                graphflag,
                page
            }
        })
    }

}
