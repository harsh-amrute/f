import React, { useEffect, useState } from "react";
import FileUploadTile from "../Scheduling/components/FileUploadTile";
import fileData from "./data";
import styled from "styled-components";
import { useUserData } from "../../../../context";
import VFButton from "../../../../components/VectorFLOW/commons/VFButton";
import { useGetFileConfiguration, useGetFileDownloadForSchedular } from "../../../../VectorFlow/Services/MTO/Scheduling";
import { format } from "date-fns";
import { notifyError, notifyLoader, notifySuccess } from "../../../../helpers/notify";
import { toast } from "react-toastify";
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

const SkeletonTile = styled.div`
  height: 120px;
  border-radius: 6px;
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const FileUploadSection = () => {
  const [fileObjects, setFileObjects] = useState<any>([]);
  const themeUi = useUserData().user.user.themeUi;

  const { mutateAsync: getFileConfiguration, isLoading } =
    useGetFileConfiguration();

  const {mutateAsync: getFileDownload} = useGetFileDownloadForSchedular();

  const [lastRefreshTime ,setLastRefreshTime] = useState<string>(new Date().toString());

  const GetFileConfiguration = async () => {
    const result = await getFileConfiguration();
    console.log("result", result);
    setFileObjects(result.data.data);
    setLastRefreshTime(new Date().toString());
  };



  const DownloadExcel = async(filename: string) => {
    try {
      notifyLoader("Downloading file...");
      const response = await getFileDownload(filename);
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename); // Use extracted filename
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        notifySuccess("File downloaded successfully! Check your downloads!");
    } catch (e:any) {
      console.log("error", e);
      notifyError(e?.message || "Failed to download file");
      console.log(e);
    }
  };

  const [timeAgo, setTimeAgo] = useState("");

  const getTimeAgo = (time: string) => {
    const now = new Date().getTime();
    const past = new Date(time).getTime();
    const diffInSec = Math.floor((now - past) / 1000);

    if (diffInSec < 60) return `${diffInSec} sec ago`;
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)} min ago`;
    if (diffInSec < 86400) return `${Math.floor(diffInSec / 3600)} hr ago`;
    return `${Math.floor(diffInSec / 86400)} day(s) ago`;
  };

  useEffect(() => {
    const updateTime = () => setTimeAgo(getTimeAgo(lastRefreshTime));

    updateTime(); // initial
    const interval = setInterval(updateTime, 1000); // update every sec

    return () => clearInterval(interval);
  }, [lastRefreshTime]);
  

  

  React.useEffect(() => {
    GetFileConfiguration();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "40px",
            flexDirection: "column",
          }}
        >
          <SkeletonTile />
          <SkeletonTile />
        </div>
      ) : (
        <>

<CheckUpdatesWrapper>
            <LastUpdateStatus>
              Last Updated: {timeAgo}
            </LastUpdateStatus>

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
              onClick={() => GetFileConfiguration()}
            >
              <img
                height={"13rem"}
                src="/assets/img/scheduling/refresh_icon.svg"
              />
              <p>Check for Updates</p>
            </VFButton>
          </CheckUpdatesWrapper>

          <GridContainer>
            <SideTab>UI Generated Files</SideTab>

            {fileObjects.map(
              (file: any, index: number) =>
                file.file_from === "UI" && (
                  <FileUploadTile
                    key={index}
                    fileUploadType={file.file_from}
                    lastUpdateStatus={
                      file.last_updated
                        ? format(
                            new Date(file.last_updated),
                            "dd MMM yyyy, hh:mm a" 
                          )
                          +
                              " " +
                              "by " +
                              file.uploaded_by
                        : null
                    }
                    title={file.file_name}
                    onDownload={DownloadExcel}
                    onUpload={() => console.log(`Uploading ${file.file_name}`)}
                  />
                )
            )}
          </GridContainer>

          <GridContainer>
            <SideTab>Automated Files</SideTab>

            {fileObjects.map(
              (file: any, index: number) =>
                file.file_from === "FTP" && (
                  <FileUploadTile
                    key={index}
                    fileUploadType={file.file_from}
                    lastUpdateStatus={
                      file.last_updated
                        ? format(
                            new Date(file.last_updated),
                            "dd MMM yyyy, hh:mm a"
                          )
                        : null
                    }
                    title={file.file_name}
                    onDownload={DownloadExcel}
                    onUpload={() => console.log(`Uploading ${file.file_name}`)}
                  />
                )
            )}
          </GridContainer>
        </>
      )}
    </Wrapper>
  );
};

export default FileUploadSection;
