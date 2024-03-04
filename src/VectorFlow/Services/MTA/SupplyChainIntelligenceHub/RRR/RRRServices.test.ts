import {RRRServices} from './api';
import axios,{AxiosStatic} from 'axios';
jest.mock('axios');
const mockedAxios=axios as jest.Mocked<AxiosStatic>;
describe('Testing the BORService',  () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  process.env.REACT_APP_VF_API_HOST ='http://10.8.1.10:8082';
  //  process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8888';
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a Post request to the /getRRRUIConfiguration', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await RRRServices.getRRRUIConfiguration();
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to the /getRRRData', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
           filters:[],
          paginationParameter:{ pageNumber:1,recordsPerPage:10}
        }
        const response = await RRRServices.getRRRData(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/RRRData',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      }); 

      it('should make a Post request to the /getRRRDataCount', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
           filters:[],
          paginationParameter:{ pageNumber:1,recordsPerPage:10}
        }
        const response = await RRRServices.getRRRDataCount(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/RRRDataCount',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      }); 


      

  });

