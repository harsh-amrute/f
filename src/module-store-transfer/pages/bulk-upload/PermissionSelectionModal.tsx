import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SCHorizontalDivison,
  SCViewContainer,
  SCViewContainerWithBgToggle,
} from "../../../components/VectorFLOW/commons/MTO/ActionToolBar/styles";
import { useUserData } from "../../../context";
import { ChartView, GridView } from "../../../helpers/SvgRenderer";
import PermissionHeirarchyCanvas from "../manage-users/PermissioinHeirarchyCanvas";
import PermissionForm from "./PermissionForm";
import VFButton from "../../../components/VectorFLOW/commons/VFButton";
import VFButtonOutline from "../../../components/VectorFLOW/commons/VFButtonOutline";
import { GridRef } from "../../../VectorFlow/types/MDM";
import { IRowNode } from "ag-grid-enterprise";

const ToggleContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1.5px solid #d08ba5;
  border-radius: 999px;
  overflow: hidden;
  width: fit-content;
  padding: 2px;
  gap: 12px;
  font-size: 8px;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 3px 14px;
  border: none;
  background-color: ${({ active }) => (active ? "#f1d2e0" : "transparent")};
  color: ${({ active }) => (active ? "#c72e64" : "#000")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  border-radius: 999px;
  cursor: pointer;
  font-size: 10px;
  transition: background 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#f1d2e0" : "#f5f5f5")};
  }
`;
//@TODO: add type definations later
const ViewToggle = ({
  allApplications,
  selectedApplication,
  setSelectedApplication,
}: any) => {
  return (
    <ToggleContainer>
      {allApplications.map((app: string) => (
        <ToggleButton
          key={app}
          active={selectedApplication === app}
          onClick={() => setSelectedApplication(app)}
        >
          {app}
        </ToggleButton>
      ))}
    </ToggleContainer>
  );
};

const ChartViewToggle = ({ isChartView, setIsChartView }: any) => {
  const user = useUserData();
  const themeUi = user.user.user.theme_ui;

  return (
    <SCViewContainerWithBgToggle style={{ zoom: 0.5 }}>
      <SCViewContainer
        onClick={() => {
          isChartView && setIsChartView && setIsChartView(!isChartView);
        }}
      >
        <ChartView theme={themeUi} view={!isChartView} />
      </SCViewContainer>

      <SCHorizontalDivison />

      <SCViewContainer
        onClick={() => {
          !isChartView && setIsChartView && setIsChartView(!isChartView);
        }}
        style={{ paddingTop: "7px" }}
      >
        <GridView theme={themeUi} view={isChartView} />
      </SCViewContainer>
    </SCViewContainerWithBgToggle>
  );
};

// @TODO: add type definations
const PermissionSelectionModal = ({selectedIndex, gridRef,dataAllPermissions,closeModal, updatePermissions }: {gridRef?: GridRef| any, selectedIndex?: any, dataAllPermissions: any, closeModal: any, updatePermissions: any}) => {
  const [isChartView, setIsChartView] = React.useState(false);
  const allApplications = dataAllPermissions?.map(
    (ele: any) => ele.application_name
  );
  const [selectedApplication, setSelectedApplication] = React.useState<
    string[]
  >(allApplications[0]);

  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  useEffect(()=>{
    console.log("selectedIndex", selectedIndex);
    if(!isNaN(selectedIndex)){
        console.log("selectedIndex", selectedIndex);
      gridRef && gridRef?.api && gridRef.api?.forEachNode((node: IRowNode)=>{
        console.log("here")
        if(node.rowIndex===selectedIndex){
          console.log("here and")
          setSelectedPermissions(node.data.permissions);
        }
      })
    }
  },[selectedIndex, gridRef])

  const user = useUserData();
  const themeUi = user.user.user.theme_ui;

  useEffect(()=>{
    console.log("this are the selectedPermissions", selectedPermissions);
  },[selectedPermissions])

  return (
    <>
      <div style={{ width: "80vw", height: "80vh", padding: "25px" }}>
        <div
          style={{
            width: "100%",
            height: "28px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ViewToggle
            allApplications={allApplications}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
          />
          <ChartViewToggle
            isChartView={isChartView}
            setIsChartView={setIsChartView}
          />
        </div>
        <div style={{height: '80%'}}>

        {isChartView ? (
          <PermissionHeirarchyCanvas
          dataAllPermissions={dataAllPermissions}
          selectedApplication={selectedApplication}
          selectedPermissions={selectedPermissions}
          setSelectedPermissions={setSelectedPermissions}
          />
        ) : (
          <PermissionForm
          currentAppAllPermissions={dataAllPermissions.find(
              (ele: any) => ele.application_name === selectedApplication
            )}
            selectedApplication={selectedApplication}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
            />
          )}
          </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px'}}>
          <VFButtonOutline
            style={{height: '3.5rem', fontSize: '1.2rem'}}
            themeUi={themeUi}
            onClick={() => {closeModal()}}

          >Cancel</VFButtonOutline>
          <VFButton
          style={{height: '3.5rem', fontSize: '1.2rem'}}
          themeUi={themeUi}
          onClick={() => {updatePermissions(selectedPermissions); closeModal()}}
          >Apply</VFButton>
          
        </div>
      </div>
    </>
  );
};

export default PermissionSelectionModal;
