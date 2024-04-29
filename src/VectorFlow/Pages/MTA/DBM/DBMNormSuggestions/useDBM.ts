import { useState,useMemo,useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useGetDBMUIConfiguration,useGetDBMData,useGetDBMDataCount,useGetDBMApplySelectedNorm} from "../../../../Services/MTA/DBM"
import { useUserData } from "../../../../../context"
import { mapDBMFieldsToColDefs } from "../../../../../helpers/utils"
//import { useRef } from "react"
import {DBMGraphCellRenderer,DBMSleepCellRenderer} from "./Sleep"
import {DBMTickCellRenderer} from "./dbmTick"
import { GridRef } from "../../../../../VectorFlow/types/MDM"

const useDBM =()=>{
    //const [DBMApplySelectedNormData,setDBMApplySelectedNormData] = useState<any[]>([])
    const gridRef = useRef<GridRef>();
    const {isSideBarOpen} = useUserData()
    const [DBMRowData,setDBMRowData] = useState<any[]>([])
    const [DBMDataCount, setDBMDataCount]=useState<any>();
    // const [recordCount,setRecordCount] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<any>(1);

    const {data,isLoading:isDBMConfigLoading} = useGetDBMUIConfiguration()
    const {mutateAsync:getDBMData,isLoading:isDBMDataLoading} =useGetDBMData();
    const {mutateAsync:getDBMApplySelectedNorm,isLoading:isDBMApplySelectedNorm} =useGetDBMApplySelectedNorm();
    const {mutateAsync:getDBMDataCount}=useGetDBMDataCount();

    const customCellRenderers = useMemo(() => ({
        tickCellRenderer:DBMTickCellRenderer,
        grapCellRenderer:DBMGraphCellRenderer,
        sleepCellRenderer:DBMSleepCellRenderer,
      }), []);

    const DBMColumns = mapDBMFieldsToColDefs(data?.data.data)

    const showAllCheckbox = () => {
        const rows:any[] = []
        let allSelected = true;

            gridRef.current?.api.forEachNode((n) => {
                rows.push(n);
                if (!n.isSelected()) {
                    allSelected = false;
                }
            });

            if (allSelected) {
                gridRef.current?.api.deselectAll();
            } else {
                gridRef.current?.api.selectAll();
            }
    }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        getDBMRowData(pageNo);
     }

     const handleGoButton =  async(pageNo:any)=>{
        console.debug(pageNo)
        // const handleGoButton =  ()=>{
        const selectedRows = gridRef.current?.api.getSelectedRows();
        //console.log(selectedRows)
        const extractedData:any = selectedRows?.map (items => ({
            SKUCode:items.SKUCode,
            WHCode:items.LocCode
        }));

        //const rowData:any =await getDBMApplySelectedNorm({
            await getDBMApplySelectedNorm({
                data:extractedData,
                filters:[],
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:50
                }
            })
        //console.log(rowData)
   }


    useEffect(()=>{       
        getDataCount();
        getDBMRowData(currentPage);
    },[])

    const getDataCount=async () => {
        const rowDataCount =await getDBMDataCount({
            filters:[],
            paginationParameter:{
                pageNumber:1,
                recordsPerPage:50
            }
        })
        setDBMDataCount(rowDataCount?.data?.recordCount)
    }

    const getDBMRowData= async(pageNo:any)=>{
        const rowData =await getDBMData({
            filters:[],
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:50
            }
        })
        // console.log(rowData.data.data)
        setDBMRowData(rowData?.data?.data)
    }

    const agGridProps:AgGridReactProps = {
        tooltipShowDelay:0,
        tooltipTrigger:"focus",
        readOnlyEdit:true,
        suppressRowClickSelection:true,
        components:customCellRenderers,
        enableBrowserTooltips:true,
        rowSelection:'multiple',
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
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
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
        }
    }

    return {
        isSideBarOpen,
        DBMColumns,
        agGridProps,
        isLoading : isDBMDataLoading || isDBMConfigLoading || isDBMApplySelectedNorm,
        DBMRowData,
        handleChangePage,
        gridRef,
        showAllCheckbox,
        DBMDataCount,
        currentPage,
        handleGoButton,
    }
}

export default  useDBM