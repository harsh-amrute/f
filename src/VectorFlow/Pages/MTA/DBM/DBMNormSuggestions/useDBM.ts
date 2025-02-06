import { useState,useMemo,useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { useGetDBMUIConfiguration,useGetDBMData,useGetDBMDataCount,useGetDBMApplySelectedNorm} from "../../../../Services/MTA/DBM"
import { convertUiConfigToOptions, mapDBMFieldsToColDefs, mapColumnsWithConfigs  } from "../../../../../helpers/utils"
//import { useRef } from "react"
import {DBMSleepCellRenderer} from "./Sleep"
import BPRGraphCellRenderer from "../../SupplyChainIntelligenceHub/BPR/BPRGraphCellRenderer"
import {DBMTickCellRenderer} from "./dbmTick"
import { GridRef } from "../../../../../VectorFlow/types/MDM"
import {useSelector, useDispatch} from 'react-redux';
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type RootState } from "../../../../../redux/store/store";
import { DailyDataGraph } from "../../../../types/MTA"
import { useGetDailyData, useGetState } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"
import useBPRFilter from '../../../../../hooks/useBPRFilter'
import { notifyLoader, notifySuccess } from "../../../../../helpers/notify"
import { toast } from "react-toastify"
import SuggestionCategoryCellRenderer from "./SuggestionCategoryCellRendere"
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { ColDef } from 'ag-grid-community';
import useGetLastRunData from "../../../../../hooks/useGetLastRunData"

