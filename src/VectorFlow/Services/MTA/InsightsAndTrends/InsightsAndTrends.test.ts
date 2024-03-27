import {InsightsAndTrendsService} from './api';
import axios,{AxiosStatic} from 'axios';
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
  
    it('should make a get request to the /AvailabilityTrend', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getAvaialabilityTrend();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/AvailabilityTrend',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

   it('should make a get request to the /ChronicUnavailabilityLoc', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getChronicUnavailabilityLoc();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilityLoc',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

       it('should make a get request to the /ChronicUnavailabilitySku', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getChronicUnavailabilitySku();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilitySku',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

     it('should make a get request to the /AvailabilityAgeing', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getAvailabilityAgeing();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/AvailabilityAgeing',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a get request to the /DBMNormSuggestionLoc', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionLoc();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionLoc',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

     it('should make a get request to the /DBMNormSuggestionPie', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionPie();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionPie',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

      it('should make a get request to the /DBMNormSuggestionSKUs', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionSKUs();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionSKUs',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
     it('should make a get request to the /DBMNormSuggestionAgeing', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getDBMNormSuggestionAgeing();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/DBMNormSuggestionAgeing',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
    it('should make a get request to the /ExcessInventorySku', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getExcessInventorySku();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ExcessInventorySku',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a get request to the /ExcessInventoryValue', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getExcessInventoryValue();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ExcessInventoryValue',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
    it('should make a get request to the /ChronicUnavailabilityGridViewData', async () => {
      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await InsightsAndTrendsService.getChronicUnavailabilityGridView();
      expect(mockedAxios.get).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/ChronicUnavailabilityGridViewData',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
  });

