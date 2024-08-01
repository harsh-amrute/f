
import { useEffect } from 'react'
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from './useBufferTrends';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';

import ChartView from '../../InsightsAndTrends/BufferTrends/ChartView';

const BufferTrends = () => {

   const {currentTab,onFloatingTabChange,currentView,currentGraphData,BufferTrendsDataLoad,isLoading,
    currentPageTab,onFloatingTabChangeOnPages,graphs,updateGraphState,setHorizondays,handleSubmitClick,horizonDays
    ,onGoBack,handleApplyFilter,multiFilterState,
    setMultiFilterState,
    onDeleteFilter,} =useBufferTrends();
   
   const renderView=()=>{
    switch(currentView){
        case 'chart':
            return <ChartView currentTab={currentTab} 
                    currentGraphData={currentGraphData} 
                    currentPageTab={currentPageTab} 
                    onFloatingTabChangeOnPages={onFloatingTabChangeOnPages} 
                    isLoading={isLoading}
                    graphs={graphs}
                    updateGraphState={updateGraphState}
                    setHorizondays={setHorizondays}
                    handleSubmitClick={handleSubmitClick}
                    horizonDays={horizonDays}
                    />   
        }
   }

   
   
   useEffect(()=>{
    BufferTrendsDataLoad()
   },[currentTab])
   
  return (
    <>
     <ActionToolBar view={'grid'} setCurrentTab={currentTab} currCategory={'BufferTrend'} currentTab={''} tabsList={[]} onFloatingTabChange={onFloatingTabChange} onGoBack={onGoBack} onViewChange={()=>console.log('')} onApplyFilter={handleApplyFilter} onExportToExcelCallBack genericRecordCount={0} multiFilter={multiFilterState} setMultiFilter={setMultiFilterState} onDelete={onDeleteFilter}/>

    <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>
                        <div style={{zoom:0.7}}>
                        <VFFloatingTab
                            tabs={[
                                {
                                    id:'technical View',
                                    label:'On-Hand Inv. Availability Trend',
                                    value:'tech'
                                },
                                {
                                    id:'economicalView',
                                    label:'Pipeline Inv. Availability Trend',
                                    value:'eco'
                                }
                            ]}
                            handleClick={onFloatingTabChange}
                        
                        />
                        </div>
                    </div>
                    {isLoading?<VFLoader/>: renderView()}      
                   
    </>
    
  )
}

export default BufferTrends