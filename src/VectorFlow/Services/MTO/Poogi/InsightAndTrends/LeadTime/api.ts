import axios from "axios"

export namespace LeadTimeService {

    export const getLeadTimeData = async (graphFlag: number, page: number) => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getLeadTimeData/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params:{
                graphflag: graphFlag,
                page
            }
        })
    }

}
