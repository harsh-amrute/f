import { useMutation } from "react-query"
import { DayWiseCoverageService } from "./api"

export const useUpdateScheduleOrders = () => {
    return useMutation(async (body: {orders:any}) => {
        return DayWiseCoverageService.updateScheduleOrders(body)
    })
}

