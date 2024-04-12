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
                    availabilityToolTip:AvailabilityToolTip
                }
            }
        }
    },[])

    const [currentTab,setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0])
    const [verticalView,setVerticalView] = useState<boolean>(true)
    const [rowData,setRowData] = useState([])
    // const [defaultColDefs,setDefaultColDefs] = useState<Array<ColDef>>([])

    const {mutateAsync:getBTRData,isLoading} = useGetBTRData()

    useEffect(()=>{
        const getData = async()=>{
            const data = await getBTRData()
            setRowData(data.data.data)
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
                            rowData:rowData,
                            header:"On-Hand Inventory View Trend Report",
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            rowData:rowData,
                            header:"Pipeline Inventory Trend Report",
                            ...gridProps
                        }}
                    />
                )
                return (
                    <HorizontalSplitView 
                        techTable={{
                            columnDefs:techColDefs,
                            rowData:rowData,
                            header:"On-Hand Inventory View Trend Report",
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            rowData:rowData,
                            header:"Pipeline Inventory Trend Report",
                            ...gridProps}}
                    />
                )
            case "2":
                return <><BTRTableHeader>On-Hand Inventory View Trend Report</BTRTableHeader><VFTable tooltipHideDelay={0}  tooltipShowDelay={0} tooltipMouseTrack={true} ref={techRef} disableZoomScaling columnDefs={techColDefs} rowData={rowData} {...gridProps} pagination paginationPageSize={50}/></>
            case "3":
                return <><BTRTableHeader>Pipeline Inventory Trend Report</BTRTableHeader><VFTable tooltipHideDelay={0}  tooltipShowDelay={0} tooltipMouseTrack={true} ref={ecoRef} disableZoomScaling columnDefs={ecoColDefs} rowData={rowData} {...gridProps} pagination paginationPageSize={50}/></>
            default:
                return <VFTable  columnDefs={[]} rowData={[]} {...gridProps}/>
        }
    }

    const techColDefs = useMemo(():Array<ColDef>=>{
       if(rowData.length>0) return mapBTRRowDataToColDefs(rowData[0],()=>console.log(''))
       return []
    },[currentTab,rowData])

    console.log(techColDefs)

    const ecoColDefs = useMemo(():Array<ColDef>=>{
        if(rowData.length>0)return mapBTRRowDataToColDefs(_.omit(rowData[0],['category','Tags','VirtualNorm']))
        return []
    },[currentTab,rowData])

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