import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderReschedulingService {
    export const getOrderReschedulingData = async (pageSize: number) => {

        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/?page_size=${pageSize}`, {

            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        })
    }

    export const getOrderReschedulingExcelData = async ({body, isExcelExport, report_name}: any) => {

        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/GetOrderReschedulingData/?export=${isExcelExport}&report_name=${report_name}`, body, {
            headers:{
                'Content-Type': 'application/json',
            },
            responseType: "blob"
        })
    }
    export const getOrderReschedulingPageData = async (pageNum: string,pageSize: number,appliedFilters: any) => {
        return await axios.put(`${process.env.REACT_APP_VF_API_HOST_MTO}/GetOrderReschedulingData/?page=${pageNum}&page_size=${pageSize}`,
          appliedFilters, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      };
      
    export const putUpdateOrderDueDate = async (body: any) => {
        const url = `${process.env.REACT_APP_VF_API_HOST_MTO}/UpdateOrderDueDate/`;
        return await axios.put(url, body, {
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': 'RYW30tp0vOYHuintw34PVIwgqdUrLADeO0ADgpwgYz8KFDCxbSY7Bt6PAalrUUp2'
            }
        });
    };

}
