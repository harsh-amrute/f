
import { DynamicReleaseManagementService } from './api';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('Dynamic Release Service', () => {
    const OLD_ENV = process.env;
    const dummyData = {
        "routeData": {
            "orders": [
                {
                    "route": "string",
                    "ok": "string",
                    "ccrdetails": [
                        {
                            "ccrid": 0,
                            "ccrgrp": 0,
                            "pcQty": 0,
                            "pos": "string",
                            "ol": "string"
                        }
                    ]
                }
            ]
        }
    }
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
    });
    process.env.REACT_APP_VF_API_HOST_MTO = 'http://10.8.1.10:9000'

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get orders for DRM for Order for table', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.getDynamicReleaseData({ graph: 0, ao: 0, page: 1 });
        expect(response.status).toBe(200);
    });
    it('should get orders for DRM for Order for graph', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.getDynamicReleaseData({ graph: 1, ao: 0, page: 1 });
        expect(response.status).toBe(200);
    });
    it('should get orders for DRM for Order for graph', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.getDynamicReleaseData({ graph: 1, ao: 0, page: 2 });
        expect(response.status).toBe(200);
    });
    it('should get orders for DRM for All Order for graph', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.getDynamicReleaseData({ graph: 1, ao: 1, page: 1 });
        expect(response.status).toBe(200);
    });

    it('should save the route', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.saveRouteData(dummyData);
        expect(response).toBe(undefined);
    });

    const dummyRelaseData = [
        "ord 024_1"
    ]

    it('should release the selected orders', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: 'test', status: 200 });
        const response = await DynamicReleaseManagementService.updateDynamicReleaseData(dummyRelaseData);
        expect(response).toBe(undefined);
    });



});