import { useRef, useState } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { Allotment } from "allotment";
import useViewPort from "../../../../../hooks/useViewPort";
import {
  ARTableHeader,
  ARTableWrapper,
  ARAllomentSection,
  LockBtnWrapper,
  LockBtn,
  HorizontalViewWrapper,
  LocktBtnContent,
  LockLabel,
} from "./styles.css";
import VFPagination from "../../../../../components/VectorFLOW/commons/VFPagination";
import VFTable from "../../../../../VectorFlow/Pages/MTO/Common/VFTable";

interface SpliViewTableProps extends AgGridReactProps {
  header: string;
  paginationProps: any;
}

export interface SplitViewProps {
  techTable: SpliViewTableProps;
  ecoTable: SpliViewTableProps;
  isLocked: boolean;
  toggleLockMode: (value: boolean) => void;
  themeUi: string;
  initialColumnState: any;
}

const HorizontalSplitView = (props: SplitViewProps) => {
  const {
    techTable,
    ecoTable,
    isLocked,
    toggleLockMode,
    themeUi,
  } = props;

  const [lockBtnPosition, setLockBtnPosition] = useState<number>(0);

  const handleChange = (sizes: Array<number>) => {
    setLockBtnPosition(sizes[0]);
  };

  const isSyncingScrollRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ref1 = useRef<AgGridReact>(null);
  const ref2 = useRef<AgGridReact>(null);

  const onBodyScroll = (params: any, from: number) => {
    if (
      params.direction !== "vertical" ||
      !isLocked ||
      isSyncingScrollRef.current
    )
      return;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    isSyncingScrollRef.current = true;

    const rowCount = techTable.rowData ? techTable.rowData.length : 0;
    const currIndex = Math.min(
      Math.max(Math.round(params.top / 25), 0),
      rowCount - 1
    );

    if (rowCount > 0) {
      const syncScroll = () => {
        switch (from) {
          case 1:
            ref2.current?.api.ensureIndexVisible(currIndex);
            break;
          case 2:
            ref1.current?.api.ensureIndexVisible(currIndex);
            break;
          default:
            break;
        }
      };
      requestAnimationFrame(syncScroll);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isSyncingScrollRef.current = false;
    }, 70);
  };

  const { screenHeight } = useViewPort();

  if (techTable.columnDefs) {
    techTable.columnDefs.forEach((item: any) => {
      if (
        "field" in item &&
        (item.field === "WhCode" ||
          item.field === "Whcode" ||
          item.field === "LocationName" ||
          item.field === "Norm" ||
          item.field === "VirtualNorm" ||
          item.field === "Availability" ||
          item.field === "Norm" ||
          item.field === "VirtualNorm" ||
          item.field === "Category" ||
          item.field === "SKUCode" ||
          item.field === "SKUDescription" ||
          item.field === "Tags")
      ) {
        item.pinned = "left";
        item.width = 50;
      }
      item.filter = false;
    });
  }

  const defaultColDef = {
    floatingFilter: false,
    filter: false,
    sortable: false,
    flex: 1,
  };

  return (
    <div className={HorizontalViewWrapper}>
      <div
        className={ARTableWrapper}
        style={{ height: screenHeight - 100, margin: "0" }}
      >
        <Allotment vertical={true} onChange={handleChange}>
          <Allotment.Pane preferredSize={"50%"}>
            <div className={ARAllomentSection}>
              <p className={ARTableHeader}>{techTable.header}</p>
              <VFTable
                key={"ref1"}
                disableZoomScaling
                ref={ref1}
                rowHeight={25}
                sideBar={null}
                height={"100%"}
                gridOptions={{
                  ...techTable.gridOptions,
                }}
                statusBar={{
                  statusPanels: [],
                }}
                tooltipMouseTrack={true}
                tooltipShowDelay={100}
                // tooltipHideDelay={100000}
                columnDefs={techTable.columnDefs}
                rowData={techTable.rowData}
                onBodyScroll={(params) => onBodyScroll(params, 1)}
                defaultColDef={defaultColDef}
                alignedGrids={isLocked ? [ref2] : []}
              />

              <div style={{ zoom: 0.7, margin: "0px -15px 20px -15px" }}>
                <VFPagination
                  {...techTable.paginationProps}
                  isClearGridFilter={false}
                />
              </div>
            </div>
          </Allotment.Pane>

          <Allotment.Pane preferredSize={"50%"}>
            <div
              className={ARAllomentSection}
              style={{ marginTop: "20px", paddingBottom: "20px" }}
            >
              <p className={ARTableHeader}>{ecoTable.header}</p>
              <VFTable
                key={"ref2"}
                disableZoomScaling
                ref={ref2}
                rowHeight={25}
                sideBar={null}
                height={"100%"}
                gridOptions={{
                  ...techTable.gridOptions,
                }}
                statusBar={{
                  statusPanels: [],
                }}
                tooltipMouseTrack={true}
                tooltipShowDelay={100}
                columnDefs={techTable.columnDefs}
                rowData={ecoTable.rowData}
                onBodyScroll={(params) => onBodyScroll(params, 2)}
                defaultColDef={defaultColDef}
                alignedGrids={isLocked ? [ref1] : []}
              />

              <div style={{ zoom: 0.7, margin: "0px -15px 20px -15px" }}>
                <VFPagination
                  {...ecoTable.paginationProps}
                  isClearGridFilter={false}
                />
              </div>
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
      <div className={LockBtnWrapper}>
        <div
          className={LocktBtnContent}
          style={{ top: lockBtnPosition - 5, right: 100 }}
        >
          <img
            className={LockBtn}
            src={
              isLocked
                ? themeUi === "REGALBLAZE"
                  ? "/assets/img/VectorFLOW/BPR/lock-regal.svg"
                  : "/assets/img/VectorFLOW/BPR/lock.svg"
                : themeUi === "REGALBLAZE"
                ? "/assets/img/VectorFLOW/BPR/unlock-regal.svg"
                : "/assets/img/VectorFLOW/BPR/unlock.svg"
            }
            onClick={() => toggleLockMode(!isLocked)}
          />
          <div className={LockLabel}>{isLocked ? "Lock" : "Unlock"}</div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSplitView;
