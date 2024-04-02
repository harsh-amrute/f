import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import ActionToolBar from './ActionToolBar';
import GridView from "./GridView";
import { useUserData } from "../../../../../context"
import VFSelectedFilters from "../../../../../components/VectorFLOW/commons/VFSelectedFilters";
import {useState} from 'react'
import VFMultiFilter from "../../../../../components/VectorFLOW/commons/VFMultiFilter";
import useBPRFilter from "../../../../../hooks/useBPRFilter";


const Planning = () => {

    const {
        isSelectCategoryOpen,
        planningCounts,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        setCurrentTab,
        currentView,
        handlePlanningQuadrantClick,
        onFloatingTabChange,
        onGoBack,
        onViewChange,
        getFloatingTabsList,
        currentGridData
    } = usePlanning();

    

    const [isFilterOpen,toggleFilter] = useState<boolean>(false)

    const {user} = useUserData()
    const {state:multiFilter,setState:setMultiFilter,onDelete} = useBPRFilter()
    const themeUi = user.user.theme_ui

    const renderView = () => {

        switch(currentView){
            
            case 'chart':
                return <ChartView currentTab={currentTab} category={currentCategory} currentGraphData={currentGraphData}/>
            case 'grid':
                return <GridView currentTab={currentTab} category={currentCategory} currentGridData={currentGridData}/>

        }
        
    }


    return(
        <>
      
  {/* <PlanningTaskBar>
<VFSelectedFilters filters={multiFilter} onRemoveFilter={onDelete}></VFSelectedFilters>
<ButtonFilterWrapper>
<VFButton onClick={()=>toggleFilter(true)} themeUi={themeUi} disabled={false} width={110}>Edit Filter</VFButton>
    {
        isFilterOpen && (
        <VFMultiFilter onApplyFilter={()=>toggleFilter(false)} onGoBack={()=>toggleFilter(false)} multiFilter={multiFilter} setMultiFilter={setMultiFilter} colorFilterActive={true} coverageFilterActive={true}  locationFilterActive={true} ></VFMultiFilter>
        )
    }
</ButtonFilterWrapper> 
</PlanningTaskBar>  */}
       
       
            {
                isOverlayVisible && (
                <VFOverlay>
                    <h1 style={{backgroundColor:"white",padding:'15px',borderRadius:'8px'}}>Loading....</h1>
                </VFOverlay>
                )
            }
            {
                isSelectCategoryOpen && 
                <SelectCategory
                    childMonitorCount={planningCounts.childMonitorCount}
                    parentMonitorCount={planningCounts.parentMonitorCount}
                    childExpediteCount={planningCounts.childExpediteCount}
                    parentExpediteCount={planningCounts.parentExpediteCount}
                    reviewOrderFulfillmentCount={planningCounts.reviewOrderFulfillmentCount}
                    reviewExcessInventoryCount={planningCounts.reviewExcessInventoryCount}
                    onMonitorChildClick={()=>handlePlanningQuadrantClick('GITToChild')}
                    onMonitorParentClick={()=>handlePlanningQuadrantClick('GITFromParent')}
                    onExpediteChildClick={()=>handlePlanningQuadrantClick('ExpediteToChild')}
                    onExpediteParentClick={()=>handlePlanningQuadrantClick('ExpediteFromParent')}
                    onExcessInventoryReviewClick={()=>handlePlanningQuadrantClick('ExcessInventory')}
                    onOrderFulfillmentReviewClick={()=>console.log("Test")}
                />
            }
            {
                !isSelectCategoryOpen &&
                <>
                    <ActionToolBar 
                        currCategory={currentCategory}
                        view={currentView} 
                        onFloatingTabChange={onFloatingTabChange}
                        onGoBack={onGoBack}
                        onViewChange={onViewChange}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        tabsList={getFloatingTabsList(currentView)}
                        disableChartAndGridViewToggle={['GITFromParent',].includes(currentCategory)}
                        />
                    
                    {renderView()}
                </>
            }
            
        </>
    )
}

export default Planning;
