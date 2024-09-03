import { useMutation, /*useQuery*/ } from '@tanstack/react-query'
import { UIConfigService } from './api'



export const useGetUserUIConfigData = () => {
    return useMutation(async (reportName: any) => {
        return UIConfigService.getUserUIReportConfigData(reportName);
    })
}

export const useUpdateUserUIConfigData = () => {
    return useMutation(async (payload: any) => {
        return UIConfigService.updateUserUIReportConfigData(payload);
    })
}



