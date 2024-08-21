import { GridOptions } from 'ag-grid-enterprise';
import { useEffect, useMemo, useRef, useState } from 'react'
import { getColumnDefinations } from '../../../../../../../helpers/utils';
import VFTable from '../../../../../../../components/VectorFLOW/commons/VFTable'
import CustomTagTooltip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip';
import TagCellToolTip from '../../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer';
// import { useGetUIConfigData } from '../../../../../../Services/MTO/Common/UIConfig';
import './styles.css'
import { SCDynamicContainer } from './styles';
import ColorCellRenderer from '../../../../../MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests/ColorCellRenderer';
import { useGetLeadTimeData } from '../../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/LeadTime';
import VFPagination from '../../../../../../../components/VectorFLOW/commons/VFPagination';
import { notifyError } from '../../../../../../../helpers/notify';

const GridView = ({uiConfig}: any) => {
    const gridRef = useRef(null);
    // const HeaderData = gridColumnConfig;
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);
    const [data, setData] = useState([]);
    const { mutateAsync: getLeadTimeData } = useGetLeadTimeData()

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
        'Tag': {
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

    const getGridData = async () => {
        try{
            const data = await getLeadTimeData({page: currentPage, graphFlag: 0});
            setData(data?.data?.data?.results)
            setTotalRows(data?.data?.data?.count)
        }
        catch(err: any){
            console.log(err)
            notifyError("Something Went Wrong")
        }
        
    }

    useEffect(()=>{
        getGridData()
    }, [currentPage])

    


    const colDef = useMemo(() => getColumnDefinations(uiConfig, colDefCustomizations), [])

    const handlePageChange = async (currPage: number) => {
        setCurrentPage(currPage)
      }

    return (

        <SCDynamicContainer className="ag-theme-planning-custom">
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
            <VFPagination currentPage={currentPage} totalRows={totalRows} rowsPerPage={10} selectedRows={1} handleChangePage={handlePageChange}/>
        </SCDynamicContainer>

    )
}

export default GridView