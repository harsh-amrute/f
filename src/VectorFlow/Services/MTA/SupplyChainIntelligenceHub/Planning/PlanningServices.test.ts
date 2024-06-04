import { PlanningService } from './api';
import axios,{AxiosStatic} from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('Testing the Planning Service',  () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8082';
    process.env.REACT_APP_VF_MOCK_API_HOST='http://10.8.1.10:8081'
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a Post request to the /getPlanningDataCount', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const mockBody = {
        filters:[]
      }
      const response = await PlanningService.getPlanningDataCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetPlanningDataCount',mockBody,{
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
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetPlanningDataGraph',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to the /getPlanningDataGrid', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
          filters:[]
        }
        const response = await PlanningService.getPlanningDataGrid(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetPlanningDataGrid',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to the /getPlanningDataCustom', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
          filters:[]
        }
        const response = await PlanningService.getPlanningDataCustom(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetPlanningDataCustom',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to the /SubmitOpenExpediteRequest', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
          remark:'',
          skucode:'',
          whcode:''
        }
        const response = await PlanningService.submitOpenExpediteRequest(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/SubmitOpenExpediteRequest',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });
    
   
      it('should make a Post request to the /GetPlanningDataGridCount', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
        const mockBody = {
          remark:'',
          skucode:'',
          whcode:''
        }
        const response = await PlanningService.getPlanningDataGridCount(mockBody);
        expect(response.status).toBe(200);
    
      });
   

  });