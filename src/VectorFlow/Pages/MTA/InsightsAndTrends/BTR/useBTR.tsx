import { useEffect, useMemo, useRef, useState } from "react"


import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import HorizontalSplitView from "./HorizontalSplitView"

import VerticalSplitView from "./VerticalSplitView"
import { getColumnsForExcelExport, mapBTRRowData, mapBTRRowDataToColDefs, MainMenuItemsCustomization, getColumnDefinationsMTA } from "../../../../../helpers/utils"

import { useGetBTRDataCount, useGetBTRData } from "../../../../../VectorFlow/Services/MTA/InsightsAndTrends/BTR"


import { ColDef } from "ag-grid-enterprise"
import { BTRTableHeader } from "./styles"
import CategoryCellRenderer from "./CategoryCellRenderer"
import AvailabilityCellRenderer from "./AvailabilityCellRenderer"
import ColorCellRenderer from "./ColorCellRenderer"
import { AgGridReactProps } from "ag-grid-react"
import TagsCellRenderer from "./TagsCellRenderer"
import AvailabilityToolTip from "./AvailabilityToolTip"
import CategoryToolTip from "./CategoryToolTip"
import { SeasonalityGraphCellRenderer } from "../../../../../components/VectorFLOW/commons/SeasonalityCellRenderers"
import VFPagination, { VFPaginationProps } from "../../../../../components/VectorFLOW/commons/VFPagination"
import CustomVFTable from "./CustomVFTable"
import { notifyError, notifyLoader } from "../../../../../helpers/notify"
import { toast } from "react-toastify"

import useBPRFilter from "../../../../../hooks/useBPRFilter";
import { useUserData } from "../../../../../context"
import { BPRFilterState } from "../../../../../VectorFlow/types/BPR"
import { BTRCategoryTextToNumberMapper } from "../../../../../helpers/BPRConstants"
import useGetLastRunData from "../../../../../hooks/useGetLastRunData"

import _ from 'lodash'
import { useGetUIConfigData } from "../../../../Services/MTA/Common/UIConfig"
import { UIColumnConfigName, UserUIColumnConfigName } from "../../../../../helpers/Enum"
import { format } from "date-fns"
import { useGetState } from "../../../../Services/MTA/Common/UserUIConfig"
import { GridRef } from "../../../../../VectorFlow/types/MDM"

