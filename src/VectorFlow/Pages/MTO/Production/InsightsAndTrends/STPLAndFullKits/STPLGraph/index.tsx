import { useMemo, useState } from "react";
import { AgChartOptions } from "ag-charts-community";
import {APIMock} from "../StplAndFullKitsData";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { columnConfigData } from "../ColumnData";

const STPLGraph = () => {
  const [date] = useState("18 Apr 2024");
  const [rawData] = useState(APIMock.stpl);
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  
  function TooltipRenderer({ datum, xKey }: any) {
    return `
       <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
           ${datum[xKey]}
       </div>
       <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
       
       <div>
           <div style="display: flex;">
               <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: #AD5000">
               </div>
               <div style="display:flex ; width: 100%; justify-content: space-between">
                   <div>Released WIP (In Days) Exceeding Limit
                   </div>
                   <div style="margin-left: 20px"> ${datum["exceedDays"]}
                   </div>
               </div>
           </div> 
        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: gray"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Released WIP (In Days)</div><div>${datum["days"]}</div></div></div>
        <div style="display: flex;"><div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: green"></div><div style="display:flex ;width: 100%; justify-content: space-between"><div>Limit</div><div>${datum["limit"]}</div></div></div>

        </div>`;
  }

  function createSeriesData(val: number) {
    const seriesData: any = [];
    const labels = [
      "Released WIP (In Days) Exceeding Limit",
      "Released WIP (In Days)",
      "Limit",
    ];
    for (let i = 0; i < val; i++) {
      const isBar = i < val - 1;
      const color = i === 0 ? "#AD5000" : i === 1 ? 'gray' : "green";
      const key = i === 0 ? "exceedDays" : i === 1 ? 'days' : "limit";
      seriesData.push({
        type: isBar ? "bar" : "line",
        xKey: "ccr",
        yKey: key,
        yName: labels[i],
        strokeOpacity: isBar ? 0 : 0.25,
        fill: color,
        stacked: isBar,
        tooltip: {
          renderer: TooltipRenderer,
        },
      });
    }

    return seriesData;
  }

  const options: AgChartOptions = {
    data: rawData,

    series: createSeriesData(3),

    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "CCR", fontSize: 10, fontWeight: "bold" },
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
          text: "WIP In Days",
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
    return getColumnDefinations(columnConfigData?.stplTableColumn, {}, [])
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
              }}>
            <span style={{fontWeight: 500,}}>
              {`${ProductionInsightsAndTrendsString.stplWithLimits}  `}
            </span>
            <span style={{fontWeight: 300,}}>
              {` (${date})`}
            </span>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
                <VFInfoToolTip
                  infoList={[
                    "The graph highlights CCR wise current released WIP (In Days) against their respective limits. ",
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
    )
  }

  return (
    <div style={{ height: "70vh", display: "flex", justifyContent: "left" }}>
        <SplitGraphContainer
            tableLoading={tableLoading}
            chartLoading={chartLoading}
            setTableLoading={setTableLoading}
            setChartLoading={setChartLoading}
            data={rawData}
            rowData={options.data}
            graphTitle={''}
            tableTitle={ProductionInsightsAndTrendsString.stplWithLimits}
            options={options}
            colDef={colDefs}
            header={generateHeader}
            hideChart={hideChart1}
            toggleChart={toggleChart1}
            TooltipRenderer={TooltipRenderer}
            graphType={4}
        />
      <div
        style={{
          width: "14px",
          resize: "none",
          height: "88%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "8px",
            background: "#E8E8E8",
            height: "88%",
            borderRadius: "4px 0 0 4px",
            display: "flex",
            alignItems: "center",
            paddingRight: "1px",
          }}
        >
          <img src="/assets/img/mto/RMPMBufferTrend/slider-icon-left.svg" />
        </div>
      </div>
    </div>
  );
};

export default STPLGraph;
