import { MCGridService } from './api';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('Testing the MDMService', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...OLD_ENV }; // Make a copy of the environment variables
  });

  process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8082';
  process.env.REACT_APP_VF_MOCK_API_HOST = 'http://10.8.1.10:8081';

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('should make a POST request to api/ist/supply-chain-intelligence-hub/health-of-grid', async () => {
    const mockBody: any = {};
    await MCGridService.getGridHealth(mockBody);
  });

  describe('getRemovalData', () => {
    it('should make a POST request to the correct URL with default body and headers', async () => {
      const defaultBody = { fulfillment: 'incomplete', itr: 'high' };
      const mockResponse = { data: { result: 'success' } };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const response = await MCGridService.getRemovalData();

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_VF_MOCK_API_HOST}/api/ist/supply-chain-intelligence-hub/grid-details`,
        defaultBody,
        { headers: { 'Content-Type': 'application/json' } }
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
