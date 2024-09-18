import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../Common/VFTable';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import OverlayLoader from '../../Common/Loader';
import { pagination } from '../../Common/Enum';
import { useEffect, useRef } from 'react';

interface MaterialSODetailedProps {
    parameterData: any,
    setCurrentGridRef: any,
    currentGridRef: any,
    columnState: any,
    colDef: any,
    isUpdateUserConfig: any,
    isGetUserConfig: any
}

    const MaterialSODetailed = ({ isUpdateUserConfig, isGetUserConfig, parameterData, setCurrentGridRef, currentGridRef, columnState, colDef}: MaterialSODetailedProps) => {
    const {
        agGridProps,
        RRRRowData,
        isLoading,
        rowDataCount,
        handlePageChangeOnHook,
        currentPage
    } = useMaterialSO(parameterData);
    const gridRef = useRef<any>(null);


    const handlePageChange = (currPage: number) => {
        handlePageChangeOnHook(currPage);
    }

    useEffect(()=>{ 
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
            const result = currentGridRef?.current?.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    });
    
    return (
        <>
            {
                (isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
            }
            <ProcurementLayout style={{ marginLeft: '25px', flex: "1" }}>

                <VFTable
                    {...agGridProps}
                    columnDefs={colDef}
                    rowData={RRRRowData}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    // height={'780px'}
                    ref={gridRef}
                    onGridReady={(params: any) => {
                        params.api.autoSizeAllColumns();
                        setCurrentGridRef(gridRef);
                    }}
                    paginationPageSize={pagination.mtoPageSize}
                    pagination={false}
                    statusBar={{
                        statusPanels: [
                            { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                        ]
                    }}
                />
                <VFPagination
                    selectedRows={0}
                    rowsPerPage={pagination.mtoPageSize}
                    totalRows={rowDataCount}
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                />
            </ProcurementLayout>
        </>
    )
}

export default MaterialSODetailed

