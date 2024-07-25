import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
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
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";

const OrderBalance = () => {
  const [isGridView, setIsGridView] = useState(false);
  const gridRef = useRef();
  const { screenHeight } = useViewPort();

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
    BPP: {
      cellRenderer: ColorCellRenderer,
    },
    LineItemID: {
      colId: 'line_item_id',
      field: 'line_item_id'
    },
    OrderQuantity: {
      colId: 'order_quantity',
      field: 'order_quantity',
    }
  };

  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()

  const reportName = "Order Balance";

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


  const tableColDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, []);
  }, [HeaderData]);

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"orderBalance"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", paddingLeft: '25px' }}>
        {isGridView ? (
          <div data-testid="grid-view" style={{ height: screenHeight - 300 }}>
            <VFTable
              {...gridOptions}
              pagination={true}
              columnDefs={tableColDefs}
              rowData={APIMock?.gridData}
              tooltipHideDelay={100000}
              tooltipShowDelay={0}
              tooltipMouseTrack={true}
              height={"95vh"}
              ref={gridRef}
              statusBar={{
                statusPanels: [
                  { statusPanel: "agTotalRowCountComponent", align: "left" },
                ],
              }}
            />
          </div>
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 20, margin: "0" }}>
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
