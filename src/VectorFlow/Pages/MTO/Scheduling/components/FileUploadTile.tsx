import React, { useRef, useState } from "react";
import styled from "styled-components";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../context";
import * as ManualStyle from "../../../../../module-store-transfer/pages/manual-upload/styles";
import { notifyError } from "../../../../../helpers/notify";

type ReportActionCardProps = {
  title: string;
  onDownload: (file_name: string) => void;
  onUpload: () => void;
  lastUpdateStatus: any;
  fileUploadType: 'UI'|'FTP'|'DB'|any
};

const Container = styled.div`
  border: 1.5px dashed #d17ca0; /* Pink dashed border */
  padding: 14px 16px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: #fff;
  max-width: 500px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #ffffff;
`;

const FileUploadTile: React.FC<ReportActionCardProps> = ({
  title,
  onDownload,
  onUpload,
  lastUpdateStatus,
  fileUploadType
}) => {
  const themeUi = useUserData().user.user.themeUi;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (): void => {
    if (inputRef.current != null) {
      inputRef.current.click();
    }
  };


  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    if (e?.target?.files?.length < 1) {
      return;
    }

    const file = e?.target?.files?.[0];
    switch (file?.type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        setFile(file);
        break;
      default:
        notifyError("Only xlsx files are accepted");
    }
  };

  return (
    <Container style={{border: `1.5px dashed ${lastUpdateStatus ? '#d17ca0' : '#cecece'}`}}>
      <LeftSection onClick={handleClick}>
        <img
          src="/assets/img/scheduling/Folder-icon.svg"
          style={{ height: "40px", width: "40px" }}
        />
        <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>

        {title}
        {
            fileUploadType==='UI' &&

            <p style={{fontSize: '0.9rem', color: '#666666', margin: 0}}>
            {file? `Selected file: ${file.name}` : "Click here to Select File."}
        </p>
        }
        {
            lastUpdateStatus &&
            <p style={{fontSize: '0.8rem', color: '#666666', margin: 0}}>
              {`Last updated: ${lastUpdateStatus}`}
              </p>
        }
        </div>
      </LeftSection>
      {
        fileUploadType === 'UI' &&
      <ButtonsWrapper style={{ fontSize: "1rem" }}>
        
        <VFButton
          themeUi={themeUi}
          onClick={()=>onDownload(title)}
          style={{ fontSize: "0.9rem", height: "32px", width: '100px' }}
          disabled={!lastUpdateStatus}
        >
          <ButtonContentWrapper>
            <img
              src="/assets/img/VectorFLOW/NMS/download.svg"
              alt="Upload Icon"
              style={{ width: "18px", height: "18px" }}
            />
            Download
          </ButtonContentWrapper>
        </VFButton>
        <VFButton
          themeUi={themeUi}
          onClick={onUpload}
          style={{ fontSize: "0.9rem", height: "32px", width: '100px' }}
          >
                   <ButtonContentWrapper>
            <img
              src="/assets/img/VectorFLOW/NMS/upload.svg"
              alt="Upload Icon"
              style={{ width: "18px", height: "18px" }}
            />
            Upload
          </ButtonContentWrapper>
        </VFButton>

        <ManualStyle.SCManualUploadInput
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              ref={inputRef}
              value=""
              style={{ display: "none" }}
              data-testid="view-modify-file-upload"
              />
      </ButtonsWrapper>
            }
    </Container>
  );
};

export default FileUploadTile;
