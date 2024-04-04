import { BufferTrendsService } from "./api";
import axios,{AxiosStatic} from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe ("buffer trends services",()=>{
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8888';
    process.env.REACT_APP_VF_MOCK_API_HOST='http://10.8.1.10:8081'
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should make a Post request to the /getBTGData', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
            category:"Absolute",
            type:"technicalView",
          filters:[]
        }
        const response = await BufferTrendsService.getBufferTrendsGraph(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_MOCK_API_HOST + '/getBTGData',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });
})
