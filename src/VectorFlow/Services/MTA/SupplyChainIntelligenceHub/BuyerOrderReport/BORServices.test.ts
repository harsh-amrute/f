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

      it('should make a Post request to /SubmitRemark', async () => {
        mockedAxios.post.mockResolvedValueOnce({
            "recordCount": "10",
            "data": [],
            "status": 200,
            "msg": "Remark Submitted Successfully",
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        });
        const mockBody = {
          data:[{
            remark:"Some remark",
            skucode:'4124',
            whcode:'dsaf',
            spc:'1234',
        }]
        }
        const response = await SupplyChainIntelligenceHubService.submitBORRemark(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/AddBORRemark',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to /GetBORRemarkDetails', async () => {
        mockedAxios.post.mockResolvedValueOnce(
          {
            "recordCount": "10",
            "data": [
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                },
                {
                    "author": "Akash Shewale",
                    "date": "2023-10-20 10:20:12 am",
                    "remark": "The SKU is having trouble with the order delivery please help us with suitable actions"
                }
            ],
            "status": 200,
            "msg": null,
            "errorCount": null,
            "error": null,
            "conflictErrorCount": null,
            "conflictError": null
        });
        const response = await SupplyChainIntelligenceHubService.getBORRemarkHistory({whcode:'fsaf',skucode:"fasf"});
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/GetBORRemarkDetails',{whcode:'fsaf',skucode:"fasf"},{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

  });

