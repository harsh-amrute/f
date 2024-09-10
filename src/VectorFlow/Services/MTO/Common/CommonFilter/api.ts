import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FilterDataService {
    
    export const getFilterData = async (page_type?: any) => {
        const response = await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getfilterData/?page_type=${page_type}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(response, 'Filter Response');
        return response;
    }
}
