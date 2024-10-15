
import { useGetSDRUIConfiguration ,useGetSDRData,useGetSDRDataCount} from '../../../../Services/MTA/SupplyChainIntelligenceHub/SupplierDispatchReport/index';
import { convertUiConfigToOptions, getColumnsForExcelExport, mapVDRFieldsToColDefs } from '../../../../../helpers/utils';
import { useEffect, useState,useRef,useMemo } from 'react';
import { notifyError,notifyLoader } from '../../../../../helpers/notify';
import useBPRFilter from '../../../../../hooks/useBPRFilter';
import { toast } from 'react-toastify';
import { AgGridReactProps } from 'ag-grid-react';
import {SDRDispatchColorCellRenderer} from './SDRCellRenderers'
import { useGetState } from '../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR';
import { defaultAgGridSideBarForBPR } from '../../../../../helpers/BPRConstants';

const useSupplierDispatchReport= ()=>{

    const ref = useRef<any>();

    const [internalRef,setInternalRef] = useState<any>()
    const [gridState,setGridState] = useState<any>()
    const [SDRCount,setSDRCount]=useState<any>()
    const [RowData, setRowData]=useState<any[]>([])
    const [currentPage,setCurrentPage] = useState<any>(1);
    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const tempRef = useRef()

    const {data,isLoading:isSDRUILoading}= useGetSDRUIConfiguration();
    const {mutateAsync:getSDRData} =useGetSDRData();
    const {mutateAsync:getSDRDataCount}=useGetSDRDataCount();
    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const {mutateAsync:getState} = useGetState()
    const [generalFilterOptions,setGeneralFilterOptions] = useState();


    const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');

    const customCellRenderers = useMemo(() => (   
        {
        grapCellRenderer:'',
       colorDispatchRender:SDRDispatchColorCellRenderer
        
      }), []);

    
    const VDRColumns=useMemo(()=>mapVDRFieldsToColDefs(data?.data.data),[data])

  
 
  const agGridProps: AgGridReactProps = useMemo(()=>{
    return{
        paginationPageSize: parseInt(
          process.env.REACT_APP_GUIDEDINSIGHT_ROWS_PER_PAGE || "50"
        ),
    
        suppressRowTransform: true,
        tooltipShowDelay: 0.3,
        tooltipTrigger: "focus",
        tooltipInteraction: true,
        readOnlyEdit: true,
        
        gridOptions: {
          sideBar: defaultAgGridSideBarForBPR,
          rowHeight: 50,
          getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
              return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
          },
        },
        enableRangeSelection: true,
        components:customCellRenderers,
        rowSelection: "multiple",
        statusBar: {
          statusPanels: [
            { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
            { statusPanel: "agTotalRowCountComponent", align: "left" },
            { statusPanel: "agFilteredRowCountComponent", align: "left" },
            { statusPanel: "agSelectedRowCountComponent", align: "left" },
            { statusPanel: "agAggregationComponent", align: "left" },
          ],
        },
        pagination: false,
        suppressRowClickSelection: true,
    
        defaultColDef: {
          floatingFilter: true,
          resizable: false,
          cellStyle: {
            flex: 1,
            "text-align": "center",
            height: "50px",
            "font-style": "normal",
            " font-variant": "normal",
            " font-weight": "300",
            " font-size": "20px",
            " font-family": "Roboto",
            display: "block",
            "text-overflow": "ellipsis",
            "white-space": "nowrap",
          },
        },
        onGridReady:(params)=>setInternalRef(params)
      }
  },[])


  useEffect(()=>{
    const fetchData= async()=>{
        await GetDataCount()
        await GetSDRData(currentPage);
    }
    fetchData();
    setGeneralFilterOptions(convertUiConfigToOptions(data?.data.data))

    
},[isSDRUILoading])

    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("SDR")
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
            internalRef.api.applyColumnState({state:gridState.columns })
        }
    },[internalRef,gridState])

   

    const GetDataCount = async (filter?:any)=>{
        const DataCount= await getSDRDataCount({
            filters: filter || currFilter,
            paginationParameter:{
                pageNumber: 1,
                recordsPerPage:rowsPerPage
            }
        })
        setSDRCount(DataCount.data.data[0].count);

    }

    

    const GetSDRData= async (PageNo:any)=>{
        try{
            if(SDRCount===0){
                await GetDataCount(currFilter);
            }
            notifyLoader("Loading Grid Data")
            const VDRData= await getSDRData ( {
                filters:currFilter,
                paginationParameter:{
                    pageNumber:PageNo,
                    recordsPerPage:rowsPerPage
                }
            })
            setRowData(VDRData.data.data);
            setCurrentPage(PageNo);
            toast.dismiss()
        }
        catch(err:any){
            notifyError(err)
        }
    }

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'SupplierDispatchReport',columnKeys:getColumnsForExcelExport(VDRColumns)});
        }
      };
    
    const onExportToExcelCallBack=async(pageNumber:number)=>{
    const data =  await getSDRData({
        filters:currFilter,
        paginationParameter:{
            pageNumber:pageNumber,
            recordsPerPage:5000
        }
    })
    
    return data.data.data
    }

    const onApplyFilter = async(filter:any)=>{
        try{
            const DataCount = await getSDRDataCount({
                filters:filter ,
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')
                }
            })
            setSDRCount(DataCount.data.data[0].count);
        notifyLoader("Loading Grid Data")
            const rowData =await getSDRData({
                filters:filter ,
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')
                }
            })
            
        
        // setRecordCount(rowData.data.recordCount)
            setCurrFilter(filter)
            setCurrentPage(1)
            setRowData(rowData?.data?.data)
            toast.dismiss()
        }catch(err:any){
            notifyError(err)
            setRowData([])
            setSDRCount(0)
        }
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }
        

    return{
        VDRColumns,
        RowData,
        SDRCount,
        setCurrentPage,
        currentPage,
        exportExcelColumns,
        setExportExcelColumns,
        setTempDownloadData,
        tempDownloadData,
        exportExcelRowData,
        setExportExcelRowData,
        isLoading:isSDRUILoading,
        GetSDRData,
        tempRef,
        tempAgGridProps,
        customCellRenderers,
        currFilter,
        setCurrFilter,
        onDeleteFilter,
        onExportToExcelCallBack,
        onApplyFilter,
        agGridProps,
        ref,
        generalFilterOptions
    }
    

}

export default useSupplierDispatchReport;