import {InsightsAndTrendsService} from './api';
import axios,{AxiosStatic} from 'axios';
import { any } from 'joi';
jest.mock('axios');
const mockedAxios=axios as jest.Mocked<AxiosStatic>;
describe('Testing the GuidedInsightsService',  () => {
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
  
    it('should make a post request to the /AvailabilityTrend', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getAvaialabilityTrend({horison:9});
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/AvailabilityTrend',{horison:9},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

   it('should make a get request to the /ChronicUnavailabilityLoc', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getChronicUnavailabilityLoc();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilityLoc',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

       it('should make a get request to the /ChronicUnavailabilitySku', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getChronicUnavailabilitySku();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilitySku',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

     it('should make a get request to the /AvailabilityAgeing', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getAvailabilityAgeing({horison:9});
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/AvailabilityAgeing',{horison:9},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a get request to the /DBMNormSuggestionLoc', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionLoc();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionLoc',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

     it('should make a get request to the /DBMNormSuggestionPie', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionPie();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionPie',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

      it('should make a get request to the /DBMNormSuggestionSKUs', async () => {
        mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});

      const response = await InsightsAndTrendsService.getDBMNormSuggestionSKUs();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionSKUs',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
     it('should make a get request to the /DBMNormSuggestionAgeing', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});

   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionAgeing();
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionAgeing',{body:any},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200)
  
    })
   
    it('should make a post request to the /ExcessInventorySku', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getExcessInventorySku({horison:9});
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ExcessInventorySku',{horison:9},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a post request to the /ExcessInventoryValue', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getExcessInventoryValue({horison:9});
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ExcessInventoryValue',{horison:9},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
    it('should make a get request to the /ChronicUnavailabilityGridViewData', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      await InsightsAndTrendsService.getChronicUnavailabilityGridView({});
      // expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilityGridViewData',{
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // expect(response.status).toBe(200);
  
    });
  });

