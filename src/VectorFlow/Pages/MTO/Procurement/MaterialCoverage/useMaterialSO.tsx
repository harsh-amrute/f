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
import { FilterPageName } from "../../Common/Enum";
import { DownloadExcel, formatFilterJSON } from "../../../../../helpers/utils";

const useMaterialSO = (data: any, appliedFilters:any) => {
    const [orderDetailsData, setOrderDetailsData] = useState<any>();
    const [rowDataCount, setRowDataCount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // const columnDef = mapMaterialCoverageFieldsToColDefs(HeaderData);
    const { mutateAsync: getOpenSODetailsData } = useGetOpenSODetailsData()
    const { mutateAsync : getOpenSODetailsDataForExcelExport } = useGetOpenSODetailsDataForExcelExport();

    useEffect(() => {
        getInitialData(currentPage)
    }, [appliedFilters])

    const [isLoading, setIsLoading] = useState(false);



    const getInitialData = async (currPage: number, isExcelExport = false , body = {}) => {
        try {
            const formatedFilters = formatFilterJSON(appliedFilters);
            let queryString = '?Color='
                const colorsArray = Object.keys(data).filter((k: string) => k.startsWith('c'))
                colorsArray.forEach((s: string, index: number) => {
                    if (index === colorsArray.length - 1) {
                        queryString += `${data[s]}`
                    }
                    else {
                        queryString += `${data[s]},`
                    }
                })
                queryString += `&KitStatus=${data.kit}&S=${data.S}&E=${data.E}&page=${currPage}`
         
        if (isExcelExport) {
            
                
                const response = await  getOpenSODetailsDataForExcelExport({data : queryString , isExcelExport :1 , body , report_name : FilterPageName.Proc_Material_Coverage_For_OpenSO})
                if(response.status === 200) {
                    DownloadExcel(response , FilterPageName.Proc_Material_Coverage_For_OpenSO)
                    notifySuccess("Excel Export Successfully")
                }
                else{
                    notifyError("Failed to export Excel")
                }

            
        }else{
           
            setIsLoading(true);
            toast.dismiss();
            notifyLoader("Loading data...")

            let queryString = '?Color='
            const colorsArray = Object.keys(data).filter((k: string) => k.startsWith('c'))
            colorsArray.forEach((s: string, index: number) => {
                if (index === colorsArray.length - 1) {
                    queryString += `${data[s]}`
                }
                else {
                    queryString += `${data[s]},`
                }
            })
            queryString += `&KitStatus=${data.kit}&S=${data.S}&E=${data.E}&page=${currPage}`
      
            const someData = await getOpenSODetailsData({ data: queryString, appliedFilters: formatedFilters });
            const output = someData.data?.data?.results.map((item: any) => ({
                ...item,
                fkapr: ((item.fka / item.oq) * 100).toFixed(2)
            })
            )
            setRowDataCount(someData.data?.data?.count);
            setIsLoading(false);
            setOrderDetailsData(output)
            toast.dismiss();
            notifySuccess("Fetched data successfully!")
        }
        
            }catch (error) {
                console.log(error);
            }
    }


    const handlePageChangeOnHook = useCallback((param: number) => {
        setCurrentPage(param);
        getInitialData(param)
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
        statusBar: {
            statusPanels: [
                {
                    statusPanel: "agTotalRowCountComponent",
                    align: "left",
                },
                {
                    statusPanel: "agAggregationComponent",
                    statusPanelParams: {
                        aggFuncs: ["avg", "sum"],
                    },
                },
            ],
        },
        masterDetail: true,
        detailCellRenderer: DetailCellRenderer,
        detailRowHeight: 240,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,

        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
    };

    const ExcelExportData = (body : any) =>{    
        getInitialData(0, true, body)
    }

    return {
        agGridProps,
        RRRRowData: orderDetailsData,
        isLoading,
        rowDataCount: rowDataCount,
        handlePageChangeOnHook,
        currentPage: currentPage,
        ExcelExportData
    }
}

export default useMaterialSO;