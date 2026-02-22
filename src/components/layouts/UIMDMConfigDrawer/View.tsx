import { useState, useEffect, useCallback, useRef } from "react";

import VFTable from "../../VectorFLOW/commons/VFTable";

import { tableWrapper, focusOutlineVar } from "../UserURLsDrawer/styles.css";

import { useUserData } from "../../../context";
import { secondaryButton, skeleton } from "../../commons/styled/index.css";
import { notifyError } from "../../../helpers/notify";
import { useGetAllUIMDMConfiguration } from "../../../VectorFlow/Services/MTA/MDM";
import { GridRef } from "../../../VectorFlow/types/MDM";
import {
  gridFilterWrapper,
  textBtn,
} from "../../../VectorFlow/Pages/MTO/Common/VFPagination/styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global"; // keep import unchanged

interface ViewProps {
    onEdit: (data: any) => void;
    savedFilters: any;
    onSaveFilters: (filters: any) => void;
}

const ViewUiMDMConfig = (props:ViewProps)=>{

    const {
        onEdit,
        savedFilters,
        onSaveFilters
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [rowData,setRowData] = useState<Array<any>>([])
    const {mutateAsync : getAllUIMDMConfiguration} = useGetAllUIMDMConfiguration();
    const getAllUIMDMConfig = useCallback(async()=>{
        try{
            const response = await getAllUIMDMConfiguration();
            const data = response?.data?.data;
            setRowData(data)
        }catch(error:any){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }finally{
            setIsLoading(false)
        }
    },[])

    const [isLoading,setIsLoading] = useState<boolean>(true)
    
    useEffect(()=>{
        getAllUIMDMConfig()
    },[])

    const onFirstDataRendered = (params: any) => {
        if (savedFilters && Object.keys(savedFilters).length > 0) {
            params.api.setFilterModel(savedFilters);
            setIsDisabled(false);
            params.api.onFilterChanged();
        }
    }

  const ref = useRef<GridRef>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const clearGridFilter = () => {
    ref?.current?.api.setFilterModel(null);
    setIsDisabled(true);
  };

  const brand = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";
  const themeColor =
    (themeUi && globalStyles.chooseThemeColor[themeUi]?.color5) || "#820F4C";

  const CustomStatusPanel = () => {
    return (
      <div className={gridFilterWrapper} style={{ marginTop: "25px" }}>
        <button
          onClick={clearGridFilter}
          disabled={isDisabled}
          className={textBtn[brand]}
        >
          Clear All Grid Filters
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <div className={skeleton} style={{ height: 400, width: "100%" }} />;
  }

  return (
    <div className={tableWrapper}>
      <VFTable
        ref={ref}
        defaultColDef={{
          minWidth: 200,
          cellStyle: {
            "text-align": "center",
            "justify-content": "center",
          },
          floatingFilter: true,
          filter: "agMultiColumnFilter",
        }}
        rowHeight={50}
        height="600px"
        rowData={rowData}
        onFirstDataRendered={onFirstDataRendered}
        columnDefs={[
          { colId: "MasterId", field: "MasterId" },
          { colId: "MasterName", field: "MasterName" },
          { colId: "Col_Code", field: "Col_Code" },
          { colId: "TableField", field: "TableField" },
          { colId: "Col_Position", field: "Col_Position" },
          { colId: "Header", field: "Header" },
          {
            colId: "Visible",
            field: "Visible",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          {
            colId: "CellAlignment",
            field: "CellAlignment",
            cellStyle: { "text-align": "center" },
          },

          {
            colId: "IsAdd",
            field: "IsAdd",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          {
            colId: "IsEdit",
            field: "IsEdit",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          {
            colId: "IsFilter",
            field: "IsFilter",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          {
            colId: "IsDownload",
            field: "IsDownload",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          {
            colId: "IsApplicable",
            field: "IsApplicable",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
          { colId: "DataType", field: "DataType" },
          {
            colId: "IsDelete",
            field: "IsDelete",
            cellStyle: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },

          {
            colId: "edit",
            field: "edit",
            headerName: "",
            floatingFilter: false,
            maxWidth: 80,
            cellStyle: {
              display: "flex",
              "align-items": "center",
            },
            cellRenderer: (params: any) => (
              <button
                className={secondaryButton}
                style={{
                  backgroundColor: "transparent",
                  ...assignInlineVars({
                    [focusOutlineVar]: themeColor,
                  }),
                }}
                onClick={() => onEdit(params.data)}
              >
                <img
                  src="/assets/img/VectorFLOW/NMS/edit-draft.svg"
                  height={20}
                  width={20}
                />
              </button>
            ),
          },
        ]}
        onFilterChanged={() => {
          if (rowData && rowData.length > 0) {
            const filterModel = ref?.current?.api?.getFilterModel();
            onSaveFilters(filterModel);
            if (filterModel && Object.keys(filterModel).length > 0) {
              setIsDisabled(false);
            } else {
              setIsDisabled(true);
            }
          }
        }}
        statusBar={{
          statusPanels: !isLoading
            ? [
                {
                  statusPanel: "agTotalAndFilteredRowCountComponent",
                  align: "left",
                },
                { statusPanel: "agTotalRowCountComponent", align: "left" },
                { statusPanel: "agFilteredRowCountComponent", align: "left" },
                { statusPanel: "agSelectedRowCountComponent", align: "left" },
                { statusPanel: "agAggregationComponent", align: "left" },
                { statusPanel: CustomStatusPanel, align: "right" },
              ]
            : [],
        }}
      />
    </div>
  );
};

export default ViewUiMDMConfig;
