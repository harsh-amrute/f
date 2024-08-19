import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { APIMock } from "./OrderBalanceMockData";
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
import useFilter from "../../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";

const APIFilterConfig = {
  filSecVisConfig :  {
    "Prod_Order_Balance" : {
      mjr : false,
      or: true,
      res: true,
      cus: true
    },
  }
};

const OrderBalance = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gridRef = useRef();
  const { screenHeight } = useViewPort();
  const [HeaderData, setHeaderData] = useState([{}]);
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { data: filterResponse, /*isLoading*/ } = useGetFilterData();
  const [filterData, setFilterData] = useState({});
  const {state:currFilter,setState:setCurrFilter, onFilterRemove} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_Balance);

  const reportName = "OrderBalance";

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

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      setHeaderData(response.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const tableColDefs = useMemo(() => {
    return getColumnDefinations(HeaderData, colDefCustomizations, []);
  }, [HeaderData]);

  const onApplyFilter = (filter:any)=>{
    console.log(filter)
    setIsFilterOpen(false)
  }
  const onAddFilter = ()=>{
    setIsFilterOpen(true)
  }

  const toggleFilter = (state: boolean) => {
    setIsFilterOpen(state);
  }

  
  useEffect(() => {
    setColumnDef();
  }, [])

  useEffect(() => {
    setFilterData(filterResponse?.data.data)
  }, [filterResponse]);

  return (
    <div style={{}}>
      <MTOActionToolBar
        comp={"orderBalance"}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
        isChartGridToggle
        isAddFilterButton
        isFilterOpen={isFilterOpen}
        onAddFilter={onAddFilter}
        toggleFilter={toggleFilter}
        onApplyFilter={onApplyFilter} 
        multiFilter={currFilter}
        setMultiFilter={setCurrFilter}
        onFilterRemove={onFilterRemove}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", paddingLeft: '25px' }}>
        {isGridView ? (
          <div data-testid="grid-view" style={{ height: screenHeight - 190 }}>
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
          <BTRTableWrapper style={{ height: screenHeight - 190, margin: "0" }}>
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
