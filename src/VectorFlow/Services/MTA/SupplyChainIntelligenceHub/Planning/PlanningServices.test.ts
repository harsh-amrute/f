import { PlanningService } from './api';
import axios,{AxiosStatic} from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('Testing the MDMService',  () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8888';
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a Post request to the /getPlanningDataCount', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const mockBody = {
        filters:[]
      }
      const response = await PlanningService.getPlanningDataCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetPlanningDataCount',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to the /getPlanningDataGraph', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
          filters:[]
        }
        const response = await PlanningService.getPlanningDataGraph(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetPlanningDataGraph',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

    
   

   

  });