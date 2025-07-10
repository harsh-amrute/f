
import { useGetEOUIConfiguration ,useGetEOData,useGetEODataCount, useSubmitDueDates} from '../../../../Services/MTA/SupplyChainIntelligenceHub/ElephantOrders/index';
import { convertUiConfigToOptions, getCellFilter, getColumnDefinationsMTA, mapVDRFieldsToColDefs } from '../../../../../helpers/utils';
import { useEffect, useState,useRef,useMemo } from 'react';
import { notifyError,notifyLoader, notifySuccess} from '../../../../../helpers/notify';
import useBPRFilter from '../../../../../hooks/useBPRFilter';
import { toast } from 'react-toastify';
import { AgGridReactProps } from 'ag-grid-react';
import {EODispatchColorCellRenderer} from './EOCellRenderers'
import { useGetState } from '../../../../Services/MTA/Common/UserUIConfig';
import { defaultAgGridSideBarForBPR } from '../../../../../helpers/BPRConstants';
import { GridRef } from '../../../../types/MDM';
import { useGetUIConfigData } from '../../../../Services/MTA/Common/UIConfig';
import { UIColumnConfigName, UserUIColumnConfigName } from '../../../../../helpers/Enum';
import DateCellRenderer from './DateCellRenderer';

const useElephantOrders= ()=>{

    const ref = useRef<GridRef>();
    const [editedRows,setEditedRows] = useState<Array<any>>([])
    const [internalRef,setInternalRef] = useState<any>()
    const [gridState,setGridState] = useState<any>()
    const [EOCount,setEOCount]=useState<any>()
    const [RowData, setRowData]=useState<any[]>([])
    const [currentPage,setCurrentPage] = useState<any>(1);
    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const tempRef = useRef()

    // const { data, isLoading: isSDRUILoading } = useGetSDRUIConfiguration();
    const { mutateAsync: getUiConfig, isLoading: isUIConfigLoading, isError } = useGetUIConfigData();
    const {mutateAsync:getEOData, isLoading: isEODataLoading} =useGetEOData();
    const {mutateAsync:getEODataCount,isLoading:isEODataCountLoading}=useGetEODataCount();
    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()
    const {mutateAsync:getState} = useGetState()
    const [generalFilterOptions,setGeneralFilterOptions] = useState();
    const [initialColumnState, setInitialColumnState] = useState<any>(undefined);
    const [masterUIConfig, setMasterUIConfig] = useState<any>([]);
    const [VDRColumns,setVDRColumns] = useState<any[]>([])

    const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');
    const {mutateAsync:submitDueDates} = useSubmitDueDates();
    const [editedDueDateRows, setEditedDueDateRows] = useState<any[]>([]);

    const handleDueDateChange = (
        newDate: string,
        rowData: any,
        skuKey: string,
        whKey: string,
        orderIdKey: string
      ) => {
        if (!newDate || !rowData) return;
      
        const skucode = rowData[skuKey];
        const whcode = rowData[whKey];
        const orderid = rowData[orderIdKey];
      
        if (!skucode || !whcode || !orderid) {
          console.warn("❌ Required fields missing in rowData:", rowData);
          return;
        }
      
        const updated = {
          skucode,
          whcode,
          orderid,
          duedate: newDate,
        };
      
        setEditedDueDateRows((prev) => {
          const index = prev.findIndex(
            (row) =>
              row.skucode === skucode &&
              row.whcode === whcode &&
              row.orderid === orderid
          );
      
          if (index > -1) {
            const updatedList = [...prev];
            updatedList[index] = updated;
            return updatedList;
          } else {
            return [...prev, updated];
          }
        });
      };
      
    const customCellRenderers = useMemo(() => (
        {
            grapCellRenderer: '',
            colorDispatchRender: EODispatchColorCellRenderer
        
        }), []);

    useEffect(() => {
        getInitialEORowData();
        getBPRUiConfig();
    }, []);

    const getInitialEORowData = async () => {
        try {
            await GetDataCount()
            await GetEOData(currentPage);
        } catch (err: any) {
            notifyError(err)
        }
    }
    const onSubmitDueDate =async () => {
        try {
            console.log("📝 editedDueDateRows =", editedDueDateRows); // Debug

            if (editedDueDateRows.length === 0) {
              notifyError("Please select due date(s) to save");
              return;
            }
        
            const toastId = notifyLoader("Submitting Due Dates");
        
            const payload = editedDueDateRows.map((e) => {
                return{
                    skucode: e.skucode,
                    whcode: e.whcode,
                    orderid: e.orderid,
                    duedate: e.duedate,
               }
           
            });
        
            const { data } = await submitDueDates({ data: payload }); // API Call
            console.log("Data ===> ",data);
            // Optional: Update UI
            editedDueDateRows.forEach((row) => {
              const rowNode: any = ref.current?.api.getRowNode(
                `${row.skucode}-${row.whcode}-${row.orderid}`
              );
              if (rowNode) {
                rowNode.setDataValue("Due Date", row.duedate);
              }
            });
        
            toast.dismiss(toastId);
            notifySuccess(data.msg || "Due dates updated successfully");
            setEditedDueDateRows([]);
          } catch (err: any) {
            notifyError(err.message || "Something went wrong");
          }
    }

    const getBPRUiConfig = async () => {
        try {
            const response = await getUiConfig(UIColumnConfigName.EO);
            setInitialColumnState(response.data.data);
        } catch (err: any) {
            notifyError("Something Went Wrong")
        }
    }

    useEffect(() => {
            const getTableState = async () => {
                try {
                    const MappedColumns = getColumnDefinationsMTA(initialColumnState, CustomHeader);
                    console.log("MappedColumns = ",MappedColumns)
                    
                    if (!MappedColumns.some((col: any) => col.field === 'Due Date')) {
                        MappedColumns.push({
                            headerName: "Action",
                            field: "dueDateAction",
                            cellRenderer: DateCellRenderer ,
                            editable: true,
                            width: 200,
                            suppressMenu: true,
                            cellRendererParams: {
                                onDateChange: (newDate: string, rowData: any) => {
                                  console.log("User selected new date:", newDate);
                                  handleDueDateChange(newDate, rowData, 'SKUCode', 'WhCode', 'CustomerOrderID');

                                },
                            },
                            
                        });
                    }
                   
                    setGridState({
                        charts: [],
                        columns: MappedColumns,
                        pivot: false
                    })
                    setVDRColumns(MappedColumns);
                    getUserColumnConfig();
                    
                } catch (err: any) {
                    console.log(err)
                }
            }
            if (initialColumnState !== undefined) {
                getTableState();
                setGeneralFilterOptions(convertUiConfigToOptions(initialColumnState));
            }
        }, [initialColumnState]);
    
        useEffect(() => {
            if (VDRColumns.length) {
                if (internalRef?.api) {
                    setMasterUIConfig(internalRef.api.getColumnState());
                }
            }
        }, [internalRef, VDRColumns]);
        
    const getUserColumnConfig = async () => {
        const stateData = await getState({ "reportname": UserUIColumnConfigName.EO })
        if (stateData.data.data.length !== 0) {
            const parsedContent = JSON.parse(stateData.data.data)
              
            setGridState({
                charts: parsedContent.charts,
                columns: parsedContent.columns,
                pivot: parsedContent.pivot,
            })
        
        } else {
            console.log("Data not available");
        }
    }
    
    useEffect(() => {
        if (internalRef && gridState && gridState.columns) {
            const result = internalRef?.api.applyColumnState({ state: gridState.columns, applyOrder: true });
            internalRef?.api.sizeColumnsToFit();
            if (!result) {
                console.error("Failed to apply column state", result);
            }
        }
    }, [internalRef, gridState]);
 
    const GetDataCount = async (filter?:any)=>{
        const DataCount= await getEODataCount({
            filters: filter || currFilter,
            paginationParameter:{
                pageNumber: 1,
                recordsPerPage:rowsPerPage
            }
        })
        console.log("Data Count = ",DataCount.data["recordCount"]);     
        setEOCount(DataCount.data["recordCount"]);

    }

    

    const GetEOData= async (PageNo:any)=>{
        try{
            if(EOCount===0){
                await GetDataCount(currFilter);
            }
            notifyLoader("Loading Grid Data")
            const VDRData= await getEOData ( {
                filters:currFilter,
                paginationParameter:{
                    pageNumber:PageNo,
                    recordsPerPage:rowsPerPage
                }
            })
            setRowData(VDRData.data.data);
            console.log(VDRData.data.data)
            setCurrentPage(PageNo);
            toast.dismiss()
            notifySuccess("Data Loaded Successfully")
        }
        catch(err:any){
            notifyError(err)
        }
    }

    const onResetCallback = async () => {
        setGridState({
          charts: [],
          columns: masterUIConfig,
          pivot: false,
        })
    }

    const CustomHeader = {
        DispatchPen: {
            cellRenderer: 'colorDispatchRender',    
        },
        WHDescription: {
            rowGroup: false,
        }
    }

    const agGridProps: AgGridReactProps = useMemo(() => {
        return {
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
            components: customCellRenderers,
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
                resizable: true,
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
            onGridReady: (params) => setInternalRef(params)
        }
    }, []);
    
    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'ElephantOrders', columnKeys:ref.current?.api.getAllDisplayedColumns().map((c)=>c.getColId())});
        }
      };
    
    const onExportToExcelCallBack=async(pageNumber:number)=>{
    const data =  await getEOData({
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
            const DataCount = await getEODataCount({
                filters:filter ,
                paginationParameter:{
                    pageNumber:1,
                    recordsPerPage:parseInt(process.env.REACT_APP_RRR_ROWS_PER_PAGE || '100')
                }
            })
            setEOCount(DataCount.data.data[0].count);
        notifyLoader("Loading Grid Data")
            const rowData =await getEOData({
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
            notifySuccess("Data Loaded Successfully")
        }catch(err:any){
            notifyError(err)
            setRowData([])
            setEOCount(0)
        }
    }

    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
    }
        

    return{
        VDRColumns,
        RowData,
        EOCount,
        setCurrentPage,
        currentPage,
        exportExcelColumns,
        setExportExcelColumns,
        setTempDownloadData,
        tempDownloadData,
        exportExcelRowData,
        setExportExcelRowData,
        isLoading: isUIConfigLoading || isEODataLoading || isEODataCountLoading,
        isError,
        GetEOData,
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
        generalFilterOptions,
        onResetCallback,
        onSubmitDueDate
    }
    

}

export default useElephantOrders;