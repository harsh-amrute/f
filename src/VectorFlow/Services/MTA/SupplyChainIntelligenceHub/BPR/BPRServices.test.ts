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
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8082';
    process.env.REACT_APP_VF_MOCK_API_HOST = 'http://10.8.1.10:8081'
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a Get request to /GetBPRUIConfig', async () => {
      mockedAxios.get.mockResolvedValueOnce(GetBPRUIConfigurationMockResponse);
      
      const response = await BPRService.getBPRUIConfiguration();
      expect(mockedAxios.get).toHaveBeenCalledWith('http://10.8.1.10:8082/GetBPRUIConfig',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a Post request to /GetBPRData', async () => {
        mockedAxios.post.mockResolvedValueOnce(GetBPRDataMockResponse);
        const mockBody:any = {
            "filters": [],
            "paginationParameter": {
                "pageNumber": 1,
                "recordsPerPage": 50
            }
        }
        const response = await BPRService.getBPRData(mockBody);
        // expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8081/GetBPRData',mockBody,{
        //   headers: { 'Content-Type': 'application/json' }
        // })
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
            remark:"Some remark",
            skucode:'4124',
            whcode:'dsaf'
        }
        const response = await BPRService.submitRemark(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/AddRemark',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });
      it('should make a Post request to /GetRemarkDetails', async () => {
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
        const response = await BPRService.getRemarkHistory({whcode:'fsaf',skucode:"fasf"});
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/GetRemarkDetails',{whcode:'fsaf',skucode:"fasf"},{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a request to /GetAllSKU',async()=>{
        const mockedResponse = {
          "recordCount": "200",
          "data": [
              {
                  "SKUCode": "ARES0798C004",
                  "SKUName": "AR CORE SHIRTS, 42"
              },
              {
                  "SKUCode": "ARES0439C002",
                  "SKUName": "AR CORE SHIRTS, 39"
              },
              {
                  "SKUCode": "ARES0439C007",
                  "SKUName": "AR CORE SHIRTS, 48"
              },
              {
                  "SKUCode": "AREK0295A008",
                  "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHI, XL"
              },
              {
                  "SKUCode": "AREK0292A006",
                  "SKUName": "ARROW-ARROW SPORT-MPO-MENS POLO TSHIR, M"
              }
          ],
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      }
      mockedAxios.get.mockResolvedValueOnce(mockedResponse)
      const response = await BPRService.getAllSKUs()
      expect(mockedAxios.get).toHaveBeenCalledWith('http://10.8.1.10:8082/SKUDesc',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200)
      })

      it('should make a Post request to /GetDailyData', async () => {
        const mockBody = {
           SKUCode:'ABCD123',
           WHCode:'3456'
        }
        await BPRService.getDailyData(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/DailyDataGraph',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
    
      });
      
      it('should make a Post request to /GetBPRDataCount', async () => {
        mockedAxios.post.mockResolvedValueOnce({
          "recordCount": '3124',
          "data": '',
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const mockBody = {
            id:1,
            name:'',
            fields:[],
            "filters": [],
            "paginationParameter": {
                "pageNumber": 1,
                "recordsPerPage": 50
            }
        }
        const response = await BPRService.getBPRDataCount(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/GetBPRDataCount',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to /SaveState', async () => {
        mockedAxios.post.mockResolvedValueOnce({
          "recordCount": null,
          "data": "2",
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const mockBody = {
          "reportname": "BPR",
          "state": "[{\"colId\":\"graph\",\"width\":40,\"hide\":true,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"tags\",\"width\":100,\"hide\":true,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUCode\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUName\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"WHCode\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"WHName\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"Norm\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"Stock\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"TechPen\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"TechColor\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"GIT\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"EcoPen\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"EcoColor\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"LocAttr2\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKULocAttr1\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr9\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr10\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr11\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr12\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr13\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"SKUAttr14\",\"width\":200,\"hide\":false,\"pinned\":null,\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"remarks\",\"width\":200,\"hide\":true,\"pinned\":\"right\",\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null},{\"colId\":\"rh\",\"width\":200,\"hide\":true,\"pinned\":\"right\",\"sort\":null,\"sortIndex\":null,\"aggFunc\":null,\"rowGroup\":false,\"rowGroupIndex\":null,\"pivot\":false,\"pivotIndex\":null,\"flex\":null}]"
      }
        const response = await BPRService.saveState(mockBody);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/SaveState',mockBody,{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });
      it('should make a Post request to /ResetState', async () => {
        mockedAxios.post.mockResolvedValueOnce({
          "recordCount": null,
          "data": "1",
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const response = await BPRService.resetState('BPR');
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/ResetState',"BPR",{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Post request to /GetState', async () => {
        mockedAxios.post.mockResolvedValueOnce({
          "recordCount": null,
          "data": "",
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const response = await BPRService.getState('BPR');
        expect(mockedAxios.post).toHaveBeenCalledWith('http://10.8.1.10:8082/GetState',"BPR",{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Get request to /GetInTransitWhereAboutAnalytics', async () => {
        mockedAxios.get.mockResolvedValueOnce({
          "recordCount": null,
          "data": "",
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const response = await BPRService.getInTransitWhereAboutAnalytics();
        expect(mockedAxios.get).toHaveBeenCalledWith('http://10.8.1.10:8082/GetInTransitWhereAboutAnalytics',{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

      it('should make a Get request to /OpenExpediteAnalytics', async () => {
        mockedAxios.get.mockResolvedValueOnce({
          "recordCount": null,
          "data": "",
          "status": 200,
          "msg": null,
          "errorCount": null,
          "error": null,
          "conflictErrorCount": null,
          "conflictError": null
      });
        const response = await BPRService.getOpenExpediteAnalytics();
        expect(mockedAxios.get).toHaveBeenCalledWith('http://10.8.1.10:8082/OpenExpediteAnalytics',{
          headers: { 'Content-Type': 'application/json' }
        })
        expect(response.status).toBe(200);
    
      });

  });