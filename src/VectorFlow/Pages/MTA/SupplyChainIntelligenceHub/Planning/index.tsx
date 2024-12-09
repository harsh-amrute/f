import SelectCategory from "../../../../../components/VectorFLOW/layouts/SelectCategory";

import usePlanning from "./usePlanning";
import VFOverlay from "../../../.././../components/VectorFLOW/commons/VFOverlay";
import ChartView from "./ChartView";
import ActionToolBar from './ActionToolBar';
import GridView from "./GridView";
import DailyDataGraphModal from "../../../../../components/VectorFLOW/commons/DailyDataGraphModal";
import NormChangeHistoryTable from "../../../../../components/VectorFLOW/commons/NormChangeHistoryTable";
import { GridStateContext } from "../../../../../context/GridStateContext";
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader';

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
        onOpenDailyDataGraph,
        exportExcelColumns,
        setExportExcelColumns,
        tempAgGridProps,
        tempDownloadData,
        setTempDownloadData,
        exportExcelRowData,
        setExportExcelRowData,
        onExportToExcelCallBack,
        ref,
        tempRef,
        onApplyFilter,
        currentFilter,
        setCurrentFilter,
        onDeleteFilter,
        isDataLoading,
        currentColDefs
    } = usePlanning();


    const renderView = () => {

        switch(currentView){
            
            case 'chart':
                return <ChartView currentTab={currentTab} category={currentCategory} currentGraphData={currentGraphData} paginationProps={paginationProps} onOpenDailyDataGraph={onOpenDailyDataGraph} planningCounts={planningCounts}/>
            case 'grid':
                return <GridView currentTab={currentTab} category={currentCategory} currentGridData={currentGridData} paginationProps={paginationProps} onOpenDailyDataGraph={onOpenDailyDataGraph}/>

        }
        
    }

    

   

    if(isDataLoading){
        return <VFLoader/>
    }


    return(
        <GridStateContext.Provider value={{
            ref:ref,
            exportExcelColumns:exportExcelColumns,
            setExportExcelColumns:setExportExcelColumns,
            tempDownloadData:tempDownloadData,
            setTempDownloadData:setTempDownloadData,
            exportExcelRowData:exportExcelRowData,
            setExportExcelRowData:setExportExcelRowData

        }}>
            {
                isOverlayVisible && (
                <VFOverlay>
                    {/* <h1 style={{backgroundColor:"white",padding:'15px',borderRadius:'8px'}}>Loading....</h1> */}
                   <div style={{backgroundColor:'white',borderRadius:'6px'}}>
                    <VFLoader/>
                   </div>
                </VFOverlay>
                )
            }
            {
                isSelectCategoryOpen && 
                <div style={{zoom:'var(--default-zoom)'}}>
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
                        multiFilter={currentFilter}
                        setMultiFilter={setCurrentFilter}
                        onDelete={onDeleteFilter}
                        onApplyFilter={onApplyFilter}
                    />
                </div>
            }
            {
                !isSelectCategoryOpen &&
                <>
                <div style={{zoom:'0.9',marginBottom:'10px'}}>        
                          <ActionToolBar 
                        genericRecordCount={0}
                        onExportToExcelCallBack={onExportToExcelCallBack}
                        planningCount={planningCounts}
                        currCategory={currentCategory}
                        view={currentView} 
                        onFloatingTabChange={onFloatingTabChange}
                        onGoBack={onGoBack}
                        onViewChange={onViewChange}
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        tabsList={getFloatingTabsList(currentView)}
                        disableChartAndGridViewToggle={['GITFromParent',].includes(currentCategory)}
                        onApplyFilter={onApplyFilter}
                        multiFilter={currentFilter}
                        setMultiFilter={setCurrentFilter}
                        onDelete={onDeleteFilter}
                        isPlanning
                        />
                </div>  
                    
                    {renderView()}
                </>
            }
            {
                showDailyDataGraphModal && <DailyDataGraphModal rowData={dailyData.rowData} chartData={dailyData.chartData} normChangeData={dailyData.normChangeData} masterData={dailyData.masterData} isModalOpen={showDailyDataGraphModal} suggestionData={dailyData.suggestionData} monitoringData={dailyData.monitoringData} skuKey={'sc'} whKey={'wcd'} />
            }
            {
                showNormChangeHistoryTable && <NormChangeHistoryTable data={dailyData.normChangeData} />
            }
            <div style={{display:'none'}}>                
                  <VFTable
                    ref={tempRef}
                    columnDefs={currentColDefs}
                    rowData={exportExcelRowData}
                    {...tempAgGridProps}
                  />
                </div>
            
        </GridStateContext.Provider>
    )
}

export default Planning;
