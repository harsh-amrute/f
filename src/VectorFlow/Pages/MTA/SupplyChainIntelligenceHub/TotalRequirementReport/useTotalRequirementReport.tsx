import { useState,useMemo,useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetRRRDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/RRR"
import { useUserData } from "../../../../../context"
import { RRREcoColorCellRenderer,RRRDispatchColorCellRenderer } from "../RationedRequirementReport/RRRCellRenderers"
import { convertUiConfigToOptions,  mapTotalRequirementFieldsToColDefs } from "../../../../../helpers/utils"
import { notifyError} from "../../../../../helpers/notify"

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import {  useGetState, useGetUiConfig } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR"
import { GridRef } from "../../../../types/MDM"
import { ColDef } from "ag-grid-enterprise"

import {RowData} from '../../../../../mock-data/RRR-Color-Bandwise'
import { TextToTextColorMapper } from "../BPR/BPRCellRenderers"
// import { type DailyDataGraph } from "../../../../types/MTA";
// import { useDispatch } from "react-redux"
// import { TOGGLE_GRAPH_MODAL, UPDATE_DAILY_DATA } from "../../../../../redux/actions/MTA"
import BPRGraphCellRenderer from "../BPR/BPRGraphCellRenderer"


const useTotalRequirementReport =()=>{

    const [internalRef,setInternalRef] = useState<any>()

    const {isSideBarOpen} = useUserData()

    const [rowData,setRowData] = useState<any[]>(RowData)

    const [colDefs,setColDefs] = useState<Array<ColDef>>([])

    const [recordCount, setRecordCount]=useState<any>(30);

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const tempRef = useRef()

    const ref = useRef<GridRef>()

    // const dispatch = useDispatch()
   

    const [currentPage,setCurrentPage] = useState<any>(1);


    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const {mutateAsync:getUiConfig,isLoading:isRRRBandwiseConfigLoading} = useGetUiConfig()

    // const {mutateAsync:getRRRBandwiseData} =useGetRRRData();

    const {mutateAsync:getRRRBandwiseDataCount}=useGetRRRDataCount();

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()

    const [gridState,setGridState] = useState<any>()

    // const [rowData,setRowData] = useState([]);


    const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');

    // const RRRColorBandWiseColumns = useMemo(()=>mapRRRColorBandWiseFieldsToColDefs(data?.data.data),[data])

  
    useEffect(()=>{       
        const fetchData = async () => {
            // await getBandwiseDataCount();
            await getRRRColorBandWiseUiConfig()
            // await getRRRBandwiseRowData(currentPage);
            
        };
        fetchData();
    }, []);
    
    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("RRRColorBandWise")
            setGridState(JSON.parse(data.data.data))
          }catch(err:any){
            setGridState({
                charts:[],
                columns:[],
                pivot:false
            })
          }
        }
        getTableState()
    },[])
  
    useEffect(()=>{
        if(internalRef){
            console.log('in if')
            internalRef.api.applyColumnState({state:gridState.columns })
        }
    },[internalRef,gridState])
    // const getRecordsCount=async(filter?:any)=>{
    //     const payload={
    //     filters:filter || currFilter,
    //     paginationParameter: {
    //     pageNumber: currentPage,
    //     // recordPerPage:20
    //     recordsPerPage: parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100')
    //     }
    // }
    // const resultCount=await getRRRDataCount(payload);
    // setRecordCount(resultCount?.data?.recordCount);
    // }

    // const loadGridData = async (pageNo:any,filter?:any)=> {
    // const payload={
    //     filters:filter || currFilter,
    //     paginationParameter:{pageNumber:pageNo,recordsPerPage:rowsPerPage}
    // }
    // const result = await getRRRData(payload);
    // setRRRRowData(result?.data.data)

    // }

    // const onOpenDailyDataGraph = async (params:any) => {
    //     const payload:any = {
    //         SKUCode:params.data['SKUCode'],
    //         WHCode:params.data['WHCode']
    //     }
    //     const result = await getDailyData(payload)
    //     const data = result.data.data[0];
    //     const dailyData:DailyDataGraph = {
    //         rowData:params.data,
    //         chartData:data['StockData'],
    //         normChangeData:data['NormChangeHistoryData'],
    //         masterData:data['MasterData'][0],
    //         suggestionData:data['SuggestionHistoryData'] ? data['SuggestionHistoryData'] : [],
    //         monitoringData:data['MonitoringData']
    //     }
  
    //     dispatch(UPDATE_DAILY_DATA(dailyData));
    //     dispatch(TOGGLE_GRAPH_MODAL(true));
    // }

    const getBandwiseDataCount=async (filter?:any) => {
        const rowDataCount =await getRRRBandwiseDataCount({
            filters:filter || currFilter,
            paginationParameter:{
                pageNumber:1,
                recordsPerPage: rowsPerPage
            }
        })
        setRecordCount(rowDataCount?.data?.recordCount)
    }

    const getRRRColorBandWiseUiConfig = async()=>{
        try{
            const response = await getUiConfig('RRR_OA')
            setColDefs(mapTotalRequirementFieldsToColDefs(response.data.data))
        }catch(err:any){
            notifyError("Something Went Wrong")
        }
    }

    // const getRRRBandwiseRowData= async(pageNo:any)=>{
    //     try{
    //         if(RRRBandwiseDataCount===0){
    //             await getBandwiseDataCount(currFilter);
    //         }
    //         notifyLoader("Loading Grid Data")
    //         const rowData =await getRRRBandwiseData({
    //             filters:currFilter,
    //             paginationParameter:{
    //                 pageNumber:pageNo,
    //                 recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')
    //             }
    //         })
            
        
    //     // setRecordCount(rowData.data.recordCount)
    //         setCurrentPage(pageNo)
    //         setRRRBandwiseRowData(rowData?.data?.data)
    //         toast.dismiss()
    //     }catch(err:any){
    //         notifyError(err)
    //     }
    // }

    const onApplyFilter = async(filter:any)=>{
        console.debug(filter)
        // try {
        //   await getBandwiseDataCount(filter);
        //   notifyLoader("Loading Grid Data");
        //   const rowData = await getRRRBandwiseData({
        //     filters: filter,
        //     paginationParameter: {
        //       pageNumber: 1,
        //       recordsPerPage: parseInt(
        //         process.env.REACT_APP_RRR_ROWS_PER_PAGE || "100"
        //       ),
        //     },
        //   });

        //   // setRecordCount(rowData.data.recordCount)
        //   setCurrFilter(filter);
        //   setCurrentPage(1);
        //   setRRRBandwiseRowData(rowData?.data?.data);
        //   toast.dismiss();
        // } catch (err: any) {
        //   notifyError(err);
        //   setRRRBandwiseRowData([])
        //   setRRRBandwiseDataCount(0)
        // }
        return 
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }

    const customCellRenderers = useMemo(() => (   
        {
        grapCellRenderer:BPRGraphCellRenderer,
        colorCellRenderer:TextToTextColorMapper,
        colorEcoCellRenderer:RRREcoColorCellRenderer,
        colorDispatchRender:RRRDispatchColorCellRenderer
        
      }), []);

    const agGridProps:AgGridReactProps = useMemo(()=>{
        return{
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
            sideBar:defaultAgGridSideBarForBPR,
            // overlayLoadingTemplate:'<object style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%) scale(2)" type="image/svg+xml" data="/assets/img/VectorFLOW/loaderMedium.svg" aria-label="loading"></object>',
            // rowSelection:'multiple',
            paginationPageSize:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200'),
            suppressRowClickSelection:true,
            components:customCellRenderers,
            enableBrowserTooltips:true,
            defaultColDef:{
                floatingFilter: true,
                // filter: "agMultiColumnFilter",
                // tooltipComponent:'remarksToolTipComponent',
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
            },
            onGridReady:(params)=>setInternalRef(params)      
        }
    
    },[])
    // const getRRRrowData=async(filter:BPRFilterState)=>{
    //     setActiveRow({})
    //     setCurrFilter(filter)



    //     if(filter)setCurrFilter(filter)
    //     try{
    //         if(recordCount===0 || filter){
    //             await getRecordsCount(filter)
    //             setCurrGridPage(currGridPage)
    //         }
    //         notifyLoader("Loading Grid Data")
    //         await loadGridData(currentPage,filter)
    //         toast.dismiss()
    //      }
    //    catch(err:any){
    //         notifyError(err)
    //     }
    // }


    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'TotalRequirementReport', columnKeys:ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId())});
        }
      };

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        console.debug(pageNumber)
        // const data =  await getRRRBandwiseData({
        //     filters:currFilter,
        //     paginationParameter:{
        //         pageNumber:pageNumber,
        //         recordsPerPage:5000
        //     }
        // })
        return rowData
        // return data.data.data
    }

    const generalFilterOptions = useMemo(()=>{
        return convertUiConfigToOptions(colDefs)
    },[colDefs])

    return {
        isSideBarOpen,
        colDefs,
        agGridProps,
        isLoading :  isRRRBandwiseConfigLoading,
        rowData,
        recordCount,
        currentPage,
        setCurrentPage,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack,
        // getRRRBandwiseRowData,
        onApplyFilter,
        currFilter,
        setCurrFilter,
        onDeleteFilter,
        isSavedDataLoading,
        getBandwiseDataCount,
        ref,
        generalFilterOptions,
        setRowData
    }
}

export default  useTotalRequirementReport


