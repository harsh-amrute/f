import { MDMService } from './api';
import axios,{AxiosStatic} from 'axios';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('Testing the MDMService',  () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV }; // Make a copy
    });
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8888/';
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a GET request to the /GetMasterUIConfiguration', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getMasterUIConfiguration();
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`)
      expect(response.status).toBe(200);
  
    });

    
    it('should make a post request to the /get-master-data', async () => {

      const mockBody = {
        id:1,
        name:"SKU",
        filters:[{attributeName:"SKU",op:'=',value:""}],
        fields:[{key:"SKU"}],
        paginationParameter:{
          pageNumber:1,
          recordsPerPage:10
        }
      }

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getMasterData(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetMasterData',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a post request to the /GetCount', async () => {

      const mockBody = {
        id:1,
        name:"SKU",
        filters:[{attributeName:"SKU",op:'=',value:""}],
        fields:[{key:"SKU"}],
      }

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetCount',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
  });