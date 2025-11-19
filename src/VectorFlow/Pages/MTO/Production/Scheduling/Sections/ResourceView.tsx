import React from 'react'
import ResourceViewChart from '../components/ResourceViewChart'
import ResourceViewSummary from '../components/ResourceViewSummary'
import { resourceViewWrapper } from '../SchedulingStyles.css'



const ResourceView = ({ResourceData, setExcelGridRef}: any) => {


  return (
    <div className={resourceViewWrapper}>
      <ResourceViewChart ResourceData={ResourceData}/>
      <ResourceViewSummary ResourceData={ResourceData} setExcelGridRef={setExcelGridRef}/>

    </div>
  )
}

export default ResourceView