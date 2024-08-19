import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { GridOptions } from "ag-grid-enterprise";
import STPLGraph from "./STPLGraph";
import FullKitGraph from "./FullKitGraph";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
// import { APIMock } from "./StplAndFullKitsData";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
// import OrderDetailsCellRenderer from "./OrderDetailsCellRenderer";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
// import customCellRenderer from "../../DepartmentWiseBMReport/CustomCellRenderer";
import RowGrpRender from "./RowGrpRender";
import { useGetSTPLAndFullKitData } from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/STPLAndFullKits";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
  const { mutateAsync: getSTPLandFullkitInDaysData, isLoading, isError, isSuccess } = useGetSTPLAndFullKitData()
  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const [gridData, setGridData] = useState([]);
  const [graphData, setGraphData] = useState<any>({});
  const reportName = "STPLAndFullKits";

  const { screenHeight } = useViewPort();

  const gridRef = useRef();

  const gridOptions: GridOptions = {
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          minWidth: 225,
          maxWidth: 225,
          width: 225
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
          minWidth: 180,
          maxWidth: 400,
          width: 250
        }
      ],
    },
    defaultColDef: {
      flex: 1,
      enableRowGroup: true,
    },
    groupDefaultExpanded: 0,
    masterDetail: true,
    detailRowHeight: 500,
    detailCellRenderer: RowGrpRender,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    rowGroupPanelShow: 'always'
  };


  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const getGridData = async (isGraph: any) => {
    try {
      const response = await getSTPLandFullkitInDaysData(isGraph);
      setGridData(response.data.data.results);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Grid data!');
    }
  }
  
  const getGraphData = async (isGraph: any) => {
    try {
      const response = await getSTPLandFullkitInDaysData(isGraph);
      setGraphData(response.data.data);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }

  useEffect(() => {
    setColumnDef();
    getGridData(0);
    getGraphData(1);
  }, [])

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  const colDefCustomizations = {
    Plant: {
      cellRenderer: "agGroupCellRenderer",
    }
  }

  const colDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, [])
  }, [HeaderData]);

  return (
    <div style={{}}>
       {
        isLoading && <OverlayLoader />
      }
      <MTOActionToolBar
        comp={"stplAndFullKit"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px" }}>
        {isGridView ? (
          <div data-testid='grid-view'>
            <VFTable
              {...gridOptions}
              columnDefs={colDefs}
              rowData={gridData || []}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"95vh"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                ]
              }}
            />
          </div>

        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 200, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <STPLGraph graphData={graphData?.stpl}/>
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <FullKitGraph graphData={graphData?.stpl}/>
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
