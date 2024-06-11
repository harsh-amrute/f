 import { useState,useRef } from "react";
 import {  notifyLoader, notifySuccess } from "../../../../../helpers/notify";
 import { toast } from "react-toastify";
 import { useGetChronicUnavailabilityGridView} from "../../../../Services/MTA/InsightsAndTrends";
import useBPRFilter from "../../../../../hooks/useBPRFilter";
 

const useGuidedInsights = ()=>{
const [currentTab,setCurrentTab] = useState<string>('availabilitytrend');
const [currentCategory,setCurrentCategory] = useState<string>('');
const [currentView,setCurrentView] = useState<string>('chart');
const [currentGridData,setCurrentGridData] = useState([{}]);

const ref = useRef()

const {state:currentFilter,setState:setCurrentFilter,onDelete} = useBPRFilter()

const {mutateAsync:getChronicUnavailabilityGrid} = useGetChronicUnavailabilityGridView();
const [chroniceRowData,setChronicRowData] = useState<Array<any>>([])
// const ChronicUnavailabilityGridViewData=ChronicUnavailabilityGrid?.data?.data;
 const onFloatingTabChange = (tab:any) => {
        setCurrentTab(tab.value);
        setCurrentView("chart");
    }
     const onGoBack = () => {
        // setIsSelectCategoryOpen(true);
        setCurrentCategory('');
        setCurrentView('');
        setCurrentTab('');
    }
    const fetchAndUpdateGridData=async(filter?:any)=>{
        const body:any={
            "id": 0,
            "name": "",
            "fields": [],
            "paginationParameter": {
                "pageNumber": 1,
                "recordsPerPage": 100
            },
            filters:filter || currentFilter
        }
         const toastId = notifyLoader('Loading Grid Data');
         const result = await getChronicUnavailabilityGrid(body)
         setCurrentGridData(result.data.data);
         setChronicRowData(result.data.data);
         toast.dismiss(toastId);
         notifySuccess("Grid Details Fetched Successfully");
                    
    }
    const onViewChange = (view:string) => {
         const activeTab = currentTab;
         if(activeTab){
               setCurrentTab(currentTab);
          } 
          setCurrentView(view);
          fetchAndUpdateGridData();
    }

    const  onApplyFilter = async(filter:any)=>{
        setCurrentFilter(filter)
        fetchAndUpdateGridData(filter)
    }

      const getFloatingTabsList = () => {
        return([
                        {
                            id:'AvailabilityTrend',
                            label:'Availability Trend',
                            value:'availabilitytrend'
                        },
                        {
                            id:'ChronicUnavailability',
                            label:'Chronic Unavailability',
                            value:'chronicunavailability'
                        },
                        {
                            id:'AvailabilityAgeingTrend',
                            label:'Availability Ageing Trend',
                            value:'availabilityageingtrend'
                        },
                        {
                            id:'DBMNormSuggestions',
                            label:'DBM Norm Suggestions',
                            value:'dbmnormsuggestions'
                        },
                        {
                            id:'ExcessInventoryTrend',
                            label:'Excess Inventory Trend',
                            value:'excessinventorytrend'
                        },
                        // {
                        //     id:'CustomScreens',
                        //     label:'Custom Screens',
                        //     value:'customscreens'
                        // }
                    ])
      }

    return{
        onFloatingTabChange,
        onGoBack,
        onViewChange,
        currentView,
        currentTab,
        setCurrentTab,
        getFloatingTabsList,
        currentCategory,
        currentGridData,
        ref,
        chroniceRowData,
        currentFilter,
        setCurrentFilter,
        onDelete,
        onApplyFilter
    }
}
export default useGuidedInsights;