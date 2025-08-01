import { HeaderText, RightSectionWrapper } from "./style";
import ProgressBox from "./ProgressBox";
import RightSectionFilePanel from "./RightSectionFilePanel";
import VFTable from "../../../VectorFlow/Pages/MTO/Common/VFTable";
import { GridRef } from "../../../VectorFlow/types/MDM";
import { useRef } from "react";

interface UploadRightSectionProps {
  errorCount?: number;
  errorData?: any[];
  validData?: any[];
  setIsAssignPageOpen: (e: boolean) => void;
  progress: number;
}

function UploadRightSection({
  errorCount,
  errorData,
  validData,
  setIsAssignPageOpen,
  progress
}: UploadRightSectionProps) {
  const errorGridRef = useRef<GridRef>(null);
  const onErrorFileDownload = () => {
    if (errorGridRef && errorGridRef.current) {
      errorGridRef.current.api.exportDataAsExcel({
        fileName: "Error-Data.xlsx",
        sheetName: "User Data",
      });
    }
  };

  const onValidDataClick = () => {
    if (validData) {
      setIsAssignPageOpen(true);
    }
  };
  return (
    <RightSectionWrapper>
      <ProgressBox label={"Uploaded Succesfully"}  progress={progress}/>
      <HeaderText>
        {errorCount ? `${errorCount} rows contain errors` : "No errors found"}
      </HeaderText>
      <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
        <RightSectionFilePanel
          onClick={onErrorFileDownload}
          text={"Error File"}
          img="/assets/img/excel.svg"
          iconStyles={{ width: "2rem", padding: "0px" }}
          imgStyles={{ width: "3.5rem" }}
          btnIcon="/assets/img/VectorFLOW/NMS/download.svg"
        />
        <RightSectionFilePanel
          onClick={onValidDataClick}
          text={"Assign Roles & Permission"}
          img="/assets/img/excel.svg"
          iconStyles={{ width: "1.7rem", padding: "0px" }}
          imgStyles={{ width: "3.5rem" }}
          btnIcon="/assets/img/Open new link icon.svg"
        />
      </div>
      <div style={{ display: "none" }}>
        <VFTable
          ref={errorGridRef}
          columnDefs={[
            {
              headerName: "Error",
              field: "error",
              valueFormatter: (params: any) => {
                console.log("Params: ", params);
                return (params?.value || []).map((e: any) => `${e}`).join('\n');
              }
            },
            { headerName: "Username", field: "username" },
            { headerName: "Email ID", field: "email" },
            { headerName: "Password", field: "pwd" },
          ]}
          rowData={errorData}
        />
      </div>
    </RightSectionWrapper>
  );
}

export default UploadRightSection;
