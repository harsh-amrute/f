import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { ColDef, GridOptions } from "ag-grid-enterprise";
import OTIFFailureGraph from "./OTIFFailureGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
// import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
// import { useGetOTIFAnalysisData } from "../../../../../../VectorFlow/Services/MTO/Poogi/InsightAndTrends/OTIFAnalysis";
// import OverlayLoader from '../../../Common/Loader';
// import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import CustomTagTooltip from "../../../Poogi/InsightAndTrends/OTIFAnalysis/CustomTagTooltip";
import TagCellToolTip from "../../../Poogi/InsightAndTrends/OTIFAnalysis/TagCellRenderer/TagCellRenderer";
import { gridColumnConfig, MockGraphData, MockGridData } from "./mockData";


const TopFailureReasons = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { screenHeight } = useViewPort();
  const [HeaderData, setHeaderData] = useState([{}]);
//   const { mutateAsync: getUIConfigData } = useGetUIConfigData();
//   const { mutateAsync: getOTIFAnalysisData, isLoading, isError, isSuccess } = useGetOTIFAnalysisData();
  const [colDef, setColDef] = useState([{}]);
  const [gridData, setGridData] = useState<any>([]);
  const [graphData, setGraphData] = useState<any>({});
//   const reportName = "TopFailureReasons";

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
    tag: {
      tooltipValueGetter: (params: any) => params.value,
      cellRenderer: TagCellToolTip,
      cellStyle: {
        display: 'flex',
        justifyContent: "center",
      }
    },
    bpp: {
      cellRenderer: ColorCellRenderer,
    },
  }

//   const setColumnDef = async () => {
//     try {
//       const response = await getUIConfigData(reportName);
//       setHeaderData(response.data.data);
//     }
//     catch (e) {
//       console.log(e);
//     }
//   }

//   const getGridData = async (isGraph: any) => {
//     try {
//       const response = await getOTIFAnalysisData(isGraph);
//       setGridData(response.data.data.results);
//     }
//     catch (e) {
//       console.log(e);
//       notifyError('Failed to fetch Grid data!');
//     }
//   }
  
//   const getGraphData = async (isGraph: any) => {
//     try {
//       const response = await getOTIFAnalysisData(isGraph);
//       setGraphData(response.data.data);
//     }
//     catch (e) {
//       console.log(e);
//       notifyError('Failed to fetch Graph data!');
//     }
//   }

  useEffect(() => {
    // setColumnDef();
    // getGridData(0);
    // getGraphData(1);
    setHeaderData(gridColumnConfig);
    setGridData(MockGridData);
    setGraphData(MockGraphData)
  }, []);


  useEffect(() => {
    setColDef(getColumnDefinations(HeaderData, colDefCustomizations))
  }, [HeaderData])

//   useEffect(() => {
//     if (isSuccess) {
//       notifySuccess("Fetched Data successfully!")
//     }
//     if (isError) {
//       notifyError("Failed to load data!")
//     }
//   }, [isSuccess, isError])

console.log(colDef,'COLUMN');

  return (
    <div>
      {/* {
        isLoading && <OverlayLoader />
      } */}
      <MTOActionToolBar
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", marginLeft: '15px' }}>
        {isGridView ? (
          <div data-testid='grid-view' style={{ height: screenHeight - 50 }} >
            <VFTable
              {...gridOptions}
              sideBar={{
                toolPanels: ['columns'],
              }}
              defaultColDef={defaultColDef}
              columnDefs={colDef}
              rowData={gridData || []}
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
          <BTRTableWrapper style={{ height: screenHeight - 190, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFFailureGraph month="previous" graphData={graphData.previous} />
                </BTRAllomentSection>
              </Allotment.Pane>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <OTIFFailureGraph month="current" graphData={graphData.current} />
                </BTRAllomentSection>
              </Allotment.Pane>
            </Allotment>
          </BTRTableWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default TopFailureReasons;
