

import React, { useState } from 'react'
import TechnicalWise  from '../TechnicalView'
import EconomicalWise from '../EconomicalView'

interface ChartViewProps {

  currentTab:string,
  currentGraphData:any,
  currentPageTab:string,
  onFloatingTabChangeOnPages?:(i:any)=>void  
  isLoading:boolean

}

const ChartView = ({currentTab,currentGraphData,currentPageTab,onFloatingTabChangeOnPages,isLoading}:ChartViewProps) => {

 const renderGraphs = () =>{

  if(currentTab=="technicalView"){
    return (
    <TechnicalWise
      data={currentGraphData ? currentGraphData:[]}
      currentPageTab={currentPageTab}
      handleClick={onFloatingTabChangeOnPages}
      isLoading={isLoading}
  />)
  }
  if(currentTab=="economicalView"){
    return (
      <EconomicalWise
        data={currentGraphData ? currentGraphData:[]}
        currentPageTab={currentPageTab}
        handleClick={onFloatingTabChangeOnPages}
        isLoading={isLoading}
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