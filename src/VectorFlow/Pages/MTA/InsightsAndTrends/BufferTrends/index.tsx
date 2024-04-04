
import { useEffect } from 'react'
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from './useBufferTrends';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'

import ChartView from '../../InsightsAndTrends/BufferTrends/ChartView';

const BufferTrends = () => {

   const {currentTab,onFloatingTabChange,currentView,currentGraphData,BufferTrendsDataLoad,isLoading,
    currentPageTab,onFloatingTabChangeOnPages,graphs,updateGraphState} =useBufferTrends();
   
   const renderView=()=>{
    switch(currentView){
        case 'chart':
            return <ChartView currentTab={currentTab} 
                    currentGraphData={currentGraphData} 
                    currentPageTab={currentPageTab} 
                    onFloatingTabChangeOnPages={onFloatingTabChangeOnPages} 
                    isLoading={isLoading}
                    graphs={graphs}
                    updateGraphState={updateGraphState}/>   
        }
   }
   
   useEffect(()=>{
    BufferTrendsDataLoad()
   },[currentTab])
   
  return (
    <>
    <div style={{display:'flex',justifyContent:'center',marginBottom:'8px'}}>
                        <VFFloatingTab
                            tabs={[
                                {
                                    id:'technical View',
                                    label:'On-Hand inv. Availability Trend',
                                    value:'technicalView'
                                },
                                {
                                    id:'economicalView',
                                    label:'Pipeline Inv. Availability Trend',
                                    value:'economicalView'
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