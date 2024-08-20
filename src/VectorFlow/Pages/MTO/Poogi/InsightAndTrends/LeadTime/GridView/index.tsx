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
import { useGetLeadTimeData } from '../../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/LeadTime';
import VFPagination from '../../../../../../../components/VectorFLOW/commons/VFPagination';
import { notifyError } from '~/helpers/notify';
import { useGetUIConfigData } from '../../../../../../../VectorFlow/Services/MTO/Common/UIConfig';

const GridView = () => {
    const gridRef = useRef(null);
    // const HeaderData = gridColumnConfig;
    const [HeaderData, setHeaderData] = useState(gridColumnConfig);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: getLeadTimeData } = useGetLeadTimeData()
    const reportName = "Lead Time";

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
        'tags': {
            tooltipValueGetter: (params: any) => params.value,
            cellRenderer: TagCellToolTip,
            cellStyle: {
                display: 'flex',
                justifyContent: "center",
            }
        },
        'bpp': {
            cellRenderer: ColorCellRenderer,
        },
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState(1);
    const [data, setData] = useState([]);

    const getGridData = async () => {
        try{
            const data = await getLeadTimeData({page: 1, graphFlag: 0});
            console.log(data.data.data.results)
            setData(data?.data?.data?.results)
            setTotalRows(data?.data?.data?.count)
        }
        catch(err: any){
            console.log(err)
            notifyError("Something Went Wrong")
        }
        
    }

    useEffect(() => {
        setColumnDef();
    }, [])

    useEffect(()=>{
        getGridData()
    }, [currentPage])

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response?.data?.data);
        }
        catch (e) {
            console.log(e);
        }
    }



    const newHeader = _.cloneDeep(HeaderData);

    const colDef = getColumnDefinations(newHeader, colDefCustomizations)

    // const colDef = useMemo()

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
                rowData={APIMock}
                tooltipHideDelay={100000}
                tooltipShowDelay={0}
                tooltipMouseTrack={true}
                ref={gridRef}
                statusBar={{
                    statusPanels: [
                        { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                    ]
                }}
                pagination
            />
            <VFPagination currentPage={currentPage} totalRows={totalRows} rowsPerPage={10} selectedRows={1} handleChangePage={handlePageChange}/>
        </SCDynamicContainer>

    )
}

export default GridView