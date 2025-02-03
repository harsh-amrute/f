import { useState,useMemo, useEffect, CSSProperties,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetBPRData, useGetBPRUIConfiguration, useGetBPRRemarkHistory, useSubmitBPRRemark, useGetDailyData, useGetBPRDataCount,useGetState } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR"
import { BPREcoColorCellRenderer,BPRRemarksCellRenderer,BPRSubmitRemarkCellRenderer,BPRTagsCellRenderer,BPRTechColorCellRenderer } from "./BPRCellRenderers"
import { convertUiConfigToOptions, mapBPRFieldsToColDefs, mapBPRRowData, updateCommonAttributes, MainMenuItemsCustomization, generateAndMapColumns, mapColumnsWithConfigs } from "../../../../../helpers/utils"
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify"
import { toast } from "react-toastify"
import BPRGraphCellRenderer from "./BPRGraphCellRenderer"
import useViewPort from "../../../../../hooks/useViewPort"
import type { RootState } from '../../../../../redux/store/store';
import { useSelector, useDispatch } from 'react-redux';
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import { type DailyDataGraph } from "../../../../types/MTA";
import useBPRFilter from "../../../../../hooks/useBPRFilter"
import { useUserData } from "../../../../../context"
// import _ from 'lodash'
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import useGetLastRunData from "../../../../../hooks/useGetLastRunData"
import { GridRef } from "../../../../../VectorFlow/types/MDM"
import { getBPRDataForExcelDownload } from "../../../../Services/MTA/SupplyChainIntelligenceHub/BPR/api"


