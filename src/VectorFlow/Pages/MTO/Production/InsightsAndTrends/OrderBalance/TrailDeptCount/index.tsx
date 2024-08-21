import { useEffect, useMemo, useState } from "react";
import { AgChartOptions } from "ag-charts-community";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from "../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer";
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { columnConfigData } from "../OrderBalanceMockData";
import { format } from "date-fns";
import { createSeriesData, TooltipRenderer } from "../OrderBalanceCommon";

const TrailDeptCount = (props: any) => {
  const {graphData} = props;
  const [date] = useState(format(new Date(), "d MMM yyyy"));
  const [rawData, setRawData] = useState<any>([]);
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const options: AgChartOptions = {
    data: rawData,

    series: createSeriesData(),

    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Trailing Department",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
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
        line: { enabled: true },
        position: "left",
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

  const colDefs = useMemo(() => {
    return getColumnDefinations(columnConfigData?.tableColumn, {}, []);
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

        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
            <VFInfoToolTip
              infoList={[
                "The graph highlights trailing department wise count of orders.",
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

  useEffect(()=>{

    if(graphData?.tdept_ord_cnt){
      const response: any = graphData?.tdept_ord_cnt;
      const data: any =  Object.keys(response)?.map((key: string) => ({
        trailDept: key, 
        b: response[key]?.Black || 0, 
        r: response[key]?.Red || 0, 
        y: response[key]?.Yellow || 0, 
        g: response[key]?.Green || 0, 
        bl: response[key]?.Blue || 0, 
        w: response[key]?.White || 0, 
      }));
      console.log(data, 'DatA');
      setRawData(data);
    }

  },[graphData])

  return (
    <div
      data-testid="count-graph"
      style={{ height: "100%", display: "flex", justifyContent: "left", marginRight: '8px', paddingBottom: '10px' }}
    >
      <SplitGraphContainer
        tableLoading={tableLoading}
        chartLoading={chartLoading}
        setTableLoading={setTableLoading}
        setChartLoading={setChartLoading}
        data={rawData}
        rowData={options.data}
        graphTitle={`${ProductionInsightsAndTrendsString.trailDeptCount}  ` + ` (${date})`}
        tableTitle={ProductionInsightsAndTrendsString.trailDeptCount}
        options={options}
        colDef={colDefs}
        header={generateHeader}
        hideChart={hideChart1}
        toggleChart={toggleChart1}
        TooltipRenderer={TooltipRenderer}
        graphType={7}
      />
    </div>
  );
};

export default TrailDeptCount;
