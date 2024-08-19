import { useMutation } from '@tanstack/react-query'
import { DepartmentWiseBMReport } from './api'

export const useGetDeptWiseBMReport = () => {
    return useMutation(async (data: any) => {
        return await DepartmentWiseBMReport.getDeptWiseBMReport(data)
    })
}

export const useGetBombLevelData = () => {
    return useMutation(async (data: any) => {
        return await DepartmentWiseBMReport.getBombLevelData(data);
    })
}

export const useAddBMReportRemark = () => {
    return useMutation(async (data: any) => {
        return await DepartmentWiseBMReport.addBMReportRemark(data);
    })
}

export const useGetDeptWiseWipData = () => {
    return useMutation(async (data: any) => {
        return await DepartmentWiseBMReport.getDeptWiseWipData(data);
    })
}