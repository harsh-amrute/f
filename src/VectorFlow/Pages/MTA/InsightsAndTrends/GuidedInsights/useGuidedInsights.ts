 import { useState } from "react";
 import {  notifyLoader, notifySuccess } from "../../../../../helpers/notify";
 import { toast } from "react-toastify";
 import { useGetChronicUnavailabilityGridView} from "../../../../Services/MTA/InsightsAndTrends";
 const useGuidedInsights = ()=>{
const [currentTab,setCurrentTab] = useState<string>('');
const [currentCategory,setCurrentCategory] = useState<string>('');
const [currentView,setCurrentView] = useState<string>('chart');
const [currentGridData,setCurrentGridData] = useState([{}]);

const {data:ChronicUnavailabilityGrid} = useGetChronicUnavailabilityGridView();
const ChronicUnavailabilityGridViewData=ChronicUnavailabilityGrid?.data?.data;
 const onFloatingTabChange = (tab:any) => {
        setCurrentTab(tab.value);
    }
     const onGoBack = () => {
        // setIsSelectCategoryOpen(true);
        setCurrentCategory('');
        setCurrentView('');
        setCurrentTab('');
    }
    const fetchAndUpdateGridData=async()=>{
         const toastId = notifyLoader('Loading Grid Data');
         const result = ChronicUnavailabilityGridViewData?.data?.data;
         setCurrentGridData(result);
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
                        {
                            id:'CustomScreens',
                            label:'Custom Screens',
                            value:'customscreens'
                        }
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
      ChronicUnavailabilityGridViewData
    }
}
export default useGuidedInsights;