const useDBM =()=>{
    //const [DBMApplySelectedNormData,setDBMApplySelectedNormData] = useState<any[]>([])
    const gridRef = useRef<GridRef>();
    const tempRef:any = useRef()
    const [DBMRowData,setDBMRowData] = useState<any[]>([])
    const [DBMDataCount, setDBMDataCount]=useState<any>();
    // const [recordCount,setRecordCount] = useState<number>(0)

    const [internalRef,setInternalRef] = useState<any>()
    const [gridState,setGridState] = useState<any>()

    const {state:currentFilter,setState:setCurrentFilter,onDelete} = useBPRFilter()
    const [currentPage,setCurrentPage] = useState<any>(1);

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const {data,isLoading:isDBMConfigLoading} = useGetDBMUIConfiguration()
    const {mutateAsync:getDBMData} =useGetDBMData();
    const {mutateAsync:getDBMApplySelectedNorm} =useGetDBMApplySelectedNorm();
    const {mutateAsync:getDBMDataCount}=useGetDBMDataCount();

    const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
    const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
    const dailyData = useSelector((state:RootState) => state.mta.dailyData);

    const {mutateAsync:getState} = useGetState()

    const {mutateAsync:getDailyData} = useGetDailyData();
    const [generalFilterOptions,setGeneralFilterOptions] = useState();


    const dispatch = useDispatch();

    const recordsPerPage = parseInt(process.env.REACT_APP_DBM_ROWS_PER_PAGE || '50');
    const columnsToBeExcluded = ['checkbox', 'dailydatagraph', '0', 'sleep']
    const [intialColumnState, setInitialColumnState] = useState<any>(undefined);
    const [DBMColumns,setDBMColumns] = useState<ColDef[]>([])
    const {date:lastRunDate} = useGetLastRunData()

    const customCellRenderers = useMemo(() => ({
        tickCellRenderer:DBMTickCellRenderer,
        grapCellRenderer:BPRGraphCellRenderer,
        sleepCellRenderer:DBMSleepCellRenderer,
        suggestionCategoryCellRenderer:SuggestionCategoryCellRenderer
      }), []);

      useEffect(()=>{
        setGeneralFilterOptions(convertUiConfigToOptions(data?.data.data))

      },[isDBMConfigLoading])

    //   useEffect(()=>{
    //     const getTableState = async()=>{
    //       try{
    //         const data =  await getState({"reportname": "DBMNorm"})
    //         setGridState(JSON.parse(data.data.data))
    //       }catch(err:any){
    //         setGridState({
    //             charts:[],
    //             columns:[],
    //             pivot:false
    //         })
    //       }
    //     }
    //     getTableState()


    // },[])

        useEffect(()=>{
            const getTableState = async()=>{
              try{
                if(data?.data.data){
                    setInitialColumnState(data?.data.data)
                }
                const stateData =  await getState({"reportname":"DBMNorm"})
                console.log(stateData)
                if(stateData.data.data.length!==0){
                    const parsedContent = JSON.parse(stateData.data.data)
                    const generatedColumns = mapDBMFieldsToColDefs(data?.data.data,onOpenDailyDataGraph,refetchAfter)
                    const coldefs = mapColumnsWithConfigs(parsedContent.columns,generatedColumns)
                    setGridState({
                        pivot:parsedContent.pivot,
                        charts:parsedContent.charts,
                        columns:coldefs
                    })
                    console.log(parsedContent)
                    setDBMColumns(coldefs)
                }else{
                    const MappedColumns = mapDBMFieldsToColDefs(data?.data.data,onOpenDailyDataGraph,refetchAfter)
                    setGridState({
                        charts:[],
                        columns:MappedColumns,
                        pivot:false
                    })
                    setDBMColumns(MappedColumns)
                }
              }catch(err:any){
                console.log(err)
                setGridState({
                    charts:[],
                    columns:DBMColumns,
                    pivot:false
                })
              }
            }
            if(data!==undefined){
                getTableState()
            }
        },[data])
  
    useEffect(()=>{
        if(internalRef && gridState && gridState.columns){
            internalRef.api.applyColumnState({state:gridState.columns,applyOrder:true})
        }
    },[internalRef,gridState])

    const onOpenDailyDataGraph = async (params:any) => {
        const payload:any = {
            SKUCode:params.data['SKUCode'],
            WHCode:params.data['LocCode']
        }
        const result = await getDailyData(payload)
        const data = result.data.data[0];
        const dailyData:DailyDataGraph = {
            rowData:params.data,
            chartData:data['StockData'] ? data['StockData'] : [],
            normChangeData:data['NormChangeHistoryData'] ? data['NormChangeHistoryData'] : [],
            masterData:data['MasterData'][0],
            suggestionData:data['SuggestionHistoryData'] ? data['SuggestionHistoryData'] : [],
            monitoringData:data['MonitoringData']
        }
    
        dispatch(UPDATE_DAILY_DATA(dailyData));
        dispatch(TOGGLE_GRAPH_MODAL(true));

    }

    const refetchAfter = ()=>{
        getDataCount(currentFilter);
        getDBMRowData(currentFilter,currentPage);
    }
    // const DBMColumns = useMemo(()=>mapDBMFieldsToColDefs(data?.data.data,onOpenDailyDataGraph,refetchAfter),[data])

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

        const onResetCallback = async()=>{
            const MappedColumns = mapDBMFieldsToColDefs(data?.data.data,onOpenDailyDataGraph,refetchAfter)
            console.log(MappedColumns)
            setDBMColumns(MappedColumns)
        }

    const handleChangePage = async (pageNo:any) => {
        setCurrentPage(pageNo);
        getDBMRowData(currentFilter,pageNo);
     }

     const handleGoButton =  async(pageNo:any)=>{
        notifyLoader("Submitting Norms")
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
                    recordsPerPage:recordsPerPage
                }
            })
        toast.dismiss()
        notifySuccess("Submitted Successfully")
        refetchAfter()
        //console.log(rowData)
   }


    useEffect(()=>{       
        getDataCount(currentFilter);
        getDBMRowData(currentFilter,currentPage);

    },[])

   

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
            console.log(event,'from tempGridProps',{tempDownloadData:tempDownloadData})
           const columnsToBeIncluded = event?.api?.getAllDisplayedColumns().map((c)=>c.getColId()).filter((key:string)=>!columnsToBeExcluded.includes(key));
            console.log(gridRef.current?.api.getAllDisplayedColumns().map((c)=>c.getColId()))
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'DBMNormSuggestions',columnKeys:columnsToBeIncluded});
        }
      };

    const getDataCount=async (filter:any) => {
        const rowDataCount =await getDBMDataCount({
            filters:filter,
            paginationParameter:{
                pageNumber:1,
                recordsPerPage:recordsPerPage
            }
        })
        setDBMDataCount(rowDataCount?.data?.recordCount)
    }

    const getDBMRowData= async(filter:any,pageNo:any)=>{
        notifyLoader("Loading Grid Data")
        const rowData =await getDBMData({
            filters:filter,
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:recordsPerPage
            }
        })
        toast.dismiss()
        notifySuccess("Data Loaded Successfully")
        // console.log(rowData.data.data)
        setDBMRowData(rowData?.data?.data || [])
    }

    const handleApplyFilter = async(filter:any)=>{
        setCurrentFilter(filter)
        await getDataCount(filter)
        await getDBMRowData(filter,1)
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        handleApplyFilter(updatedFilter)
    }

    const onExportToExcelCallBack= async(pageNo:any)=>{
        const rowData =await getDBMData({
            filters:currentFilter,
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:5000
            }
        })
        // console.log(rowData.data.data)
        return rowData.data.data
    }


    const agGridProps:AgGridReactProps = useMemo(()=>{
        return {
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
            sideBar:defaultAgGridSideBarForBPR,
            pagination:false,
            defaultColDef:{
                floatingFilter: true,
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
            },
            onGridReady:(params)=>setInternalRef(params)
        }
    },[])

    

    return {
        DBMColumns,
        agGridProps,
        isLoading :  isDBMConfigLoading,
        DBMRowData,
        handleChangePage,
        gridRef,
        showAllCheckbox,
        DBMDataCount,
        currentPage,
        handleGoButton,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        handleApplyFilter,
        currentFilter,
        setCurrentFilter,
        onDeleteFilter,
        onExportToExcelCallBack,
        recordsPerPage,
        generalFilterOptions,
        onResetCallback,
        lastRunDate
    }
}

export default  useDBM