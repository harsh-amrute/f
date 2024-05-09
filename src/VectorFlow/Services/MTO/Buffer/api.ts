/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';

export namespace BufferService{
    export const getBufferData = async (screenType:string) => {
        return await axios.post(`/GetMasterUIConfiguration`,{screenType:screenType});
      }
}