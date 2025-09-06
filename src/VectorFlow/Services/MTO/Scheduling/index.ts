import { useMutation } from "@tanstack/react-query"
import { getRunState } from "./api";

export const useGetRunState = () => {
    return useMutation(async () => {
        return getRunState();
    })
}