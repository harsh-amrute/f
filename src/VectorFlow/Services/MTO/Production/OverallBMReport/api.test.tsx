
import { OverallBMReportService } from './api';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('MaterialRequirement', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });
    process.env.REACT_APP_VF_API_HOST_MTO = 'http://10.8.1.10:8000'

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should fetch the initial data', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        //const data = {  curr: Number(1) };
        const response = await OverallBMReportService.getOverallBMReportData(0);
        expect(response.status).toBe(200);
    });

})