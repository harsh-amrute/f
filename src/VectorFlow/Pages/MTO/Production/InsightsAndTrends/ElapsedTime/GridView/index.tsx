import { GridOptions } from 'ag-grid-enterprise';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'
import CustomTagTooltip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import './styles.css'
import { SCDynamicContainer } from './styles';
import VFPagination from '../../../../../../../components/VectorFLOW/commons/VFPagination';
import { notifyError, notifySuccess } from '../../../../../../../helpers/notify';
import { useGetElapsedTimeData, useGetElapsedTimeDataForExcelExport } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/ElapseTime';
import OverlayLoader from '../../../../../../../VectorFlow/Pages/MTO/Common/Loader';
import { FilterPageName, pagination } from '../../../../../../../VectorFlow/Pages/MTO/Common/Enum';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport } from '../../../../../../../helpers/utils';

const GridView = forwardRef(({ colDef, setCurrentGridRef, currentGridRef, columnState, appliedFilters ,colDefMap}: any,ref) => {    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);
    const [data, setData] = useState([]);
    const gridRef = useRef<any>(null);
    const { mutateAsync: getElapsedTimeData, isLoading } = useGetElapsedTimeData()
    const { mutateAsync : getElapsedTimeDataExcelExport } = useGetElapsedTimeDataForExcelExport();    

    useEffect(() => {
        getGridData()
    }, [currentPage, appliedFilters])

    useImperativeHandle(ref, ()=>({
        getExcelExport: ()=>{
            ExcelExportData();
        }
    }))

    const defaultColDef = {
        // suppressMenu: true,
        autoHeaderHeight: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        enableRowGroup: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
        tooltipComponent: CustomTagTooltip,
        initialWidth: 110,
        cellStyle: {
            'text-align': 'center',
            'height': '50px',
            "font-style": "normal",
            "font-variant": "normal",
            "font-size": "12px",
            "font-family": "Roboto",
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'resizable': 'true',

        },
    }

    const gridOptions: GridOptions = {
        groupDefaultExpanded: 0,
        detailRowHeight: 500,
        rowHeight: 26,
        rowGroupPanelShow: 'always',
        getRowStyle: (params: any) => {
            return {
                background: params.node.rowIndex % 2 === 0 ? "#F4F4F4" : "#FFFFFF",
            };
        },
    };


    const getGridData = async (isExcelExport = false ) => {
        const formatedFilters = formatFilterJSON(appliedFilters);
        if(isExcelExport){
            try{
                const headersdata = currentGridRef?.current?.api.getColumnState();                
                const body = getBodyForExcelExport({headersdata,filterData : formatedFilters,colDefMap});                
                const response = await getElapsedTimeDataExcelExport({body , isExcelExport : 1, report_name : FilterPageName.Poogi_Elapsed_Time})   
                if(response.status === 200){
                    DownloadExcel(response,FilterPageName.Poogi_Elapsed_Time);
                    notifySuccess("Data Exported to Excel Successfully!")
                }else{
                    notifyError("Failed to Export to Excel")
                }
            }
            catch(err){
                console.log(err)
                notifyError("Failed to Export to Excel")
            }
        }
        else{

            try {
                const data = await getElapsedTimeData({ page: currentPage, graphflag: 0, appliedFilters: formatedFilters });
                setData(data?.data?.data?.results)
                setTotalRows(data?.data?.data?.count)
                notifySuccess("Data Fetched Successfully!")
            }
            catch (err: any) {
                console.log(err)
                notifyError("Something Went Wrong")
            }
        }

    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
    }

    useEffect(() => {
        if (currentGridRef?.current && columnState?.length) {
            columnState.forEach((col: any) => {
                if (col.initialHide != undefined) {
                    col.hide = col.initialHide;
                }
            });
            const result = currentGridRef.current.api.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    }, [currentGridRef, columnState]);
    const ExcelExportData = () =>{
        if(data.length> 0){
            
            getGridData(true)
        }
        else{
            notifyError("There is no data that can be exported to Excel!")
        }
    }

    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
            {isLoading && <OverlayLoader />}
            <VFTable
                {...gridOptions}
                sideBar={{
                    toolPanels: ['columns'],
                }}
                columnDefs={colDef}
                defaultColDef={defaultColDef}
                disableZoomScaling
                rowData={data}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                onGridReady={(params: any) => {
                    params.api.autoSizeAllColumns();

                    setCurrentGridRef(gridRef);
                }}
                maintainColumnOrder
            // statusBar={{
            //     statusPanels: [
            //         { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            //     ]
            // }}
            />
            <VFPagination selectedRows={1} totalRows={totalRows} currentPage={currentPage} rowsPerPage={pagination.mtoPageSize} handleChangePage={handlePageChange} />
        </SCDynamicContainer>

    )
})

export default React.memo(GridView)