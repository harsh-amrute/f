import { useState} from 'react'
import { notifyError,notifySuccess } from '../../../../../helpers/notify'
import { toast } from "react-toastify";
import { useGetBufferTrendsGraph } from "../../../../Services/MTA/InsightsAndTrends/BufferTrends";
import { BufferTrendsGraphState } from '../../../../../VectorFlow/types/BPR'
import useBPRFilter from '../../../../../hooks/useBPRFilter';
import { useUserData } from '../../../../../context';
import useGetLastRunData from "../../../../../hooks/useGetLastRunData"

const initialGraphData  ={
    data: {
        absolute:[],
        percentage:[],
        summary:[],
        avail: 0,
    }
  };

const useBufferTrends = () => {
    const {state:multiFilterState,setState:setMultiFilterState,onDelete} = useBPRFilter()
    const [currentTab,setCurrentTab]=useState<string>('tech')
    const [currentPageTab,setCurrentPageTab]=useState<string>('absolute')
    const [currentView,setCurrentView] = useState<string>('chart');
    const [currentGraphData,setCurrentGraphData] = useState([]);
    const [graphData,setGraphData] = useState(initialGraphData);
    const [isSelectCategoryOpen,setIsSelectCategoryOpen] = useState(true);
    const [horizonDays,setHorizondays]=useState(30);
    const [summaryData, setSummaryData]=useState([]);
    const[availability, setAvailability]=useState(0.0);
   
    const {mutateAsync:getBufferTrendsGraph,isLoading} = useGetBufferTrendsGraph();

    const {date:lastRunDate} = useGetLastRunData()

    const {user} = useUserData()
    const themeUI = user.user.theme_ui

    const [graphs,setGraphs] = useState<Array<BufferTrendsGraphState>>([
        {
            type:{label:'Self',value:'Self'},
            pen:{label:'Absolute',value:'Absolute'},
            filters:[],
            id:1
        },
        {
            type:{label:'Self',value:'Self'},
            pen:{label:'Percentage',value:'Percentage'},
            filters:[],
            id:2
        }
    ])

    const BufferTrendsDataLoad = async () => {
        try {
            setCurrentView('chart');
            setCurrentTab(currentTab);
            setCurrentPageTab(currentPageTab);
            setHorizondays(horizonDays);
            const body = {
                days:horizonDays,
                bufferTrendType:currentTab,
                filters:multiFilterState
            }           
            const result:any = await getBufferTrendsGraph(body)
            setIsSelectCategoryOpen(false);
            setCurrentGraphData(result.data?.data?.absolute);
            setSummaryData(result.data?.data?.summary);
            setAvailability(result.data?.data?.avail);
            setGraphData(result.data);
            notifySuccess("Graph Details Fetched Successfully")

        
        
            
        } catch (error) {
            toast.dismiss();
            console.log(error);
            notifyError("Something Went Wrong")
        }

    }

   const onFloatingTabChange = (tab:any) =>{

    console.log("called")
     setCurrentTab(tab.value);
     updateGraphState(1,"pen",{label:'Absolute',value:'Absolute'})
     setHorizondays(30);
    
   } 

   const onFloatingTabChangeOnPages = (tab:any) =>{
        setCurrentPageTab(tab.value);
        switch(tab.value){
            case 'Absolute': 
                setCurrentGraphData(graphData?.data?.absolute);
                setSummaryData(graphData?.data?.summary);
                setAvailability(graphData?.data?.avail);
                break;
            case 'Percentage':
                setCurrentGraphData(graphData?.data?.percentage);
                setSummaryData(graphData?.data?.summary);
                setAvailability(graphData?.data?.avail);
        }
    } 

    const updateGraphState = (id:number,property:string,payload:any)=>{
        
        onFloatingTabChangeOnPages(payload);
        if(property!=='filters'){
            return setGraphs(prevGraphs=>{
                return prevGraphs.map((graph:BufferTrendsGraphState)=>{
                    if(graph.id===id){
                        return {
                            ...graph,
                            [property]:payload,
                            filters:[]
                        }
                    }
                    return graph
                })
            })
        }
        return setGraphs(graphs.map((graph:BufferTrendsGraphState)=>{
            if(graph.id===id){
                return {
                    ...graph,
                    [property]:payload
                }
            }
            return graph
        }))
    }

    const handleSubmitClick=()=>{
        console.log("clicked")
        BufferTrendsDataLoad();
    }

    const onGoBack = () => {
        console.log('sadfa')
        // setIsSelectCategoryOpen(true);
        // setCurrentView('grid');
        // setCurrentTab('tech');
        // setHorizondays(30);
        // setMultiFilterState([]);

    }

    const handleApplyFilter = async(params:any)=>{
        setMultiFilterState(params); 
        try {
            setCurrentView('chart');
            setCurrentTab(currentTab);
            setCurrentPageTab(currentPageTab);
            setHorizondays(horizonDays);
            const body = {
                days:horizonDays,
                bufferTrendType:currentTab,
                filters:params
            }           
            const result:any = await getBufferTrendsGraph(body)
            setIsSelectCategoryOpen(false);
            setCurrentGraphData(result.data?.data?.absolute);
            setSummaryData(result.data?.data?.summary);
            setAvailability(result.data?.data?.avail);
            setGraphData(result.data);
            notifySuccess("Graph Details Fetched Successfully")
            
        } catch (error) {
            toast.dismiss();
            console.log(error);
            notifyError("Something Went Wrong")
        }
       }

       const onDeleteFilter = async(parentId:any, filterId:any, value:any)=>{
        const updatedFilter = onDelete(parentId,filterId,value)
        handleApplyFilter(updatedFilter)
    }

    return {
        currentTab ,
        onFloatingTabChange,
        currentView ,
        isSelectCategoryOpen ,
        currentGraphData ,
        summaryData,
        availability,
        BufferTrendsDataLoad,
        isLoading,
        onFloatingTabChangeOnPages,
        currentPageTab,
        graphs,
        updateGraphState,
        setHorizondays,
        handleSubmitClick,
        horizonDays,
        handleApplyFilter,
        multiFilterState,
        setMultiFilterState,
        onDeleteFilter,
        onGoBack,
        themeUI,
        lastRunDate
    }
  
}

export default useBufferTrends;