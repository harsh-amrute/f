import { GridOptions } from 'ag-grid-enterprise';
import React, { useEffect, useRef, useState } from 'react'
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'
import CustomTagTooltip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import './styles.css'
import { SCDynamicContainer } from './styles';
import VFPagination from '../../../../../../../components/VectorFLOW/commons/VFPagination';
import { notifyError, notifySuccess } from '../../../../../../../helpers/notify';
import { useGetElapsedTimeData } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/ElapseTime';
import OverlayLoader from '../../../../../../../VectorFlow/Pages/MTO/Common/Loader';
import { pagination } from '../../../../../../../VectorFlow/Pages/MTO/Common/Enum';

const GridView = ({ colDef, setCurrentGridRef, currentGridRef, columnState }: any) => {
    const gridRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);
    const [data, setData] = useState([]);
    const { mutateAsync: getElapsedTimeData, isLoading } = useGetElapsedTimeData()


    useEffect(() => {
        getGridData()
    }, [currentPage])


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


    const getGridData = async () => {
        try {
            const data = await getElapsedTimeData({ page: currentPage, graphFlag: 0 });
            setData(data?.data?.data?.results)
            setTotalRows(data?.data?.data?.count)
            notifySuccess("Data Fetched Successfully!")
        }
        catch (err: any) {
            console.log(err)
            notifyError("Something Went Wrong")
        }

    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
    }

    useEffect(()=>{ 
        if (currentGridRef?.current && columnState?.length) {
            const result = currentGridRef.current.columnApi.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    });


    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
            {isLoading && <OverlayLoader />}
            <VFTable
                {...gridOptions}
                sideBar={{
                    toolPanels: ['columns'],
                }}
                defaultColDef={defaultColDef}
                columnDefs={colDef}
                disableZoomScaling
                rowData={data}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                onGridReady={(params: any) => {
                    params.columnApi.autoSizeAllColumns();

                    setCurrentGridRef(gridRef);
                }}
            // statusBar={{
            //     statusPanels: [
            //         { statusPanel: 'agTotalRowCountComponent', align: 'left' },
            //     ]
            // }}
            />
            <VFPagination selectedRows={1} totalRows={totalRows} currentPage={currentPage} rowsPerPage={pagination.mtoPageSize} handleChangePage={handlePageChange} />
        </SCDynamicContainer>

    )
}

export default React.memo(GridView)