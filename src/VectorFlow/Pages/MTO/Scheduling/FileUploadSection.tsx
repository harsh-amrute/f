import React from "react";
import FileUploadTile from "../Scheduling/components/FileUploadTile";
import fileData from "./data";
import styled from "styled-components";
import { useUserData } from "../../../../context";
import VFButton from "../../../../components/VectorFLOW/commons/VFButton";

const Wrapper = styled.div`
  position: relative;
  margin: 20px 100px;
`;

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 40px; /* left padding for side tab space */
  padding-left: 40px;
  margin-top: 20px;
  background: rgba(246, 206, 233, 0.28);
  border-radius: 6px;
`;

const SideTab = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%) rotate(180deg); /* make it overlap border */
  background: linear-gradient(180deg, #b03775, #993366);
  color: white;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 8px;
  height: 130px;
  border-radius: 5px;
  cursor: default;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);

  &::after {
    content: "";
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%) rotate(180deg);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #993366;
  }
`;

const CheckUpdatesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 40px;
  align-items: center;
  gap: 22px;
  margin-top: 15px;
`;
const LastUpdateStatus = styled.span`
  font-size: 1rem;
  color: rgb(96, 93, 93);
  padding: 4px;
`;

const FileUploadSection = () => {
  const fileObjects = fileData;
  const themeUi = useUserData().user.user.themeUi;

  return (
    <Wrapper>
      <GridContainer>
        <SideTab>UI Generated Files</SideTab>

        {fileObjects.map(
          (file, index) =>
            file.fileUploadType === "UI" && (
              <FileUploadTile
                key={index}
                fileUploadType={file.fileUploadType}
                lastUpdateStatus={file.lastUpdateStatus}
                title={file.title}
                onDownload={() => console.log(`Downloading ${file.title}`)}
                onUpload={() => console.log(`Uploading ${file.title}`)}
              />
            )
        )}
      </GridContainer>

      <CheckUpdatesWrapper>
        <LastUpdateStatus>
          Last Updated: {new Date().toLocaleString()}
        </LastUpdateStatus>

        <VFButton
          style={{ fontSize: "1rem", height: "3rem", display: 'flex', alignItems: 'center', justifyContent: 'center', gap:'8px', padding: '0 12px', width: 'fit-content' }}
          themeUi={themeUi}
          onClick={() => console.log("Check for updates")}
        >
          <img height={'13rem'} src="/assets/img/scheduling/refresh_icon.svg"/>
          <p>Check for Updates</p>
        </VFButton>
      </CheckUpdatesWrapper>

      <GridContainer>
        <SideTab>Automated Files</SideTab>

        {fileObjects.map(
          (file, index) =>
            file.fileUploadType === "FTP" && (
              <FileUploadTile
                key={index}
                fileUploadType={file.fileUploadType}
                lastUpdateStatus={file.lastUpdateStatus}
                title={file.title}
                onDownload={() => console.log(`Downloading ${file.title}`)}
                onUpload={() => console.log(`Uploading ${file.title}`)}
              />
            )
        )}
      </GridContainer>
    </Wrapper>
  );
};

export default FileUploadSection;
