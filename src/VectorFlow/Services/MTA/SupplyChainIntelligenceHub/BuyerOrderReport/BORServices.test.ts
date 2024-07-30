import {SupplyChainIntelligenceHubService} from './api';
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
  
    it('should make a Post request to the /getBORDataCount', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const mockBody = {
        filters:[],
        paginationParameter:{ pageNumber:1,recordsPerPage:10}
      }
      const response = await SupplyChainIntelligenceHubService.getBORDataCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/BORDataCount',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to the /BORData', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
           filters:[],
        paginationParameter:{ pageNumber:1,recordsPerPage:10}
        }
        const response = await SupplyChainIntelligenceHubService.getBORData(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/BORData',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      }); 


        it('should make a get request to the /getBORUIConfiguration', async () => {
        mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
        
        const response = await SupplyChainIntelligenceHubService.getBORUIConfiguration();
        expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/BORUIConfig')
        expect(response.status).toBe(200);
    
      }); 

      it('should make a get request to the /BORAnalytics', async () => {
        mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
        
        const response = await SupplyChainIntelligenceHubService.getBORAnalyticsData();
        expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/BORAnalytics',{"headers": {"Content-Type": "application/json"}})
        expect(response.status).toBe(200);
    
      });

  });

