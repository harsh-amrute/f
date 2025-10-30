import FileUploadTile from "../Scheduling/components/FileUploadTile";
import fileData from "./data";
import { useUserData } from "../../../../context";
import VFButton from "../../../../components/VectorFLOW/commons/VFButton";
import {
  Wrapper,
  GridContainer,
  SideTab,
  CheckUpdatesWrapper,
  LastUpdateStatus,
} from "./styles.css";

const FileUploadSection = () => {
  const fileObjects = fileData;
  const themeUi = useUserData().user.user.themeUi;

  return (
    <div className={Wrapper}>
      <div className={GridContainer}>
        <div className={SideTab}>UI Generated Files</div>

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
      </div>

      <div className={CheckUpdatesWrapper}>
        <span className={LastUpdateStatus}>
          Last Updated: {new Date().toLocaleString()}
        </span>

        <VFButton
          style={{
            fontSize: "1rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "0 12px",
            width: "fit-content",
          }}
          themeUi={themeUi}
          onClick={() => console.log("Check for updates")}
        >
          <img height={"13rem"} src="/assets/img/scheduling/refresh_icon.svg" />
          <p>Check for Updates</p>
        </VFButton>
      </div>

      <div className={GridContainer}>
        <div className={SideTab}>Automated Files</div>

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
      </div>
    </div>
  );
};

export default FileUploadSection;
