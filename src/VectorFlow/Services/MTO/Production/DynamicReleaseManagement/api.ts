import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicReleaseManagementService {
    export const getDynamicReleaseData = async ({ graph = 0, ao = 0, page = 1 }: { graph: number, ao: number, page: number }) => {
        if (graph === 0 && ao === 0 && page === 1) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (ao === 0 && graph !== 0 && page !== 1) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (page === 1 && graph !== 0 && ao !== 0) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page !== 1 && graph === 0 && ao !== 0) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page === 1 && graph === 0 && ao !== 0) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        else if (page === 1 && graph !== 0 && ao === 0) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        else if (page !== 1 && graph !== 0 && ao !== 0) {
            return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }

        return await axios.get(process.env.REACT_APP_VF_API_HOST_MTO + `/getDynamicReleaseData/?graph=${graph}&ao=${ao}&page=${page}`, {
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
}