const useBPR =()=>{


    const ref = useRef<GridRef>()
    const tempRef = useRef<GridRef>()

    const [internalRef,setInternalRef] = useState<any>()

    const {getGridZoom,getScreenZoomValue} = useViewPort()
    const dispatch = useDispatch();

    const gridZoom = getGridZoom()
    const screenZoom = getScreenZoomValue() 

    const {user} = useUserData()
    const themeUi = user.user.theme_ui

    const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
    const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
    const dailyData = useSelector((state:RootState) => state.mta.dailyData);

    const [editedRows,setEditedRows] = useState<Array<any>>([])

    const [isSubGridOpen,toggleSubGrid] = useState<boolean>(true)
    const [currGridPage,setCurrGridPage] = useState<number>(1)
    const [recordCount,setRecordCount] = useState<number>(0)
    const [activeRow,setActiveRow] = useState<any>()
    const [BPRRowData,setBPRRowData] = useState<any[]>([])
    const [BPRColumns,setBPRColumns] = useState<any[]>([])


    const [submitRemarkToolTipPosition,setSubmitRemarkToolipPosition] = useState<CSSProperties>({})
    const [remarkHistoryToolipPosition,setRemarkHistoryToolipPosition] = useState<CSSProperties>({})

    const [isSubmitRemarkToolTipOpen,setIsSubmitRemarkToolTipOpen] = useState<boolean>(false)
    const [isRemarkHistoryToolTipOpen,setIsRemarkHistoryToolTipOpen] = useState<boolean>(false)
   
    const [remark,setRemark] = useState<string>('')

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const [remarkHistory,setRemarkHistory] = useState<any[]>([])
  
    const {data,isLoading:isBPRUILoading,isError} = useGetBPRUIConfiguration()
   
   
      
    const {date:lastRunDate} = useGetLastRunData()
    
    const {mutateAsync:getBPRData,isLoading:isRowDataLoading} = useGetBPRData()

    const {mutateAsync:submitRemark} = useSubmitBPRRemark()

    const {mutateAsync:getRemarkHistory} = useGetBPRRemarkHistory()

    const {mutateAsync:getDailyData} = useGetDailyData();

    const {mutateAsync:getBPRDataCount,isLoading:isBPRDataCountLoading} = useGetBPRDataCount()

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const [gridState,setGridState] = useState<any>()
    const [generalFilterOptions,setGeneralFilterOptions] = useState();
    const columnsNotToBeIncluded = ['remarks','rh','dailydatagraph']
    const [intialColumnState, setInitialColumnState] = useState<any>(undefined);


  
    useEffect(()=>{
        getInitialBPRRowData()
        setGeneralFilterOptions(convertUiConfigToOptions(data?.data.data))
    },[isBPRUILoading])

    useEffect(()=>{
        const getTableState = async()=>{
          try{
            if(data?.data.data){
                setInitialColumnState(data?.data.data)
            }
            const stateData =  await getState({"reportname":"BPR"})
            console.log(stateData)
            if(stateData.data.data.length!==0){
                const parsedContent = JSON.parse(stateData.data.data)
                const generatedColumns = generateAndMapColumns('BPR',data?.data.data,true,true,true, onOpenSubmitRemark,  onOpenRemarkHistory, onOpenDailyDataGraph)
                const coldefs = mapColumnsWithConfigs(parsedContent.columns,generatedColumns)
                setGridState({
                    pivot:parsedContent.pivot,
                    charts:parsedContent.charts,
                    columns:coldefs
                })
                console.log(parsedContent)
                setBPRColumns(coldefs)
            }else{
                const MappedColumns = generateAndMapColumns('BPR',data?.data.data,true,true,true, onOpenSubmitRemark,  onOpenRemarkHistory, onOpenDailyDataGraph)
                setGridState({
                    charts:[],
                    columns:MappedColumns,
                    pivot:false
                })
                setBPRColumns(MappedColumns)
            }
          }catch(err:any){
            console.log(err)
            setGridState({
                charts:[],
                columns:BPRColumns,
                pivot:false
            })
          }
        }
        if(data!==undefined){
            getTableState()
        }
    },[data])

    useEffect(()=>{
        if(internalRef && gridState && gridState.columns && gridState.columns.length!==0){
            const colState = internalRef.current?.api?.getColumnState();
            // console.log("CHANGING",internalRef.api)
            // const StateColumns = updateCommonAttributes(gridState.columns,BPRColumns,'colId')
            // console.log(StateColumns)
            // setBPRColumns(StateColumns)
            // setBPRColumns(gridState.columns)
            internalRef.api.applyColumnState({state:colState,applyOrder:true})
        }
    },[internalRef,gridState])

    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer,
        submitRemarkCellRenderer:BPRSubmitRemarkCellRenderer,
        remarksCellRenderer:BPRRemarksCellRenderer
      }), []);


      const onColumnVisible = (event: any) => {
        const { column, visible , columns } = event;
        // console.log(column)
        // Optionally, you can update your state if needed (like in a sidebar with checkboxes)
        if(column!==null && column.colId!=="dailydatagraph" && event.source==='toolPanelUi'){
        setBPRColumns((prevColumns:any) =>{
            const updatedColumns = prevColumns.map((col: any) =>
                col.field === column.colId
                  ? { ...col, hide: !visible }
                  : col
              );
            
              // Check if any columns, except the one with colId === "dailydatagraph", have hide: false
              const anyColumnWithHideFalse = updatedColumns.some(
                (col: any) => col.colId !== "dailydatagraph" && col.hide === false
              );
            
              // Now map over the updated columns and ensure dailydatagraph's hide is updated accordingly
              return updatedColumns.map((col: any) =>
                col.colId === "dailydatagraph"
                  ? { ...col, hide: anyColumnWithHideFalse ? false : col.hide }
                  : col
              );
        }
        );
        }else if(columns.length>1 && event.source==='toolPanelUi'){
            setBPRColumns((prevColumns: any) => {
                // Create a new array with updated columns, excluding 'dailydatagraph
                if(visible===true){
                    return  prevColumns.map((col: any) => ({ ...col, hide: false }))
                }else{
                    const updatedColumns = prevColumns.map((col: any) =>
                        col.colId === "dailydatagraph"
                          ? col // Exclude this column for now
                          : col.field === columns.find((column: any) => column.colId === col.colId)?.colId
                          ? { ...col, hide: !visible }
                          : col
                      );
                    
                      // Check if all columns except 'dailydatagraph' have `hide: true`
                      const allHidden = updatedColumns.every(
                        (col: any) => col.colId === "dailydatagraph" || col.hide
                      );
                    
                      // Update 'dailydatagraph' column's `hide` property if all others are hidden
                      return updatedColumns.map((col: any) =>
                        col.colId === "dailydatagraph" && allHidden ? { ...col, hide: true } : col
                      );
                }
              });
              
            // setBPRColumns((prevColumns:any) =>
            //     prevColumns.map((col: any) =>
            //         col.colId === "dailydatagraph"
            //         ? col // Exclude this column from being updated
            //         : col.field === columns.find((column: any) => column.colId === col.colId)?.colId
            //         ? { ...col, hide: !visible }
            //         : col
            //       )              
            //   );
        }
      };


      const defaultColDefObject = useMemo(()=>{
        return {
            floatingFilter: true,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
      },[])




  
    const agGridProps:AgGridReactProps = useMemo(()=>{

        return {
        
            suppressRowTransform:true,
            // rowSelection:'single',
            readOnlyEdit:false,
            enableColResize: true,
            sideBar:defaultAgGridSideBarForBPR,
            getMainMenuItems: MainMenuItemsCustomization,
            enableFillHandle: true,
            rowSelection:"single",
            paginationPageSize:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),
            onRowSelected:(params:any)=>{
                if(params.data.intransit && params.data.intransit.length>0){
                    setActiveRow(params.data.intransit)
                    toggleSubGrid(true)
                }
            },
            gridOptions:{
                rowHeight:50,
                getRowStyle: (params: any) => {
                if (params.node.rowIndex % 2 === 0) {
                    return { background: "#EBEBEB" };
                }
                return { background: "#F7F7F7" };
                },
                // onColumnVisible: onColumnVisible,
                getRowId: (params) => {
                    return `${params.data.SKUCode}-${params.data.WHCode}`
                },
            },
            // suppressRowClickSelection:true,
            components:customCellRenderers,
            defaultColDef:defaultColDefObject,
            onCellValueChanged:(params)=>onCellValueChanged(params.data,"SKUCode","WHCode"),
            onGridReady:(params)=>setInternalRef(params)
        }
    },[])


    const tempAgGridProps:AgGridReactProps = useMemo(()=>{
        return  {
            onRowDataUpdated:(event)=>{
                const columnsToBeIncluded = ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId()).filter((key:string)=>!columnsNotToBeIncluded.includes(key));
                if(tempDownloadData){
                    event.api.exportDataAsExcel({fileName:'BufferPenetrationReport',columnKeys:columnsToBeIncluded})
                    setTempDownloadData(false)
                }
            }
          };
    },[])

      const getInitialBPRRowData=async()=>{
        try{
            await getBPRRecordCount(currFilter)
            await getBPRRowData(currFilter,1)
        }catch(err:any){
            notifyError(err)
        }
    }

    const getBPRRecordCount = async(filter:any)=>{
        const countData = await getBPRDataCount({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:currGridPage,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })

        setRecordCount(countData.data.recordCount)
    }

    const onCellValueChanged = (newRow: any, primaryKey1: string,primaryKey2:string) => {
        setEditedRows((prev) => {
          let found = false; // Flag to track if the row has been updated
          const updatedRows = prev.map((row) => {
            if (row[primaryKey1] === newRow[primaryKey1] && row[primaryKey2]===newRow[primaryKey2]) {
              found = true;
              return newRow.remarks && newRow.remarks.length !== 0 ? { ...newRow } : null; // Return updated row 
            }
            return row; // Return unchanged row
          });

          const filteredUpdatedRows = updatedRows.filter(row => row !== null);
      
          if (!found && newRow.remarks && newRow.remarks.length > 0) {
            // If no existing row was found, add the new row
            return [...filteredUpdatedRows, {...newRow}];
          }
          return filteredUpdatedRows;
        });
      };

    const getBPRRowData = async(filter:any,pageNo:number)=>{
        notifyLoader("Loading Grid Data")
        const rowData =await  getBPRData({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })
        toast.dismiss()
        if(rowData.data.data && Array.isArray(rowData.data.data))setBPRRowData(mapBPRRowData(rowData.data.data))
        else setBPRRowData([])
        
    }



    const updateRemark = (e:any)=>setRemark(e.currentTarget.value)
    

    // const onSubmitRemark = async()=>{
        
    //     try{
    //         if(remark.length===0) throw new Error("Remark cannot be empty")
    //         const toastId = notifyLoader("Submitting Remark")
    //         const {data} = await submitRemark({
    //             remark:remark,
    //             whcode:submitRemarkData.whcode,
    //             skucode:submitRemarkData.skucode
    //         })
    //         toast.dismiss(toastId)
    //         // if(data.status!==200)notifyError('Something went wrong')
            
    //         notifySuccess(data.msg)
    //         setRemark('')
            
    //         setIsSubmitRemarkToolTipOpen(false)
    //     }catch(err:any){
    //         notifyError(err.message)
    //     }
    // }

    const onSubmitRemarks = async()=>{
        try{
         if(editedRows.length===0){
             notifyError('Please add remarks/remark to save')
             return
         }
         const toastId = notifyLoader("Submitting Remark")
         const payload = editedRows.map((e)=>{
             return {
                 remark:e.remarks,
                 whcode:e.WHCode,
                 skucode:e.SKUCode
             }
            
         })
         const {data} = await submitRemark({data:payload})
         editedRows.forEach((editedRow) => {
             // Find the row node using both SKUCode and WHCode as unique identifiers
             const rowNode:any = ref.current?.api.getRowNode(`${editedRow.SKUCode}-${editedRow.WHCode}`);
             if (rowNode) {
                 const RemarkColumn = BPRColumns.find(obj => obj.colId === "Remark");
                 if(rowNode?.data?.Remark!==undefined && RemarkColumn!==undefined){
                     // Check if Remark column exist in both columnDef and RowData , only then update its value for better ui
                     rowNode?.setDataValue('Remark', editedRow?.remarks);
                 }
             // Clear the remarks input field after storing data in db
               rowNode?.setDataValue('remarks', '');
             }
           });
         toast.dismiss(toastId)
         notifySuccess(data.msg)
         setEditedRows([])
        }catch(err:any){
         notifyError(err.message)
        }
     }
    
    

    const onCloseSubmitRemark =()=>setIsSubmitRemarkToolTipOpen(false)


    const onCloseRemarkHistory = ()=>setIsRemarkHistoryToolTipOpen(false)


    const onOpenSubmitRemark = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setSubmitRemarkToolipPosition({
            top: top * gridZoom * screenZoom,
            left: left * gridZoom * screenZoom,
        })
        setIsSubmitRemarkToolTipOpen(true)

    }

    const onOpenRemarkHistory = async(e:React.MouseEvent<HTMLElement>,row:any)=>{
        try{
            setIsRemarkHistoryToolTipOpen(false)
            const toastId = notifyLoader("Getting remark history")
            const {top,left} = e.currentTarget.getBoundingClientRect()
            setRemarkHistoryToolipPosition({
                top: top *  gridZoom * screenZoom,
                left: left *  gridZoom * screenZoom,
                height:360,
                width:350
            })
            const {data} = await getRemarkHistory(row)
            toast.dismiss(toastId)
            setRemarkHistory(data.data)
            setIsRemarkHistoryToolTipOpen(true)
        }catch(err:any){
            notifyError(err.message)
        }
    }

    const onOpenDailyDataGraph = async (params:any) => {
        const payload:any = {
            SKUCode:params.data['SKUCode'],
            WHCode:params.data['WHCode']
        }
        const result = await getDailyData(payload)
        console.log("RESULT",result)
        const data = result.data.data[0];
        const dailyData:DailyDataGraph = {
            rowData:params.data || [],
            chartData:data['StockData'] || [],
            normChangeData:data['NormChangeHistoryData'] || [],
            masterData:data['MasterData']?.[0] || [],
            suggestionData:data['SuggestionHistoryData'] ? data['SuggestionHistoryData'] : [],
            monitoringData:data['MonitoringData'] || []
        }
        console.log(dailyData)
        dispatch(UPDATE_DAILY_DATA(dailyData));
        dispatch(TOGGLE_GRAPH_MODAL(true));
    }

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const rowDta =  await getBPRDataForExcelDownload({
            id:1,
            name:'',
            fields:[],
            filters:currFilter,
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        return rowDta.data.data
    }

    const onResetCallback = async()=>{
        const MappedColumns = generateAndMapColumns('BPR',intialColumnState,true,true,true, onOpenSubmitRemark,  onOpenRemarkHistory, onOpenDailyDataGraph)
        console.log(MappedColumns)
        // const ResetColumns = BPRColumns.map((t:any) => {
        //     return {
        //       ...t,
        //       hide: false,
        //     };
        //   });
        setBPRColumns(MappedColumns)
    }


    const handleOnPageChange = async(pageNumber:number)=>{
        setCurrGridPage(pageNumber)
        await getBPRRowData(currFilter,pageNumber)
    }

    const onApplyFilter = (filter:any)=>{
        setCurrFilter(filter)
        getBPRRecordCount(filter)
        setCurrGridPage(1)
        getBPRRowData(filter,1)
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }

    const rowsPerPage = useMemo(()=>parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),[]) 
    
    // const BPRColumnData = useMemo(() => {
    //     return mapBPRFieldsToColDefs(
    //       data?.data?.data, 
    //       onOpenSubmitRemark, 
    //       onOpenRemarkHistory, 
    //       onOpenDailyDataGraph
    //     );
    //   }, [data]);
    //   // Update columns state only if there is a change
    //   useEffect(() => {
    //     // Check if the columns data has changed before setting state
    //     setBPRColumns(BPRColumnData);
    //   }, [BPRColumnData, setBPRColumns]); 
    
    return {
        isSubGridOpen,
        isLoading :  isBPRUILoading || isBPRDataCountLoading,
        isError,
        activeRow,
        BPRColumns,
        BPRRowData,
        agGridProps,
        remark,
        remarkHistory,
        isRemarkHistoryToolTipOpen,
        remarkHistoryToolipPosition,
        isSubmitRemarkToolTipOpen,
        submitRemarkToolTipPosition,
        updateRemark,
        setIsSubmitRemarkToolTipOpen,
        setSubmitRemarkToolipPosition,
        toggleSubGrid,
        setActiveRow,
        onSubmitRemarks,
        onCloseRemarkHistory,
        onCloseSubmitRemark,
        dailyData,
        showDailyDataGraphModal,      
        handleOnPageChange,       
        recordCount,
        currGridPage,
        rowsPerPage,
        showNormChangeHistoryTable,
        ref,
        isSavedDataLoading,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        // getBPRRowData,
        onExportToExcelCallBack,
        currFilter,
        onDelete,
        setCurrFilter,
        onApplyFilter,
        themeUi,
        editedRows,
        onDeleteFilter,
        isRowDataLoading,
        gridState,
        lastRunDate,
        generalFilterOptions,
        onResetCallback

    }
}

export default useBPR