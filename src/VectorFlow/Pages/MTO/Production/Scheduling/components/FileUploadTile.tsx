import React, { useRef, useState } from "react";
import VFButton from "../../../../../../components/VectorFLOW/commons/VFButton";
import { useUserData } from "../../../../../../context";
import * as ManualStyle from "../../../../../../module-store-transfer/pages/manual-upload/styles.css";
import {
  ButtonContentWrapper,
  ButtonsWrapper,
  Container,
  LeftSection,
} from "./FileUploadTileStyles.css";

type ReportActionCardProps = {
  title: string;
  onDownload: (file_name: string, expected_extension: string) => void;
  onUpload: (props: any) => void;
  lastUpdateStatus: any;
  fileUploadType: "UI" | "FTP" | "DB" | any;
  expected_extension: string;
};

const FileUploadTile: React.FC<ReportActionCardProps> = ({
  title,
  onDownload,
  onUpload,
  lastUpdateStatus,
  fileUploadType,
  expected_extension,
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
    // switch (file?.type) {
    //   case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    setFile(file);
    //   break;
    // default:
    //   notifyError("Only xlsx files are accepted");
    // }
  };

  return (
    <div className={Container}
      style={{
        border: `1.5px dashed ${lastUpdateStatus ? "#d17ca0" : "#cecece"}`,
      }}
    >
      <div className={LeftSection}
        onClick={handleClick}
        style={{ cursor: fileUploadType === "UI" ? "pointer" : "default" }}
      >
        <img
          src="/assets/img/scheduling/Folder-icon.svg"
          style={{ height: "40px", width: "40px" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {title}
          {fileUploadType === "UI" && (
            <p style={{ fontSize: "0.9rem", color: "#666666", margin: 0 }}>
              {file
                ? `Selected file: ${file.name}`
                : "Click here to Select File."}
            </p>
          )}
          {lastUpdateStatus && (
            <p style={{ fontSize: "0.8rem", color: "#666666", margin: 0 }}>
              {`Last updated: ${lastUpdateStatus}`}
            </p>
          )}
        </div>
      </div>
      {fileUploadType === "UI" && (
        <div className={ButtonsWrapper} style={{ fontSize: "1rem" }}>
          <VFButton
            themeUi={themeUi}
            onClick={() => onDownload(title, expected_extension)}
            style={{ fontSize: "0.9rem", height: "32px", width: "100px" }}
            disabled={!lastUpdateStatus}
          >
            <div className={ButtonContentWrapper}>
              <img
                src="/assets/img/VectorFLOW/NMS/download.svg"
                alt="Upload Icon"
                style={{ width: "18px", height: "18px" }}
              />
              Download
            </div>
          </VFButton>
          <VFButton
            themeUi={themeUi}
            disabled={!file}
            onClick={() => {
              onUpload({
                file,
                file_type: expected_extension,
                file_name: title,
              });
              setFile(null);
            }}
            style={{ fontSize: "0.9rem", height: "32px", width: "100px" }}
          >
            <div className={ButtonContentWrapper}>
              <img
                src="/assets/img/VectorFLOW/NMS/upload.svg"
                alt="Upload Icon"
                style={{ width: "18px", height: "18px" }}
              />
              Upload
            </div>
          </VFButton>

          <input
            className={ManualStyle.SCManualUploadInput}
            type="file"
            accept={expected_extension}
            onChange={handleFileChange}
            ref={inputRef}
            value=""
            style={{ display: "none" }}
            data-testid="view-modify-file-upload"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadTile;
