import { useMutation } from '@tanstack/react-query'
import { MaterialRequirementService } from './api'

export const useGetMaterialRequirementDetails = () => {
    return useMutation(async (data: any) => {
        return MaterialRequirementService.getMaterialRequirementData(data)
    })
}

export const useGetMaterialRequirementDetailsDatewise = () => {
    return useMutation(async (data: any) => {
        return MaterialRequirementService.getMaterialRequirementDataDayWise(data)
    })
}