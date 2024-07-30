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
import { APIMock } from "./StplAndFullKitsData";
import VFTable from "../../../../../../components/VectorFLOW/commons/VFTable";
import OrderDetailsCellRenderer from "./OrderDetailsCellRenderer";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";

const STPLAndFullKits = () => {
  const [isGridView, setIsGridView] = useState(false);
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
    detailCellRenderer: OrderDetailsCellRenderer,
    detailCellRendererParams: {
      innerHeight: 400,
    },
    rowGroupPanelShow: 'always'
  };

  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()

  const reportName = "STPLAndFullKits";

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
              rowData={APIMock?.grid}
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
          <BTRTableWrapper style={{ height: screenHeight - 20, margin: "0" }}>
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
