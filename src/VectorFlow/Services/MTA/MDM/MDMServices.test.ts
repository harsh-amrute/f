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
  
    process.env.REACT_APP_VF_API_HOST = 'http://10.8.1.10:8888';
    process.env.REACT_APP_API_HOST = 'http://10.8.1.10:8888/'
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should make a Post request to the /GetMasterUIConfiguration', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getMasterUIConfiguration('add');
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetMasterUIConfiguration`,{screenType:'add'})
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

    it('should make a post request to the /get-master-data (Retail)', async () => {

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
      const response = await MDMService.getMasterDataRetail(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `/api/validate-master/get-master-data/`,mockBody,{
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

    it('should make a post request to the /GetCount (Retail)', async () => {

      const mockBody = {
        id:1,
        name:"SKU",
        filters:[{attributeName:"SKU",op:'=',value:""}],
        fields:[{key:"SKU"}],
      }

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getRetailCount(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `/api/validate-master/get-count/`,mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make a get request to the /allDrafts', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getAllDrafts();
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/allDrafts',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);

    });

    it('should make a get request to the /draftCount/${id}', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getDraftCount('2');
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/draftCount/2',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);

    });

    it('should make get request to /draft/${id}', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getDraftById('2',{
        pageNumber:1,
        recordsPerPage:10
      });
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/draft/2',{
        pageNumber:1,
        recordsPerPage:10
      },{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });
    
    it('should make a post request to the /draft for creating new draft', async () => {

      const mockBody = {
       instanceName:'SKU SKULOCATION LOCATION',
       searchKey:"SKU Master",
       draftData:[
        {
          masterId:1,
          status:0,
          gridState:"",
          dataMaster:[
            {
              SKU:"QAAAA1234",
              WEIGTH:"34",
              c1:"90"
            }
          ]
        }
       ]
      }

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:201});
      const response = await MDMService.createDraft(mockBody);
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/draft',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(201);
  
    });

    it('should make a put request to the /draft for modifying draft', async () => {

      const mockBody = {
       draftId:'rnt-12',
       instanceName:'SKU SKULOCATION LOCATION',
       searchKey:"SKU Master",
       draftData:[
        {
          masterId:1,
          status:0,
          gridState:"",
          dataMaster:[
            {
              SKU:"QAAAA1234",
              WEIGTH:"34",
              c1:"90"
            }
          ]
        }
       ]
      }

      mockedAxios.put.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.modifyDraft(mockBody);
      expect(mockedAxios.put).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/draft',mockBody,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make delete request to /draft/${id}', async () => {

      mockedAxios.delete.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.deleteDraft('2');
      expect(mockedAxios.delete).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/draft/2',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make get request to /GetTaskPendingForReviewData', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getPendingTasks()
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetTaskPendingForReviewData`,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
    });

    it('should make a get request to the /draftCount/${id}', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getTaskCount('2');
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/GetTaskCount/2',{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);

    });

    it('should make get request to /GetTaskDetails', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getTaskDetails({
        taskId:'1_202312061821491222',
        paginationParameter:{
          pageNumber:1,
          recordsPerPage:100
        }
      })
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetails`,{
        taskId:'1_202312061821491222',
        paginationParameter:{
          pageNumber:1,
          recordsPerPage:100
        }
      },{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
    });

    it('should make get request to /GetTaskStatusData', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getTaskStatusData()
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetTaskStatusData`,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
    });


    it('should make post request to /GetTaskDetailsDownloadData', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getTaskDetailsDownloadData({taskId:'1_20231207113620',approverId:1})
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetTaskDetailsDownloadData`,JSON.stringify({taskId:'1_20231207113620',approverId:1}),{
      headers: { 'Content-Type': 'application/json' }
    })
      expect(response.status).toBe(200);
    });

    it('should make delete request to /DeleteTask/${id}', async () => {

      mockedAxios.delete.mockResolvedValueOnce({data:'1_skulocmoq',status:200});
      const response = await MDMService.deleteTask('1_skulocmoq');
      expect(mockedAxios.delete).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + '/DeleteTask',{
        params:{
          'taskId':'1_skulocmoq'
        }
      })
      expect(response.status).toBe(200);
  
    });

    it('should make post request to /RemoveMasterData', async () => {

      mockedAxios.post.mockResolvedValueOnce({
        "taskId": "",
        "status": 500,
        "msg": null,
        "errordata": null,
        "errorCount": null,
        "error": null
    });
      const response = await MDMService.deleteMasterData({
        "id": 1,
        "action": "remove",
        "data": [
            {
                "sc": "AFADSH0554001",
                "ec": null,
                "c1": "AFADSH0554",
                "c3": "8910000000000",
                "c4": "PCS",
                "c5": "2699",
                "c6": "Arrow"
            },
        ]
    })
    //   expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/RemoveMasterData`,JSON.stringify({
    //     "id": 1,
    //     "action": "remove",
    //     "data": [
    //         {
    //             "sc": "AFADSH0554001",
    //             "ec": null,
    //             "c1": "AFADSH0554",
    //             "c3": "8910000000000",
    //             "c4": "PCS",
    //             "c5": "2699",
    //             "c6": "Arrow"
    //         },
    //     ]
    // }),{
    //   headers: { 'Content-Type': 'application/json' }
    // })
    expect(mockedAxios.post).toBeCalled()
      expect(response.status).toBe(500);
    });

    it('should make post request to /RemoveMasterData (Retail)', async () => {

      mockedAxios.post.mockResolvedValueOnce({
        "taskId": "",
        "status": 500,
        "msg": null,
        "errordata": null,
        "errorCount": null,
        "error": null
    });
      const response = await MDMService.deleteMasterDataRetail({
        "id": 1,
        "action": "remove",
        "data": [
            {
                "sc": "AFADSH0554001",
                "ec": null,
                "c1": "AFADSH0554",
                "c3": "8910000000000",
                "c4": "PCS",
                "c5": "2699",
                "c6": "Arrow"
            },
        ]
    })
    //   expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/RemoveMasterData`,JSON.stringify({
    //     "id": 1,
    //     "action": "remove",
    //     "data": [
    //         {
    //             "sc": "AFADSH0554001",
    //             "ec": null,
    //             "c1": "AFADSH0554",
    //             "c3": "8910000000000",
    //             "c4": "PCS",
    //             "c5": "2699",
    //             "c6": "Arrow"
    //         },
    //     ]
    // }),{
    //   headers: { 'Content-Type': 'application/json' }
    // })
    expect(mockedAxios.post).toBeCalled()
      expect(response.status).toBe(500);
    });


    it('should make post request to /ModifyMasterData', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.modifyMasterData({id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]})
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/ModifyMasterData`,{id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]},{
      headers: { 'Content-Type': 'application/json' }
    })
      expect(response.status).toBe(200);
    });

    it('should make post request to /ModifyMasterData (Retail)', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.modifyMasterDataRetail({id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]})
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `/api/validate-master/modify-master-data/`,{id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]},{
      headers: { 'Content-Type': 'application/json' }
    })
      expect(response.status).toBe(200);
    });


    // it('should make post request to /GetSeasonalityDetails', async () => {

    //   mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
    //   const response = await MDMService.getSeasonalityDetails({
    //     sc:"QAEF1000",
    //     sn:"Polo T-Shirt",
    //     sd: "2024-10-03",
    //     ed: "2024-11-04",
    //   })
    //   expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/GetSeasonalityDetails`,{
    //     sc:"QAEF1000",
    //     sn:"Polo T-Shirt",
    //     sd: "2024-10-03",
    //     ed: "2024-11-04",
    //   },{
    //     headers: { 'Content-Type': 'application/json' }
    //   })
    //   expect(response.status).toBe(200);
    // });

    it('should make post request to /AddMasterData', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.addMasterData({id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]})
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_VF_API_HOST + `/AddMasterData`,{id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]},{
      headers: { 'Content-Type': 'application/json' }
    })
      expect(response.status).toBe(200);
    });

    it('should make post request to /AddMasterData (Retail)', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.addMasterDataRetail({id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]})
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `/api/validate-master/add-valid-master/`,{id:1,data:[{
        sc:"QAEF1000",
        sn:"Polo T-Shirt"
      }]},{
      headers: { 'Content-Type': 'application/json' }
    })
      expect(response.status).toBe(200);
    });

    it('should make post request to /api/validate-master/basic-validation/{masterId}', async () => {

      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.validateMaster({},1)
      expect(mockedAxios.post).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `api/validate-master/basic-validation/1`,{},{
        responseType:'stream'
    })
      expect(response.status).toBe(200);
    });

    it('should make get request to /api/validate-master/', async () => {

      mockedAxios.get.mockResolvedValueOnce({data:'test',status:200});
      const response = await MDMService.getUploadProgress(1)
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.REACT_APP_API_HOST + `api/validate-master/get-upload-progress/1`,{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
    });

  });