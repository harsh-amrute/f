import React, { useState,useEffect, useMemo, useCallback } from 'react'
import { notifyLoader,notifyError,notifySuccess } from '../../../../../helpers/notify'
import { toast } from "react-toastify";
import { useGetBufferTrendsGraph,useBTGDataCount } from "../../../../Services/MTA/InsightsAndTrends/BufferTrends";

const initialGraphData  ={
    data: {
        absolute:[],
        percentage:[]
    }
  };

const useBufferTrends = () => {

    const [currentTab,setCurrentTab]=useState<string>('technicalView')
    const [currentPageTab,setCurrentPageTab]=useState<string>('absolute')
    const [currentView,setCurrentView] = useState<string>('chart');
    const [currentGraphData,setCurrentGraphData] = useState([]);
    const [graphData,setGraphData] = useState(initialGraphData);
    const [isSelectCategoryOpen,setIsSelectCategoryOpen] = useState(true);
    //const [currentPageIndex,setCurrentPageIndex]=useState<number>()

    const {mutateAsync:getBufferTrendsGraph,isLoading} = useGetBufferTrendsGraph();

//     useEffect(()=>{
//         BufferTrendsDataLoad()
//    },[currentTab])

    const BufferTrendsDataLoad = async () => {
        try {
            setCurrentView('chart');
            setCurrentTab(currentTab);
            setCurrentPageTab(currentPageTab);
            const toastId = notifyLoader('Loading Graphs');
            const body = {
                category:currentPageTab,
                type:currentTab,
                filters:[]
            }           
            const result:any = await getBufferTrendsGraph(body)
            setIsSelectCategoryOpen(false);
            setCurrentGraphData(result.data?.data?.absolute);
            setGraphData(result.data);
            toast.dismiss(toastId);
            notifySuccess("Graph Details Fetched Successfully")
        
            
        } catch (error) {
            toast.dismiss();
            console.log(error);
            notifyError("Something Went Wrong")
        }

    }

   const onFloatingTabChange = (tab:any,index:any) =>{
     setCurrentTab(tab.value);
     //setCurrentPageIndex(index);

   } 

   const onFloatingTabChangeOnPages = (tab:any) =>{
        console.log("before",currentPageTab)
        setCurrentPageTab(tab.value);
        console.log("after",currentPageTab)

        switch(currentPageTab){
            case 'absolute': 
                setCurrentGraphData(graphData?.data?.absolute);
                break;
            case 'percentage':
                setCurrentGraphData(graphData?.data?.percentage);
        }
  } 

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
        //currentPageIndex
    }
  
}

export default useBufferTrends;