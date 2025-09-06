import React, { useState } from 'react'
import styled from 'styled-components';
import Scheduling from '.';
import SchedulingActionToolbar from './components/SchedulingActionToolbar';
import ResourceView from './Sections/ResourceView';
import JobView from './Sections/JobView';
import GridViewResource from './Sections/GridViewResource';
import GridViewJob from './Sections/GridViewJob';
import VFOverlayModal from '../../../../components/VectorFLOW/commons/VFOverlayModal';
import FilterModal from './components/FilterModal';


const FinalResultSectionWrapper = styled.div`
height: fit-content;
postion: relative;
`

const FinalResultSection = ({setStep}:any) => {
  const [currentView, setCurrentView] = useState("ResourceView");
  const getCurrentView = ()=>{
    switch(currentView){
      case "ResourceView":
        return <ResourceView/>
      case "JobView":
        return <JobView/>
      case "GridViewR":
        return <GridViewResource/>
      case "GridViewJ":
        return <GridViewJob/>
      default:
        return <ResourceView/>;
    }
  }

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <FinalResultSectionWrapper>
      <SchedulingActionToolbar onGoBack={()=>{setStep("Upload")}} on currentView={currentView} setCurrentView={setCurrentView} setIsFilterModalOpen={setIsFilterModalOpen}/>
        {getCurrentView()}

      {
        isFilterModalOpen && 
          <VFOverlayModal parentSelector="#main-content" openModal={isFilterModalOpen}  >
            <FilterModal setIsFilterModalOpen={setIsFilterModalOpen}/>
          </VFOverlayModal>
      }
    </FinalResultSectionWrapper>
  )
}

export default FinalResultSection