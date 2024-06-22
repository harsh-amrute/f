import { useMutation } from '@tanstack/react-query'
import { MaterialRequirementService } from './api'

export const useGetMaterialRequirementDetails = () => {
    return useMutation(async (data: any) => {
        //console.log("return ===",MaterialCoverageServices.getOpenSODetailsData)
        return MaterialRequirementService.getMaterialRequirementData(data)
    })
}