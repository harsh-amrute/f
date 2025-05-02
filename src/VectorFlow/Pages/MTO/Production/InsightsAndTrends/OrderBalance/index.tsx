import { Allotment } from "allotment";
import { useEffect, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import {
  BTRAllomentSection,
  BTRTableWrapper,
  HorizontalViewWrapper,
} from "./styles";
import GridView from "../../../Common/GridView";
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from "../../../../../../helpers/utils";
import TrailDeptCount from "./TrailDeptCount";
import TrailDeptBalance from "./TrailDeptBalance";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import useFilter from "../../../../../../hooks/useFilter";
import { useGetFilterData } from "../../../../../../VectorFlow/Services/MTO/Common/CommonFilter";
import {
  useGetOrderBalanceData,
  useGetOrderBalanceDataExcelExport,
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  useGetOrderTypeOptions 
} from "../../../../../../VectorFlow/Services/MTO/Production/InsightsAndTrends/OrderBalance";
import OverlayLoader from '../../../Common/Loader';
import { notifyError, notifySuccess } from '../../../../../../helpers/notify';
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import useColDef from "../../../../../../hooks/useColDef";
import BPPRenderer from "../../../Common/BPRRenderer/BPPRenderer";

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
    appliedFilters
} = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_Balance);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getOrderBalanceData, isLoading, isError, isSuccess } = useGetOrderBalanceData();
  // <-------------- uncomment below code to enable dropdown for orderType    --------->
  const {mutateAsync: getOrderTypeOptions, /*isLoading: isOptionsLoading, isError: isOptionsError, isSuccess: isOptionsSuccess */} = useGetOrderTypeOptions();
  const [graphData, setGraphData] = useState<any>({});
  //  <-------------- uncomment below code to enable dropdown for orderType    --------->
  const [orderOptions, setOrderOptions] = useState([]); 
  const [orderType, setOrderType] = useState<any>({}); 
  const reportName = "OrderBalance";
  const { user } = useUserData();
  const {colDefMap , getColDef} = useColDef();
  const { mutateAsync: getOrderBalanceGraphDataExcelExport } = useGetOrderBalanceDataExcelExport();
  const [masterUIConfig, setMasterUIConfig] = useState([]);

  const colDefCustomizations = {
    BPP: {
      cellRenderer: BPPRenderer,
      minwidth:100
    }
  };

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      getColDef(response)
      // setHeaderData(response.data.data);
      setColDef(getColumnDefinations(response.data.data, colDefCustomizations, []));
    }
    catch (e) {
      console.log(e);
    }
  }

  const getGraphData = async (params: any) => {
    if(params.isExcelExport){
      try {
        const headersdata = currentGridRef?.current?.api.getColumnState();
        const formattedFilters = formatFilterJSON(appliedFilters);
        const body = getBodyForExcelExport({headersdata,filterData :formattedFilters,colDefMap})
        const response = await getOrderBalanceGraphDataExcelExport({body , report_name : FilterPageName.Prod_Order_Balance , isExcelExport : 1})
        if(response.status === 200){
          DownloadExcel(response,FilterPageName.Prod_Order_Balance)
          notifySuccess("Excel data exported successfully")
        }else{
          notifyError("Failed to export Excel data")
        }
      } catch (error) {
         notifyError(" An error has occurred")
         console.log(error)
      }
         
    }else{

      try {
        const response = await getOrderBalanceData(params);
        setGraphData(response?.data?.data[0]);
      }
      catch (e) {
        console.log(e);
        notifyError('Failed to fetch Graph data!');
      }
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
  
  const handleSaveClick = async (coldefs?: any) => {
    try {
      if (coldefs) {
        const payload = {
          un: user.user.name,
          rn_id: UIGridCode.ProdStplAndFullKit,
          cs: JSON.stringify(coldefs),
        };
        await updateUserUIReportConfigData([payload]);
        setColumnState([...coldefs]);

      } else {
        if (currentGridRef?.current?.api) {
          const config = currentGridRef.current.api.getColumnState();

          const payload = {
            un: user.user.name,
            rn_id: UIGridCode.ProdOrderBalance,
            cs: JSON.stringify(config)
          }
          await updateUserUIReportConfigData([payload]);
          await getUserColumnConfig();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleResetClick = () => {
    setIsReset(true);
  }

  const getFilterData = async () => {
    try {
        const response = await getPageWiseFilterData({ page_name: FilterPageName.Prod_Order_Balance });
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    setColumnDef();
    getGraphData({ graphflag: 1});
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
      handleSaveClick(masterUIConfig);
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (currentGridRef?.current) {
      setMasterUIConfig(currentGridRef?.current.api.getColumnState());
      getUserColumnConfig();
    }
  }, [colDef, currentGridRef]);

  const ExcelExportData = () => {
    getGraphData({isExcelExport : true})
  }

  const themeUi = user?.user?.theme_ui;


  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {
        (isLoading || isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />
      }
      <MTOActionToolBar
        comp={"orderBalance"}
        isGridView={isGridView}
        themeUi={themeUi}
        setIsGridView={setIsGridView}
        isExcelExport = {isGridView ? true : false}
        onExcelExportClick = {ExcelExportData}
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
      <HorizontalViewWrapper style={{ flex: 1 }}>
        {isGridView ? (
          <GridView
            getData={getOrderBalanceData}
            colDef={colDef}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
            appliedFilters={appliedFilters}
          />
        ) : (
          <BTRTableWrapper style={{ height:"95%", paddingLeft: "20px", paddingBottom:"10px" }}>
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
