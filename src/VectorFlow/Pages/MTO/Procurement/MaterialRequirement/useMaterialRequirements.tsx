import { useState, useMemo, useRef, useEffect /*useCallback*/ } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { AgGridReact } from "@ag-grid-community/react";
// import { useUserData } from "../../../../../context"
import ColorPriority from '../../Common/ColorPriority/index';
import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
//import { useNavigate } from "react-router-dom";
import { ProcessRowGroupForExportParams, ExcelCell, ExcelRow, ExcelExportParams, ExcelStyle } from 'ag-grid-community';
import { HeaderMaterialRequirement } from '../MaterialCoverage/Data'
// import GetProcPlanningData from '../Planning/GetProcPlanningData.json';
// import GetProcPlanningDataColumn from '../Planning/GetProcPlanningDataColumn.json';
import { mapMaterialFieldsToColDefs } from '../../../../../helpers/utils';
import ChildrenProcPlanningCellRenderer from "../ChildrenProcPlanningCellRenderer";
import { useGetMaterialRequirementDetails, useGetMaterialRequirementDetailsDatewise } from "../../../../../VectorFlow/Services/MTO/Procurement/MaterialRequirement";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import moment from "moment";


const getRows = (params: ProcessRowGroupForExportParams) => {
    const rows: ExcelRow[] = [
        {
            outlineLevel: 1,
            cells: [
                cell(""),
                cell(""),
                cell("Order No", "header"),
                cell("Order Qty", "header"),
                cell("Cust Name", "header"),
                cell("Cust Code", "header"),
                cell("Order Due Date", "header"),
                cell("Order Release Date", "header"),
            ],
        },
    ].concat(
        ...params.node.data.children.map((record: any) => [
            {
                outlineLevel: 1,
                cells: [
                    cell(""),
                    cell(""),
                    cell(record.on, "body"),
                    cell(record.oq, "body"),
                    cell(record.cn, "body"),
                    cell(record.cc, "body"),
                    cell(record.odd, "body"),
                    cell(record.ord, "body"),
                ],
            },
        ]),
    );
    return rows;
};
const cell: (text: string, styleId?: string) => ExcelCell = (
    text: string,
    styleId?: string,
) => {
    return {
        styleId: styleId,
        data: {
            type: /^\d+$/.test(text) ? "Number" : "String",
            value: String(text),
        },
    };
};

