import { Allotment } from "allotment";
import { useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { APIMock, columnConfig } from "./OrderBalanceMockData";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TrailDeptCount from "./TrailDeptCount";
import TrailDeptBalance from "./TrailDeptBalance";
import { GridOptions } from "ag-grid-enterprise";

const OrderBalance = () => {
  const [isGridView, setIsGridView] = useState(false);
  const gridRef = useRef();
  const { screenHeight } = useViewPort();

  const gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      suppressMenu: true,
      initialFlex: 1,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      enableRowGroup: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
    },
    rowGroupPanelShow: "always",
  };

  const colDefCustomizations = {
    bpp: {
      cellRenderer: ColorCellRenderer,
    },
  };

  const tableColDefs = useMemo(() => {
    return getColumnDefinations(columnConfig, colDefCustomizations, []);
  }, []);

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"orderBalance"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
          <div data-testid="grid-view" style={{ height: screenHeight - 300 }}>
            <VFTable
              {...gridOptions}
              sideBar="columns"
              pagination={true}
              columnDefs={tableColDefs}
              rowData={APIMock?.gridData}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"100%"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: "agTotalRowCountComponent", align: "left" },
                ],
              }}
            />
          </div>
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 210, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <TrailDeptCount />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <TrailDeptBalance />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};

export default OrderBalance;
