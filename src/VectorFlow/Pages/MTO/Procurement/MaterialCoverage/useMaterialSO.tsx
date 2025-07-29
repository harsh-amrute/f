import { useCallback, useEffect, useMemo, useState } from "react"
import { AgGridReactProps } from "ag-grid-react"
import AvlCellRenderer from '../../Common/AvlCellRenderer/AvlCellRenderer';
import AvailabilityToolTip from "../../../../../VectorFlow/Pages/MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import DetailCellRenderer from "./MaterialCellRenderer";
import ColorCellRenderer from "../../Common/ColorCellRenderer/ColorCellRenderer";
import { useGetOpenSODetailsData, useGetOpenSODetailsDataForExcelExport } from "../../../../../VectorFlow/Services/MTO/Procurement/MaterialCoverage";
import CustomGroupCellRenderer from "./CustomGroupCellRenderer";
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { toast } from "react-toastify";
import { FilterPageName, pagination } from "../../Common/Enum";
import { DownloadExcel, formatFilterJSON } from "../../../../../helpers/utils";

const useMaterialSO = (data: any, appliedFilters: any, handleSaveClick: any, userConfigFetched: any, userPageSize: any, setUserPageSize: any, childColDef: any) => {
    const [orderDetailsData, setOrderDetailsData] = useState<any>();
    const [rowDataCount, setRowDataCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // const columnDef = mapMaterialCoverageFieldsToColDefs(HeaderData);
    const { mutateAsync: getOpenSODetailsData } = useGetOpenSODetailsData()
    const { mutateAsync : getOpenSODetailsDataForExcelExport } = useGetOpenSODetailsDataForExcelExport();

    useEffect(() => {
        if (userConfigFetched) {
            setCurrentPage(1);
            getInitialData(1);
        }
    }, [appliedFilters, userConfigFetched])  

  const [isLoading, setIsLoading] = useState(false);
  

  const getInitialData = async (currPage: number, isExcelExport = false, body = {}, pageSize?: any, isChildren?: any) => {
        try {
            const formattedFilters = formatFilterJSON(appliedFilters);
            const colorsArray = Object.keys(data).filter((k: string) => k.startsWith('c'));
            const colorsQuery = colorsArray.map((key: string) => data[key]).join(',');
        
          if (isExcelExport) {
            let queryString = `?Color=${colorsQuery}&KitStatus=${data.kit}&S=${data.S}&E=${data.E}&isChildren=${isChildren}`;
            if(data.allOrders ===true){
              queryString = `?AOD=${true}&isChildren=${isChildren}`
            }
            notifyLoader("Exporting data")
            const response = await getOpenSODetailsDataForExcelExport({
              data: queryString,
              isExcelExport: 1,
              body,
              report_name: FilterPageName.Proc_Material_Coverage_For_OpenSO,
            });
      
            if (response.status === 200) {        
              const isSuccess = DownloadExcel(response, FilterPageName.Proc_Material_Coverage_For_OpenSO);
              if(isSuccess){
                notifySuccess("Excel Export Successfully");
              }
            } else {
              notifyError("Failed to export Excel");
              return;
            }
          } else {
            let queryString = `?Color=${colorsQuery}&KitStatus=${data.kit}&S=${data.S}&E=${data.E}&page=${currPage}&page_size=${pageSize || userPageSize || pagination.mtoPageSize}`;
        
            if(data.allOrders ===true){
              queryString = `?AOD=${true}&page=${currPage}&page_size=${pageSize || userPageSize || pagination.mtoPageSize}`
            }
            
            setIsLoading(true);
            toast.dismiss();
            notifyLoader("Loading data...");
      
            const someData = await getOpenSODetailsData({ data: queryString, appliedFilters: formattedFilters });
            const results = someData.data?.data?.results || [];
            const output = results.map((item: any) => ({
              ...item,
              fkapr: ((item.fka / item.oq) * 100).toFixed(2),
            }));
      
            setRowDataCount(someData.data?.data?.count || 0);
            setOrderDetailsData(output);
            notifySuccess("Fetched data successfully!");
          }
        } catch (error) {
          if(error==="No orders found for the given filters"){
            notifyError("No orders found for the given filters");
            return;
          }
          notifyError("An error occurred while fetching data.");
        } finally {
          setIsLoading(false);
        }
      }

    const savePageSize = (pageSize: any) => {
        if (pageSize) {
            setCurrentPage(1)
            setUserPageSize(pageSize);
            handleSaveClick(undefined, pageSize);
            getInitialData(1,false,{},pageSize);
        } else {
            notifyError("Invalide page size");
        }
        
    }

    const handlePageChangeOnHook = useCallback((currPage: number,isExcelExport:boolean,body:any,userPageSize:number) => {
        setCurrentPage(currPage);
        getInitialData(currPage, isExcelExport, body, userPageSize);
        // You can add more logic here
    }, []);

    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);
    const customCellRenderers = useMemo(() => (
        {
            "colorCellRenderer": ColorCellRenderer,
            "avlCellRenderer": AvlCellRenderer,
            "availabilityToolTip": AvailabilityToolTip,
            "customGroupCellRenderer": CustomGroupCellRenderer

        }), []);

    const agGridProps: AgGridReactProps = {
        tooltipShowDelay: 0,
        tooltipTrigger: "focus",
        gridOptions: {
            rowHeight: 50,
            getRowStyle: (params: any) => {
                return {
                    background: params.node.rowIndex % 2 === 0 ? "#EBEBEB" : "#F7F7F7"
                };
            },
            pagination: true,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
          components: customCellRenderers,
            
          defaultColDef: {
                
                resizable: true,
                flex: 1,
                filter: 'agTextColumnFilter',
                floatingFilter: true,
                cellStyle: {
                    'text-align': 'center',
                    'height': '50px',
                    "font-style": "normal",
                    "font-variant": "normal",
                    "font-weight": "300",
                    "font-size": "20px",
                    "font-family": "Roboto",
                    'text-overflow': 'ellipsis',
                    'white-space': 'nowrap',
                    'resizable': 'true',
                },

            },
        },
        
        sideBar: sideBar,
        masterDetail: true,
        detailCellRenderer: DetailCellRenderer,
        detailCellRendererParams:{
            colDef : childColDef
        },
        detailRowHeight: 240,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,

        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };


    return {
        agGridProps,
        RRRRowData: orderDetailsData,
        isLoading,
        rowDataCount: rowDataCount,
        handlePageChangeOnHook,
        currentPage: currentPage,
        savePageSize,
        userPageSize,
        getInitialData
    }
}

export default useMaterialSO;