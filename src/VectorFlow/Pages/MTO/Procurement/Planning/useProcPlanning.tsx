import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import { AgGridReactProps, } from "ag-grid-react"
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
import { getColumnDefinations } from '../../../../../helpers/utils';
import ChildrenProcPlanningCellRenderer from "../ChildrenProcPlanningCellRenderer";
import { putUpdateProcurementSimulationData, userGetProcPlanningData } from "../../../../Services/MTO/Procurement/ProcPlanning/index";
import { toast } from "react-toastify";
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import OverlayLoader from "../../Common/Loader";
import { INumberCellEditorParams } from "@ag-grid-community/core"


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
    const [HeaderData, setHeaderData] = useState([{}]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()

    const reportName = "ProcurementPlanningShortage";

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            setHeaderData(response.data.data);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setColumnDef();
    }, [])

    const gridRef = useRef<AgGridReact>(null);
    const { isSideBarOpen } = useUserData()
    const navigate = useNavigate();
    const [datas, setData] = useState<any>([]);
    const [ShortageDatas, SetShortageData] = useState<any[]>([]);
    const [CompleteAvailableDatas, setCompleteAvailableData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRows, setTotalRows] = useState(0);
    const [isOverlayLoading, setIsOverlayLoading] = useState(false);
    const { user } = useUserData();

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
    const { mutateAsync: UpdateProcurementSimulationData } = putUpdateProcurementSimulationData()
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = useCallback(async (date: string, pageNumber = 1) => {
        setIsLoading(true);
        try {
            toast.dismiss();
            notifyLoader("Loading data...")
            const response = await getProcPlanningData({ date, pageNum: pageNumber.toString() });
            if (response.status === 200) {
                setCurrentPage(pageNumber)
                toast.dismiss();
                notifySuccess("Data fetched Successfully!");
                setIsLoading(false);
            }
            else {
                toast.dismiss();
                notifyError("Failed to fetch data!");
                setIsLoading(false);
            }
            setTotalRows(response?.data?.data?.count)
            setData(response?.data?.data?.results || []);
        } catch (error) {
            console.log("error ")
            toast.dismiss();
            notifyError("Failed to fetch data!");
            setIsLoading(false);
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
                console.log("this workds")
                SetShortageData(ShortageData);
                setCompleteAvailableData(CompleteAvailableData);

                return { ShortageData, CompleteAvailableData, CompleteHeaderData, ShortageHeaderData };

            };
            initializeData(datas, HeaderData);

        }
    }, [datas, HeaderData]);

    const customHeader = {
        ColorPriority: {
            cellRenderer: 'coloPriority',
            tooltipValueGetter: (params: any) => {
                const cpData = params.data.cp[0];
                const keysToPrint = ["B", "R", "Y", "G", "W", "Bl"];
                let tooltipText = '';
                keysToPrint.forEach((key) => {
                    if (Object.prototype.hasOwnProperty.call(cpData, key)) {
                        if (tooltipText !== '') {
                            tooltipText += ' | ';
                        }
                        tooltipText += `${key}: ${cpData[key]}`;
                    }
                });
                return tooltipText;
            },
            // tooltipComponent: "availabilityToolTip",
            initialWidth: 200, //160
            // autoHeaderHeight: true,
            // wrapHeaderText: true,

        },

        'ExpAdd.StockToday': {
            // cellRenderer: "inputbox",
            editable: true,
            cellEditor: 'agNumberCellEditor',
            cellEditorParams: {
                min: 0
            } as INumberCellEditorParams,
            // autoHeaderHeight: true,
            // wrapHeaderText: true,
            initialWidth: 200, //160
            filter: 'agMultiColumnFilter',
            floatingFilter: true,
            cellStyle: {
                backgroundColor: 'white',
                border: '1px solid #b9bdba',
                color: 'black',
                padding: '1px',
            },
        }

    }
    const extras = [
        {
            field: "",
            position: 0,
            suppressHeaderFilterButton: true,
            suppressMenu: true,
            filter: false,
            maxWidth: 50,
            cellRenderer: 'agGroupCellRenderer'
        }
    ]
    const ShortageColumns = getColumnDefinations(HeaderData, customHeader, extras)


    const CompleteAvailableColumns = getColumnDefinations(HeaderData, customHeader, extras, ["ExpAdd.StockToday"]);

    const icons = useMemo(() => {
        return {
            groupExpanded: `<img src="${'/assets/img/mto/dayWiseCoverage/collapse.svg'}" style="height: 100%; width: 80%;"/>`,
            groupContracted: `<img src="${'/assets/img/mto/dayWiseCoverage/expand.svg'}" style="height: 100%; width: 80%;"/>`,
        };
    }, []);
    const autoGroupColumnDef = useMemo(() => {
        return {
            minWidth: 250,
        };
    }, []);

    const toggleCurrentTab = useCallback((tab: VFFloatingTabItemProps) => setCurrentTab(tab), []);
    const [isDisabled, setIsDisabled] = useState(true);
    useEffect(() => {
        let isDis = true;
        ShortageDatas.forEach((e) => {
            if (e.eas && e.eas !== 0) {
                isDis = false;
                setIsDisabled(false);
            }
        })
        if (isDis) {
            setIsDisabled(true);
        }
    }, [ShortageDatas])
    const navigateToSimulateScreen = useCallback(async () => {


        const inputJson: any = {
            "username": user?.user.name,
            "stock": [

            ]
        }
        ShortageDatas.forEach((e, index) => {

            const val = gridRef.current?.api.getRowNode(index.toString())?.data;
            if (val.eas !== 0) {
                inputJson.stock.push(
                    {
                        'ic': val.rm,
                        'as': val.eas
                    }
                )
            }

        })
        setIsOverlayLoading(true);
        UpdateProcurementSimulationData(inputJson)
            .then(response => {
                // Handle the response and perform subsequent actions
                setIsOverlayLoading(false);
                if (response.status === 200) {
                    toast.dismiss();
                    notifySuccess("Simulation updated successfully!")
                    console.log("API call succeeded:", response);
                    navigate("/planning/simulative-fullkit", { state: { ShortageDatas, date } });

                }
                else {
                    notifyError("Failed to update Simulation!")

                }


            })
            .catch(error => {
                // Handle any errors that occur during the API call
                console.error("API call failed:", error);

                //         // Add your error handling code here
            });


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

    useEffect(() => {
        if (date) {

            fetchData(date);
        }
    }, [])

    const handlePageChangeCumulative = async (pageNumber: number) => {
        // setIsLoading(true);
        // setCurrentPage(pageNumber);
        // const APIData = await getProcPlanningData({ date, pageNum: currentPage.toString() });
        // // setData(APIData)
        // const newDat = APIData.data.data.results
        // setTotalRows(APIData?.data?.data?.count)
        // // setData(APIData?.data?.data?.results || []);
        // setData(newDat);
        // setIsLoading(false);

        fetchData(date, pageNumber);

        // (refGraph1.current?.api.getRowNode) && refGraph1.current?.api.set
    };

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
                            height={'650px'}
                            ref={gridRef}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            key={1}
                            selectedRows={0}
                            rowsPerPage={Math.min(10, totalRows)}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}

                        />
                    </div>
                );
            case "short":
                return (

                    <div>
                        {isOverlayLoading && <OverlayLoader message={"Updating the simulated data..."} />}

                        <VFTable
                            key={2}
                            {...agGridProps}
                            columnDefs={ShortageColumns}
                            rowData={ShortageDatas}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            height={'650px'}
                            ref={gridRef}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        />
                        <VFPagination
                            selectedRows={0}
                            rowsPerPage={Math.min(10, totalRows)}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}

                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', textAlign: 'right', marginRight: '14px', flexDirection: 'row', marginTop: '15px' }}>

                            <VFButtonOutline
                                onClick={() => { (!isDisabled) && fetchData(date) }}
                                themeUi=""
                                disabled={isDisabled}
                                width={135}

                                style={{
                                    opacity: isDisabled ? '0.4' : '1',
                                    height: '50px',
                                    marginRight: 20,
                                    borderColor: '#BC3D81',
                                    color: '#BC3D81',
                                    background: 'transparent',
                                    fontWeight: 'bold',
                                }}
                            >

                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <img src="/assets/img/VectorFLOW/reset.svg" alt="Reset Icon" height={20} width={20} style={{ margin: '0 12px' }} />
                                    <p style={{ fontSize: '14px' }}>
                                        Reset Data
                                    </p>
                                </div>
                            </VFButtonOutline>
                            <VFButton
                                onClick={navigateToSimulateScreen}
                                themeUi=""
                                disabled={isDisabled}

                                width={250}>Simulate improvement in Full Kits
                            </VFButton>
                        </div>

                    </div>
                );
            default:
                return (
                    <>
                        <VFTable columnDefs={[]} rowData={[]} {...agGridProps} />


                        <VFPagination

                            selectedRows={0}
                            rowsPerPage={Math.min(10, totalRows)}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}

                        />
                    </>
                )
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

            defaultColDef: {
                floatingFilter: true,
                filter: "agMultiColumnFilter",
                floatingFilterComponentParams: { suppressFilterButton: true },
                minWidth: 140,
                // wrapHeaderText: true,
                // autoHeaderHeight: true,
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
                flex: 1,
            },


        },
        masterDetail: true,
        detailCellRenderer: ChildrenProcPlanningCellRenderer,
        autoGroupColumnDef: autoGroupColumnDef,
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
        isLoading
    }
}

export default useProcPlanning;