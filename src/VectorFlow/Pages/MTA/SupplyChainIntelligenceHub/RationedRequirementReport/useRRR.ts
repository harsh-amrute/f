import { useState,useMemo,useEffect,useRef } from "react"
import { AgGridReactProps } from "ag-grid-react"

import { useGetRRRUIConfiguration,useGetRRRData,useGetRRRDataCount } from "../../../../Services/MTA/SupplyChainIntelligenceHub/RRR"
import { useUserData } from "../../../../../context"
import { RRREcoColorCellRenderer,RRRTechColorCellRenderer,RRRDispatchColorCellRenderer } from "./RRRCellRenderers"
import { convertUiConfigToOptions, mapRRRFieldsToColDefs, updateCommonAttributes, MainMenuItemsCustomization, generateAndMapColumns, mapColumnsWithConfigs} from "../../../../../helpers/utils"
import { notifyError, notifyLoader} from "../../../../../helpers/notify"
import { toast } from "react-toastify";

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { defaultAgGridSideBarForBPR } from "../../../../../helpers/BPRConstants";
import { useGetState } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"
import { GridRef } from "../../../../../VectorFlow/types/MDM"


const useRRR =()=>{

    const [internalRef,setInternalRef] = useState<any>()

    const {isSideBarOpen} = useUserData()
    const [RRRRowData,setRRRRowData] = useState<any[]>([])
    const [RRRColumns,setRRRColumns] = useState<any[]>([])
    const [RRRDataCount, setRRRDataCount]=useState<any>();

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()
    const tempRef = useRef<GridRef>()
    const ref = useRef<GridRef>()

   

    const [currentPage,setCurrentPage] = useState<any>(1);


    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const {data,isLoading:isRRRConfigLoading} = useGetRRRUIConfiguration()
    const {mutateAsync:getRRRData} =useGetRRRData();
    const {mutateAsync:getRRRDataCount}=useGetRRRDataCount();

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()

    const [gridState,setGridState] = useState<any>()
    const [generalFilterOptions,setGeneralFilterOptions] = useState();

    const [intialColumnState, setInitialColumnState] = useState<any>(undefined);

    // const [rowData,setRowData] = useState([]);

    const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');

    // const RRRColumnData = useMemo(() => {
    //         return mapRRRFieldsToColDefs(
    //           data?.data?.data, 
    //         );
    //       }, [data]);
    //       // Update columns state only if there is a change
    //       useEffect(() => {
    //         // Check if the columns data has changed before setting state
    //         setRRRColumns(RRRColumnData);
    //       }, [RRRColumnData, setRRRColumns]); 

    // const RRRColumns = useMemo(()=>mapRRRFieldsToColDefs(data?.data.data),[data])

  
    useEffect(()=>{       
        const fetchData = async () => {
            await getDataCount();
            await getRRRRowData(currentPage);
            setGeneralFilterOptions(convertUiConfigToOptions(data?.data.data))
        };
        fetchData();
    }, [isRRRConfigLoading]);
    
    // useEffect(()=>{
    //     const getTableState = async()=>{
    //       try{
    //         const data =  await getState({reportname:"RRR"})
    //         const parsedContent = JSON.parse(data.data.data)
    //         setGridState(parsedContent)
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
                const stateData =  await getState({"reportname":"RRR"})
                console.log(stateData)
                if(stateData.data.data.length!==0){
                    const parsedContent = JSON.parse(stateData.data.data)
                    const generatedColumns = generateAndMapColumns('RRR',data?.data.data,false,false,false,undefined,undefined,undefined)
                    const coldefs = mapColumnsWithConfigs(parsedContent.columns,generatedColumns)
                    setGridState({
                        pivot:parsedContent.pivot,
                        charts:parsedContent.charts,
                        columns:coldefs
                    })
                    console.log(parsedContent)
                    setRRRColumns(coldefs)
                }else{
                    const MappedColumns = generateAndMapColumns('RRR',data?.data.data,false,false,false,undefined,undefined,undefined)
                    setGridState({
                        charts:[],
                        columns:MappedColumns,
                        pivot:false
                    })
                    setRRRColumns(MappedColumns)
                }
              }catch(err:any){
                console.log(err)
                setGridState({
                    charts:[],
                    columns:RRRColumns,
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
            internalRef.api.applyColumnState({state:RRRColumns,applyOrder:true})
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

    const onResetCallback = async()=>{
      const MappedColumns = generateAndMapColumns('BPR',intialColumnState,false,false,false,undefined,undefined,undefined)
        // const ResetColumns = RRRColumns.map((t:any) => {
        //     return {
        //       ...t,
        //       hide: false,
        //     };
        //   });
        setRRRColumns(MappedColumns)
    }

    const getDataCount=async (filter?:any) => {
        const rowDataCount =await getRRRDataCount({
            filters:filter || currFilter,
            paginationParameter:{
                pageNumber:1,
                recordsPerPage: rowsPerPage
            }
        })
        setRRRDataCount(rowDataCount?.data?.recordCount)
    }

    const getRRRRowData= async(pageNo:any)=>{
        try{
            if(RRRDataCount===0){
                await getDataCount(currFilter);
            }
            notifyLoader("Loading Grid Data")
            const rowData =await getRRRData({
                filters:currFilter,
                paginationParameter:{
                    pageNumber:pageNo,
                    recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')
                }
            })
            
        
        // setRecordCount(rowData.data.recordCount)
            setCurrentPage(pageNo)
            setRRRRowData(rowData?.data?.data)
            toast.dismiss()
        }catch(err:any){
            notifyError(err)
        }
    }

    const onApplyFilter = async(filter:any)=>{
        try {
          await getDataCount(filter);
          notifyLoader("Loading Grid Data");
          const rowData = await getRRRData({
            filters: filter,
            paginationParameter: {
              pageNumber: 1,
              recordsPerPage: parseInt(
                process.env.REACT_APP_RRR_ROWS_PER_PAGE || "100"
              ),
            },
          });

          // setRecordCount(rowData.data.recordCount)
          setCurrFilter(filter);
          setCurrentPage(1);
          setRRRRowData(rowData?.data?.data);
          toast.dismiss();
        } catch (err: any) {
          notifyError(err);
          setRRRRowData([])
          setRRRDataCount(0)
        }
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }

    const onColumnVisible = (event: any) => {
        const { column, visible } = event;
        console.log(column)
        // Optionally, you can update your state if needed (like in a sidebar with checkboxes)
        if(column!==null){
        setRRRColumns((prevColumns:any) =>
          prevColumns.map((col:any) =>
            col.field === column.colId ? { ...col, hide:!visible } : col
          )
        );
        }
    };

    const customCellRenderers = useMemo(() => (   
        {
        grapCellRenderer:'',
        colorTechCellRenderer:RRRTechColorCellRenderer,
        colorEcoCellRenderer:RRREcoColorCellRenderer,
        colorDispatchRender:RRRDispatchColorCellRenderer
      }), []);

      
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
            // onColumnVisible: onColumnVisible,
            pagination:false,
            sideBar:defaultAgGridSideBarForBPR,       
            getMainMenuItems: MainMenuItemsCustomization,
            paginationPageSize:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '200'),
            suppressRowClickSelection:true,
            components:customCellRenderers,
            enableBrowserTooltips:true,
            defaultColDef:defaultColDefObject,
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


    const tempAgGridProps:AgGridReactProps =  {
          onRowDataUpdated:(event)=>{
            if(tempDownloadData) event?.api?.exportDataAsExcel({fileName:'RationedRequirementReport', columnKeys:ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId())});
           }
        }
      

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getRRRData({
            filters:currFilter,
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
        isLoading :  isRRRConfigLoading,
        RRRRowData,
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
        onExportToExcelCallBack,
        getRRRRowData,
        onApplyFilter,
        currFilter,
        setCurrFilter,
        onDeleteFilter,
        isSavedDataLoading,
        ref,
        generalFilterOptions,
        onResetCallback
    }
}

export default  useRRR


