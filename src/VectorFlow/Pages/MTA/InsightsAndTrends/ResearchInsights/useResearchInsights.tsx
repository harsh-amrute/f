import {useEffect,useState,useMemo,useRef} from 'react'
import {AgGridReactProps} from 'ag-grid-react'
import { GridRef } from '../../../../../VectorFlow/types/MDM'
import { mapResearchInsightsFieldsToColDefs } from '../../../../../helpers/utils'

import {BPRTagsCellRenderer,BPRTechColorCellRenderer,BPREcoColorCellRenderer} from '../../SupplyChainIntelligenceHub/BPR/BPRCellRenderers'
import BPRGraphCellRenderer from '../../SupplyChainIntelligenceHub/BPR/BPRGraphCellRenderer'

import { useGetBPRData, useGetBPRUIConfiguration,useGetBPRDataCount,useGetState,useGetDailyData } from "./../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR"
import { isSameDay,format,addDays } from 'date-fns'
import { ReseachInsightsGraphState } from '../../../../../VectorFlow/types/BPR'
import { useGetUpdatedGraphData } from '../../../../../VectorFlow/Services/MTA/InsightsAndTrends/ResearchInsights'
import { notifyError, notifyLoader } from '../../../../../helpers/notify'
import { toast } from 'react-toastify'

import { useSelector,useDispatch } from 'react-redux'

import { RootState } from '../../../../../redux/store/store'
import { type DailyDataGraph } from "../../../../types/MTA";
import {TOGGLE_GRAPH_MODAL,UPDATE_DAILY_DATA} from '../../../../../redux/actions/MTA';
import useBPRFilter from '../../../../../hooks/useBPRFilter'

