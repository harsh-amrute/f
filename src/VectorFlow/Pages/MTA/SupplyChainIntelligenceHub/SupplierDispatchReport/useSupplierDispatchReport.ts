
import { useGetSDRUIConfiguration ,useGetSDRData,useGetSDRDataCount} from '../../../../Services/MTA/SupplyChainIntelligenceHub/SupplierDispatchReport/index';
import { mapVDRFieldsToColDefs } from '../../../../../helpers/utils';
import { useEffect, useState,useRef,useMemo } from 'react';
import { notifyError,notifyLoader } from '../../../../../helpers/notify';
import useBPRFilter from '../../../../../hooks/useBPRFilter';
import { toast } from 'react-toastify';
import { AgGridReactProps } from 'ag-grid-react';
import {SDRDispatchColorCellRenderer} from './SDRCellRenderers'

const useSupplierDispatchReport= ()=>{


    const [SDRCount,setSDRCount]=useState<any>()
    const [RowData, setRowData]=useState<any[]>([])
    const [currentPage,setCurrentPage] = useState<any>(1);
    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])
    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);
    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const tempRef = useRef()

    const {data,isLoading}= useGetSDRUIConfiguration();
    const {mutateAsync:getSDRData} =useGetSDRData();
    const {mutateAsync:getSDRDataCount}=useGetSDRDataCount();
    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()

    const rowsPerPage = parseInt(process.env.REACT_APP_BOR_ROWS_PER_PAGE || '100');

    const customCellRenderers = useMemo(() => (   
        {
        grapCellRenderer:'',
       colorDispatchRender:SDRDispatchColorCellRenderer
        
      }), []);

    
    const VDRColumns=mapVDRFieldsToColDefs(data?.data.data);

    useEffect(()=>{
        const fetchData= async()=>{
            await GetDataCount()
            await GetSDRData(currentPage);
        }
        fetchData();
        
    },[])

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
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'SupplierDispatchReport'});
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
        isLoading,
        GetSDRData,
        tempRef,
        tempAgGridProps,
        customCellRenderers,
        currFilter,
        setCurrFilter,
        onDeleteFilter,
        onExportToExcelCallBack,
        onApplyFilter

    }
    

}

export default useSupplierDispatchReport;