import { ProcurementLayout } from './styles';
import useMaterialSO from './useMaterialSO';
import VFTable from '../../Common/VFTable';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import OverlayLoader from '../../Common/Loader';
import { pagination } from '../../Common/Enum';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface MaterialSODetailedProps {
    parameterData: any,
    setCurrentGridRef: any,
    currentGridRef: any,
    columnState: any,
    colDef: any,
    isUpdateUserConfig: any,
    isGetUserConfig: any,
}

    const MaterialSODetailed = forwardRef(({ isUpdateUserConfig, isGetUserConfig, parameterData, setCurrentGridRef, currentGridRef, columnState, colDef}: MaterialSODetailedProps, ref) => {
    const {
        agGridProps,
        RRRRowData,
        isLoading,
        rowDataCount,
        handlePageChangeOnHook,
        currentPage,
        ExcelExportData
    } = useMaterialSO(parameterData);
    const gridRef = useRef<any>(null);

    useImperativeHandle(ref, ()=>({
        getExcelExport: (body : any)=>{
            console.log('materail so ',body)
            ExcelExportData(body);
        }
    }))

    const handlePageChange = (currPage: number) => {
        handlePageChangeOnHook(currPage);
    }
    //Excel Export POC 

    // useEffect(() =>{
    //     if(colDef){
    //         axios.put("http://10.8.1.10:9000/getOpenSODetailsData/?Color=Black,Red,Yellow&KitStatus=NK&S=0&E=0&export=1&report_name=kuchbh", {
    //             headers: colDef.map((col: any)=>{
    //                 return {
    //                     hd: col.headerName,
    //                     scc: col.field,
    //                 }
    //             }).filter((col: any)=> {
    //                 return col.hd != undefined && col.hide != false
    //             })
    //         },{
    //             headers:{
    //                 'Content-Type': 'application/json',
    //             },
    //             responseType: "blob"
    //         }).then((data: any)=>{
    //             console.log(data);
    //             const blob = data.data
    //             console.log(blob);
    //             const url = URL.createObjectURL(blob)

    //                 // Trigger download
    //                 const link = document.createElement('a')
    //                 link.href = url
                   
    //                 link.setAttribute('download', `ReportFile.xlsx`)
    //                 document.body.appendChild(link)
    //                 link.click()
    //                 // Clean up download URL
    //                 URL.revokeObjectURL(url)
    //             // Create download URL for blob object
    //             ;
    //         })
    //     }
        
    // }, [colDef])

    useEffect(()=>{ 
        
        if (columnState?.length && colDef.length > 0 && currentGridRef?.current) {
       
            const result = currentGridRef?.current?.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });

            if (!result) {
                console.error('Failed to apply column state');
            }
        }

    },[columnState,currentGridRef?.current]);
    
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
                    maintainColumnOrder
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
})

export default MaterialSODetailed

