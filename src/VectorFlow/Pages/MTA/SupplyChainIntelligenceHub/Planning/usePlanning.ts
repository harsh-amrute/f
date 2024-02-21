import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { useGetPlanningDataCount,useGetPlanningDataGraph } from "../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
import { PlanningCategory, PlanningCounts } from "../../../../types/MTA"
const usePlanning = ()=>{

    const initialPlanningCounts = {
        childMonitorCount:0,
        parentMonitorCount:0,
        parentExpediteCount:0,
        childExpediteCount:0,
        reviewExcessInventoryCount:0,
        reviewOrderFulfillmentCount:0,
    }

    const [planningCounts,setPlanningCounts] = useState<PlanningCounts>(initialPlanningCounts)

    const [isSelectCategoryOpen,setIsSelectCategoryOpen] = useState(true);

    const {mutateAsync:getPlanningDataCount} = useGetPlanningDataCount();

    const {mutateAsync:getPlanningDataGraph} = useGetPlanningDataGraph();

    const [isOverlayVisible,setIsOverlayVisible] = useState(false);

    const [currentCategory,setCurrentCategory] = useState<string>('');

    const [currentGraphData,setCurrentGraphData] = useState();

    const [currentTab,setCurrentTab] = useState<string>('');

    const [currentView,setCurrentView] = useState<string>('chart');

    useEffect(()=>{
        fetchPlanningDataCount();
    },[])

    const fetchPlanningDataCount = async () => {
        setIsOverlayVisible(true);
        const result = await getPlanningDataCount({filters:[]});
        setIsOverlayVisible(false);
        const data = result.data.data;
        const tempPlanningCount = {...initialPlanningCounts};
        data.forEach((planningCategoryObj:PlanningCategory) => {
            if(planningCategoryObj.category === 'git/wip'){
                if(planningCategoryObj.parentCount) tempPlanningCount.parentMonitorCount = planningCategoryObj.parentCount;
                if(planningCategoryObj.childCount) tempPlanningCount.childMonitorCount = planningCategoryObj.childCount;
            }
            if(planningCategoryObj.category === 'expedite'){
                if(planningCategoryObj.parentCount) tempPlanningCount.parentExpediteCount = planningCategoryObj.parentCount;
                if(planningCategoryObj.childCount) tempPlanningCount.childExpediteCount = planningCategoryObj.childCount;
            }
            if(planningCategoryObj.category === 'excessInventory'){
                if(planningCategoryObj.reviewCount) tempPlanningCount.reviewExcessInventoryCount = planningCategoryObj.reviewCount 
            }
            if(planningCategoryObj.category === 'orderFulfillment'){
                if(planningCategoryObj.reviewCount) tempPlanningCount.reviewOrderFulfillmentCount = planningCategoryObj.reviewCount 
            }
        });

        setPlanningCounts(tempPlanningCount);
    }


    const onMonitorChildClick = async () => {
        try {
            setCurrentView('chart');
            const toastId = notifyLoader('Loading Graphs');
            setCurrentCategory('GITToChild');
            const body = {
                category:'git',
                type:'child',
                filters:[]
            }
            const result = await getPlanningDataGraph(body);
            console.log(result)
            setIsSelectCategoryOpen(false);
            setCurrentGraphData(result.data.data)
            setCurrentTab('locationWise');
            toast.dismiss(toastId);
            notifySuccess("Graph Details Fetched Successfully")

            
        } catch (error) {
            toast.dismiss();
            notifyError("Something Went Wrong")
        }

    }

    const onFloatingTabChange = (tab:any) => {
        setCurrentTab(tab.value);
    }

    return {
        planningCounts,
        isSelectCategoryOpen,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        currentView,
        onMonitorChildClick,
        onFloatingTabChange
    }



}

export default usePlanning



