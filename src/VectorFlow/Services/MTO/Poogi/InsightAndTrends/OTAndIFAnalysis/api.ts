import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OTAndIFAanalysisService {

    export const getOTAndIFAnalysisData = async ({graphflag, page, appliedFilters}: any) => {
        if(graphflag){
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTandIFAnalysisData/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params:{
                    graphflag,
                }
            })
        }
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOTandIFAnalysisData/`, 
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
