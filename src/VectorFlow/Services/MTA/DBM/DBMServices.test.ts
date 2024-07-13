import {DBMServices} from './api';
import axios,{AxiosStatic} from 'axios';
jest.mock('axios');
const mockedAxios=axios as jest.Mocked<AxiosStatic>;
describe('Testing the DBMService',  () => {
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
  
    it('should make a Post request to the /DBMDataCount', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const mockBody = {
        filters:[],
        paginationParameter:{ pageNumber:1,recordsPerPage:10}
      }
      const response = await DBMServices.getDBMDataCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMDataCount',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to the /DBMData', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
           filters:[],
        paginationParameter:{ pageNumber:1,recordsPerPage:10}
        }
        const response = await DBMServices.getDBMData(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMData',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      }); 


        it('should make a get request to the /DBMUIConfig', async () => {
        mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
        
        const response = await DBMServices.getDBMUIConfig();
        expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMUIConfig')
        expect(response.status).toBe(200);
    
      }); 

      it('should make a Post request to the /DBMApplySelectedNorms', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
        data:[], 
        paginationParameter:{ pageNumber:1,recordsPerPage:10},
        filters:[]
        }
        const response = await DBMServices.getDBMApplySelectedNorm(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMApplySelectedNorms',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to the /DBMUpdateSleepTbl', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
        data:{ SKUCode:"",WHCode:""}
        }
        const response = await DBMServices.getDBMUpdateSleepTbl(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMUpdateSleepTbl',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to the /DBMAnalytics', async () => {
        mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
        const response = await DBMServices.getDBMAnalyticsData();
        expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMAnalytics',{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

  });

