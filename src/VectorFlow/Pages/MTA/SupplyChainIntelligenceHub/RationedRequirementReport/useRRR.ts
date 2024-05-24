import { useState,useMemo,useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { SideBarDef } from 'ag-grid-enterprise';

import { useGetRRRUIConfiguration,useGetRRRData,useGetRRRDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/RRR"
import { useUserData } from "../../../../../context"
import { RRREcoColorCellRenderer,RRRTechColorCellRenderer,RRRDispatchColorCellRenderer } from "./RRRCellRenderers"
import { mapRRRFieldsToColDefs } from "../../../../../helpers/utils"


const useRRR =()=>{

    const {isSideBarOpen} = useUserData()
    const [RRRRowData,setRRRRowData] = useState<any[]>([])
    const [RRRDataCount, setRRRDataCount]=useState<any>();

    const tempRef = useRef()

    const [currentPage,setCurrentPage] = useState<any>(1);

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const {data,isLoading:isRRRConfigLoading} = useGetRRRUIConfiguration()
    const {mutateAsync:getRRRData,isLoading:isRRRDataLoading} =useGetRRRData();
    const {mutateAsync:getRRRDataCount}=useGetRRRDataCount();

    const RRRColumns = mapRRRFieldsToColDefs(data?.data.data)

    const sideBar:SideBarDef = {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressPivots: true,
              suppressPivotMode: true,
            },
          
          },
        ],
        defaultToolPanel:'',
      }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        getRRRRowData(pageNo);
     }

    useEffect(()=>{       
        getDataCount();
        getRRRRowData(currentPage);
    },[])


    const getDataCount=async () => {
        const rowDataCount =await getRRRDataCount({
            filters:[],
            paginationParameter:{
                pageNumber:1,
                recordsPerPage:50
            }
        })
        setRRRDataCount(rowDataCount?.data?.recordCount)
    }

    const getRRRRowData= async(pageNo:any)=>{
        const rowData =await getRRRData({
            filters:[],
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200')
            }
        })
        setRRRRowData(rowData?.data?.data)
    }

    const customCellRenderers = useMemo(() => (   
        {
        grapCellRenderer:'',
        colorTechCellRenderer:RRRTechColorCellRenderer,
        colorEcoCellRenderer:RRREcoColorCellRenderer,
        colorDispatchRender:RRRDispatchColorCellRenderer
      }), []);

    const agGridProps:AgGridReactProps = {
        tooltipShowDelay:0,
        tooltipTrigger:"focus",
        readOnlyEdit:true,
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
        pagination:false,
        sideBar:sideBar,
        // overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
        // rowSelection:'multiple',
        paginationPageSize:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200'),
        suppressRowClickSelection:true,
        components:customCellRenderers,
        enableBrowserTooltips:true,
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            // tooltipComponent:'remarksToolTipComponent',
            cellDataType:false,
            cellStyle:{
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
            " font-variant":"normal",
            " font-weight":"300",
            " font-size":"20px",
            " font-family":"Roboto",
            "display":"block",
            'text-overflow':'ellipsis',
            'white-space':'nowrap'
            }
            // ,
            // onCellClicked:(params:any)=>{
            //     console.log(params)
            //     if(params.data.transit && params.data.transit.length>0){
            //         setActiveRow(params.data.transit)
            //         toggleSubGrid(true)
            //         return 
            //     }
            //     return setActiveRow(null)
            // }
        }
    }

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:''});
        }
      };

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getRRRData({
            filters:[],
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }

    return {
        isSideBarOpen,
        RRRColumns,
        agGridProps,
        isLoading : isRRRDataLoading || isRRRConfigLoading,
        RRRRowData,
        handleChangePage,
        RRRDataCount,
        currentPage,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack
    }
}

export default  useRRR