
import { OrderReschedulingService } from './api';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('OrderRescheduling', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });
    process.env.REACT_APP_VF_API_HOST_MTO = 'http://10.8.1.10:9000'

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should fetch rm and supplier data', async () => {

        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await OrderReschedulingService.getOrderReschedulingData();
        expect(response.status).toBe(200);
    });



    it('should fetch Material Requirement Cumulative', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const mockData = [
            {
                "unm": "Admin",
                "isUnSch": 1,
                "ordData": [
                    {
                        "ok": "string",
                        "r": "string"
                    }
                ]
            }
        ]
        const response = await OrderReschedulingService.putUpdateOrderDueDate(mockData);
        expect(response).toBe(undefined);
    });


});