import React, { useEffect } from "react";
import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";
import MonitorGITChildLocationWise from "./MonitorGoodsInTransit/Child/LocationWise";
import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";

const Planning = () => {

    const {
        isSelectCategoryOpen,
        planningCounts,
        isOverlayVisible,
        currentCategory,
        currentGraphData,
        currentTab,
        onMonitorChildClick
    } = usePlanning();

    const renderGraphs = (category:string)=>{
        switch(category){
            case 'GITFromParent':
                return <></>
            case 'GITToChild':
                if(currentTab === 'locationWise'){
                    return (
                        <MonitorGITChildLocationWise
                            data={currentGraphData ? currentGraphData['locationWise']:[]}
                        />
                    )
                }
                return <></>
                
                
            default:
                return <></>
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
                    {renderGraphs(currentCategory)}
                </>
            }
            
        </>
    )
}

export default Planning;