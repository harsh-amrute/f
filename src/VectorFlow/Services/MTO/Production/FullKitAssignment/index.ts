import { useMutation } from "@tanstack/react-query"
import { FullKitAssignmentService } from "./api"

export const useGetFullKitAssignmentDataWithGraphData = () => {
    return useMutation(async () => {
        return FullKitAssignmentService.getFullKitAssignmentDataWithGraphData();
    })
}