/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace BTRService{
    export const getBTRData = async () => {
        return await axios.post(process.env.REACT_APP_VF_MOCK_API_HOST + `/getBTRData`,{},{
          headers:{ 'Content-Type': 'application/json' }
        });
      }
}