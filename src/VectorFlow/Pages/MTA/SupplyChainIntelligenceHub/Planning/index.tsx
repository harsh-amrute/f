import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import ActionToolBar from './ActionToolBar';
import GridView from "./GridView";
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal";
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable";
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
        currentGridData,
        paginationProps,
        showDailyDataGraphModal,
        showNormChangeHistoryTable,
        dailyData,
        onOpenDailyDataGraph
    } = usePlanning();


    const renderView = () => {

        switch(currentView){
            
            case 'chart':
                return <ChartView currentTab={currentTab} category={currentCategory} currentGraphData={currentGraphData} paginationProps={paginationProps} onOpenDailyDataGraph={onOpenDailyDataGraph} planningCounts={planningCounts}/>
            case 'grid':
                return <GridView currentTab={currentTab} category={currentCategory} currentGridData={currentGridData} paginationProps={paginationProps} onOpenDailyDataGraph={onOpenDailyDataGraph}/>

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
            {
                showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} />
            }
            {
                showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
            }
            
        </>
    )
}

export default Planning;
