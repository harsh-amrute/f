import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Scheduling from '.';
import SchedulingActionToolbar from './components/SchedulingActionToolbar';
import ResourceView from './Sections/ResourceView';
import JobView from './Sections/JobView';
import GridViewResource from './Sections/GridViewResource';
import GridViewJob from './Sections/GridViewJob';
import VFOverlayModal from '../../../../components/VectorFLOW/commons/VFOverlayModal';
import FilterModal from './components/FilterModal';
import _ from 'lodash';


const FinalResultSectionWrapper = styled.div`
height: fit-content;
postion: relative;
`

const FinalResultSection = ({setStep, finalResult}:any) => {
  const [excelGridRef, setExcelGridRef] = useState<any>(null);
  const [currentView, setCurrentView] = useState("ResourceView");
  
  const [data, setData] = useState(finalResult)
  const getCurrentView = ()=>{
    switch(currentView){
      case "ResourceView":
        return <ResourceView ResourceData={data} setExcelGridRef={setExcelGridRef}/>
      case "JobView":
        return <JobView ResourceData={data}/>
      case "GridViewR":
        return <GridViewResource ResourceData={data} setExcelGridRef={setExcelGridRef}/>
      case "GridViewJ":
        return <GridViewJob ResourceData={data} setExcelGridRef={setExcelGridRef}/>
      default:
        return <ResourceView/>;
    }
  }

  const [appliedFilters, setAppliedFilters] = React.useState<any>({
      stages: [],
      workStations: [],
      jobs: [],
      actionPreferences: [],
    });


  useEffect(()=>{
    // Here you can add logic to filter 'data' based on 'appliedFilters'
    const FilteredResourceData: any = _.cloneDeep(finalResult); // Start with the original data
    const { stages, workStations, jobs, actionPreferences } = appliedFilters;
    // Filter resources based on stages and workStations
    Object.keys(FilteredResourceData.Resource_Data).forEach((resourceId) => {
      const resource = FilteredResourceData.Resource_Data[resourceId];
      if (
        (stages.length > 0 && !stages.includes(resource.stage)) ||
        (workStations.length > 0 && !workStations.includes(resource.work_station))
      ) {
        delete FilteredResourceData.Resource_Data[resourceId];
      } else {
        // If resource is kept, filter its task_list based on jobs and actionPreferences
        resource.task_list = resource.task_list.filter((task: any) => {
          const jobMatch = jobs.length === 0 || jobs.includes(task.Job_id);
          const actionPrefMatch =
            actionPreferences.length === 0 || actionPreferences.includes(task.action_preference);
          return jobMatch && actionPrefMatch;
        });
      }
    });
    setData(FilteredResourceData);
  },[appliedFilters])

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <FinalResultSectionWrapper>
      <SchedulingActionToolbar onGoBack={()=>{setStep("Upload")}} on currentView={currentView} setCurrentView={setCurrentView} setIsFilterModalOpen={setIsFilterModalOpen} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} gridRef={excelGridRef}/>
        {getCurrentView()}
      {
        isFilterModalOpen && 
          <VFOverlayModal parentSelector="#main-content" openModal={isFilterModalOpen}  >
            <FilterModal setIsFilterModalOpen={setIsFilterModalOpen} ResourceData={finalResult} appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}/>
          </VFOverlayModal>
      }
    </FinalResultSectionWrapper>
  )
}

export default FinalResultSection