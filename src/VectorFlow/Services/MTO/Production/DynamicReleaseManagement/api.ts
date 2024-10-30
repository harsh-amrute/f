import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicReleaseManagementService {
    export const getDynamicReleaseData = async ({ graph = 0, ao = 0, page = 1, appliedFilters }: { graph: number, ao: number, page: number, appliedFilters: any }) => {
        if (graph === 0 && ao === 0 && page === 1) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (ao === 0 && graph !== 0 && page !== 1) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (page === 1 && graph !== 0 && ao !== 0) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page !== 1 && graph === 0 && ao !== 0) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page === 1 && graph === 0 && ao !== 0) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`,
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page === 1 && graph !== 0 && ao === 0) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (page !== 1 && graph !== 0 && ao !== 0) {
            return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
            appliedFilters,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, 
        appliedFilters,
        {
            headers: {
                'Content-Type': 'application/json',
            }
        })


    }

    export const saveRouteData = async (body: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/updateOrderDataRoute/`, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    export const updateDynamicReleaseData = async (body: any) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/UpdateDynamicReleaseData/`, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    export const getDynamicReleaseExcelData = async ({body, isExcelExport , report_name , ao ,graph}: {body : any,isExcelExport : any, report_name : any,ao : any , graph : any}) => {
        return await axios.put(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&report_name=${report_name}&export=${isExcelExport}`, body, {
            headers: {
                'Content-Type': 'application/json',
            },
            responseType : "blob"
        })
    }
}
