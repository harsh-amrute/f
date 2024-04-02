

import React, { useEffect } from 'react'
import VFFloatingTab from "../../../../../components/VectorFLOW/commons/VFFloatingTab";
import useBufferTrends from './useBufferTrends';
import VFLoader from '../../../../../components/VectorFLOW/commons/VFLoader'

import ChartView from '../../InsightsAndTrends/BufferTrends/ChartView';

const BufferTrends = () => {

   const {currentTab,onFloatingTabChange,currentView,currentGraphData,BufferTrendsDataLoad,isLoading,
    currentPageTab,onFloatingTabChangeOnPages,currentPageIndex} =useBufferTrends();
   
   const renderView=()=>{
    switch(currentView){
        case 'chart':
            return <ChartView currentTab={currentTab} currentGraphData={currentGraphData} currentPageTab={currentPageTab} onFloatingTabChangeOnPages={onFloatingTabChangeOnPages} isLoading={isLoading}/>   
        }
   }
   
   useEffect(()=>{
    BufferTrendsDataLoad()
   },[currentTab])

//    if(isLoading){
//     return(
//       <VFLoader/>
//     )
//    }

   //console.log("render ")

   
  return (
    <>
    <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                        <VFFloatingTab
                            tabs={[
                                {
                                    id:'technical View',
                                    label:'Technical View',
                                    value:'technicalView'
                                },
                                {
                                    id:'economicalView',
                                    label:'Economical View',
                                    value:'economicalView'
                                }
                            ]}
                            handleClick={onFloatingTabChange}
                            defaultTab={currentPageIndex}
                        />
                    </div>
                    {isLoading?<VFLoader/>: renderView()}      
                    {/* {renderView()} */}
    </>
    
  )
}

export default BufferTrends