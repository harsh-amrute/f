import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace STPLAndFullKitService {

    export const getSTPLandFullkitInDaysData = async ({ graphflag, page, appliedFilters }: { graphflag: number, page?: number, appliedFilters?: any }) => {
        if(graphflag){
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getSTPLandFullkitInDaysData/?graphflag=${graphflag}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getSTPLandFullkitInDaysData/?graphflag=${graphflag}&page=${page}`, 
        appliedFilters,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

}
