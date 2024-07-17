import { Allotment } from "allotment";
import { useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {columnConfigLevel1} from "./ColumnData";
import { GridOptions } from "ag-grid-enterprise";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import {APIMock} from "./StplAndFullKitsData";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import OrderDetailsCellRenderer from "./OrderDetailsCellRenderer";
import { getColumnDefinations } from "../../../../../../helpers/utils";

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();

  const gridRef = useRef();

const gridOptions: GridOptions = {
    defaultColDef: {
      flex: 1,
    },
    groupDefaultExpanded: 0,
    masterDetail: true,
    detailRowHeight: 500,
    detailCellRenderer: OrderDetailsCellRenderer,
    detailCellRendererParams: {
        innerHeight: 400,
    }
  };

  const colDefCustomizations = {
    plnt: {
      cellRenderer: "agGroupCellRenderer",
    }
  }

  const colDefs = useMemo(() => {
    return getColumnDefinations(columnConfigLevel1, colDefCustomizations, [])
  }, []);

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
            <div data-testid='grid-view'>
                <VFTable
                    {...gridOptions}
                    sideBar="columns"
                    columnDefs={colDefs}
                    rowData={APIMock?.grid}
                    tooltipHideDelay={100000}
                    tooltipShowDelay={0}
                    tooltipMouseTrack={true}
                    height={"750px"}
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
                  <STPLGraph />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <FullKitGraph />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default STPLAndFullKits;