const useMaterialReq = () => {
    const format2 = "YYYY-MM-DD"
    const d = new Date();
    const datetime = moment(d).format(format2);
    const { HeaderData } = HeaderMaterialRequirement;
    const gridRef = useRef<AgGridReact>(null);
    // const { isSideBarOpen } = useUserData()
    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: 'sdv',
            label: 'Selected Day View',
            value: 'sdv'
        },
        {
            id: 'cv',
            label: 'Cummulative View',
            value: 'cv'
        }
    ];
    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);
    const ShortageColumns = mapMaterialFieldsToColDefs(HeaderData);
    const CompleteAvailableColumns = mapMaterialFieldsToColDefs(HeaderData);
    const [CumulativeData, SetCumulativeData] = useState<any[]>([]);
    const [DayWiseData, setDayWiseData] = useState<any[]>([]);
    const { mutateAsync: getMaterialRequirementData } = useGetMaterialRequirementDetails();
    const { mutateAsync: getMaterialRequirementDataDayWise } = useGetMaterialRequirementDetailsDatewise();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentCumPage, setcurrentCumPage] = useState<number>(1);
    const [dayWiseRecordCount, setDayWiseRecordCount] = useState<number>(0);
    const [cumulativeRecordCount, setcumulativeRecordCount] = useState<number>(0);
    const [date, setDate] = useState<string>(datetime);

    useEffect(() => {
        getInitialData()
    }, [currentTab])

    
    const onDateChangeReq = (date: string) => {
        setDate(date);
    }

    const onDateSubmitReq = () => {
        getInitialData()
    }

    const getInitialData = async (currPage?: number) => {
        currentTab.id === 'sdv' ? getSelectedDateWise(currPage) : getCumulativeDateWise(currPage);
    }

    const getSelectedDateWise = async (currPage?: number) => {
        console.log('getSelectedDateWise',currentPage)
        const datWiseData = await getMaterialRequirementDataDayWise({ releaseDate: date, currPage: currPage ? currPage : currentPage });
        const dayWiseOutput = datWiseData.data?.data?.results
        setDayWiseRecordCount(datWiseData.data?.data?.count)
        setDayWiseData(dayWiseOutput)
    }

    const getCumulativeDateWise = async (currPage?: number) => {
        console.log('getCumulativeDateWise',currentCumPage)
        const cumulativeData = await getMaterialRequirementData({ releaseDate: date, currPage: currPage ? currPage : currentCumPage });
        const cumulativeOutput = cumulativeData.data?.data?.results
        setcumulativeRecordCount(cumulativeData.data?.data?.count)
        SetCumulativeData(cumulativeOutput)
    }


    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);

    const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
        return {
            getCustomContentBelowRow: (params) => getRows(params) as ExcelRow[],
            columnWidth: 120,
            fileName: "ag-grid.xlsx",
        };
    }, []);

    // const excelDownload = useCallback(() => {
    //     gridRef.current!.api.exportDataAsExcel();
    // }, []);



    const excelStyles = useMemo<ExcelStyle[]>(() => {
        return [
            {
                id: "header",
                interior: {
                    color: "#aaaaaa",
                    pattern: "Solid",
                },
            },
            {
                id: "body",
                interior: {
                    color: "#dddddd",
                    pattern: "Solid",
                },
            },
        ];
    }, []);
    const customCellRenderers = useMemo(() => (
        {
            "availabilityToolTip": AvailabilityToolTip,
            "coloPriority": ColorPriority,
        }), []);
    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const handlePageChangeDayWise = async (currPage: number) => {
        setCurrentPage(currPage)
        await getInitialData(currPage)
    }

    const handlePageChangeCumulative = async (currPage: number) => {
        setcurrentCumPage(currPage)
        await getInitialData(currPage)
    }

    const renderView = () => {
        switch (currentTab.id) {
            case "sdv":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={CompleteAvailableColumns}
                            rowData={DayWiseData}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            height={'750px'}
                            ref={gridRef}
                            pagination={false}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            selectedRows={0}
                            rowsPerPage={5}
                            totalRows={dayWiseRecordCount}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeDayWise}
                        />
                    </div>
                );
            case "cv":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={ShortageColumns}
                            rowData={CumulativeData}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            height={'750px'}
                            ref={gridRef}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            selectedRows={0}
                            rowsPerPage={5}
                            totalRows={cumulativeRecordCount}
                            currentPage={currentCumPage}
                            handleChangePage={handlePageChangeCumulative}
                        />

                    </div>
                );
            default:
                return <VFTable columnDefs={[]} rowData={[]} {...agGridProps} />
        }
    }
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
            components: customCellRenderers,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
            enableBrowserTooltips: true,
            enableRangeSelection: true,
            pagination: true,
            defaultColDef: {
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
        masterDetail: true,
        detailCellRenderer: ChildrenProcPlanningCellRenderer,
        autoGroupColumnDef: autoGroupColumnDef,
        paginationAutoPageSize: true,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        defaultExcelExportParams: defaultExcelExportParams,
        excelStyles: excelStyles,
        sideBar: sideBar,
        onCellEditingStopped(event: any) {
            const field = event.colDef.field;
            const newValue = event.newValue;
            const rowIndex = event.rowIndex;

            if (!field || rowIndex == null) {
                return;
            }

            SetCumulativeData((prevData: any) => {
                const newData = [...prevData];
                const updatedRow = {
                    ...newData[rowIndex],
                    [field]: newValue,
                    tsfs: newData[rowIndex].soh + newValue
                };
                newData[rowIndex] = updatedRow;
                return newData;
            });
            gridRef.current?.api.refreshCells({ force: true });
        }
    };

    return {
        // isSideBarOpen,
        // agGridProps,
        // currentPage,
        toggleCurrentTab,
        renderView,
        onDateChangeReq,
        onDateSubmitReq,
        date
        //excelDownload,
        //GetCount
    }
}

export default useMaterialReq;