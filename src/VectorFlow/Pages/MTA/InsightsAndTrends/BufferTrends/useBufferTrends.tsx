import { useState} from 'react'
import { notifyLoader,notifyError,notifySuccess } from '../../../../../helpers/notify'
import { toast } from "react-toastify";
import { useGetBufferTrendsGraph } from "../../../../Services/MTA/InsightsAndTrends/BufferTrends";
import { BufferTrendsGraphState } from '../../../../../VectorFlow/types/BPR'

const initialGraphData  ={
    data: {
        absolute:[],
        percentage:[]
    }
  };

const useBufferTrends = () => {

    console.log('use buffer is called')

    const [currentTab,setCurrentTab]=useState<string>('tech')
    const [currentPageTab,setCurrentPageTab]=useState<string>('absolute')
    const [currentView,setCurrentView] = useState<string>('chart');
    const [currentGraphData,setCurrentGraphData] = useState([]);
    const [graphData,setGraphData] = useState(initialGraphData);
    const [isSelectCategoryOpen,setIsSelectCategoryOpen] = useState(true);
    const [horizonDays,setHorizondays]=useState(30);

    const {mutateAsync:getBufferTrendsGraph,isLoading} = useGetBufferTrendsGraph();


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
            //const toastId = notifyLoader('Loading Graphs');
            const body = {
                //category:currentPageTab,
                days:horizonDays,
                bufferTrendType:currentTab,
                //filters:[]
            }           
            const result:any = await getBufferTrendsGraph(body)
            setIsSelectCategoryOpen(false);
            setCurrentGraphData(result.data?.data?.absolute);
            setGraphData(result.data);
            //toast.dismiss(toastId);
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
                break;
            case 'Percentage':
                setCurrentGraphData(graphData?.data?.percentage);
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

    //console.log(horizonDays)


    return {
        currentTab ,
        onFloatingTabChange,
        currentView ,
        isSelectCategoryOpen ,
        currentGraphData ,
        BufferTrendsDataLoad,
        isLoading,
        onFloatingTabChangeOnPages,
        currentPageTab,
        graphs,
        updateGraphState,
        setHorizondays,
        handleSubmitClick,
        horizonDays
    }
  
}

export default useBufferTrends;