import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";

const Planning = () => {

    const {
        isSelectCategoryOpen,
        planningCounts,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        currentView,
        onMonitorChildClick,
        onFloatingTabChange
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
                    onMonitorChildClick={onMonitorChildClick}
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
                    <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                        <VFFloatingTab
                            tabs={[
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
                            ]}
                            handleClick={onFloatingTabChange}
                        />
                    </div>
                    
                    {renderView()}
                </>
            }
            
        </>
    )
}

export default Planning;
