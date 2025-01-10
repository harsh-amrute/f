import { useEffect, useMemo, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { HorizontalViewWrapper, OrderAtRiskChartWrapper } from "./styles";
import { DownloadExcel, formatFilterJSON, getBodyForExcelExport, getColumnDefinations } from "../../../../../../helpers/utils";
import { reasonColConfig } from "./MockData";
import SplitGraphContainer from "../../../Common/SplitGraphContainer";
import VFInfoToolTip from "../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import { ProductionInsightsAndTrendsString } from "../../../Common/String";
import { format } from "date-fns";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import { useGetOrderRiskData, useGetOrderRiskDataExcelExport } from "../../../../../Services/MTO/Production/InsightsAndTrends/OrderAtRisk";
import { ReasonOrderAtRiskType } from "../../../../../../../src/types/MTO/types";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import OverlayLoader from "../../../Common/Loader";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { FilterPageName, UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import GridView from "./GridView";
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../../hooks/useFilter';
import { notifyError } from "../../../../../../helpers/notify";
import useColDef from "../../../../../../hooks/useColDef";

const APIFilterConfig = {
  filSecVisConfig: {
    "Prod_Order_At_Risk" : {
      mjr : true,
      or: true,
      res: true,
      cus: false
    },
  }
};

const OrderAtRisk = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData, setRawData] = useState<ReasonOrderAtRiskType[]>([]);
  const [gridData, setGridData] = useState([]);
  const [currentGridRef, setCurrentGridRef] = useState<any>(null);
  const [columnState, setColumnState] = useState<any>([]);
  const [isReset, setIsReset] = useState<any>(undefined);
  const [colDef, setColDef] = useState([{}]);
  const [filterData, setFilterData] = useState({});
  const { mutateAsync: getPageWiseFilterData, /*isLoading*/ } = useGetFilterData()
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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_At_Risk);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { user } = useUserData();
  const reportName = "OrdersAtRisk";
  const { mutateAsync: getOrderAtRiskData, isLoading } = useGetOrderRiskData() || {};
  const {colDefMap ,getColDef} = useColDef();
  const { mutateAsync : getOrderAtRiskDataExcelExport} = useGetOrderRiskDataExcelExport();
  const [masterUIConfig, setMasterUIConfig] = useState([]);

  const themeUi = user?.user?.theme_ui;


  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
      getColDef(response);
      setColDef(getColumnDefinations(response.data.data, colDefCustomizations, []));
    }
    catch (e) {
      console.log(e);
    }
  }

  const getUserColumnConfig = async () => {
    try {
      const data = await getUserUIReportConfigData({
        un: user.user.name,
        rn_id: UIGridCode.ProdOrderAtRisk
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
            rn_id: UIGridCode.ProdOrderAtRisk,
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
        const response = await getPageWiseFilterData({page_name: FilterPageName.Prod_Order_At_Risk });
        setFilterData(response?.data.data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    setColumnDef();
    getFilterData();
  }, [])

  const colDefCustomizations = {
    BPP: {
      cellRenderer: ColorCellRenderer,
    },
  };

  const gridColDefs = useMemo(() => {
    return getColumnDefinations(reasonColConfig, {}, []);
  }, []);

  const generateHeader = () => {
    return (
      <div
        className="title"
        style={{
          backgroundColor: "white",
          height: "40px",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          data-testid="stpl-graph"
          style={{
            fontSize: "16px",
            margin: "0 auto",

            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 500 }}>
            {`${ProductionInsightsAndTrendsString.orderAtRisk}  `}
          </span>
          <span style={{ fontWeight: 300 }}>
            {` (${format(new Date(), "d MMM yyyy")})`}
          </span>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
            <VFInfoToolTip
              infoList={[
                "The graph highlights the top 10 major and minor reasons for Black/Red open orders.",
              ]}
            />
          </div>
          <div
            data-testid="grid-toggle-btn"
            onClick={() => {
              toggleChart1(!hideChart1);
            }}
            style={{
              marginLeft: 10,
              marginBottom: "-5px",
              marginRight: "10px",
            }}
          >
            <img
              src="/assets/img/VectorFLOW/BPR/minimize.svg"
              height={13}
              width={13}
              color={"#CCCCCC"}
            />
          </div>
        </div>
      </div>
    );
  };

  function TooltipRenderer({ datum }: any) {
    return `
           <div class="ag-chart-tooltip-title" style="background-color: #2E2E2E; display: flex; justify-content: center; color: lightgray;">
              Major Reason
           </div>
           <div class="ag-chart-tooltip-content" style="color: white; background-color: #2E2E2E">
           <div style="border-top: 1px dashed lightgray"></div>
            <div style="display:flex;width: 100%; justify-content: space-between; color: lightgray;">
              <span style="padding: 5px 20px">Total Order</span>
              <span style="padding: 5px 18px">Black</span>
              <span style="padding: 5px 20px">Red</span>
            </div>
            <div style="border-top: 1px dashed lightgray"></div>
            <div style="display:flex ;width: 100%; justify-content: space-around; color: lightgray">
              <span style="padding: 5px ">${(datum?.bo || 0) + (datum?.ro || 0)
      }</span>
              <span style="padding: 5px; margin-left: 30px; ">${datum?.bo || 0
      }</span>
              <span style="padding: 5px ">${datum?.ro || 0}</span>
            </div>
           <div>
            </div>`;
  }

  // const options: AgChartOptions = 

  const [options, setOptions] = useState({});
  
  useEffect(()=>{

   setOptions( {
      data: rawData,
      
      series: [
        {
          type: "bar",
          direction: "horizontal",
          xKey: "r",
          yKey: "bo",
          yName: "Impacted order - Black",
          stacked: true,
          fill: "black",
          tooltip: {
            renderer: TooltipRenderer,
          },
        },
        {
          type: "bar",
          direction: "horizontal",
          xKey: "r",
          yKey: "ro",
          yName: "Impacted order - Red",
          stacked: true,
          fill: "red",
          tooltip: {
            renderer: TooltipRenderer,
          },
        },
      ],
      
      axes: [
        {
          type: "category",
          position: "left",
          title: {
            text: "Major | Minor Reasons",
            fontSize: 10,
            fontWeight: "bold",
          },
          label: {
            fontSize: 8,
            fontWeight: "bold",
            color: "black",
          padding: 10,
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "Count Of Orders",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        position: "bottom",
        line: { enabled: true },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
        gridLine: {
          enabled: false,
        },
      },
    ],
    
    legend: {
      item: {
        label: {
          fontSize: 10,
        },
      },
    },
  })
  
}, [rawData])
  // useEffect(() => {
    //   if (data?.data?.data?.r && data?.data?.data?.g) {
      //     setRawData(data?.data?.data?.r);
      //     setGridData(data?.data?.data?.g);
      //   }
      // }, [data]);
      
      const getData = async (isExcelExport = false) => {
        if(isExcelExport) {
            try {
              const headersdata = currentGridRef?.current?.api.getColumnState();
              const formattedFilters = formatFilterJSON(appliedFilters)
              const body = getBodyForExcelExport({headersdata, filterData : formattedFilters,colDefMap})
              const response = await getOrderAtRiskDataExcelExport({body , isExcelExport : 1,report_name : FilterPageName.Prod_Order_At_Risk})
              if(response.status === 200) {
                DownloadExcel(response,FilterPageName.Prod_Order_At_Risk)
              }else{
                notifyError("Failed to export data to Excel")
              }
            } catch (error) {
              notifyError("An error occurred")
              console.log(error)
            }
        }else{

          try {
            const formatedFilters = formatFilterJSON(appliedFilters);
            const response = await getOrderAtRiskData({ appliedFilters: formatedFilters});
            setRawData(response?.data?.data?.r);
            setGridData(response?.data?.data?.g || []);
          }
          catch (e) {
            console.log(e);
            notifyError('Failed to fetch Grid data!');
          }
        }
  }

  useEffect(()=>{
    getData();
  },[appliedFilters])

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

  const ExcelExport = () =>{
    getData(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MTOActionToolBar
        comp={"orderAtRisk"}
        isGridView={isGridView}
        themeUi={themeUi}
        isExcelExport = {isGridView ? true : false} 
        onExcelExportClick={ExcelExport}
        isChartGridToggle
        isAddFilterButton
        setIsGridView={setIsGridView}
        handleSaveClick={handleSaveClick}
        handleResetClick={handleResetClick}
        isFilterOpen={isFilterOpen}
        onAddFilter={onAddFilter}
        toggleFilter={toggleFilter}
        onApplyFilter={onApplyFilter}
        multiFilter={currFilter}
        setMultiFilter={setCurrFilter}
        onFilterRemove={onFilterRemove}
        isMfgSelected={isMfgSelected}
      />
      {(isLoading|| isUpdateUserConfig || isGetUserConfig) && <OverlayLoader />}
      <HorizontalViewWrapper style={{ flex: 1 }}>
        {isGridView ? (
          <GridView
            gridData={gridData}
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
          />
        ) : (
          <OrderAtRiskChartWrapper style={{ maxHeight: "95%", paddingLeft: "20px", paddingBottom:"20px" }}>
            <SplitGraphContainer
              tableLoading={tableLoading}
              chartLoading={chartLoading}
              setTableLoading={setTableLoading}
              setChartLoading={setChartLoading}
              data={rawData}
              rowData={rawData}
              graphTitle={""}
              tableTitle={ProductionInsightsAndTrendsString.orderAtRisk}
              options={options}
              colDef={gridColDefs}
              header={generateHeader}
              hideChart={hideChart1}
              toggleChart={toggleChart1}
              TooltipRenderer={TooltipRenderer}
              graphType={6}
            />
          </OrderAtRiskChartWrapper>
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default OrderAtRisk;
