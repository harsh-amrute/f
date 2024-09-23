import { useEffect, useMemo, useState } from "react";
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar";
import { HorizontalViewWrapper } from "./styles";
import { getColumnDefinations } from "../../../../../../helpers/utils";
import { reasonColConfig } from "./MockData";
import SplitGraphContainer from "../../../Common/SplitGraphContainer";
import { AgChartOptions } from "ag-charts-community";
import VFInfoToolTip from "../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import { ProductionInsightsAndTrendsString } from "../../../Common/String";
import { format } from "date-fns";
import ColorCellRenderer from "../../../../../Pages/MTO/Common/ColorRangeCellRenderer";
import useViewPort from "../../../../../../hooks/useViewPort";
import { useGetOrderRiskData } from "../../../../../Services/MTO/Production/InsightsAndTrends/OrderAtRisk";
import { ReasonOrderAtRiskType } from "../../../../../../../src/types/MTO/types";
import { useGetUIConfigData } from "../../../../../../VectorFlow/Services/MTO/Common/UIConfig";
import OverlayLoader from "../../../Common/Loader";
import { useGetUserUIConfigData, useUpdateUserUIConfigData } from '../../../../../../VectorFlow/Services/MTO/Common/UserUIConfig'
import { UIGridCode } from "../../../Common/Enum";
import { useUserData } from "../../../../../../context/index";
import GridView from "./GridView";
import { useGetFilterData } from '../../../../../../VectorFlow/Services/MTO/Common/CommonFilter';
import useFilter from '../../../../../../hooks/useFilter';

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
  const [isReset, setIsReset] = useState(false);
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
  } = useFilter(filterData, APIFilterConfig.filSecVisConfig.Prod_Order_At_Risk);
  const { mutateAsync: updateUserUIReportConfigData, isLoading: isUpdateUserConfig } = useUpdateUserUIConfigData();
  const { mutateAsync: getUserUIReportConfigData, isLoading: isGetUserConfig } = useGetUserUIConfigData();
  const { screenHeight } = useViewPort();
  const { mutateAsync: getUIConfigData } = useGetUIConfigData()
  const { user } = useUserData();
  const reportName = "OrdersAtRisk";
  const { data, isLoading } = useGetOrderRiskData() || {};

  const setColumnDef = async () => {
    try {
      const response = await getUIConfigData(reportName);
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

  const handleSaveClick = async () => {
    try {
      const config = currentGridRef.current.api.getColumnState();

      const payload = {
        un: user.user.name,
        rn_id: UIGridCode.ProdOrderAtRisk,
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
    getUserColumnConfig();
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

  const options: AgChartOptions = {
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
  };

  useEffect(() => {
    if (data?.data?.data?.r && data?.data?.data?.g) {
      setRawData(data?.data?.data?.r);
      setGridData(data?.data?.data?.g);
    }
  }, [data]);

  useEffect(() => {
    if (isReset) {
      setColumnState(colDef);
      setIsReset(false)
    }else{
      handleSaveClick();
    }
  }, [isReset]);

  return (
    <div>
      <MTOActionToolBar
        comp={"orderAtRisk"}
        isGridView={isGridView}
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
      <HorizontalViewWrapper style={{ height: screenHeight - 200, display: 'flex', marginTop: "20px", paddingLeft: "25px" }}>
        {isGridView ? (
         <GridView
            gridData={gridData}
            colDef={colDef}
            setCurrentGridRef={setCurrentGridRef}
            currentGridRef={currentGridRef}
            columnState={columnState}
         />
        ) : (
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
        )}
      </HorizontalViewWrapper>
    </div>
  );
};
export default OrderAtRisk;
