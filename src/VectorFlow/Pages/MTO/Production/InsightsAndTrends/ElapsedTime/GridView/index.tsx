import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../../../helpers/utils';
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'
import CustomTagTooltip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import TagCellToolTip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
import { APIMock, gridColumnConfig } from '../Data';
// import { useGetUIConfigData } from '../../../../../../Services/MTO/Common/UIConfig';
import './styles.css'
import { SCDynamicContainer } from './styles';
import ColorCellRenderer from '../../../../../MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests/ColorCellRenderer';
import _ from 'lodash';
import VFPagination from '../../../../../../../components/VectorFLOW/commons/VFPagination';
import { notifyError, notifySuccess } from '../../../../../../../helpers/notify';
import { useGetElapsedTimeData } from '../../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/ElapseTime';
import OverlayLoader from '../../../../../../../VectorFlow/Pages/MTO/Common/Loader';
const GridView = ({uiConfig}: any) => {
    const gridRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);
    const [data, setData] = useState([]);
    const { mutateAsync: getElapsedTimeData, isLoading } = useGetElapsedTimeData()

    
    useEffect(()=>{
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

    const colDefCustomizations = {
        'Tags': {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        'BPP': {
            cellRenderer: ColorCellRenderer,
        },
    }


    const colDef = useMemo(()=>getColumnDefinations(uiConfig, colDefCustomizations),[])
    // }, [])
    // }, [HeaderData])

    const getGridData = async () => {
        try{
            const data = await getElapsedTimeData({page: currentPage, graphFlag: 0});
            setData(data?.data?.data?.results)
            setTotalRows(data?.data?.data?.count)
            notifySuccess("Data Fetched Successfully!")
        }
        catch(err: any){
            console.log(err)
            notifyError("Something Went Wrong")
        }
        
    }

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
      }


    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
            {isLoading && <OverlayLoader/>}
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
                // statusBar={{
                //     statusPanels: [
                //         { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                //     ]
                // }}
            />
            <VFPagination selectedRows={1} totalRows={totalRows} currentPage={currentPage} rowsPerPage={10} handleChangePage={handlePageChange} />
        </SCDynamicContainer>

    )
}

export default GridView