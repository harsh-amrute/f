import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import ActionToolBar from './ActionToolBar';
import GridView from "./GridView";


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
                    onOrderFulfillmentReviewClick={()=>handlePlanningQuadrantClick('OrderFulfillment')}
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
