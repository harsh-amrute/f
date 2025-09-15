import React from 'react'
import styled from 'styled-components'
import ResourceViewChart from '../components/ResourceViewChart'
import ResourceViewSummary from '../components/ResourceViewSummary'
import response from '../components/data'

const ResourceViewWrapper  = styled.div`
    display: flex;
    flex-direction: column;
`
const ResourceView = ({ResourceData, setExcelGridRef}: any) => {

  const TaskTypeMaster = 
    {
      "free": "#A8D5BA",          // Light green
      "holiday": "#FFD166",       // Warm yellow
      "OT": "#EF476F",            // Reddish pink
      "non_working": "#8D99AE",   // Grey
      "job": "#06D6A0",           // Teal/green
      "typeA": "#118AB2",         // Blue
      "typeB": "#073B4C",         // Dark blue/blackish
      "unknown": "#FF6F61"        // Coral red
    }
  
  return (
    <ResourceViewWrapper>
      <ResourceViewChart ResourceData={ResourceData}/>
      <ResourceViewSummary ResourceData={ResourceData} setExcelGridRef={setExcelGridRef}/>

    </ResourceViewWrapper>
  )
}

export default ResourceView