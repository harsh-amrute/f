import { Allotment } from "allotment";
import { useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { gridColumnConfig, APIMock } from "./MockData";
import { GridOptions } from "ag-grid-enterprise";
import OTIFTrendsGraph from "./OTIFTrendsGraph";
import OTAndIFTrendsGraph from "./OTAndIFTrendsGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TagCellRenderer from "./TagCellRenderer";

const OTIFAnalysis = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();

  const gridRef = useRef();

  const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
      enableRowGroup: true,
    },
    groupDefaultExpanded: 0,
    detailRowHeight: 500,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    rowGroupPanelShow: 'always'
  };

  const colDefCustomizations = {
    tags: {
        cellRenderer: TagCellRenderer,
    },
    bpp: {
        cellRenderer: ColorCellRenderer,
    },
  }

  const colDefs = useMemo(() => {
    return getColumnDefinations(gridColumnConfig, colDefCustomizations, [])
  }, []);

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
          <div data-testid='grid-view' style={{ height: screenHeight - 300 }}>
            <VFTable
              {...gridOptions}
              sideBar="columns"
              columnDefs={colDefs}
              rowData={APIMock?.grid}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"100%"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                ]
              }}
            />
          </div>

        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 210, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFTrendsGraph />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTAndIFTrendsGraph />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default OTIFAnalysis;
