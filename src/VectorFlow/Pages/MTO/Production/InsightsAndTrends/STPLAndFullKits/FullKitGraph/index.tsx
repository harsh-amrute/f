import { useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import {APIMock} from "../StplAndFullKitsData";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer'


const FullKitGraph = () => {
  const [date] = useState("18 Apr 2024");
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData] = useState(APIMock.fullkit);

  function TooltipRenderer({ datum, xKey }: any) {
    return `
    <div class="ag-chart-tooltip-title" style="background-color: #6C696A; display: flex; justify-content: center; align-items: center">
        ${datum[xKey]}
    </div>
    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
    
    <div>
        <div style="display: flex;">
            <div style="margin-right: 10px; margin-top: 5px; height: 10px; width: 10px; background-color: gray">
            </div>
            <div style="display:flex ; width: 100%; justify-content: space-between">
                <div>${ProductionInsightsAndTrendsString.fullKitInDays}
                </div>
                <div> ${datum["days"]}
                </div>
            </div>
        </div>
    </div>`;
  }

  const options: AgChartOptions = {
    data: rawData,
    series: [
      {
        type: "bar",
        xKey: "ccr",
        yKey: "days",
        yName: "Full Kit In Days",
        strokeOpacity: 0,
        fill: "gray",
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
    ],
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
        title: { text: "Days", fontSize: 10, fontWeight: "bold", spacing: 3 },
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

  const colDefs = [
    {
      colId: "ccr",
      field: "ccr",
      headerName: "CCR",
      initialWidth: 475,
    },
    {
      colId: "days",
      field: "days",
      headerName: "Days",
      initialWidth: 475,
    },
  ];

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
              data-testid="fullKit-graph"
              style={{
                  fontSize: "16px",
                  margin: "0 auto",
                  
                  textAlign: "center",
              }}>
            <span style={{fontWeight: 500,}}>
              {`${ProductionInsightsAndTrendsString.fullKitInDays}  `}
            </span>
            <span style={{fontWeight: 300,}}>
              {` (${date})`}
            </span>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
                <VFInfoToolTip
                  infoList={[
                    "The graph highlights the amount of unreleased Full-kits (In Days) present for execution at each CCR.",
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
      <div
        style={{
          width: "14px",
          resize: "none",
          height: "88%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "8px",
            background: "#E8E8E8",
            height: "88%",
            borderRadius: "0 4px 4px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/assets/img/mto/RMPMBufferTrend/slider-icon-right.svg" />
        </div>
      </div>
      <SplitGraphContainer
            tableLoading={tableLoading}
            chartLoading={chartLoading}
            setTableLoading={setTableLoading}
            setChartLoading={setChartLoading}
            data={rawData}
            rowData={options.data}
            graphTitle={''}
            tableTitle={ProductionInsightsAndTrendsString.fullKitInDays}
            options={options}
            colDef={colDefs}
            header={generateHeader}
            hideChart={hideChart1}
            toggleChart={toggleChart1}
            TooltipRenderer={TooltipRenderer}
            graphType={5}
        />
    </div>
  );
};

export default FullKitGraph;
