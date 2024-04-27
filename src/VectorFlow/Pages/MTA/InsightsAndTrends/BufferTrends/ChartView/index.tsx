
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
  setHorizondays:any
  handleSubmitClick:()=>void
  horizonDays:number

}

const ChartView = ({currentTab,currentGraphData,currentPageTab,onFloatingTabChangeOnPages,isLoading,graphs,
           updateGraphState,setHorizondays,handleSubmitClick,horizonDays}:ChartViewProps) => {

 const renderGraphs = () =>{

  if(currentTab=="tech"){
    return (
    <TechnicalWise
      data={currentGraphData ? currentGraphData:[]}
      currentPageTab={currentPageTab}
      handleClick={onFloatingTabChangeOnPages}
      isLoading={isLoading}
      graphs={graphs}
      updateGraphState={updateGraphState}
      setHorizondays={setHorizondays}
      handleSubmitClick={handleSubmitClick}
      horizonDays={horizonDays}
    />)
  }

  
  if(currentTab=="eco"){
    return (
      <EconomicalWise
        data={currentGraphData ? currentGraphData:[]}
        currentPageTab={currentPageTab}
        handleClick={onFloatingTabChangeOnPages}
        isLoading={isLoading}
        graphs={graphs}
        updateGraphState={updateGraphState}
        setHorizondays={setHorizondays}
        handleSubmitClick={handleSubmitClick}
        horizonDays={horizonDays}
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