import { useMutation } from "@tanstack/react-query"
import { getFileConfiguration, getFileDownload, getRunState } from "./api";

export const useGetRunState = () => {
    return useMutation(async () => {
        return getRunState();
    })
}

export const useGetFileConfiguration = () => {
    return useMutation(async () => {
        return getFileConfiguration();
    })
}

export const useGetFileDownloadForSchedular = () => {
    return useMutation(async (file_name: string) => {
        return getFileDownload(file_name);
    })
}