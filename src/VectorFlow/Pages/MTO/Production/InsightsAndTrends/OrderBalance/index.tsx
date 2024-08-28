import { Allotment } from "allotment";
import { useEffect, useMemo, useRef, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import VFTable from "../../../Common/VFTable";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TrailDeptCount from "./TrailDeptCount";
import TrailDeptBalance from "./TrailDeptBalance";
import { GridOptions } from "ag-grid-enterprise";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import {
  useGetOrderBalanceData,
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  // useGetOrderTypeOptions 
} from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/OrderBalance";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import VFPagination from "../../../../../../components/VectorFLOW/commons/VFPagination";
import { pagination } from "../../../Common/Enum";

const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_Order_Balance": {
      mjr: false,
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
  const { state: currFilter, setState: setCurrFilter, onFilterRemove } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_Balance);
  const { mutateAsync: getOrderBalanceData, isLoading, isError, isSuccess } = useGetOrderBalanceData();
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  // const {mutateAsync: getOrderTypeOptions, isLoading: isOptionsLoading, isError: isOptionsError, isSuccess: isOptionsSuccess } = useGetOrderTypeOptions();
  const [gridData, setGridData] = useState([]);
  const [graphData, setGraphData] = useState<any>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  //  <-------------- uncomment below code to enable dropdown for orderType    --------->
  // const [orderOptions, setOrderOptions] = useState([]); 
  // const [orderType, setOrderType] = useState({}); 
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

  const onApplyFilter = (filter: any) => {
    console.log(filter)
    setIsFilterOpen(false)
  }
  const onAddFilter = () => {
    setIsFilterOpen(true)
  }

  const toggleFilter = (state: boolean) => {
    setIsFilterOpen(state);
  }
  const getGridData = async (params: any) => {
    try {
      const response = await getOrderBalanceData(params);
      setTotalRows(response.data.data.count);
      setGridData(response.data.data.results);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Grid data!');
    }
  }

  const getGraphData = async (params: any) => {
    try {
      const response = await getOrderBalanceData(params);
      setGraphData(response?.data?.data[0]);
    }
    catch (e) {
      console.log(e);
      notifyError('Failed to fetch Graph data!');
    }
  }

  const handlePageChange = (current: any) => {
    setCurrentPage(current);
    getGridData({ graphflag: 0, page: current })
  }

  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  // const getOrderOptions = async () => {
  //   const response = await getOrderTypeOptions();
  //   setOrderOptions(response?.data?.data)
  // }

  // const handleChange = (option: any) => {
  //   setOrderType(option)
  //    getGraphData({ graphflag: 1, ordertype: option?.value || 1 });
  // };

  useEffect(() => {
    setColumnDef();
    getGridData({ graphflag: 0, page: currentPage });
    getGraphData({ graphflag: 1, ordertype: 1 });
    // <-------------- uncomment below code to enable dropdown for orderType    --------->  
    // getOrderOptions()
  }, [])

  useEffect(() => {
    setFilterData(filterResponse?.data.data)
  }, [filterResponse]);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  return (
    <div style={{}}>
      {
        isLoading && <OverlayLoader />
      }
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
              columnDefs={tableColDefs}
              rowData={gridData || []}
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
            <VFPagination
              selectedRows={0}
              rowsPerPage={pagination.mtoPageSize}
              totalRows={totalRows}
              currentPage={currentPage}
              handleChangePage={handlePageChange}
            />
          </div>
        ) : (
          <BTRTableWrapper style={{ height: screenHeight - 190, margin: "0" }}>
            <Allotment vertical={false} separator={false}>
              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <TrailDeptCount graphData={graphData} />
                </BTRAllomentSection>
              </Allotment.Pane>

              <Allotment.Pane preferredSize={"50%"}>
                <BTRAllomentSection>
                  <TrailDeptBalance
                    graphData={graphData}
                  // <-------------- uncomment below code to enable dropdown for orderType    --------->
                  // orderOptions={orderOptions}
                  // handleChange={handleChange}
                  // orderType={orderType}
                  />
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
