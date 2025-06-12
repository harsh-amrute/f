import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OrderBalanceService {
    export const getOrderBalanceData = async ({graphflag, page, appliedFilters, ordertype,page_size}: any) => {        
        if(graphflag){
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderBalanceData/`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    graphflag,
                    ordertype,
                    page_size
                }
            })
        }
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderBalanceData/`, 
        appliedFilters, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                graphflag,
                page,
                ordertype
            }
        })
    }
    export const getOrderTypeOptions = async () => {
        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderTypeMasterData/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    export const getOrderBalanceGraphDataExcelExport = async ({ body , isExcelExport, report_name, graphflag }: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getOrderBalanceData/`, body,{
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                export : isExcelExport,
                report_name,
                graphflag
            },
            responseType: 'blob' 
        })
    }
}
