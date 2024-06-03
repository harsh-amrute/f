import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import { AgGridReactProps } from "ag-grid-react"
import { AgGridReact } from "@ag-grid-community/react";
import { useUserData } from "../../../../../context"
import ColoPriority from "../../../MTA/InsightsAndTrends/BTR/ColorPriority";
import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import VFImageButtonOutline from "../../../../../components/VectorFLOW/commons/VFImageButtonOutline";
import { useNavigate } from "react-router-dom";
import { ProcessRowGroupForExportParams, ExcelCell, ExcelRow, ExcelExportParams, ExcelStyle } from 'ag-grid-community';
import GetProcPlanningData from './GetProcPlanningData.json';
import GetProcPlanningDataColumn from './GetProcPlanningDataColumn.json';
import { mapProcPlanningFieldsToColDefs } from '../../../../../helpers/utils';
import ChildrenProcPlanningCellRenderer from "../ChildrenProcPlanningCellRenderer";

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

const usePP = () => {
    const { HeaderData } = GetProcPlanningDataColumn;
    const { data } = GetProcPlanningData;
    const gridRef = useRef<AgGridReact>(null);
    const { isSideBarOpen } = useUserData()
    const [currentPage, setCurrentPage] = useState<any>(1);
    const navigate = useNavigate();
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
        return { ShortageData, CompleteAvailableData, CompleteHeaderData, ShortageHeaderData };
    };
    const { ShortageData, CompleteAvailableData, CompleteHeaderData, ShortageHeaderData } = initializeData(data, HeaderData);
    const ShortageColumns = mapProcPlanningFieldsToColDefs(ShortageHeaderData);
    const CompleteAvailableColumns = mapProcPlanningFieldsToColDefs(CompleteHeaderData);
    const [ShortageDatas, SetShortageData] = useState(ShortageData);
    const [CompleteAvailableDatas, setCompleteAvailableData] = useState(CompleteAvailableData);

    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/VectorFLOW/NMS/minus_circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
            groupContracted: `<img src="${'/assets/img/VectorFLOW/NMS/add-circle.svg'}" style="height: 20px; width: 20px; padding-right: 2px; border-radius: 12px;"/>`,
        };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []); 2
    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab);
    const navigateToSimulateScreen = () => {
        navigate("/planning/simulativeFullKit", { state: { ShortageDatas } });

    }
    const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
        return {
            getCustomContentBelowRow: (params) => getRows(params) as ExcelRow[],
            columnWidth: 120,
            fileName: "ag-grid.xlsx",
        };
    }, []);
    const excelDownload = useCallback(() => {
        gridRef.current!.api.exportDataAsExcel();
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
                            height={750}
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
                            height={750}
                            ref={gridRef}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <div style={{ textAlign: 'right', flexDirection: 'row' }}>
                            <VFImageButtonOutline
                                onClick={() => { console.log('') }}
                                themeUi="" disabled={false}
                                width={150}
                                image={"/assets/img/VectorFLOW/reset.svg"}
                                style={{ marginRight: 20, borderColor: '#BC3D81', color: '#BC3D81', fontWeight: 'bold', }}>Reset Data
                            </VFImageButtonOutline>

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
            overlayNoRowsTemplate: `
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: ${Math.random() < 0.5 ? "#EBEBEB" : "#F7F7F7"};">
                No Rows To Show
            </div>`,
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
        GetCount
    }
}

export default usePP;