import { useState, useMemo, useRef, useCallback, useEffect } from "react"
import { AgGridReactProps, } from "ag-grid-react"
import { useUserData } from "../../../../../context"
import ColoPriority from "../../Common/ColorPriority/index";
import AvailabilityToolTip from "../../../MTA/InsightsAndTrends/BTR/AvailabilityToolTip";
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import VFTable from "../../Common/VFTable";
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { useNavigate } from "react-router-dom";
import { ProcessRowGroupForExportParams, ExcelCell, ExcelRow, ExcelExportParams, ExcelStyle } from 'ag-grid-community';
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from '../../../../../helpers/utils';
import ChildrenProcPlanningCellRenderer from "../ChildrenProcPlanningCellRenderer";
import { putUpdateProcurementSimulationData, useGetProcurementPlanningDataForExcelExport, userGetProcPlanningData } from "../../../../Services/MTO/Procurement/ProcPlanning/index";
import { toast } from "react-toastify";
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { useGetUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import VFPagination from "../../Common/VFPagination";
import OverlayLoader from "../../Common/Loader";
import { INumberCellEditorParams } from "@ag-grid-community/core"
import { TableWrapper } from "./styles";
//import { pagination } from "../../Common/Enum";
import { useDispatch } from "react-redux";
import { APPLIED_FILTERS, PROCPLANNING_ANALYTICS } from "../../../../../redux/actions/MTO";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from "../../../../../VectorFlow/Services/MTO/Common/UserUIConfig";
import { FilterPageName, pagination, UIGridCode } from "../../Common/Enum";
import useColDef from "../../../../../hooks/useColDef";
import { useGetDBRsettingsData } from "../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation";



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

const useProcPlanning = (date: string, appliedFilters: any) => {
    const [HeaderData, setHeaderData] = useState<any>([]);
    const gridRef = useRef<any>(null);
    const [columnState, setColumnState] = useState<any>([]);
    const [isReset, setIsReset] = useState<boolean|undefined>(undefined);
    const [colDef, setColDef] = useState<any>([{}]);
    const { mutateAsync: getUIConfigData } = useGetUIConfigData()
    const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
    const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
    const { colDefMap , getColDef} = useColDef();
    const reportName = "ProcurementPlanningShortage";
    const [defaultColState,setDefaultColState] = useState<any>([])

    const [clearFilter, clearFilterDisabled]= useState<boolean>(true);

    
    const [userConfigFetched, setUserConfigFetched] = useState<any>(false);
    const [userPageSize, setUserPageSize] = useState<any>();

    const setColumnDef = async () => {
        try {
            const response = await getUIConfigData(reportName);
            getColDef(response)
            setHeaderData(response.data.data);
        }
        catch (e) {
            console.log(e);
        }
    }


    const getUserColumnConfig = async () => {
        try {
            const data = await getUserUIReportConfigData({
                un: user.user.name,
                rn_id: UIGridCode.ProcPlanning
            });

            setUserConfigFetched(true)
            const newConfig = data?.data?.data[0]?.columns_settings ? JSON.parse(data?.data?.data[0]?.columns_settings) : [];
            setUserPageSize(newConfig.pageSize ? Number(newConfig.pageSize) : undefined);
            setColumnState(newConfig.cs);

            if (!data) {
                console.error('Failed to apply column state');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveClick = async (isReset = false, page_size?: any) => {

        const config = isReset ? defaultColState : gridRef?.current?.api?.getColumnState();
    
        try {
            if (page_size) {
                const config = columnState;
                const fullConfig = { cs: config, pageSize: page_size };
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.ProcPlanning,
                    cs: JSON.stringify(fullConfig),
                };
                await updateUserUIReportConfigData([payload]);
        
            } else {
                const fullConfig = {
                    cs: config,
                    pageSize: userPageSize
                };
    
                const payload = {
                    un: user.user.name,
                    rn_id: UIGridCode.ProcPlanning,
                    cs: JSON.stringify(fullConfig)
                };
    
                await updateUserUIReportConfigData([payload]);
                !isReset && notifySuccess("Saved Successfully");
            }
    
        } catch (error) {
            console.error(error);
            notifyError("Error while saving");
        }
    };
    

    const handleResetClick = () => {
        setIsReset(true);
    }

    useEffect(() => {

        if (isReset) {
            setColumnState([...defaultColState]);
            handleSaveClick(true);
            setIsReset(false)
            notifySuccess("Reset Successfully")
        } 
    }, [isReset]);

    useEffect(() => {
        setColumnDef();
    }, [])

    useEffect(()=>{
        if(colDef.length>1){
            getUserColumnConfig();
        }
    },[colDef])

    const { isSideBarOpen } = useUserData()
    const navigate = useNavigate();
    const [datas, setData] = useState<any>([]);
    const [ShortageDatas, SetShortageData] = useState<any[]>([]);
    const [CompleteAvailableDatas, setCompleteAvailableData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalRows, setTotalRows] = useState(0);
    const [isOverlayLoading, setIsOverlayLoading] = useState(false);
    const { user } = useUserData();


    const dispatch = useDispatch()

    dispatch(PROCPLANNING_ANALYTICS({ date }));
    dispatch(APPLIED_FILTERS( {...formatFilterJSON(appliedFilters)} ));

    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps | undefined>({
        id: 'ca',
        label: 'Completely Available',
        value: 'ca'
    });
    const { mutateAsync: getProcPlanningData } = userGetProcPlanningData()
    const { mutateAsync: UpdateProcurementSimulationData } = putUpdateProcurementSimulationData()
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync : GetProcPlanningDataForExcelData} = useGetProcurementPlanningDataForExcelExport()
    const { mutateAsync: getDBRsettingsData } = useGetDBRsettingsData();
    const [simulationEnable, setSimulationEnable] = useState<any>();
    

    const fetchData = useCallback(async (date: string, pageNumber = 1, currentTab = '1', isExcelExport = false, pageSize?:any) => {
        setIsLoading(true);
        if(isExcelExport){
            try {
                const headersdata = gridRef?.current?.api.getColumnState();
                const formattedFilters = formatFilterJSON(appliedFilters)
                const body = getBodyForExcelExport({headersdata, filterData : formattedFilters,colDefMap})
                const response = await GetProcPlanningDataForExcelData({body ,ca: currentTab, isExcelExport: 1 , date , report_name : FilterPageName.Proc_Procurement_Planning });
                if (response.status === 200) {
                    DownloadExcel(response, FilterPageName.Proc_Procurement_Planning);
                    notifySuccess('Excel Export Successfully')
                }else{
                    notifyError('Failed to export Excel')
                }
            } catch (error) {
                notifyError("Failed to export")
            }
            setIsLoading(false);
        }else{

        try {
            toast.dismiss();
            notifyLoader("Loading data...")
            const formatedFilters = formatFilterJSON(appliedFilters);
            const response = await getProcPlanningData({ date, pageNum: pageNumber.toString(), ca: currentTab, appliedFilters: formatedFilters,page_size: pageSize || userPageSize });
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
            toast.dismiss();
            notifyError("Failed to fetch data!");
            setIsLoading(false);
        }
    }
    }, [getProcPlanningData,appliedFilters]);

    useEffect(() => {
        if (datas && HeaderData.length) {
            const initializeData = (data: any, headerData: any) => {
                const calculateData = data.map((item: any) => ({
                    ...item,
                    gap: item.req - item.soh - item.siqc - item.sit,
                    tsfs: item.soh,
                    children: item.children || []
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

    const customHeader = {
        ColorPriority: {
            cellRenderer: 'coloPriority',
            floatingFilter: false,
            suppressHeaderFilterButton: true,
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
            maxWidth: 35,
            minWidth: 35,
            cellRenderer: 'agGroupCellRenderer',
            pinned:"left"
        }
    ]

    const getSimulationEnable = async () => {
        const DBRSettingsData = await getDBRsettingsData();
        const DBRSettings = DBRSettingsData.data?.data;
        const simulation = DBRSettings?.find((data: any) => {
            return data.flag == "simulationEnable";
          });

          setSimulationEnable(simulation.value);
    }
    useEffect(() => {  
        getSimulationEnable();
    },[])

    useEffect(() => {
        if(HeaderData && HeaderData.length>0){
            if (currentTab?.label === 'Shortage') {
                if(simulationEnable === "enabled"){

                    setColDef(getColumnDefinations(HeaderData, customHeader, extras))
                }
                else{
                    setColDef(getColumnDefinations(HeaderData, customHeader, extras, ["ExpAdd.StockToday"]));
                }
            }
            else {
                setColDef(getColumnDefinations(HeaderData, customHeader, extras, ["ExpAdd.StockToday"]));
            }
        }
    }, [HeaderData,simulationEnable])

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

    useEffect(() => {
        if (currentTab && userConfigFetched) {
            if (currentTab.label === 'Shortage') {
                if(simulationEnable === "enabled"){
                    
                    setColDef(getColumnDefinations(HeaderData, customHeader, extras))
                }
                else{
                    setColDef(getColumnDefinations(HeaderData, customHeader, extras, ["ExpAdd.StockToday"]));
                }
                setCurrentPage(1);
                fetchData(date, 1, '0', false, userPageSize);
            }
            else {
                setColDef(getColumnDefinations(HeaderData, customHeader, extras, ["ExpAdd.StockToday"]))
                setCurrentPage(1);
                fetchData(date, 1, '1', false, userPageSize);
            }
        }
    }, [currentTab])


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
        if (date && Object.keys(appliedFilters).length > 0 && userConfigFetched) {
            setCurrentPage(1);
            fetchData(date, 1, currentTab?.label === "Shortage" ? '0' : '1');
        }
    }, [appliedFilters, userConfigFetched])

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
        if (currentTab?.id === 'ca') {
            fetchData(date, pageNumber, '1', false, userPageSize);
        }
        else {
            fetchData(date, pageNumber, '0', false, userPageSize);
        }
        // (refGraph1.current?.api.getRowNode) && refGraph1.current?.api.set
    };

    const savePageSize = (pageSize: any) => {
        if (pageSize) {
            setCurrentPage(1)
            setUserPageSize(pageSize);
            handleSaveClick(undefined, pageSize);
            fetchData(date,1,currentTab?.label === "Shortage" ? '0':'1', false,pageSize);
        } else {
            notifyError("Invalide page size");
        }
        
    }

    useEffect(() => {
        if (gridRef?.current && columnState?.length && colDef.length > 0) {
            const result = gridRef?.current?.api?.applyColumnState({
                state: columnState,
                applyOrder: true
            });
            if (!result) {
                console.error('Failed to apply column state');
            }
        }
    },[columnState]);

    useEffect(()=>{

        if(colDef){
            setDefaultColState(gridRef?.current?.api?.getColumnState());
            
        }
    },[colDef])

    const renderView = () => {
        switch (currentTab?.id) {
            case "ca":
                return (
                    <TableWrapper>
                        <VFTable
                            {...agGridProps}
                            
                            columnDefs={colDef}
                            rowData={CompleteAvailableDatas}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            ref={gridRef}
                            onGridReady={(params: any) => {
                                params.api.autoSizeAllColumns();
                                // setDefaultColState(params?.api?.getColumnState())
                                
                            }}
                            maintainColumnOrder={true}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                            
                            // onFilterChanged={() => { 
                            //     const filterModel = gridRef?.current?.api?.getFilterModel() || {};
                            //     console.log("filterModelwewew", filterModel.length)
                            //     Object.keys(filterModel).length > 0 ? clearFilterDisabled(false) : clearFilterDisabled(true);
                            // }}        
                    onFilterChanged={()=>{Object.keys((gridRef?.current?.api?.getFilterModel()))?.length>0 ? clearFilterDisabled(false) : clearFilterDisabled(true)}}

                        />
                        <VFPagination
                            key={1}
                            resetGridRef={gridRef}
                            isDisabled={clearFilter}
                            selectedRows={0}
                            rowsPerPage={userPageSize || pagination.mtoPageSize}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}
                            customPageSizeEnabled={true}
                            savePageSize={savePageSize}
                            userPageSize = {userPageSize}

                        />
                    </TableWrapper>
                );
            case "short":
                return (

                    <TableWrapper>
                        {isOverlayLoading && <OverlayLoader message={"Updating the simulated data..."} />}
                        <VFTable
                            key={2}
                            {...agGridProps}
                            columnDefs={colDef}
                            rowData={ShortageDatas}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            ref={gridRef}
                            onGridReady={(params: any) => {
                                params.api.autoSizeAllColumns();
                            }}
                            maintainColumnOrder={true}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                        onFilterChanged={()=>{Object.keys((gridRef?.current?.api?.getFilterModel()))?.length>0 ? clearFilterDisabled(false) : clearFilterDisabled(true)}}

                        />
                        <VFPagination
                            selectedRows={0}
                            resetGridRef={gridRef}
                            isDisabled={clearFilter}
                            rowsPerPage={userPageSize || pagination.mtoPageSize}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}
                            customPageSizeEnabled={true}
                            savePageSize={savePageSize}
                            userPageSize = {userPageSize}

                        />
                        { simulationEnable ==='enabled'  && (
            <div style={{ width: "100%",display: 'flex', alignItems: 'center', justifyContent: 'right', textAlign: 'right', marginRight: '14px', flexDirection: 'row', marginTop: '15px' }}>

                            <VFButtonOutline
                                    onClick={() => { (!isDisabled) && fetchData(date, 1, '0',false,userPageSize) }}
                                themeUi=""
                                disabled={isDisabled}
                                width={135}
                                
                                style={{
                                    opacity: isDisabled ? '0.4' : '1',
                                    height: 'max-content',
                                    marginRight: 20,
                                    borderColor: '#BC3D81',
                                    color: '#BC3D81',
                                    background: 'transparent',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    padding: "1rem",
                                    paddingRight: "2rem",
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <img src="/assets/img/VectorFLOW/reset.svg" alt="Reset Icon" height={15} width={15} style={{ margin: '0 12px' }} />
                                    <p style={{ fontSize: '12px' }}>
                                        Reset Data
                                    </p>
                                </div>
                            </VFButtonOutline>
                            <VFButton
                                onClick={navigateToSimulateScreen}
                                themeUi=""
                                disabled={isDisabled}
                                width={250}
                                style={{
                                    padding: "1rem",
                                    height: "max-content",
                                    width: "max-content",
                                    fontSize: "12px",
                                }}
                                >
                                Simulate improvement in Full Kits
                            </VFButton>
                        </div>

        )
                            
                            }

                    </TableWrapper>
                );
            
            default:
                return(
                    <TableWrapper>
                        <VFTable
                            {...agGridProps}
                            
                            columnDefs={colDef}
                            rowData={CompleteAvailableDatas}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            ref={gridRef}
                            onGridReady={(params: any) => {
                                params.api.autoSizeAllColumns();
                                // setDefaultColState(params?.api?.getColumnState())
                                
                            }}
                            maintainColumnOrder={true}
                            statusBar={{
                                statusPanels: [
                                    { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                                ]
                            }}
                    onFilterChanged={()=>{Object.keys((gridRef?.current?.api?.getFilterModel()))?.length>0 ? clearFilterDisabled(false) : clearFilterDisabled(true)}}

                        />
                        <VFPagination
                            key={1}
                            resetGridRef={gridRef}
                            isDisabled={clearFilter}
                            selectedRows={0}
                            rowsPerPage={userPageSize || pagination.mtoPageSize}
                            totalRows={totalRows}
                            currentPage={currentPage}
                            handleChangePage={handlePageChangeCumulative}
                            customPageSizeEnabled={true}
                            savePageSize={savePageSize}
                            userPageSize = {userPageSize}
                        />
                    </TableWrapper>
                );
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
                resizable: true,
                floatingFilter: true,
                filter: "agMultiColumnFilter",
                // minWidth: 140,
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
                initialFlex: 1,
            },


        },
        masterDetail: true,
        detailCellRenderer: ChildrenProcPlanningCellRenderer,
        detailRowHeight: 225,
        autoGroupColumnDef: autoGroupColumnDef,
        enterNavigatesVertically: true,
        enterNavigatesVerticallyAfterEdit: true,
        groupDefaultExpanded: 0,
        defaultExcelExportParams: defaultExcelExportParams,
        excelStyles: excelStyles,
        sideBar: sideBar,
        onCellEditingStopped(event: any) {
            const field = event.colDef.field;
            const newValue = +event.newValue;
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
        isLoading,
        isUpdateUserConfig,
        isGetUserConfig,
        handleResetClick,
        handleSaveClick,
        currentTab
    }
}

export default useProcPlanning;