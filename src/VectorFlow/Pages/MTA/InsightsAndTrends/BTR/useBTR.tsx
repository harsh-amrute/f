import { useEffect, useMemo, useRef, useState } from "react"


import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import HorizontalSplitView from "./HorizontalSplitView"

import VerticalSplitView from "./VerticalSplitView"
import { mapBTRRowData, mapBTRRowDataToColDefs } from "../../../../../helpers/utils"

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

const useBTR = () => {

    const ecoRef = useRef()
    const techRef = useRef()
    const tempRef = useRef()
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

    const [currentPage, setCurrentPage] = useState<number>(1);




    const rowsPerPage = parseInt(process.env.REACT_APP_PLANNING_ROWS_PER_PAGE || '50');

    const { mutateAsync: getBTRData, isLoading } = useGetBTRData()

    const { data: countData } = useGetBTRDataCount()

    const ecoTotalRows = useMemo(() => { return countData?.data.data.EcoCount }, [countData])

    const techTotalRows = useMemo(() => { return countData?.data.data.TechCount }, [countData])

    const [tempDownloadData, setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns, setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData, setExportExcelRowData] = useState<Array<any>>([])

    const techPaginationProps: VFPaginationProps = {
        selectedRows: 0,
        totalRows: techTotalRows,
        rowsPerPage: rowsPerPage,
        currentPage: currentPage,
        handleChangePage: (currPage: number) => {
            getData(currPage);
            setCurrentPage(currPage)
        }

    }

    const ecoPaginationProps: VFPaginationProps = {
        selectedRows: 0,
        totalRows: ecoTotalRows,
        rowsPerPage: rowsPerPage,
        currentPage: currentPage,
        handleChangePage: (currPage: number) => {
            getData(currPage);
            setCurrentPage(currPage)
        }

    }

    const gridProps = useMemo((): AgGridReactProps => {
        return {
            gridOptions: {
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
                getRowStyle: (params: any) => {
                    if (params.node.rowIndex % 2 === 0) {
                        return { background: "#EBEBEB" };
                    }
                    return { background: "#F7F7F7" };
                },
            },
            rowHeight: 25,
        }
    }, [])


    const tempAgGridProps: AgGridReactProps = {
        onRowDataUpdated: (event) => {
            if (tempDownloadData) event.api.exportDataAsExcel({ fileName: '' });
        }
    };

    const [currentTab, setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0])
    const [verticalView, setVerticalView] = useState<boolean>(true)
    const [techRowData, setTechRowData] = useState<Array<any>>([])
    const [ecoRowData, setEcoRowData] = useState<Array<any>>([])
    // const [defaultColDefs,setDefaultColDefs] = useState<Array<ColDef>>([])

    const getData = async (pageNumber?: number) => {
        const loaderId = notifyLoader("Loading data")
        try {
            const data = await getBTRData({
                pageNumber: pageNumber || 1,
                recordsPerPage: 100
            })

            setEcoRowData(mapBTRRowData(data.data.data.eco))
            setTechRowData(mapBTRRowData(data.data.data.tech))
        } catch (err: any) {
            notifyError(err)
        } finally {
            toast.dismiss(loaderId)
        }

    }

    useEffect(() => {

        getData()
    }, [])

    const toggleVerticalView = (isVertical: boolean) => setVerticalView(isVertical)

    const toggleCurrentTab = (tab: VFFloatingTabItemProps) => setCurrentTab(tab)

    const renderView = () => {
        switch (currentTab.id) {
            case "1":
                if (verticalView) return (

                    <VerticalSplitView
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
                    />
                )
                return (

                    <HorizontalSplitView
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
                    />
                )
            case "2":
                return (
                    <>
                        <BTRTableHeader>
                            On-Hand Inventory View Trend Report
                        </BTRTableHeader>
                        <CustomVFTable
                            height={400}
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
                        />
                        <div style={{ zoom: 0.7, marginBottom: '20px' }}>
                            <VFPagination {...techPaginationProps} />
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
                            height={400}
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
                        />
                        <div style={{ zoom: 0.7, marginBottom: '20px' }}>
                            <VFPagination {...ecoPaginationProps} />
                        </div>
                    </>
                )
            default:
                return <CustomVFTable columnDefs={[]} rowData={[]} {...gridProps} />
        }
    }

    const onExportToExcelCallBack = async (pageNumber: number, page: string) => {
        const data = await getBTRData({
            pageNumber: pageNumber,
            recordsPerPage: 5000
        })
        if (page == 'on-hand') return data.data.data.tech
        return data.data.data.eco

    }

    const techColDefs = useMemo((): Array<ColDef> => {
        if (techRowData.length === 0) return []
        return mapBTRRowDataToColDefs(techRowData[0])
    }, [techRowData])


    const ecoColDefs = useMemo((): Array<ColDef> => {
        if (ecoRowData.length === 0) return []
        return mapBTRRowDataToColDefs(ecoRowData[0])
    }, [ecoRowData])

    return {
        ecoRef,
        techRef,
        tempRef,
        currentTab,
        verticalView,
        isLoading,
        techColDefs,
        techTotalRows,
        toggleVerticalView,
        toggleCurrentTab,
        renderView,
        onExportToExcelCallBack,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
    }
}

export default useBTR