import { GridOptions } from 'ag-grid-enterprise';
import React, { useEffect, useRef, useState } from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable'
import './style.css'
import { SCDynamicContainer } from './styles';
import { notifyError, notifySuccess } from '../../../../../helpers/notify';
import OverlayLoader from '../../../../../VectorFlow/Pages/MTO/Common/Loader';
import CustomTagTooltip from '../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import VFPagination from '../../../../../components/VectorFLOW/commons/VFPagination';
import { pagination } from '../Enum';

interface IGridViewProps {
    getData: (isGraph: number) => any,
    colDef: any,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    setCurrentGridRef: any,
    currentGridRef: any,
    columnState: any,
}

const GridView = (props: IGridViewProps) => {

    const { getData, isLoading, isError, isSuccess, setCurrentGridRef, currentGridRef, columnState, colDef } = props;

    const gridRef = useRef<any>(null);
    const [gridData, setGridData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRows, setTotalRows] = useState<number>(0);

    const defaultColDef = {
        autoHeaderHeight: true,
        filter: "agTextColumnFilter",
        floatingFilter: true,

        enableRowGroup: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
        tooltipComponent: CustomTagTooltip,
        initialWidth: 110,
        cellStyle: {
            'text-align': 'left',
            'height': '50px',
            "font-style": "normal",
            "font-variant": "normal",
            "font-weight": "300",
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



    const getGridData = async (params: any) => {
        try {
            const response = await getData(params);
            setGridData(response.data.data.results);
            setTotalRows(response.data.data.count)
        }
        catch (e) {
            console.log(e);
            notifyError('Failed to fetch Grid data!');
        }
    }

    const handlePageChange = (current: any) => {
        setCurrentPage(current);
        getGridData({ graphflag: 0, page: current })
    }

    useEffect(() => {
        getGridData({ graphflag: 0, page: currentPage });
        
    }, [])



    useEffect(() => {
        if (isSuccess) {
            notifySuccess("Fetched Data successfully!")
        }
        if (isError) {
            notifyError("Failed to load data!")
        }
    }, [isSuccess, isError]) 

    useEffect(()=>{ 
        if (currentGridRef?.current && columnState?.length && colDef.length > 0) {
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
            {
                isLoading && <OverlayLoader />
            }
            <VFTable
                {...gridOptions}
                sideBar={{
                    toolPanels: ['columns'],
                }}
                defaultColDef={defaultColDef}
                columnDefs={colDef}
                disableZoomScaling
                rowData={gridData}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                onGridReady={(params: any) => {
                    params.columnApi.autoSizeAllColumns();

                    setCurrentGridRef(gridRef);
                }}
                tooltipMouseTrack={true}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
            />
            <VFPagination
                selectedRows={0}
                rowsPerPage={pagination.mtoPageSize}
                totalRows={totalRows}
                currentPage={currentPage}
                handleChangePage={handlePageChange}
            />
        </SCDynamicContainer>

    )
}

export default React.memo(GridView)