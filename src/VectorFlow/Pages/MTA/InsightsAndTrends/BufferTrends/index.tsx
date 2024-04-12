
import { useEffect } from 'react'
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from './useBufferTrends';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'
import ActionToolBar from '../../SupplyChainIntelligenceHub/Planning/ActionToolBar';

import ChartView from '../../InsightsAndTrends/BufferTrends/ChartView';

const BufferTrends = () => {

   const {currentTab,onFloatingTabChange,currentView,currentGraphData,BufferTrendsDataLoad,isLoading,
    currentPageTab,onFloatingTabChangeOnPages,graphs,updateGraphState,setHorizondays,handleSubmitClick,horizonDays} =useBufferTrends();
   
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
     <ActionToolBar view={'grid'} setCurrentTab={''} currCategory={'BufferTrend'} currentTab={''} tabsList={[]} onFloatingTabChange={()=>console.log('')} onGoBack={()=>console.log('')} onViewChange={()=>console.log('')}/>

    <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>
                        <VFFloatingTab
                            tabs={[
                                {
                                    id:'technical View',
                                    label:'On-Hand inv. Availability Trend',
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
                    {isLoading?<VFLoader/>: renderView()}      
                   
    </>
    
  )
}

export default BufferTrends