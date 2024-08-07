import { useEffect, useMemo, useRef, useState } from "react"


import { VFFloatingTabItemProps } from "../../../../../components/VectorFLOW/commons/VFFloatingTab"
import HorizontalSplitView from "./HorizontalSplitView"

import VerticalSplitView from "./VerticalSplitView"
import { getColumnsForExcelExport, mapBTRRowData, mapBTRRowDataToColDefs } from "../../../../../helpers/utils"

import { useGetBTRDataCount,useGetBTRData } from "../../../../../VectorFlow/Services/MTA/InsightsAndTrends/BTR"


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

import _ from 'lodash'

const useBTR = ()=>{

    
    const ecoRef = useRef()
    const techRef = useRef()
    const tempRef = useRef()
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

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [currentPage,setCurrentPage] = useState<number>(1);

    const [isLockMode,toggleLockMode] = useState<boolean>(false)

    const [horizon,setHorizon] = useState<number>(90)

    const {state:currFilter,setState:setCurrFilter,onDelete} = useBPRFilter()


    const rowsPerPage = parseInt(process.env.REACT_APP_PLANNING_ROWS_PER_PAGE || '50');

    const {mutateAsync:getBTRData,isLoading} = useGetBTRData()

    const {data:countData,mutateAsync:getBTRDataCount,isLoading:isBTRCountLoading} = useGetBTRDataCount()


    const ecoTotalRows = useMemo(()=>{return countData?.data.data.EcoCount},[isBTRCountLoading])

    const techTotalRows = useMemo(()=>{return countData?.data.data.TechCount},[isBTRCountLoading])

    const [dateLabels,setDateLabels] = useState<any>()

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])

    const [currentTab,setCurrentTab] = useState<VFFloatingTabItemProps>(tabs[0])
    const [verticalView,setVerticalView] = useState<boolean>(true)
    const [techRowData,setTechRowData] = useState<Array<any>>([])
    const [ecoRowData,setEcoRowData]  = useState<Array<any>>([])

    const techPaginationProps:VFPaginationProps = {
        selectedRows:0,
        totalRows:techTotalRows,
        rowsPerPage:rowsPerPage,
        currentPage:currentPage,
        handleChangePage:(currPage:number) => {
            getData(getPreparedFilter(currFilter),currPage);
            setCurrentPage(currPage)
        }
        
    }

    const ecoPaginationProps:VFPaginationProps = {
        selectedRows:0,
        totalRows:ecoTotalRows,
        rowsPerPage:rowsPerPage,
        currentPage:currentPage,
        handleChangePage:(currPage:number) => {
            getData(getPreparedFilter(currFilter),currPage);
            setCurrentPage(currPage)
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
                getRowStyle: (params: any) => {
                    if (params.node.rowIndex % 2 === 0) {
                      return { background: "#EBEBEB" };
                    }
                    return { background: "#F7F7F7" };
                  },
            },
            rowHeight:25
        }
    },[])


    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:currentTab.value==='on-hand'?"OnHandInv":"PipelineInv",columnKeys:getColumnsForExcelExport(currentTab.value==='on-hand'?techColDefs:ecoColDefs)});
        }
      };

    
    // const [defaultColDefs,setDefaultColDefs] = useState<Array<ColDef>>([])


    const getData = async(filter:any,pageNumber:number)=>{
        const payload = {
            id: 0,
            name: '',
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber: pageNumber,
                recordsPerPage: 100
            },
        }
        const loaderId = notifyLoader("Loading data")
        try{
            const data = await getBTRData(payload)
            
            setEcoRowData(mapBTRRowData(data.data.data.eco,horizon))
            setTechRowData(mapBTRRowData(data.data.data.tech,horizon))
            setDateLabels(data.data.data.labels[0])
        }catch(err:any){
            notifyError(err)
            setTechRowData([])
            setEcoRowData([])
        }finally{
            toast.dismiss(loaderId)
        }
        
    }

    useEffect(()=>{
        const payload = {
            id: 0,
            name: '',
            fields: [],
            filters:currFilter,
            paginationParameter:{
                pageNumber: 1,
                recordsPerPage: 100
            },
        }
        getBTRDataCount(payload)
        getData(currFilter,1)
    },[])

    const getPreparedFilter = (filter:BPRFilterState):BPRFilterState=>{
        const doesCategoryExist = (filter.availabilityFilter.filters.length>0 && filter.availabilityFilter.filters.some((f)=>f.name==="AF8"))
        const tempFilter = _.cloneDeep(filter)
        if(doesCategoryExist){
            
            tempFilter.availabilityFilter.filters = tempFilter.availabilityFilter.filters.map((f)=>{
                return {
                    ...f,
                    value:BTRCategoryTextToNumberMapper[f.value]
                }
            })
        }
        return tempFilter
    }

    const onApplyFilter = async(filter:BPRFilterState)=>{
        setCurrFilter(filter)
        const tempFilter = getPreparedFilter(filter)
        
        const payload = {
            id: 0,
            name: '',
            fields: [],
            filters:tempFilter,
            paginationParameter:{
                pageNumber: 1,
                recordsPerPage: 100
            },
        }
        getBTRDataCount(payload)
        getData(tempFilter,1)
    }


    const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        onApplyFilter(updatedFilter)
        setCurrentPage(1)
    }

    const toggleVerticalView = (isVertical:boolean)=>setVerticalView(isVertical)

    const toggleCurrentTab = (tab:VFFloatingTabItemProps)=>setCurrentTab(tab)

    const renderView = ()=>{
        switch(currentTab.id){
            case "1":
                if(verticalView)return(
                    <VerticalSplitView 
                        themeUi={themeUi}
                        techTable={{
                            columnDefs:techColDefs,
                            rowData:techRowData,
                            header:"On-Hand Inventory View Trend Report",
                            paginationProps:techPaginationProps,
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            paginationProps:ecoPaginationProps,
                            rowData:ecoRowData,
                            header:"Pipeline Inventory Trend Report",
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
                            columnDefs:techColDefs,
                            rowData:techRowData,
                            header:"On-Hand Inventory View Trend Report",
                            paginationProps:techPaginationProps,
                            ...gridProps
                        }} 
                        ecoTable={{
                            columnDefs:ecoColDefs,
                            rowData:ecoRowData,
                            header:"Pipeline Inventory Trend Report",
                            paginationProps:ecoPaginationProps,
                            ...gridProps}}
                            isLocked={isLockMode}
                            toggleLockMode={toggleLockMode}
                    />
                )
            case "2":
                return(
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
                            defaultColDef={{
                                floatingFilter:true,
                                filter:'agMultiColumnFilter',
                                sortable:true,
                                
                            }}
                            {...gridProps} 
                            pagination={false} 
                            paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}
                        />
                        <div style={{zoom:0.7,margin:'0px -15px 0px -15px'}}>
                            <VFPagination {...techPaginationProps}/>
                        </div>
                    </>
                )
            case "3":
                return(
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
                            defaultColDef={{
                                floatingFilter:true,
                                filter:'agMultiColumnFilter',
                                sortable:true
                            }}
                            {...gridProps} 
                            pagination={false} 
                            paginationPageSize={parseInt(process.env.REACT_APP_BTR_ROWS_PER_PAGE || '100')}
                        />
                        <div style={{zoom:0.7,margin:'0px -15px 0px -15px'}}>
                            <VFPagination {...ecoPaginationProps}/>
                        </div>
                    </>
                )
            default:
                return <CustomVFTable  columnDefs={[]} rowData={[]} {...gridProps}/>
        }
    }

    const onExportToExcelCallBack = async(pageNumber:number,page:string)=>{
        const tempFilter = getPreparedFilter(currFilter)
        const payload = {
            id: 0,
            name: '',
            fields: [],
            filters:tempFilter,
            paginationParameter:{
                pageNumber: pageNumber,
                recordsPerPage: 5000
            },
        }
        const data = await getBTRData(payload)
        if(page=='on-hand')return data.data.data.tech
        return data.data.data.eco

    }

    const techColDefs = useMemo(():Array<ColDef>=>{
        if(techRowData.length===0)return []
        if(verticalView && currentTab.id==='1') return mapBTRRowDataToColDefs(techRowData[0],dateLabels,horizon,true,["RN"])
       return mapBTRRowDataToColDefs(techRowData[0],dateLabels,horizon,false,["RN"])
    },[techRowData,dateLabels,verticalView,currentTab])


    const ecoColDefs = useMemo(():Array<ColDef>=>{
        if(ecoRowData.length===0)return []
        if(verticalView && currentTab.id==="1")return mapBTRRowDataToColDefs(ecoRowData[0],dateLabels,horizon,false,['Category',"LocationName","Norm","SKUCode","SKUDescription","Tags","VirtualNorm","RN"])
        return mapBTRRowDataToColDefs(ecoRowData[0],dateLabels,horizon,false,["RN"])
    },[ecoRowData,currentTab,verticalView,dateLabels])

    return{
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
        setHorizon
    }
}

export default useBTR