import { BPRService } from './api';
import axios,{AxiosStatic} from 'axios';
import { GetBPRDataMockResponse, GetBPRUIConfigurationMockResponse } from '../../../../../mock-data/BPR';


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
  
    it('should make a Get request to /GetBPRUIConfiguration', async () => {
      mockedAxios.get.mockResolvedValueOnce(GetBPRUIConfigurationMockResponse);
      
      const response = await BPRService.getBPRUIConfiguration();
      expect(mockedAxios.get).toHaveBeenCalledWith('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRUIConfiguration',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to /GetBPRData', async () => {
        mockedAxios.post.mockResolvedValueOnce(GetBPRDataMockResponse);
        const mockBody = {
            "filters": [],
            "paginationParameter": {
                "pageNumber": 1,
                "recordsPerPage": 50
            }
        }
        const response = await BPRService.getBPRData(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/GetBPRData',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
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
            remark:"Some remark"
        }
        const response = await BPRService.submitRemark({remark:'Some remark'});
        expect(mockedAxios.post).toHaveBeenCalledWith('https://c8a08519-dbab-4e46-a1d5-e76363b0d7c8.mock.pstmn.io/SubmitRemark',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });
      it('should make a Post request to /GetRemarkHistory', async () => {
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
        const mockBody = {
            "tags": "PIPO",
            "sc": "ARES0798C004",
            "sd": "AR CORE SHIRTS, 42",
            "norm": 3,
            "stock": 3,
            "etc": 0,
            "transit": [
                {
                    "lc": "USTSHC0054",
                    "cd": "Feb-23",
                    "slt": 2,
                    "tlt": 2,
                    "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                },
                {
                    "lc": "ARGT6025A",
                    "cd": "Nov-22",
                    "slt": 2,
                    "tlt": 2,
                    "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                },
                {
                    "lc": "ARGT6005AB",
                    "cd": "Nov-22",
                    "slt": 2,
                    "tlt": 2,
                    "remarks": "Testing to be done fro bpr, for POC which will enable us to proceed with BPR"
                }
            ]
        }
        const response = await BPRService.getRemarkHistory(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('https://requestly.tech/api/mockv2/GetRemarkHistory?rq_uid=cbmPNOZG8RVVRE3DQJ8t0mWWQ9y1',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

  });