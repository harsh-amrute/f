import React from "react";
import styled from "styled-components";
import { useUserData } from "../../../../../context";
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import * as globalStyles from "../../../../../styles/global";

const FilterWrapper = styled.div`
  height: 78vh;
  width: 75vw;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FilterHeaderWrapper = styled.div`
  height: 35px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  align-items: center;
  background: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const FilterHeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  gap: 8px;
  align-items: center;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.6rem;
  font-weight: 200px;
`;

const FilterContent = styled.div`
  height: 80%;
  width: 100%;
  overflow: auto;
`;

const FilterTabLayout = styled.div`
    display: flex;
    gap: 26px;
    padding: 16px 40px;
    width: fit-content;
    height; fit-content;
`;

const FilterTab = styled.div`
  padding: 8px 0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  width: 220px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
  }
  &.active {
    background: #9c0d64;
    color: white;
  }
`;

const FilterTabHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  padding: 4px 8px 4px 16px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

const FilterSearchBar = styled.input`
  width: 90%;
  margin: 12px auto;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 18px;
  font-size: 1rem;
  background: #f9f9f9;
  display: block;
  &:focus {
    outline: none;
    border-color: #9c0d64;
    box-shadow: 0 0 5px rgba(156, 13, 100, 0.5);
  }
`;

const FilterList = styled.div`
  max-height: 220px;
  overflow-y: auto;
  margin-top: 8px;
  padding: 0 8px;
`;

const FilterBottomSection = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
`;

const FilterBottomLeft = styled.div``;
const FilterBottomRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

export const Checkbox = styled.input<{theme:string}>`
    width: 2.5rem !important;
    height: 2.5rem !important;
    border-radius: 2px;
    border: 2px solid rgb(148, 154, 171);
    background-color: white;
    appearance: none;
    cursor: pointer;
    &:checked {
        background-color: ${props => globalStyles.chooseThemeColor[props.theme]?.color4};
        border-color: ${props => globalStyles.chooseThemeColor[props.theme]?.color4};
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        background-image: url(/assets/img/mto/dueDateQuotation/checked.svg);
    }
`

Checkbox.defaultProps = {
    type: "checkbox"
}

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

  const onSelectValue = (key: string, value: string) => {
    setSelectedFilters((prev:any) => {
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
            <FilterSearchBar type="text" placeholder="Search Stage..." />
            <FilterList>
              {allStages.map((stage: any, index: number) => {
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
            <FilterSearchBar type="text" placeholder="Search WorkStation..." />
            <FilterList>
              {allWorkStations.map((ws: any, index: number) => {
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
            <FilterSearchBar type="text" placeholder="Search Job..." />
            <FilterList>
              {allJobs.map((job: any, index: number) => {
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
            <FilterList>
              {allActionPreferences.map((pref: any, index: number) => {
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
            onClick={()=>setSelectedFilters(
                {
                    stages: [],
                    workStations: [],
                    jobs: [],
                    actionPreferences: [],
                }
            )}
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
