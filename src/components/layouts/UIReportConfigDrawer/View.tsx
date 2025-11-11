import { useState, useEffect, useCallback, useRef } from "react";

import VFTable from "../../VectorFLOW/commons/VFTable";

import { tableWrapper, focusOutlineVar } from "../UserURLsDrawer/styles.css";

import { useUserData } from "../../../context";
import { secondaryButton, skeleton } from "../../commons/styled/index.css";
import { notifyError } from "../../../helpers/notify";
import { useGetAllUIReportConfiguration } from "../../../VectorFlow/Services/MTA/MDM";
import { GridRef } from "../../../VectorFlow/types/MDM";
import {
  gridFilterWrapper,
  textBtn,
} from "../../../VectorFlow/Pages/MTO/Common/VFPagination/styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";

const ViewUiReportConfig = (props: { onEdit: (data: any) => void }) => {
  const { onEdit } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [rowData, setRowData] = useState<Array<any>>([]);
  const { mutateAsync: getAllUIReportConfiguration } =
    useGetAllUIReportConfiguration();
  const getAllUIReportConfig = useCallback(async () => {
    try {
      const response = await getAllUIReportConfiguration();
      const data = response?.data?.data;
      setRowData(data);
    } catch (error: any) {
      console.error(error);
      notifyError("Server Went Unresponsive");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllUIReportConfig();
  }, []);

  const ref = useRef<GridRef>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const clearGridFilter = () => {
    ref?.current?.api.setFilterModel(null);
    setIsDisabled(true);
  };
  const brand = themeUi === "REGALBLAZE" ? "REGALBLAZE" : "DEFAULT";
  const CustomStatusPanel = () => {
    return (
      <div className={gridFilterWrapper} style={{ marginTop: "25px" }}>
        <button
          className={textBtn[brand]}
          onClick={clearGridFilter}
          disabled={isDisabled}
        >
          Clear All Grid Filters
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <div className={skeleton} style={{ height: 400, width: "100%" }} />;
  }
  const focusColor =
    globalStyles.chooseThemeColor[themeUi]?.color4 ?? "transparent";

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
        columnDefs={[
          {
            colId: "ReportName",
            field: "ReportName",
          },
          {
            colId: "Col_Code",
            field: "Col_Code",
          },
          {
            colId: "Col_Position",
            field: "Col_Position",
          },
          {
            colId: "Header",
            field: "Header",
          },
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
                    [focusOutlineVar]: focusColor,
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
          const filterModel = ref?.current?.api?.getFilterModel();
          if (filterModel && Object.keys(filterModel).length > 0) {
            setIsDisabled(false);
          } else {
            setIsDisabled(true);
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

export default ViewUiReportConfig;
