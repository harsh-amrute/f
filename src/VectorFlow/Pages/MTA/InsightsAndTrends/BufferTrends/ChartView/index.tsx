

import React, { useState } from 'react'
import TechnicalWise  from '../TechnicalView'
import EconomicalWise from '../EconomicalView'
import { BufferTrendsGraphState } from '../../../../../types/BPR'

interface ChartViewProps {

  currentTab:string,
  currentGraphData:any,
  currentPageTab:string,
  onFloatingTabChangeOnPages?:(i:any)=>void  
  isLoading:boolean
  graphs:BufferTrendsGraphState[]
  updateGraphState:(id:number, property:string, value:any)=>void

}

const ChartView = ({currentTab,currentGraphData,currentPageTab,onFloatingTabChangeOnPages,isLoading,graphs,updateGraphState}:ChartViewProps) => {

 const renderGraphs = () =>{

  if(currentTab=="technicalView"){
    return (
    <TechnicalWise
      data={currentGraphData ? currentGraphData:[]}
      currentPageTab={currentPageTab}
      handleClick={onFloatingTabChangeOnPages}
      isLoading={isLoading}
      graphs={graphs}
      updateGraphState={updateGraphState}
  />)
  }

  
  if(currentTab=="economicalView"){
    return (
      <EconomicalWise
        data={currentGraphData ? currentGraphData:[]}
        currentPageTab={currentPageTab}
        handleClick={onFloatingTabChangeOnPages}
        isLoading={isLoading}
        graphs={graphs}
        updateGraphState={updateGraphState}
    />
    )
  }
 }
    
  return (
    <>
       {renderGraphs()}
    </>

  )   
}

export default ChartView