import { useEffect, useMemo, useRef, useState } from "react"

import _ from 'lodash'

import VFTable from "../../../../../components/VectorFLOW/commons/VFTable"
import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import HorizontalSplitView from "./HorizontalSplitView"

import VerticalSplitView from "./VerticalSplitView"
import { mapBTRRowDataToColDefs } from "../../../../../helpers/utils"

import { useGetBTRData } from "../../../../../VectorFlow/Services/MTA/InsightsAndTrends/BTR"

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
import { VFPaginationProps } from "../../../../../components/VectorFLOW/commons/VFPagination"

const useBTR = ()=>{

    
    const ecoRef = useRef()
    const techRef = useRef()
    const tabs:Array<VFFloatingTabItemProps> = [
        {
            id:"1",
            value:'both',
            label:"Both On-Hand & Pipeline View"
        },
        {
            id:"2",
            value:'on-hand',
            label:"On-Hand Inv. View"
        },
        {
            id:"3",
            value:'pipeline',
            label:"Pipeline Inv. View"
        }
    ]

    const [techCurrentPage,setTechCurrentPage] = useState<number>(1);

    const [techTotalRows,setTechTotalRows] = useState<number>(0);

    const [ecoCurrentPage,setEcoCurrentPage] = useState<number>(1);

    const [ecoTotalRows,seteEoTotalRows] = useState<number>(0);

    const rowsPerPage = parseInt(process.env.REACT_APP_PLANNING_ROWS_PER_PAGE || '50');

    const ecoPaginationProps:VFPaginationProps = {
        selectedRows:0,
        totalRows:ecoTotalRows,
        rowsPerPage:rowsPerPage,
        currentPage:ecoCurrentPage,
        handleChangePage:(currPage:number) => {
            // fetchAndUpdateGridData(currPage);
            setEcoCurrentPage(currPage)
        }
        
    }

    const techPaginationProps:VFPaginationProps = {
        selectedRows:0,
        totalRows:techTotalRows,
        rowsPerPage:rowsPerPage,
        currentPage:techCurrentPage,
        handleChangePage:(currPage:number) => {
            // fetchAndUpdateGridData(currPage);
            setTechCurrentPage(currPage)
        }
        
    }

    const gridProps = useMemo(():AgGridReactProps=>{
        return {
            gridOptions:{
                components:{
                    graphCellRenderer:SeasonalityGraphCellRenderer,
                    categoryCellRenderer:CategoryCellRenderer,
                    categoryToolTip:CategoryToolTip,
                    availabilityCellRenderer:AvailabilityCellRenderer,
                    colorCellRenderer:ColorCellRenderer,
                    tagsCellRenderer:TagsCellRenderer,
                    availabilityToolTip:AvailabilityToolTip,
                    // paginationPageSize:parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100'),


                },
                rowHeight:30
            }
        }
    },[])

    const [currentTab,setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0])
    const [verticalView,setVerticalView] = useState<boolean>(true)
    const [techRowData,setTechRowData] = useState<Array<any>>([])
    const [ecoRowData,setEcoRowData]  = useState<Array<any>>([])
    // const [defaultColDefs,setDefaultColDefs] = useState<Array<ColDef>>([])

    const {mutateAsync:getBTRData,isLoading} = useGetBTRData()
    useEffect(()=>{
        const getData = async()=>{
            const data = await getBTRData({
                "id": 1,
                "name": "",
                "fields": [],
                "filters": [],
                "paginationParameter": {
                    "pageNumber": 1,
                    "recordsPerPage": 100
                }
            })
            
        }
        getData()
    },[])

    const toggleVerticalView = (isVertical:boolean)=>setVerticalView(isVertical)

    const toggleCurrentTab = (tab:VFFloatingTabItemProps)=>setCurrentTab(tab)

    const renderView = ()=>{
        switch(currentTab.id){
            case "1":
                if(verticalView)return(
                    <VerticalSplitView 
                        techTable={{
                            columnDefs:techColDefs,
                            rowData:techRowData,
                            header:"On-Hand Inventory View Trend Report",
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            rowData:ecoRowData,
                            header:"Pipeline Inventory Trend Report",
                            ...gridProps
                        }}
                    />
                )
                return (
                    <HorizontalSplitView 
                        techTable={{
                            columnDefs:techColDefs,
                            rowData:techRowData,
                            header:"On-Hand Inventory View Trend Report",
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            rowData:ecoRowData,
                            header:"Pipeline Inventory Trend Report",
                            ...gridProps}}
                    />
                )
            case "2":
                return <><BTRTableHeader>On-Hand Inventory View Trend Report</BTRTableHeader><VFTable  tooltipHideDelay={100000}  tooltipShowDelay={0} tooltipMouseTrack={true} ref={techRef} disableZoomScaling columnDefs={techColDefs} rowData={techRowData} {...gridProps} pagination paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}/></>
            case "3":
                return <><BTRTableHeader>Pipeline Inventory Trend Report</BTRTableHeader><VFTable  tooltipHideDelay={100000}  tooltipShowDelay={0} tooltipMouseTrack={true} ref={ecoRef} disableZoomScaling columnDefs={ecoColDefs} rowData={ecoRowData} {...gridProps} pagination paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}/></>
            default:
                return <VFTable  columnDefs={[]} rowData={[]} {...gridProps}/>
        }
    }

    const techColDefs = useMemo(():Array<ColDef>=>{
    //    if(rowData.length>0) return mapBTRRowDataToColDefs(rowData[0],()=>console.log(''))
       return []
    },[currentTab])


    const ecoColDefs = useMemo(():Array<ColDef>=>{
        // if(rowData.length>0)return mapBTRRowDataToColDefs(_.omit(rowData[0],['category','Tags','VirtualNorm']))
        return []
    },[currentTab])

    return{
        currentTab,
        verticalView,
        isLoading,
        toggleVerticalView,
        toggleCurrentTab,
        renderView
    }
}

export default useBTR