import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { APIMock } from "./MockData";
import { ColDef, GridOptions } from "ag-grid-enterprise";
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
import CustomTagTooltip from "./CustomTagTooltip";
import TagCellToolTip from "./TagCellRenderer/TagCellRenderer";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";

const OTIFAnalysis = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();
  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const [colDef, setColDef] = useState([{}]);
  const reportName = "OTIFAnalysis";

  const gridRef = useRef();

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      suppressMenu: true,
      autoHeaderHeight: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      enableRowGroup: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      tooltipComponent: CustomTagTooltip,
    };
  }, []);

  const gridOptions: GridOptions = {
    groupDefaultExpanded: 0,
    detailRowHeight: 500,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    rowGroupPanelShow: 'always'
  };

  const colDefCustomizations = {
    Tags: {
      tooltipValueGetter: (params: any) => params.value,
      cellRenderer: TagCellToolTip,
      cellStyle: {
        display: 'flex',
        justifyContent: "center",
      }
    },
    BPP: {
      cellRenderer: ColorCellRenderer,
    },
  }

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setColumnDef();
  }, [])


  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData])

  return (
    <div>
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <div data-testid='grid-view' style={{ height: screenHeight - 20 }} >
            <VFTable
              {...gridOptions}
              sideBar={{
                toolPanels: ['columns'],
              }}
              defaultColDef={defaultColDef}
              columnDefs={colDef}
              rowData={APIMock?.grid}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"75%"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                ]
              }}
              pagination
            />
          </div>

        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 21, margin: "0" }}>
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