const useBTR = () => {


    const ecoRef = useRef<GridRef>();
    const techRef = useRef<GridRef>();
    const tempRef = useRef()
    const [techInternalRef,setTechInternalRef] = useState<any>()
    const [ecoInternalRef,setEcoInternalRef] = useState<any>()
    const tabs: Array<VFFloatingTabItemProps> = [
        {
            id: "1",
            value: 'both',
            label: "Both On-Hand & Pipeline View"
        },
        {
            id: "2",
            value: 'on-hand',
            label: "On-Hand Inv. View"
        },
        {
            id: "3",
            value: 'pipeline',
            label: "Pipeline Inv. View"
        }
    ]

    const { user } = useUserData()

    const themeUi = user.user.theme_ui

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [isLockMode, toggleLockMode] = useState<boolean>(false)

    const [horizon, setHorizon] = useState<number>(90)

    const { state: currFilter, setState: setCurrFilter, onDelete } = useBPRFilter()


    const rowsPerPage = parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '50');

    const { mutateAsync: getBTRData, isLoading } = useGetBTRData()

    const { data: countData, mutateAsync: getBTRDataCount, isLoading: isBTRCountLoading } = useGetBTRDataCount()

    const { mutateAsync: getUiConfig, isLoading: isUIConfigLoading, isError } = useGetUIConfigData();

    const { mutateAsync: getState, isLoading: isSavedDataLoading } = useGetState();

    const ecoTotalRows = useMemo(() => { return countData?.data.data.EcoCount }, [isBTRCountLoading])

    const techTotalRows = useMemo(() => { return countData?.data.data.TechCount }, [isBTRCountLoading])

    const [dateLabels, setDateLabels] = useState<any>()

    const [tempDownloadData, setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns, setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData, setExportExcelRowData] = useState<Array<any>>([])

    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0])
    const [verticalView, setVerticalView] = useState<boolean>(true)
    const [techRowData, setTechRowData] = useState<Array<any>>([])
    const [ecoRowData, setEcoRowData] = useState<Array<any>>([])
    const {date:lastRunDate} = useGetLastRunData()
    const [initialColumnState, setInitialColumnState] = useState<any>(undefined);
    const [techGridState, setTechGridState] = useState<any>();
    const [ecoGridState, setEcoGridState] = useState<any>();
    const [techMasterUIConfig, setTechMasterUIConfig] = useState<any>([]);
    const [ecoMasterUIConfig, setEcoMasterUIConfig] = useState<any>([]);

    const techPaginationProps: VFPaginationProps = {
        selectedRows: 0,
        totalRows: techTotalRows,
        rowsPerPage: rowsPerPage,
        currentPage: currentPage,
        handleChangePage: (currPage: number) => {
            getData(getPreparedFilter(currFilter), currPage);
            setCurrentPage(currPage)
        }

    }

    const ecoPaginationProps: VFPaginationProps = {
        selectedRows: 0,
        totalRows: ecoTotalRows,
        rowsPerPage: rowsPerPage,
        currentPage: currentPage,
        handleChangePage: (currPage: number) => {
            getData(getPreparedFilter(currFilter), currPage);
            setCurrentPage(currPage)
        }

    }

    const defaultColDef = {
        floatingFilter: true,
        filter: 'agMultiColumnFilter',
        sortable: true,
        cellStyle: {
            "textAlign": "center",
            'textOverflow': 'ellipsis',
            'whiteSpace': 'nowrap'
        },
        flex: 1,
        width: 50,
        minWidth: 80,
        cellClass:'btr_cell_style'

    }

    const gridProps = useMemo(():AgGridReactProps=>{
        return {
            getMainMenuItems: MainMenuItemsCustomization,
            gridOptions: {
                getRowStyle: (params: any) => {
                    if (params.node.rowIndex % 2 === 0) {
                        return { background: "#EBEBEB" };
                    }
                    return { background: "#F7F7F7" };
                },
                components: {
                    graphCellRenderer: SeasonalityGraphCellRenderer,
                    categoryCellRenderer: CategoryCellRenderer,
                    categoryToolTip: CategoryToolTip,
                    availabilityCellRenderer: AvailabilityCellRenderer,
                    colorCellRenderer: ColorCellRenderer,
                    tagsCellRenderer: TagsCellRenderer,
                    availabilityToolTip: AvailabilityToolTip,
                    // paginationPageSize:parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100'),
                },
            },
            rowHeight: 25,
            
            defaultColDef: defaultColDef,
        }
    }, [])


    const tempAgGridProps: AgGridReactProps = {
        onRowDataUpdated: (event) => {
            if (tempDownloadData) event.api.exportDataAsExcel({ fileName: currentTab.value === 'on-hand' ? "OnHandInv" : "PipelineInv", columnKeys: getColumnsForExcelExport(currentTab.value === 'on-hand' ? techColDefs : ecoColDefs) });
        }
    };

    const getBPRUiConfig = async () => {
        try {
            const response = await getUiConfig(UIColumnConfigName.BuffertrendReport);
            setInitialColumnState(response.data.data);
        } catch (err: any) {
            notifyError("Something Went Wrong")
        }
    }

    const getUserColumnConfig = async () => {
        if (currentTab.id === "2") {
            const stateData = await getState({ "reportname": UserUIColumnConfigName.BTROnHand });
            if (stateData.data.data.length !== 0) {
                const parsedContent = JSON.parse(stateData.data.data)
                setTechGridState({
                    charts: parsedContent.charts,
                    columns: parsedContent.columns,
                    pivot: parsedContent.pivot,
                })
            } else {
                console.log("State Data not available for BTROnHand");
            }
        }

        if (currentTab.id === "3") {
            const stateData = await getState({ "reportname": UserUIColumnConfigName.BTRPipeline });
            if (stateData.data.data.length !== 0) {
                const parsedContent = JSON.parse(stateData.data.data)

                setEcoGridState({
                    charts: parsedContent.charts,
                    columns: parsedContent.columns,
                    pivot: parsedContent.pivot,
                })
        
            } else {
                console.log("State Data not available BTRPipeline");
            }
        }
    }

    const onResetCallback = async () => {
        if (currentTab.id === "2") {

            setTechGridState({
                charts: [],
                columns: techMasterUIConfig,
                pivot: false,
            })
        } else if (currentTab.id === "3") {

            setEcoGridState({
                charts: [],
                columns: ecoMasterUIConfig,
                pivot: false,
            })
        }
        
    }

    const getData = async (filter: any, pageNumber: number) => {
        const payload = {
            id: 0,
            name: 'both',
            fields: [],
            filters: filter,
            paginationParameter: {
                pageNumber: pageNumber,
                recordsPerPage: rowsPerPage
            },
        }
        const loaderId = notifyLoader("Loading data")
        try {
            const data = await getBTRData(payload)
            setEcoRowData(mapBTRRowData(data.data.data.eco, horizon))
            setTechRowData(mapBTRRowData(data.data.data.tech, horizon))
            setDateLabels(data.data.data.labels[0])
        } catch (err: any) {
            notifyError(err)
            setTechRowData([])
            setEcoRowData([])
        } finally {
            toast.dismiss(loaderId)
        }

    }

    useEffect(() => {
        const payload = {
            id: 0,
            name: 'both',
            fields: [],
            filters: currFilter,
            paginationParameter: {
                pageNumber: 1,
                recordsPerPage: rowsPerPage
            },
        }
        getBTRDataCount(payload)
        getData(currFilter, 1)
        getBPRUiConfig();
    }, [])

    const getPreparedFilter = (filter: BPRFilterState): BPRFilterState => {
        const doesCategoryExist = (filter.availabilityFilter.filters.length > 0 && filter.availabilityFilter.filters.some((f) => f.name === "AF8"))
        const tempFilter = _.cloneDeep(filter)
        if (doesCategoryExist) {

            tempFilter.availabilityFilter.filters = tempFilter.availabilityFilter.filters.map((f) => {
                return {
                    ...f,
                    value: BTRCategoryTextToNumberMapper[f.value]
                }
            })
        }
        return tempFilter
    }

    const onApplyFilter = async (filter: BPRFilterState) => {
        setCurrFilter(filter)
        const tempFilter = getPreparedFilter(filter)

        const payload = {
            id: 0,
            name: '',
            fields: [],
            filters: tempFilter,
            paginationParameter: {
                pageNumber: 1,
                recordsPerPage: rowsPerPage
            },
        }
        getBTRDataCount(payload)
        getData(tempFilter, 1)
    }


    const onDeleteFilter = async (parentId: any, filterId: any, value: any) => {
        const updatedFilter = onDelete(parentId, filterId, value)
        onApplyFilter(updatedFilter)
        setCurrentPage(1)
    }

    const toggleVerticalView = (isVertical: boolean) => setVerticalView(isVertical)

    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab)

    const Extras = () => {
        if (dateLabels) {
            return Object.entries(dateLabels).map((item: any, index: any) => {
                return {
                    field: item[0],
                    colId: item[0],
                    headerName: format(item[1], 'PP'),
                    cellRenderer: 'colorCellRenderer',
                    cellRendererParams: (params: any) => {
                        return {
                            colorValue: params.data[item[0]]
                        }
                    },
                    minWidth: 100,
                    position: (index + initialColumnState.length),  //column should be at position onwards main columns
                }
            })
        } else {
            return [];
        }
    };
    
    const CustomHeader = {
        Category: {
            cellRenderer: 'categoryCellRenderer',
            tooltipField: "Category",
            tooltipComponent: 'categoryToolTip',
            pinned: 'left',
        },
        Availability: {
            cellRenderer: 'availabilityCellRenderer',
            tooltipField: "Availability",
            tooltipComponent: 'availabilityToolTip',
            pinned: 'left',
        },
        Tags: {
            cellRenderer: 'tagsCellRenderer',
            pinned: 'left',
        },
        SKUCode: {
            pinned: 'left',
        },
        SKUDescription: {
            pinned: 'left',
        },
        WhCode: {
            pinned: 'left',
        },
        LocationName: {
            pinned: 'left',
        },
        Norm: {
            pinned: 'left',
        },
        VirtualNorm: {
            pinned: 'left',
        },
    };

    const techColDefs = useMemo((): Array<ColDef> => {
        if (initialColumnState) {
            const colDefs = getColumnDefinationsMTA(initialColumnState, CustomHeader, Extras());
            colDefs.map((colDef: any) => {
                if (initialColumnState.find((initialColumnState: any) => initialColumnState.Col_Code === colDef.colId)) {
                    colDef.minWidth = 80;
                }
                return colDef
            })
            const result = colDefs.filter((r: any) => (!r.colId?.startsWith('D')) || (r.colId.startsWith('D') && parseInt(r.colId.slice(1)) > 90 - horizon))
            return result;
        } else return [];
    }, [techRowData, currentTab, verticalView, dateLabels]);

    const ecoColDefs = useMemo((): Array<ColDef> => {
        if (initialColumnState) {
            let colDefs;
            if (verticalView && currentTab.id === "1") {
                const removeCols = ['Category', "LocationName", "Norm", "SKUCode", "SKUDescription", "Tags", "VirtualNorm", "RN", "pc", "pn","WhCode"];
                colDefs = getColumnDefinationsMTA(initialColumnState, CustomHeader, Extras(), removeCols);
            } else {
                colDefs = getColumnDefinationsMTA(initialColumnState, CustomHeader, Extras());
            }

            // Set column width for all columns except date columns
            colDefs.map((colDef: any) => {
                if (initialColumnState.find((initialColumnState: any) => initialColumnState.Col_Code === colDef.colId)) {
                    colDef.minWidth = 80;
                }
                return colDef
            })
            const result = colDefs.filter((r: any) => (!r.colId?.startsWith('D')) || (r.colId.startsWith('D') && parseInt(r.colId.slice(1)) > 90 - horizon))

            return result;
        } else return [];
    }, [ecoRowData, dateLabels, verticalView, currentTab]);

    useEffect(() => {
        if (currentTab.id === "2" || currentTab.id === "3") {
            getUserColumnConfig();   
        }
    },[currentTab])

    useEffect(() => {
        if (currentTab.id === "2" && techColDefs.length && techInternalRef?.api) {
            setTechMasterUIConfig(techInternalRef?.api.getColumnState());
        }
    }, [techInternalRef, techColDefs, currentTab]);

    useEffect(() => {
        if (currentTab.id === "3" && ecoColDefs.length && ecoInternalRef?.api) {
            setEcoMasterUIConfig(ecoInternalRef?.api.getColumnState());
        }
    }, [ecoInternalRef, ecoColDefs, currentTab]);

    useEffect(() => {
        if (techInternalRef && techGridState && techGridState.columns) {
            const result = techInternalRef?.api.applyColumnState({ state: techGridState.columns, applyOrder: true });
            if (!result) {
                console.error("Failed to apply column state", result);
            }
        }
    }, [techInternalRef, techGridState]);
    
    useEffect(() => {
        if (ecoInternalRef && ecoGridState && ecoGridState.columns) {
            const result = ecoInternalRef?.api.applyColumnState({ state: ecoGridState.columns, applyOrder: true });
            if (!result) {
                console.error("Failed to apply column state", result);
            }
        }
    }, [ecoInternalRef, ecoGridState]);

    const renderView = () => {
        switch (currentTab.id) {
            case "1":
                if (verticalView) return (
                    <VerticalSplitView
                        themeUi={themeUi}
                        techTable={{
                            columnDefs: techColDefs,
                            rowData: techRowData,
                            header: "On-Hand Inventory View Trend Report",
                            paginationProps: techPaginationProps,
                            ...gridProps
                        }}
                        ecoTable={{
                            columnDefs: ecoColDefs,
                            paginationProps: ecoPaginationProps,
                            rowData: ecoRowData,
                            header: "Pipeline Inventory Trend Report",
                            ...gridProps
                        }}
                        isLocked={isLockMode}
                        toggleLockMode={toggleLockMode}
                    />
                )
                return (
                    <HorizontalSplitView
                        themeUi={themeUi}
                        techTable={{
                            columnDefs: techColDefs,
                            rowData: techRowData,
                            header: "On-Hand Inventory View Trend Report",
                            paginationProps: techPaginationProps,
                            ...gridProps
                        }}
                        ecoTable={{
                            columnDefs: ecoColDefs,
                            rowData: ecoRowData,
                            header: "Pipeline Inventory Trend Report",
                            paginationProps: ecoPaginationProps,
                            ...gridProps
                        }}
                        isLocked={isLockMode}
                        toggleLockMode={toggleLockMode}
                    />
                )
            case "2":
                return (
                    <>
                        <BTRTableHeader>
                            On-Hand Inventory View Trend Report
                        </BTRTableHeader>
                        <CustomVFTable
                            height={"100%"}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            ref={techRef}
                            disableZoomScaling
                            columnDefs={techColDefs}
                            rowData={techRowData}
                            {...gridProps}
                            pagination={false}
                            paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}
                            maintainColumnOrder
                            onGridReady={(params) => setTechInternalRef(params)}
                        />
                        <div style={{ zoom: 0.7, margin: '0px -15px 0px -15px' }}>
                            <VFPagination style={{marginTop:'-15px'}}
                            {...techPaginationProps} />
                        </div>
                    </>
                )
            case "3":
                return (
                    <>
                        <BTRTableHeader>
                            Pipeline Inventory Trend Report
                        </BTRTableHeader>
                        <CustomVFTable
                            height={"100%"}
                            tooltipHideDelay={100000}
                            tooltipShowDelay={0}
                            tooltipMouseTrack={true}
                            ref={ecoRef}
                            disableZoomScaling
                            columnDefs={ecoColDefs}
                            rowData={ecoRowData}
                            {...gridProps}
                            pagination={false}
                            paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}
                            maintainColumnOrder
                            onGridReady={(params) => setEcoInternalRef(params)}

                        />
                        <div style={{ zoom: 0.7, margin: '0px -15px 0px -15px' }}>
                            <VFPagination style={{marginTop:'-15px'}}
                            {...ecoPaginationProps} />
                        </div>
                    </>
                )
            default:
                return <CustomVFTable columnDefs={[]} rowData={[]} {...gridProps} />
        }
    }

    const onExportToExcelCallBack = async (pageNumber: number, page: string) => {
        const tempFilter = getPreparedFilter(currFilter)
        const payload = {
            id: 0,
            name: page==='on-hand'?'tech':'eco',
            fields: [],
            filters: tempFilter,
            paginationParameter: {
                pageNumber: pageNumber,
                recordsPerPage: 5000
            },
        }
        const data = await getBTRData(payload)
        if (page == 'on-hand') return data.data.data.tech
        return data.data.data.eco

    }

    return {
        ecoRef,
        techRef,
        tempRef,
        currentTab,
        verticalView,
        isLoading: isLoading || isBTRCountLoading || isUIConfigLoading || isSavedDataLoading,
        isError,
        techColDefs,
        techTotalRows,
        toggleVerticalView,
        toggleCurrentTab,
        renderView,
        onExportToExcelCallBack,
        tempDownloadData,
        isLockMode,
        toggleLockMode,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        currFilter,
        themeUi,
        setCurrFilter,
        onDeleteFilter,
        onApplyFilter,
        horizon,
        ecoColDefs,
        setHorizon,
        lastRunDate,
        onResetCallback
    }
}

export default useBTR