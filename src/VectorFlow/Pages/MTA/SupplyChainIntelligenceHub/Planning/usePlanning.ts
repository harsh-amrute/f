import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { notifyError, notifyLoader, notifySuccess } from "../../../../../helpers/notify";
import { useGetPlanningDataCount,useGetPlanningDataGraph, useGetPlanningDataGrid } from "../../../../Services/MTA/SupplyChainIntelligenceHub/Planning";
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

    const {mutateAsync:getPlanningDataGrid} = useGetPlanningDataGrid();

    const [isOverlayVisible,setIsOverlayVisible] = useState(false);

    const [currentCategory,setCurrentCategory] = useState<string>('');

    const [currentGraphData,setCurrentGraphData] = useState();

    const [currentGridData,setCurrentGridData] = useState();

    const [currentTab,setCurrentTab] = useState<string>('');

    const [currentView,setCurrentView] = useState<string>('chart');

    useEffect(()=>{
        fetchPlanningDataCount();
    },[])

   
    const getFloatingTabsList = (view:string) => {
        switch(currentCategory){
            case 'GITFromParent':{
                return [];
            }
            case 'GITToChild':{
                if(view === 'chart'){
                     return([
                        {
                            id:'locationWise',
                            label:'Location-Wise',
                            value:'locationWise'
                        },
                        {
                            id:'transporterWise',
                            label:'Transporter-Wise',
                            value:'transporterWise'
                        },
                        {
                            id:'custom',
                            label:'Custom Screens',
                            value:'custom'
                        }
                    ])
                }
                else{
                    return ([
                        {
                            id:'locationWise',
                            label:'Location-Wise',
                            value:'locationWise'
                        },
                        {
                            id:'transporterWise',
                            label:'Transporter-Wise',
                            value:'transporterWise'
                        }
                    ])
                }
                
            }
        case 'ExpediteFromParent':{
            if(view === 'chart'){
                return([
                    {
                        id:'expediteDispatches',
                        label:'Expedite Dispatches',
                        value:'expediteDispatches'
                    },
                    {
                        id:'createAvailabilityAtParent',
                        label:'Create Availability At Parent',
                        value:'createAvailabilityAtParent'
                    },
                    {
                        id:'custom',
                        label:'Custom Screens',
                        value:'custom'
                    }
                ])
            }
            else{
                return []
            }
          
        }
        case 'ExpediteToChild':{
            if(view === 'chart'){
                return([
                    {
                        id:'expediteDispatches',
                        label:'Expedite Dispatches',
                        value:'expediteDispatches'
                    },
                    {
                        id:'custom',
                        label:'Custom Screens',
                        value:'custom'
                    }
                ])
            }
            else{
                return []
            }
          
        }
        case 'ExcessInventory':{
            if(view === 'chart'){
                return([
                    {
                        id:'excessInventory',
                        label:'Excess Inventory',
                        value:'excessInventory'
                    },
                    {
                        id:'custom',
                        label:'Custom Screens',
                        value:'custom'
                    }
                ])
            }
            else{
                return []
            }
          
        }
        default:
            return([])
        }
    }

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


    const handlePlanningQuadrantClick = async (category:string) => {
        try {
            switch(category){
                case 'GITFromParent':{
                    const toastId = notifyLoader('Loading Grid Data');
                    const body = {
                        category:'git',
                        type:'parent',
                        filters:[],
                        paginationParameter:{
                            pageNumber:1,
                            recordsPerPage:50
                        }
                    }
                    const result = await getPlanningDataGrid(body);
                    setCurrentView('grid');
                    setCurrentCategory(category);
                    setCurrentGridData(result.data.data);
                    setIsSelectCategoryOpen(false);
                    toast.dismiss(toastId);
                    notifySuccess("Grid Data Fetched Successfully");
                    break;
                }
                case 'GITToChild':{
                    const toastId = notifyLoader('Loading Graphs');
                    setCurrentCategory('GITToChild');
                    setCurrentView('chart');
                    const body = {
                        category:'git',
                        type:'child',
                        filters:[]
                    }
                    const result = await getPlanningDataGraph(body);
                    setIsSelectCategoryOpen(false);
                    setCurrentGraphData(result.data.data)
                    setCurrentTab('locationWise');
                    toast.dismiss(toastId);
                    notifySuccess("Graph Details Fetched Successfully");
                    break;
                }

                case 'ExpediteFromParent':{
                    const toastId = notifyLoader('Loading Graphs');
                    setCurrentCategory('ExpediteFromParent');
                    setCurrentView('chart');
                    const body = {
                        category:'expedite',
                        type:'parent',
                        filters:[]
                    }
                    const result = await getPlanningDataGraph(body);
                    setIsSelectCategoryOpen(false);
                    setCurrentGraphData(result.data.data)
                    setCurrentTab('expediteDispatches');
                    toast.dismiss(toastId);
                    notifySuccess("Graph Details Fetched Successfully");
                    break;
                }
                case 'ExpediteToChild':{
                    const toastId = notifyLoader('Loading Graphs');
                    setCurrentCategory('ExpediteToChild');
                    setCurrentView('chart');
                    const body = {
                        category:'expedite',
                        type:'child',
                        filters:[]
                    }
                    const result = await getPlanningDataGraph(body);
                    setIsSelectCategoryOpen(false);
                    setCurrentGraphData(result.data.data)
                    setCurrentTab('expediteDispatches');
                    toast.dismiss(toastId);
                    notifySuccess("Graph Details Fetched Successfully");
                    break;
                }
                case 'ExcessInventory':{
                    const toastId = notifyLoader('Loading Graphs');
                    setCurrentCategory('ExcessInventory');
                    setCurrentView('chart');
                    const body = {
                        category:'excessInventory',
                        type:'review',
                        filters:[]
                    }
                    const result = await getPlanningDataGraph(body);
                    setIsSelectCategoryOpen(false);
                    setCurrentGraphData(result.data.data)
                    setCurrentTab('excessInventory');
                    toast.dismiss(toastId);
                    notifySuccess("Graph Details Fetched Successfully");
                    break;
                }
                    
                default:
                    return;
                    
            }
            
        } catch (error) {
            toast.dismiss();
            notifyError("Something Went Wrong")
        }

    }

    const fetchAndUpdateGridData = async () => {
        try {
            switch(currentCategory){
                case 'GITFromParent':{
                    break;
                }
                case 'GITToChild':{
                    const toastId = notifyLoader('Loading Grid Data');
                    const body = {
                        category:'git',
                        type:'child',
                        filters:[],
                        paginationParameter:{
                            pageNumber:1,
                            recordsPerPage:50
                        }
                    }
                    const result = await getPlanningDataGrid(body);
                    setCurrentGridData(result.data.data);
                    toast.dismiss(toastId);
                    notifySuccess("Grid Details Fetched Successfully");
                    break;
                }
                case 'ExpediteFromParent':{
                    const toastId = notifyLoader('Loading Grid Data');
                    const body = {
                        category:'expedite',
                        type:'parent',
                        filters:[],
                        paginationParameter:{
                            pageNumber:1,
                            recordsPerPage:50
                        }
                    }
                    const result = await getPlanningDataGrid(body);
                    setCurrentGridData(result.data.data);
                    toast.dismiss(toastId);
                    notifySuccess("Grid Details Fetched Successfully");
                    break;
                }
                case 'ExpediteToChild':{
                    const toastId = notifyLoader('Loading Grid Data');
                    const body = {
                        category:'expedite',
                        type:'child',
                        filters:[],
                        paginationParameter:{
                            pageNumber:1,
                            recordsPerPage:50
                        }
                    }
                    const result = await getPlanningDataGrid(body);
                    setCurrentGridData(result.data.data);
                    toast.dismiss(toastId);
                    notifySuccess("Grid Details Fetched Successfully");
                    break;
                }
                case 'ExcessInventory':{
                    const toastId = notifyLoader('Loading Grid Data');
                    const body = {
                        category:'excessInventory',
                        type:'review',
                        filters:[],
                        paginationParameter:{
                            pageNumber:1,
                            recordsPerPage:50
                        }
                    }
                    const result = await getPlanningDataGrid(body);
                    setCurrentGridData(result.data.data);
                    toast.dismiss(toastId);
                    notifySuccess("Grid Details Fetched Successfully");
                    break;
                }
            }
        } catch (error) {
            toast.dismiss();
            notifyError('Something Went Wrong')
        }
    }

    const onFloatingTabChange = (tab:any) => {
        setCurrentTab(tab.value);
    }

    const onGoBack = () => {
        setIsSelectCategoryOpen(true);
        setCurrentCategory('');
        setCurrentView('');
        setCurrentTab('');
    }



    const onViewChange = (view:string) => {
        const activeTab = getFloatingTabsList(view)[0];
        if(activeTab){
             setCurrentTab(getFloatingTabsList(view)[0].value);
        } 
        setCurrentView(view);
        fetchAndUpdateGridData();
    }

    return {
        planningCounts,
        isSelectCategoryOpen,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        currentView,
        handlePlanningQuadrantClick,
        onFloatingTabChange,
        onGoBack,
        onViewChange,
        setCurrentTab,
        getFloatingTabsList,
        currentGridData
    }



}

export default usePlanning



