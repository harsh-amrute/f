import axios from 'axios';
import { ProcPlanningService } from './api';

jest.mock('axios');

describe('ProcPlanningService', () => {
    const mockDate = '2024-06-01';
    const pageNum = '1';
    const mockResponse = {
        data: {
            results: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ]
        }
    };

    beforeEach(() => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse);
        jest.spyOn(axios, 'patch').mockResolvedValueOnce(mockResponse);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fetch procurement planning data correctly', async () => {
        const response = await ProcPlanningService.GetProcPlanningData(mockDate, pageNum);

        expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_VF_API_HOST_MTO}/getProcPlanningData/?releaseDate=${mockDate}&?page=${pageNum}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        expect(response).toEqual(mockResponse);
    });

    it('should fetch procurement data after simulation correctly', async () => {
        const response = await ProcPlanningService.GetProcDataAfterSimulation(mockDate);

        expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_VF_API_HOST_MTO}/getProdDataAfterSimulation/?releaseDate=${mockDate}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        expect(response).toEqual(mockResponse);
    });

    it('should update batchwise component allocation at simulation correctly', async () => {
        const requestBody = [
            { sno: '1', on: 'ON-001', lid: '1', item: 'Item 1', easa: 100 },
            { sno: '2', on: 'ON-002', lid: '2', item: 'Item 2', easa: 200 }
        ];

        const response = await ProcPlanningService.UpdateBatchWiseCompAllSimulation(requestBody);

        expect(axios.patch).toHaveBeenCalledWith(`${process.env.REACT_APP_VF_API_HOST_MTO}/updateBatchwiseCompAllocAtSimulation/`, JSON.stringify(requestBody), {
            headers: { 'Content-Type': 'application/json' }
        });

        expect(response).toEqual(mockResponse);
    });

    // it('should update the proucurement simulation data', async () => {
    //     const requestBody = {
    //         "username": "user2",
    //         "stock": [
    //             {
    //                 "ic": "RM1",
    //                 "as": 100
    //             },
    //             {
    //                 "ic": "RM2",
    //                 "as": 51
    //             },
    //             {
    //                 "ic": "RM3",
    //                 "as": 300
    //             }
    //         ]
    //     }

    //     const response = await ProcPlanningService.UpdateProcurementSimulationData(requestBody);

    //     expect(axios.put).toHaveBeenCalledWith(`${process.env.REACT_APP_VF_API_HOST_MTO}/UpdateProcurementSimulationData/`, JSON.stringify(requestBody), {
    //         headers: { 'Content-Type': 'application/json' }
    //     });

    //     expect(response).toEqual(mockResponse);

    // })


});
