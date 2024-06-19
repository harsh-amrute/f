import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { AgGridReact } from "@ag-grid-community/react";
import { useUserData } from "../../../../../context"
import ColoPriority from "../../Common/ColorPriority/index";
import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { useNavigate } from "react-router-dom";
import { ProcessRowGroupForExportParams, ExcelCell, ExcelRow, ExcelExportParams, ExcelStyle } from 'ag-grid-community';
import GetProcPlanningDataColumn from './GetProcPlanningDataColumn.json';
import { mapProcPlanningFieldsToColDefs } from '../../../../../helpers/utils';
import ChildrenProcPlanningCellRenderer from "../ChildrenProcPlanningCellRenderer";
import { userGetProcPlanningData } from "../../../../Services/MTO/ProcPlanning/index";

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

const useProcPlanning = (date: string) => {
    const { HeaderData } = GetProcPlanningDataColumn;
    const gridRef = useRef<AgGridReact>(null);
    const { isSideBarOpen } = useUserData()
    const [currentPage] = useState<any>(1);
    const navigate = useNavigate();
    const [datas, setData] = useState([]);
    const [ShortageDatas, SetShortageData] = useState<any[]>([]);
    const [CompleteAvailableDatas, setCompleteAvailableData] = useState<any[]>([]);

    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: 'ca',
            label: 'Completely Available',
            value: 'ca'
        },
        {
            id: 'short',
            label: 'Shortage',
            value: 'short'
        }
    ];
    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0]);
    const { mutateAsync: getProcPlanningData } = userGetProcPlanningData()
    const fetchData = useCallback(async (date: string) => {
        try {
            const response = await getProcPlanningData(date);
            setData(response?.data?.data?.results || []);
        } catch (error) {
            console.log("error ")
        }
    }, [getProcPlanningData]);

    useEffect(() => {
        if (datas.length && HeaderData.length) {
            const initializeData = (data: any, headerData: any) => {
                const calculateData = data.map((item: any) => ({
                    ...item,
                    gap: item.req - item.soh - item.siqc - item.sit,
                    tsfs: item.soh,
                    children: item.children ? item.children.filter((child: any, index: number, self: any[]) =>
                        self.findIndex(t => t.on === child.on) === index) : []
                }));
                const ShortageData = calculateData.filter((item: any) => item.gap > 0);
                const CompleteAvailableData = calculateData.filter((item: any) => item.gap === 0);

                const CompleteHeaderData = headerData.map((header: any) => {
                    if (header.jf === 'eas') {
                        return { ...header, vs: false };
                    }
                    return header;
                });

                const ShortageHeaderData = headerData.map((header: any) => {
                    if (header.jf === 'eas') {
                        return { ...header, vs: true };
                    }
                    return header;
                });

                SetShortageData(ShortageData);
                setCompleteAvailableData(CompleteAvailableData);

                return { ShortageData, CompleteAvailableData, CompleteHeaderData, ShortageHeaderData };

            };
            initializeData(datas, HeaderData);
        }
    }, [datas, HeaderData]);

    const ShortageColumns = useMemo(() => mapProcPlanningFieldsToColDefs(HeaderData.map((header: any) => ({
        ...header,
        vs: header.jf === 'eas' ? true : header.vs
    }))), [HeaderData]);

    const CompleteAvailableColumns = useMemo(() => mapProcPlanningFieldsToColDefs(HeaderData.map((header: any) => ({
        ...header,
        vs: header.jf === 'eas' ? false : header.vs
    }))), [HeaderData]);

    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/mto/procPlanning/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const toggleCurrentTab = useCallback((tab: VFFloatingTabItemProps) => setCurrentTab(tab), []);
    const navigateToSimulateScreen = useCallback(() => {
        navigate("/planning/simulative-fullkit", { state: { ShortageDatas, date } });
    }, [navigate, ShortageDatas, date]);

    const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
        return {
            getCustomContentBelowRow: (params) => getRows(params) as ExcelRow[],
            columnWidth: 120,
            fileName: "ag-grid.xlsx",
        };
    }, []);
    const excelDownload = useCallback(() => {
        gridRef.current?.api.exportDataAsExcel();
    }, []);
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
            "coloPriority": ColoPriority,
        }), []);
    const sideBar = useMemo(() => {
        return {
            toolPanels: ['columns'],
        };
    }, []);

    const renderView = () => {
        console.log("comumnDefs", CompleteAvailableColumns)
        switch (currentTab.id) {
            case "ca":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={CompleteAvailableColumns}
                            rowData={CompleteAvailableDatas}
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
                    </div>
                );
            case "short":
                return (
                    <div>
                        <VFTable
                            {...agGridProps}
                            columnDefs={ShortageColumns}
                            rowData={ShortageDatas}
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
                        <div style={{ textAlign: 'right', flexDirection: 'row' }}>

                            <VFButtonOutline
                                onClick={navigateToSimulateScreen}
                                themeUi=""
                                disabled={false}
                                width={150}
                                style={{
                                    marginRight: 20,
                                    borderColor: '#BC3D81',
                                    color: '#BC3D81',
                                    fontWeight: 'bold',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/assets/img/VectorFLOW/reset.svg" alt="Reset Icon" style={{ marginRight: 8 }} />
                                    Reset Data
                                </div>
                            </VFButtonOutline>
                            <VFButton
                                onClick={navigateToSimulateScreen}
                                themeUi=""
                                disabled={false}
                                width={250}>Simulate improvement in Full Kits
                            </VFButton>
                        </div>

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
            icons: icons,
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

            SetShortageData((prevData: any) => {
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

    const GetCount = {
        "short": ShortageDatas.length,
        "complete": CompleteAvailableDatas.length,
        "total": ShortageDatas.length + CompleteAvailableDatas.length
    };

    return {
        isSideBarOpen,
        agGridProps,
        currentPage,
        toggleCurrentTab,
        renderView,
        excelDownload,
        GetCount,
        fetchData,
        date,
    }
}

export default useProcPlanning;