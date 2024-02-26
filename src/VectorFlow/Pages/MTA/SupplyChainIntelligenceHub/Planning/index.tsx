import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import ActionToolBar from "./ActionToolBar";

const Planning = () => {

    const {
        isSelectCategoryOpen,
        planningCounts,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        currentView,
        handlePlanningQuadrantClick,
        onFloatingTabChange,
        onGoBack
    } = usePlanning();

    const renderView = () => {

        switch(currentView){
            case 'chart':
                return <ChartView currentTab={currentTab} category={currentCategory} currentGraphData={currentGraphData}/>

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
                    onMonitorParentClick={()=>console.log("Test")}
                    onExpediteChildClick={()=>console.log("Test")}
                    onExpediteParentClick={()=>console.log("Test")}
                    onExcessInventoryReviewClick={()=>console.log("Test")}
                    onOrderFulfillmentReviewClick={()=>console.log("Test")}
                />
            }
            {
                !isSelectCategoryOpen &&
                <>
                    <ActionToolBar 
                        view={currentView} 
                        category={currentCategory} 
                        onFloatingTabChange={onFloatingTabChange}
                        onGoBack={onGoBack}
                        />
                    
                    {renderView()}
                </>
            }
            
        </>
    )
}

export default Planning;