const useResearchInsights = ()=>{
    
    const {data,isLoading:isBPRUILoading} = useGetBPRUIConfiguration()
    const dispatch = useDispatch();

    const ref = useRef<GridRef>();
    const tempRef = useRef()

    const {mutateAsync:getState,isLoading:isSavedDataLoading} = useGetState()
    const [columnState,setColumnState] = useState<any>()
    const {currentGridState} = useSelector((state:RootState)=>state.mta)

    const {state:currentFilter,setState:setCurrentFilter,onDelete} = useBPRFilter()

    const [tempDownloadData,setTempDownloadData] = useState<boolean>(false);

    const [exportExcelColumns,setExportExcelColumns] = useState<Array<any>>([])

    const [exportExcelRowData,setExportExcelRowData] = useState<Array<any>>([])


    const {mutateAsync:getDailyData} = useGetDailyData();

    const {mutateAsync:getUpdatedGraphData,isLoading:isUpdatedGraphDataLoading} = useGetUpdatedGraphData()

    const [ResearchInsightsData,setResearchInsightsRowData] = useState<Array<any>>([])
    const {mutateAsync:getBPRData} = useGetBPRData()

    const {mutateAsync:getBPRDataCount,isLoading:isBPRDataCountLoading} = useGetBPRDataCount()

    const [currGridPage,setCurrGridPage] = useState<number>(1)
    const [recordCount,setRecordCount] = useState<number>()

    const [isGraphOneOpen,setIsGraphOneOpen] = useState<boolean>(false)
    const [horizon,setHorizon] = useState<number>(10)
    const [graphState,setGraphState] = useState<'default' | 'calender' | 'graph'>('default')
    const [calenderType,setCalenderType] = useState<'Tech' | 'Eco'>('Tech')
    const [expandedGraphId,setExpandedGraphId] = useState<1 | 2>(1)

    const showDailyDataGraphModal = useSelector((state:RootState) => state.mta.showDailyDataGraphModal);
    const showNormChangeHistoryTable = useSelector((state:RootState) => state.mta.showNormChangeHistoryTable);
    const dailyData = useSelector((state:RootState) => state.mta.dailyData);


    const [graphs,setGraphs] = useState<Array<ReseachInsightsGraphState>>([
        {
            type:{label:'Self',value:'Self'},
            pen:{label:'Tech',value:'Tech'},
            filters:[],
            id:1
        },
        {
            type:{label:'Parent',value:'Parent'},
            pen:{label:'Tech',value:'Tech'},
            filters:[],
            id:2
        }
    ])


    const [selectedRowsDates,setSelectedRowsDates] = useState<Array<any>>([])


    

    const sideBar = {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressPivots: true,
              suppressPivotMode: true,
            },
          
          },
        ],
        defaultToolPanel:'',
      }


    useEffect(()=>{
        const getTableState = async()=>{
          try{
            const data =  await getState("ResearchInsight")
            setColumnState(JSON.parse(data.data.data))
          }catch(err:any){
            setColumnState(ResearchInsightsColumns)
          }
        }
        getTableState()
    },[currentGridState])


    useEffect(()=>{
        async function getBPRRowData(){
            resetState()
            await getRecordCount(currentFilter)
            await getRowData(currentFilter,1)
        }
        try{
            
            getBPRRowData()
        }catch(err:any){
            notifyError(err)
        }
    },[])

    const customCellRenderers = useMemo(() => ({
        grapCellRenderer:BPRGraphCellRenderer,
        colorTechCellRenderer:BPRTechColorCellRenderer,
        colorEcoCellRenderer:BPREcoColorCellRenderer,
        tagsCellRenderer:BPRTagsCellRenderer
      }), []);
  
    const agGridProps:AgGridReactProps = {
        
        suppressRowTransform:true,
        readOnlyEdit:true,
        rowSelection:'multiple',
        gridOptions:{
            rowHeight:50,
            getRowStyle: (params: any) => {
            if (params.node.rowIndex % 2 === 0) {
                return { background: "#EBEBEB" };
            }
            return { background: "#F7F7F7" };
            },
        },
        sideBar:sideBar,
        // paginationPageSize:25,
        paginationPageSize:parseInt(process.env.REACT_APP_RESEARCHINSIGHT_ROWS_PER_PAGE || '100'),
        suppressRowClickSelection:true,
        components:customCellRenderers,
        defaultColDef:{
            floatingFilter: true,
            filter: "agMultiColumnFilter",
            cellDataType:false,
            resizable:false,
            cellStyle:{
                "flex":1,
                'text-align':'center',
                'height':'50px',
                "font-style":"normal",
                " font-variant":"normal",
                " font-weight":"300",
                " font-size":"20px",
                " font-family":"Roboto",
                "display":"block",
                'text-overflow':'ellipsis',
                'white-space':'nowrap'
            },
        }
    }

    const tempAgGridProps:AgGridReactProps = {
        onRowDataUpdated:(event)=>{
         if(tempDownloadData) event.api.exportDataAsExcel({fileName:'ResearchInsights'});
        }
      };

    const getRecordCount =async(filter:any)=>{
        const countData = await getBPRDataCount({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:1,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })

        setRecordCount(countData.data.recordCount)
    }

    const getRowData = async(filter:any,pageNo:number)=>{
        notifyLoader("Loading Grid Data")
        const rowData =await  getBPRData({
            id: 1,
            name: "",
            fields: [],
            filters:filter,
            paginationParameter:{
                pageNumber:pageNo,
                recordsPerPage:parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50') 
            }
        })
        toast.dismiss()
        setResearchInsightsRowData(rowData.data.data)
    }

    const onApplyFilter = async(filter:any)=>{
        resetState()
        setCurrentFilter(filter)
        setCurrGridPage(1)
        try{
            await getRecordCount(filter)
            await getRowData(filter,1)
        }catch(err:any){
            notifyError(err)
        }
        
    }

    const handlePageChange = async(pageNo:number)=>{
        resetState()
        setCurrGridPage(pageNo)
        try{
            await getRowData(currentFilter,pageNo)
        }catch(err:any){
            notifyError(err)
        }
    }
    
    const getColor = (date:any)=>{
        const doesExist = calenderData.find((d)=>isSameDay(d.date,date))
        return doesExist?doesExist.color:'gray'
    }

    function getColorValues(jsonData:any) {
    
        const colorValues = [];
        for (const key in jsonData) {
            if (key.startsWith('D')) {
                colorValues.push(jsonData[key]);
            }
        }
        if(colorValues.length>horizon){
            return colorValues.slice(colorValues.length-horizon);
        }
        return colorValues;
    }

    function convertToObjects(colorArray:Array<string>) {
        const today = new Date();
        const result = [];
    
        // Loop through each color in the array
        for (let i = 0; i < colorArray.length; i++) {
            const daysBeforeToday = colorArray.length - i;
            const date = new Date(today);
            date.setDate(today.getDate() - daysBeforeToday + 1); // Adding 1 to start from 1 day ago
    
            const dateString = date.toISOString().slice(0, 10); // Get date in YYYY-MM-DD format
    
            const color = colorArray[i];
    
            result.push({ date: dateString, color: color });
        }
    
        return result;
    }

    const resetState = ()=>{
        setSelectedRowsDates([])
        setResearchInsightsRowData([])
        // ref.current?.api.setNodesSelected({nodes:[],newValue:false})
        setGraphState('default')
    }

    function convertCustomObjToObjects(colorArray:any) {
        const result:any = [];
    
        colorArray.forEach((color:any, index:any) => {
            const date = addDays(new Date(), -(colorArray.length - index) + 1);
            
    
            const dateString = `${format(date, 'do MMM')}`;
    
            result.push({ ...color, date: dateString });
        });
    
        return result;
    }
    
    const getColorData = (array:Array<any>)=>{
        const colorFrequencyArray:any = [];
            for (let day = 1; day <= horizon; day++) {
                const colorFrequency:any = {
                    Red: 0,
                    Blue: 0,
                    Green: 0,
                    Yellow: 0,
                    Black: 0,
                    White: 0
                };
                array.forEach((obj:any)=>{
                    const color = obj[`D${day}`];
                    if(color)colorFrequency[color]++
                    else colorFrequency[color] = 0
                })
                colorFrequencyArray.push(colorFrequency)
            }
            return convertCustomObjToObjects(colorFrequencyArray.reverse())
    }

     const handleOnUpdateGraph = async()=>{
        const selectedRows =  ref.current?.api.getSelectedRows()
        if(selectedRows && selectedRows.length===0)return setGraphState('default')
        const loaderId = notifyLoader('Loading graph data')
        try{
            const data = await getUpdatedGraphData({data:selectedRows?.map((s)=>{
                return {
                    "SKUCode":s.SKUCode,
                    "WhCode":s.WHCode
                }
            })})
            setSelectedRowsDates(data.data.data)
            if(selectedRows &&  selectedRows.length>1){
                return setGraphState('graph')
            }
            if(selectedRows){
                return setGraphState('calender')
            
            }
        }catch(error:any){
            notifyError(error)
        }finally{
            toast.dismiss(loaderId)
        }
    }


    const updateGraphState = (id:number,property:string,payload:any)=>{
        if(property!=='filters'){
            return setGraphs(graphs.map((graph:ReseachInsightsGraphState)=>{
                if(graph.id===id){
                    return {
                        ...graph,
                        [property]:payload,
                        filters:[]
                    }
                }
                return graph
            }))
        }
        return setGraphs(graphs.map((graph:ReseachInsightsGraphState)=>{
            if(graph.id===id){
                return {
                    ...graph,
                    [property]:payload
                }
            }
            return graph
        }))
    }

    const toggleGraphModal = (open:boolean,data?:any)=>{
        if(data){
            setExpandedGraphId(data)
        }
        setIsGraphOneOpen(open)
    }

    const calenderData = useMemo(()=>{
        const selectedRows =  ref.current?.api.getSelectedRows()
        if(selectedRows &&  selectedRows.length===1){
            const allDates = selectedRowsDates.find((row:any)=>row.Type==='Self' && row.Pen===calenderType )
            if(allDates){
                return convertToObjects(getColorValues(allDates))
                
            }
        }
        return []
    },[selectedRowsDates,horizon,calenderType])

   
    const blackCount = useMemo(()=>{
        return Math.round(((calenderData.slice(0,horizon).filter((row:any)=>row.color==='Black').length)/calenderData.slice(0,horizon).length)*100)
    },[calenderData])

    const redCount = useMemo(()=>{
        return Math.round(((calenderData.slice(0,horizon).filter((row:any)=>row.color==='Red').length)/calenderData.slice(0,horizon).length)*100)
    },[calenderData])

    const whiteCount = useMemo(()=>{
        return Math.round(((calenderData.slice(0,horizon).filter((row:any)=>row.color==='White').length)/calenderData.slice(0,horizon).length)*100)
    },[calenderData])

    const selfGraphData = useMemo(()=>{
        const selectedRows =  ref.current?.api.getSelectedRows()
        if(selectedRows && selectedRows.length>1){
            let selfArraySelectedData = selectedRowsDates.filter((row:any)=>row.Pen===graphs[0].pen.value && row.Type===graphs[0].type.value)
            const filters =graphs[0].filters
            if(filters.length>0){
                filters.forEach((filter)=>{
                    selfArraySelectedData = selfArraySelectedData.filter((row:any)=>row[filter.key]===filter.value)
                })
            }
            const selfData = getColorData(selfArraySelectedData)
            return selfData
        }
        return []
    },[graphs,selectedRowsDates,horizon])

    const locationGraphData = useMemo(()=>{
        const selectedRows =  ref.current?.api.getSelectedRows()
        if(selectedRows && selectedRows.length>1){
            let locationArraySelectedData = selectedRowsDates.filter((row:any)=>row.Pen===graphs[1].pen.value && row.Type===graphs[1].type.value)
            const filters =graphs[1].filters
            if(filters.length>0){
                filters.forEach((filter)=>{
                    locationArraySelectedData = locationArraySelectedData.filter((row:any)=>row[filter.key]===filter.value)
                })
            }
            const locationData = getColorData(locationArraySelectedData)        
            return locationData
        }
        return []
    },[graphs,selectedRowsDates,horizon])

    const expandedGraphAllFilterValues = useMemo(()=>{
        const index = expandedGraphId-1
        const locationArraySelectedData = selectedRowsDates.filter((row:any)=>row.Pen===graphs[index].pen.value && row.Type===graphs[index].type.value)
        let uniqueSkus:any = []
        let uniqueWhCode:any = []
        locationArraySelectedData.map((row:any)=>{
            if(!uniqueSkus.includes(row.SKUCode)){
                uniqueSkus.push(row.SKUCode)
            }
            if(!uniqueWhCode.includes(row.Whcode)){
                uniqueWhCode.push(row.Whcode)
            }
        })
        uniqueSkus = uniqueSkus.map((sku:string)=>{
            return{
                value:sku,
                label:sku
            }
        })
        uniqueWhCode = uniqueWhCode.map((whcode:string)=>{
            return{
                value:whcode,
                label:whcode
            }
        })
        return{
            skus:uniqueSkus,
            whcodes:uniqueWhCode
        }
    },[selectedRowsDates,graphs])


    const onOpenDailyDataGraph = async (params:any) => {
        const payload:any = {
            SKUCode:params.data['SKUCode'],
            WHCode:params.data['WHCode']
        }
        console.log(params)
        const result = await getDailyData(payload)
        const data = result.data.data[0];
        const dailyData:DailyDataGraph = {
            rowData:params.data,
            chartData:data['StockData'],
            normChangeData:data['NormChangeHistoryData'],
            masterData:data['MasterData'][0],
            suggestionData:data['SuggestionHistoryData'] ? data['SuggestionHistoryData'] : [],
            monitoringData:data['MonitoringData']
        }

        dispatch(UPDATE_DAILY_DATA(dailyData));
        dispatch(TOGGLE_GRAPH_MODAL(true));
    }

    const ResearchInsightsColumns = useMemo(()=>{
        return mapResearchInsightsFieldsToColDefs(data?.data.data,onOpenDailyDataGraph)
    },[data])

    const onExportToExcelCallBack=async(pageNumber:number)=>{
        const data =  await getBPRData({
            id:1,
            name:'',
            fields:[],
            filters:currentFilter,
            paginationParameter:{
                pageNumber:pageNumber,
                recordsPerPage:5000
            }
        })
        
        return data.data.data
    }


    const rowsPerPage = useMemo(()=>parseInt(process.env.REACT_APP_BPR_ROWS_PER_PAGE || '50'),[])

    return {
        ref,
        agGridProps,
        ResearchInsightsData,
        ResearchInsightsColumns,
        isLoading:isBPRUILoading ||isBPRDataCountLoading,
        isUpdatedGraphDataLoading,
        horizon,
        graphState,
        blackCount,
        redCount,
        whiteCount,
        isGraphOneOpen,
        graphs,
        locationGraphData,
        selfGraphData,
        expandedGraphId,
        calenderData,
        expandedGraphAllFilterValues,
        calenderType,
        toggleGraphModal,
        setExpandedGraphId,
        updateGraphState,
        setIsGraphOneOpen,
        setHorizon,
        getColor,
        setCalenderType,
        handleOnUpdateGraph,
        setSelectedRowsDates,
        currGridPage,
        rowsPerPage,
        recordCount,
        isSavedDataLoading,
        columnState,
        tempRef,
        tempDownloadData,
        setTempDownloadData,
        tempAgGridProps,
        exportExcelRowData,
        setExportExcelRowData,
        exportExcelColumns,
        setExportExcelColumns,
        onExportToExcelCallBack,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        onApplyFilter,
        handlePageChange,
        onDelete,
        currentFilter,
        setCurrentFilter
    }
}

export default useResearchInsights