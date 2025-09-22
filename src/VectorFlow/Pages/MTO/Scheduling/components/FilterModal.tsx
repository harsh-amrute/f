import React from "react";
import styled from "styled-components";
import { useUserData } from "../../../../../context";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { Checkbox, CloseButton, FilterBottomLeft, FilterBottomRight, FilterBottomSection, FilterContent, FilterHeaderTitle, FilterHeaderWrapper, FilterList, FilterSearchBar, FilterTab, FilterTabHeader, FilterTabLayout, FilterWrapper } from "./FilterModalStyles";

const FilterModal = ({ setIsFilterModalOpen, ResourceData, setAppliedFilters, appliedFilters }: any) => {
  const allJobs: any = [];
  const AllResourceIds = Object.keys(ResourceData.Resource_Data);
  AllResourceIds.forEach((resource: any) => {
    ResourceData.Resource_Data[resource].task_list.forEach((job: any) => {
      if (job.Job_id && !allJobs.includes(job.Job_id)) {
        allJobs.push(job.Job_id);
      }
    });
  });

  const allStages: any = [];
  AllResourceIds.forEach((resource: any) => {
    if (
      ResourceData.Resource_Data[resource].stage &&
      !allStages.includes(ResourceData.Resource_Data[resource].stage)
    ) {
      allStages.push(ResourceData.Resource_Data[resource].stage);
    }
  });

  const allWorkStations: any = [];
  AllResourceIds.forEach((resource: any) => {
    if (
      ResourceData.Resource_Data[resource].work_station &&
      !allWorkStations.includes(
        ResourceData.Resource_Data[resource].work_station
      )
    ) {
      allWorkStations.push(ResourceData.Resource_Data[resource].work_station);
    }
  });

  const allActionPreferences: any = Object.keys(ResourceData.Task_master);

  const themeUi = useUserData().user.user.theme_ui;

  const [selectedFilters, setSelectedFilters] = React.useState<any>(appliedFilters);
  
  // Search states for each tab
  const [searchTerms, setSearchTerms] = React.useState({
    stages: "",
    workStations: "",
    jobs: "",
    actionPreferences: ""
  });

  const onSelectValue = (key: string, value: string) => {
    setSelectedFilters((prev: any) => {
      return prev[key].includes(value)
        ? {
            ...prev,
            [key]: prev[key].filter((s: any) => s !== value),
          }
        : {
            ...prev,
            [key]: [...prev[key], value],
          };
    });
  };

  const updateSearchTerm = (tabKey: string, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [tabKey]: value
    }));
  };

  // Filter functions for each list
  const filterStages = () => {
    return allStages.filter((stage: string) => 
      stage.toLowerCase().includes(searchTerms.stages.toLowerCase())
    );
  };

  const filterWorkStations = () => {
    return allWorkStations.filter((ws: string) => 
      ws.toLowerCase().includes(searchTerms.workStations.toLowerCase())
    );
  };

  const filterJobs = () => {
    return allJobs.filter((job: string) => 
      job.toLowerCase().includes(searchTerms.jobs.toLowerCase())
    );
  };

  const filterActionPreferences = () => {
    return allActionPreferences.filter((pref: string) => 
      pref.toLowerCase().includes(searchTerms.actionPreferences.toLowerCase())
    );
  };

  return (
    <FilterWrapper>
      <FilterHeaderWrapper>
        <FilterHeaderTitle>
          <img
            src="/assets/img/scheduling/filter-icon.svg"
            alt="Filter"
            style={{ width: "16px", height: "16px", marginRight: "8px" }}
          />
          Select Filter
        </FilterHeaderTitle>
        <CloseButton onClick={() => setIsFilterModalOpen(false)}>×</CloseButton>
      </FilterHeaderWrapper>
  
      <FilterContent>
        <FilterTabLayout>
          {/* Stage */}
          <FilterTab>
            <FilterTabHeader>Stage</FilterTabHeader>
            <FilterSearchBar 
              type="text" 
              placeholder="Search Stage..."
              value={searchTerms.stages}
              onChange={(e) => updateSearchTerm("stages", e.target.value)}
            />
            <FilterList>
              {filterStages().map((stage: any, index: number) => {
                const id = `stage-${index}`;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 0",
                      gap: "6px",
                    }}
                    onClick={() => onSelectValue("stages", stage)}
                  >
                    <Checkbox
                      id={id}
                      theme={themeUi}
                      style={{ zoom: "0.5" }}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectValue("stages", stage)}
                      checked={selectedFilters.stages.includes(stage)}
                    />
                    <p>{stage}</p>
                  </div>
                );
              })}
            </FilterList>
          </FilterTab>
  
          {/* WorkStation */}
          <FilterTab>
            <FilterTabHeader>WorkStation</FilterTabHeader>
            <FilterSearchBar 
              type="text" 
              placeholder="Search WorkStation..." 
              value={searchTerms.workStations}
              onChange={(e) => updateSearchTerm("workStations", e.target.value)}
            />
            <FilterList>
              {filterWorkStations().map((ws: any, index: number) => {
                const id = `workstation-${index}`;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 0",
                      gap: "6px",
                    }}
                    onClick={() => onSelectValue("workStations", ws)}
                  >
                    <Checkbox
                      id={id}
                      style={{ zoom: 0.5 }}
                      theme={themeUi}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectValue("workStations", ws)}
                      checked={selectedFilters.workStations.includes(ws)}
                    />
                    <p>{ws}</p>
                  </div>
                );
              })}
            </FilterList>
          </FilterTab>
  
          {/* Job List */}
          <FilterTab>
            <FilterTabHeader>Job List</FilterTabHeader>
            <FilterSearchBar 
              type="text" 
              placeholder="Search Job..." 
              value={searchTerms.jobs}
              onChange={(e) => updateSearchTerm("jobs", e.target.value)}
            />
            <FilterList>
              {filterJobs().map((job: any, index: number) => {
                const id = `job-${index}`;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 0",
                      gap: "6px",
                    }}
                    onClick={() => onSelectValue("jobs", job)}
                  >
                    <Checkbox
                      id={id}
                      style={{ zoom: 0.5 }}
                      theme={themeUi}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectValue("jobs", job)}
                      checked={selectedFilters.jobs.includes(job)}
                    />
                    <p>{job}</p>
                  </div>
                );
              })}
            </FilterList>
          </FilterTab>
  
          {/* Action Preference */}
          <FilterTab>
            <FilterTabHeader>Action Preference</FilterTabHeader>
            <FilterSearchBar 
              type="text" 
              placeholder="Search Action Preference..."
              value={searchTerms.actionPreferences}
              onChange={(e) => updateSearchTerm("actionPreferences", e.target.value)}
            />
            <FilterList>
              {filterActionPreferences().map((pref: any, index: number) => {
                const id = `actionPref-${index}`;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px 0",
                      gap: "6px",
                    }}
                    onClick={() => onSelectValue("actionPreferences", pref)}
                  >
                    <Checkbox
                      id={id}
                      style={{ zoom: 0.5 }}
                      theme={themeUi}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectValue("actionPreferences", pref)}
                      checked={selectedFilters.actionPreferences.includes(pref)}
                    />
                    <p>{pref}</p>
                  </div>
                );
              })}
            </FilterList>
          </FilterTab>
        </FilterTabLayout>
      </FilterContent>
  
      <FilterBottomSection>
        <FilterBottomLeft>
          <VFButtonOutline
            style={{ fontSize: "1.1rem", height: "3.2rem" }}
            themeUi={themeUi}
            onClick={() => {
              setSelectedFilters({
                stages: [],
                workStations: [],
                jobs: [],
                actionPreferences: [],
              });
              setSearchTerms({
                stages: "",
                workStations: "",
                jobs: "",
                actionPreferences: ""
              });
            }}
          >
            Reset Filter
          </VFButtonOutline>
        </FilterBottomLeft>
        <FilterBottomRight>
          <VFButtonOutline
            style={{ fontSize: "1.1rem", height: "3.2rem" }}
            themeUi={themeUi}
            onClick={() => setIsFilterModalOpen(false)}
          >
            Go Back!
          </VFButtonOutline>
          <VFButton
            style={{ fontSize: "1.1rem", height: "3.2rem" }}
            themeUi={themeUi}
            onClick={() => {setAppliedFilters(selectedFilters), setIsFilterModalOpen(false)}}
          >
            Apply Filter
          </VFButton>
        </FilterBottomRight>
      </FilterBottomSection>
    </FilterWrapper>
  );
  
};

export default FilterModal;