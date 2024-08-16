import { useQuery, useMutation } from '@tanstack/react-query'
import { DepartmentWiseBMReport } from './api'

export const useGetDeptWiseBMReport = () => {
    return useMutation(async (data: any) => {
        return await DepartmentWiseBMReport.getDeptWiseBMReport(data)
    })
}