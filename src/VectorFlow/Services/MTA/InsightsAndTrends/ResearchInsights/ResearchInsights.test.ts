import {ResearchInsightsService} from './api';
import axios,{AxiosStatic} from 'axios';
jest.mock('axios');
const mockedAxios=axios as jest.Mocked<AxiosStatic>;
describe('Testing the ResearchInsightsService',  () => {
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
  
    it('should make a post request to the /api/SCIH/GetResearchInsightData', async () => {
      mockedAxios.post.mockResolvedValueOnce({data:'test',status:200});
   
      const response = await ResearchInsightsService.getUpdatedGraphData({data:[
        {
          "SKUCode": "ARES0798C004",
          "WhCode": "2224"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2087"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2108"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2178"
        },
        {
          "SKUCode": "ARES0798C004",
          "WhCode": "2048"
        },
        {
          "SKUCode": "ARES0439C007",
          "WhCode": "2177"
        },
        {
          "SKUCode": "ARES0439C007",
          "WhCode": "2224"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2177"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2211"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2220"
        },
        {
          "SKUCode": "AREK0297A008",
          "WhCode": "2182"
        },
        {
          "SKUCode": "AREK0294A006",
          "WhCode": "2114"
        },
        {
          "SKUCode": "ARES02018A003",
          "WhCode": "4053"
        },
        {
          "SKUCode": "AREK0292A006",
          "WhCode": "2164"
        },
        {
          "SKUCode": "AREK0294A001",
          "WhCode": "2079"
        },
        {
          "SKUCode": "AREK0297A008",
          "WhCode": "2113"
        },
        {
          "SKUCode": "ARES02018A003",
          "WhCode": "4082"
        },
        {
          "SKUCode": "USSHTC0016006",
          "WhCode": "4210"
        },
        {
          "SKUCode": "USTSHC0062001",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0062008",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0063004",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0063006",
          "WhCode": "4284"
        },
        {
          "SKUCode": "USTSHC0065005",
          "WhCode": "4290"
        },
        {
          "SKUCode": "ARGT6042A004",
          "WhCode": "117452"
        },
        {
          "SKUCode": "UDTSHC0026006",
          "WhCode": "4245"
        }
      ]});
      expect(mockedAxios.post).toHaveBeenCalledWith( process.env.REACT_APP_VF_API_HOST+'/api/SCIH/GetResearchInsightData',{data:[
        {
          "SKUCode": "ARES0798C004",
          "WhCode": "2224"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2087"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2108"
        },
        {
          "SKUCode": "ARES0439C002",
          "WhCode": "2178"
        },
        {
          "SKUCode": "ARES0798C004",
          "WhCode": "2048"
        },
        {
          "SKUCode": "ARES0439C007",
          "WhCode": "2177"
        },
        {
          "SKUCode": "ARES0439C007",
          "WhCode": "2224"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2177"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2211"
        },
        {
          "SKUCode": "AREK0295A008",
          "WhCode": "2220"
        },
        {
          "SKUCode": "AREK0297A008",
          "WhCode": "2182"
        },
        {
          "SKUCode": "AREK0294A006",
          "WhCode": "2114"
        },
        {
          "SKUCode": "ARES02018A003",
          "WhCode": "4053"
        },
        {
          "SKUCode": "AREK0292A006",
          "WhCode": "2164"
        },
        {
          "SKUCode": "AREK0294A001",
          "WhCode": "2079"
        },
        {
          "SKUCode": "AREK0297A008",
          "WhCode": "2113"
        },
        {
          "SKUCode": "ARES02018A003",
          "WhCode": "4082"
        },
        {
          "SKUCode": "USSHTC0016006",
          "WhCode": "4210"
        },
        {
          "SKUCode": "USTSHC0062001",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0062008",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0063004",
          "WhCode": "4290"
        },
        {
          "SKUCode": "USTSHC0063006",
          "WhCode": "4284"
        },
        {
          "SKUCode": "USTSHC0065005",
          "WhCode": "4290"
        },
        {
          "SKUCode": "ARGT6042A004",
          "WhCode": "117452"
        },
        {
          "SKUCode": "UDTSHC0026006",
          "WhCode": "4245"
        }
      ]},{
        headers: { 'Content-Type': 'application/json' }
      })
      expect(response.status).toBe(200);
  
    });

  
  });

