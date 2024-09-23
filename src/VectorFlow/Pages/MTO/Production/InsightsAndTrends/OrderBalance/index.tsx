import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import useViewPort from "../../../../../../hooks/useViewPort";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import GridView from "../../../Common/GridView";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import TrailDeptCount from "./TrailDeptCount";
import TrailDeptBalance from "./TrailDeptBalance";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import {
  useGetOrderBalanceData,
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  useGetOrderTypeOptions 
} from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/OrderBalance";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";

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
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState(false);
  const [colDef, setColDef] = useState([{}]);
  const { screenHeight } = useViewPort();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
  const [filterData, setFilterData] = useState({});
  const { 
    state: currFilter, 
    setState: setCurrFilter, 
    onFilterRemove, 
    isFilterOpen, 
    isMfgSelected,
    onAddFilter, 
    onApplyFilter, 
    toggleFilter,
} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_Balance);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getOrderBalanceData, isLoading, isError, isSuccess } = useGetOrderBalanceData();
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  const {mutateAsync: getOrderTypeOptions, /*isLoading: isOptionsLoading, isError: isOptionsError, isSuccess: isOptionsSuccess */} = useGetOrderTypeOptions();
  const [graphData, setGraphData] = useState<any>({});
  //  <-------------- uncomment below code to enable dropdown for orderType    --------->
  const [orderOptions, setOrderOptions] = useState([]); 
  const [orderType, setOrderType] = useState({}); 
  const reportName = "OrderBalance";
  const { user } = useUserData();

  const colDefCustomizations = {
    BPP: {
      cellRenderer: ColorCellRenderer,
    }
  };

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      // setHeaderData(response.data.data);
      setColDef(getColumnDefinations(response.data.data, colDefCustomizations, []));
    }
    catch (e) {
      console.log(e);
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


  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  const getOrderOptions = async () => {
    const response = await getOrderTypeOptions();
    setOrderOptions(response?.data?.data)
  }

  const handleChange = (option: any) => {
    setOrderType(option)
     getGraphData({ graphflag: 1, ordertype: option?.value || 1 });
  };

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdOrderBalance
      });

      const newConfig = JSON.parse(data?.data?.data[0]?.columns_settings) || [];
      setColumnState(newConfig);

      if (!data) {
        console.error('Failed to apply column state');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleSaveClick = async () => {
    try {
      const config = currentGridRef.current.api.getColumnState();

      const payload = {
        un: user.user.name,
        rn_id: UIGridCode.ProdOrderBalance,
        cs: JSON.stringify(config)
      }
      await updateUserUIReportConfigData([payload]);
      await getUserColumnConfig();

    } catch (error) {
      console.error(error);
    }
  }

  const handleResetClick = () => {
    setIsReset(true);
  }

  const getFilterData = async () => {
    try {
        const response = await getPageWiseFilterData({});
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    setColumnDef();
    getUserColumnConfig();
    getGraphData({ graphflag: 1, ordertype: 1 });
    getFilterData();
    // <-------------- uncomment below code to enable dropdown for orderType    --------->  
     getOrderOptions()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      notifySuccess("Fetched Data successfully!")
    }
    if (isError) {
      notifyError("Failed to load data!")
    }
  }, [isSuccess, isError])

  useEffect(() => {
    if (isReset) {
      setColumnState(colDef);
      setIsReset(false)
    }else{
      handleSaveClick();
    }
  }, [isReset]);

  return (
    <div style={{}}>
      {
        (isLoading || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
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
        isMfgSelected={isMfgSelected}
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
      />
      <HorizontalViewWrapper style={{ marginTop: "20px", paddingLeft: '25px' }}>
        {isGridView ? (
          // <div data-testid="grid-view" style={{ height: screenHeight - 200 }}>
          //   <VFTable
          //     {...gridOptions}
          //     columnDefs={tableColDefs}
          //     rowData={gridData || []}
          //     tooltipHideDelay={100000}
          //     tooltipShowDelay={0}
          //     tooltipMouseTrack={true}
          //     ref={gridRef}
          //     statusBar={{
          //       statusPanels: [
          //         { statusPanel: "agTotalRowCountComponent", align: "left" },
          //       ],
          //     }}
          //   />
          //   <VFPagination
          //     selectedRows={0}
          //     rowsPerPage={pagination.mtoPageSize}
          //     totalRows={totalRows}
          //     currentPage={currentPage}
          //     handleChangePage={handlePageChange}
          //   />
          // </div>
          <GridView
            getData={getOrderBalanceData}
            colDef={colDef}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
          />
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
                  orderOptions={orderOptions}
                  handleChange={handleChange}
                  orderType={orderType}
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
