import { MDMService } from './api';
import axios,{AxiosResponse,AxiosStatic} from 'axios';


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
  });