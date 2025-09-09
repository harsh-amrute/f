import { useState, useRef } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { notifyError, notifySuccess } from '../../../helpers/notify';
import { type GridRef } from '../../../VectorFlow/types/MDM'
import { Dispatch, SetStateAction } from 'react';
import { useAddProductPermissions } from "../../../VectorFlow/Services/MTA/MDM";
import { useGetPermissionsPayload } from "../../../VectorFlow/Services/MTA/MDM";
import { getLocationColumns, getProductColumns } from './View';

interface UseViewProps {
    downloadFileName: string;
    setDownloadFileName: Dispatch<SetStateAction<string>>;  
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;   
    isUploadModalOpen: boolean;
    isOverlayVisible: boolean;
    setIsOverlayVisible: Dispatch<SetStateAction<boolean>>;
    toggleUploadModal: (value: boolean) => void;
    onUpload: (RECORD_UPLOAD_LIMIT: any) => Promise<void>;
    setUploadCallback: (cb: () => void) => void; 
    exportToExcel: (fromUploadModal?: boolean) => Promise<void>;
    RECORD_UPLOAD_LIMIT: any;
    ref: React.MutableRefObject<GridRef | undefined>;
}

const useView = (columnDefs?: any[]): UseViewProps => {
    const [downloadFileName, setDownloadFileName] = useState('');
    const [file, setFile] = useState<File>();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isOverlayVisible,setIsOverlayVisible] = useState<boolean>(false)
    const ref = useRef<GridRef>();
    const EnvConfig = useSelector((state: RootState) => state.mta.EnvConfig);
    const RECORD_UPLOAD_LIMIT = EnvConfig['RECORD_UPLOAD_LIMIT'];
    const {mutateAsync : addProductPermissions} = useAddProductPermissions();
    const {mutateAsync : getPermissionPayload} = useGetPermissionsPayload();
    const uploadCallbackRef = useRef<(() => void) | null>(null);

    const permissionType = columnDefs?.some(col => col.colId.includes('product')) ? 'Product' : 'Location';
    const columns = permissionType === "Product" ? getProductColumns(EnvConfig) : getLocationColumns(EnvConfig);
    const headerNameMap: Record<string, string> = {};
    columns.forEach(col => {
        headerNameMap[col.colId] = col.headerName;
    });

    const formatErrorMessage = (errorMsg: string) => {
        let formattedMsg = errorMsg;
        Object.keys(headerNameMap).forEach(colId => {
            formattedMsg = formattedMsg.replaceAll(colId, headerNameMap[colId]);
        });
        return formattedMsg;
    };

    const toggleUploadModal = (value: boolean) => {
        setIsUploadModalOpen(value);
    };

    const onUpload = async () => {
        try {
            if (!file) {
                notifyError('Please select a file to upload.');
                return;
            }
            setIsOverlayVisible(true);

            const formData = new FormData();
            formData.append('file', file);  

            const headersList = columnDefs?.filter(col => col.colId !== 'id').map(col => col.colId);
            formData.append('headers', JSON.stringify(headersList)); 
            console.log("FormData", formData);
            
            const payload = await getPermissionPayload(formData);
            if (payload?.data?.errors?.length > 0) {
                const allErrors = payload.data.errors
                    .map((err: string) => formatErrorMessage(err))
                    .join("  |  ");

                notifyError(allErrors);
                return;
            }
            console.log("Get Permission Payload Response", payload.data.data);

            const response = await addProductPermissions({
                permissionType: permissionType,
                data: payload.data.data
            });
            notifySuccess(response?.data?.data);
            toggleUploadModal(false)
            setFile(undefined);
            if (uploadCallbackRef.current) {
                uploadCallbackRef.current();
                uploadCallbackRef.current = null;
            }
        } catch (error: any) {
            console.error(error);
            notifyError(error.message);
        } finally {
            setIsOverlayVisible(false);
        }
    };


    const exportToExcel = async (fromUploadModal?: boolean) => {
    try {
        if (fromUploadModal) {
            const downloadableColumnKeys: string[] = [];
            
            if (columnDefs) {
                columnDefs.forEach((col: any) => {
                    if (col.colId !== 'id') {
                        downloadableColumnKeys.push(col.headerName);
                    }
                });
            }

            const headers = downloadableColumnKeys.join(',');
            const csvContent = headers + '\n';
            
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = columnDefs?.some(col => col.colId.includes('product')) 
                            ? 'Product_Permissions.csv' 
                            : 'Location_Permissions.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            notifySuccess('Template downloaded successfully');
            return;
        }
    } catch (error) {
        notifyError('Export failed');
    }
};

    return {
        downloadFileName,
        setDownloadFileName,
        file,
        setFile,
        isUploadModalOpen,
        isOverlayVisible,
        setIsOverlayVisible,
        toggleUploadModal,
        onUpload,
        setUploadCallback: (cb: () => void) => { uploadCallbackRef.current = cb; },
        exportToExcel,
        RECORD_UPLOAD_LIMIT,
        ref
    };
};

export default useView;