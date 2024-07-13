import React, { useRef, useState } from "react";
import "allotment/dist/style.css";
import { SCChartContainer, SCHorizontalDivider } from "../styles";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-community";
import {APIMock} from "../StplAndFullKitsData";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import VFModalCard from "../../../../../../../components/VectorFLOW/commons/VFModalCard";
import VFTable from "../../../../../../../components/VectorFLOW/commons/VFTable";
import { GridRef } from "../../../../../../../VectorFlow/types/MDM";

const GraphView = () => {
  const [date] = useState("18 Apr 2024");
  const refGraph1 = useRef<GridRef>(null);
  const chartRef = useRef<AgChartsReact>(null);
  const [hideChart1, toggleChart1] = useState(false);
  const [gridLoading, setGridLoading] = useState(false);
  const [rawData] = useState(APIMock.fullkit);

  console.log(gridLoading);
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

  const generateChart = () => {
    refGraph1.current?.api.createRangeChart({
      chartType: "stackedColumn",
      cellRange: {
        columns: ["ccr", "days"],
      },
      chartThemeOverrides: {
        column: {
          axes: {
            category: {
              gridStyle: [{ stroke: "transparent" }],

              bottom: {
                label: {
                  fontSize: 8,
                },
              },
            },
          },
          series: {
            highlightStyle: {
              item: {
                fill: "white",
                fillOpacity: 0.2,
              },
            },
            tooltip: {
              renderer: TooltipRenderer,
            },
            strokeWidth: 1,
            strokeOpacity: 0,
          },
          legend: {
            item: {
              label: {
                fontSize: 10,
              },

              marker: {
                shape: "square",
              },
            },
          },
        },
        bar: {
          axes: {
            category: {
              gridStyle: [{ stroke: "transparent" }, { stroke: "transparent" }],
            },
          },
        },
      },
    });
  };

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

  const ColdDefs = [
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

  const myCustomTheme: any = {
    palette: {
      fills: ["gray"],
      strokes: ["gray"],
    },
  };

  return (
    <div style={{ height: "70vh", display: "flex", justifyContent: "left" }}>
      <div
        style={{
          width: "14px",
          resize: "none",
          height: "100%",
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
      <SCChartContainer style={{ width: "100%", border: "1px solid #CCCCCC" }}>
        <div style={{ height: "85%", width: "100%" }}>
          <div
            className="title"
            style={{
              backgroundColor: "white",
              height: "40px",
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <div
                data-testid="fullKit-graph"
                style={{
                    fontSize: "12px",
                    margin: "0 auto",
                    fontWeight: 500,
                    textAlign: "center",
                }}
            >
              {`${ProductionInsightsAndTrendsString.fullKitInDays}  (${date})`}
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
                <VFInfoToolTip
                  infoList={["The graph highlights the Full Kit in days"]}
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
          <SCHorizontalDivider />
          <div style={{ display: "flex", justifyContent: "right" }}>
            <div
              style={{ paddingRight: "10px" }}
              onClick={() => {
                chartRef &&
                  chartRef.current &&
                  chartRef.current.chart &&
                  AgCharts.download(chartRef.current.chart);
              }}
            >
              <img
                height={12}
                width={12}
                src="/assets/img/mto/RMPMBufferTrend/download.svg"
              />
            </div>
          </div>
          <VFModalCard
            openModal={hideChart1}
            closeModal={() => toggleChart1(false)}
            headerIcon=""
            headerText={ProductionInsightsAndTrendsString.fullKitInDays}
            headerBgColor=""
            headerTextColor="#00000"
            paddingLeftAndRight={27}
            closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"}
          >
            <div data-testid='fullKit-grid' className="ag-theme-planning" style={{ width: "1000px" }}>
              <VFTable
                ref={refGraph1}
                gridOptions={{
                    defaultColDef: {
                        flex: 1,
                    }
                }}
                columnDefs={ColdDefs}
                rowData={options.data}
                enableCharts={true}
                enableRangeSelection={true}
                rowSelection="multiple"
                statusBar={{
                  statusPanels: [
                    {
                      statusPanel: "agTotalAndFilteredRowCountComponent",
                      align: "left",
                    },
                    { statusPanel: "agTotalRowCountComponent", align: "left" },
                    {
                      statusPanel: "agFilteredRowCountComponent",
                      align: "left",
                    },
                    {
                      statusPanel: "agSelectedRowCountComponent",
                      align: "left",
                    },
                    { statusPanel: "agAggregationComponent", align: "left" },
                  ],
                }}
                onGridReady={() => {
                  setGridLoading(false);
                  generateChart();
                }}
                chartToolPanelsDef={{
                  panels: [],
                }}
                chartThemes={["myCustomTheme"]}
                customChartThemes={{
                  myCustomTheme: myCustomTheme,
                }}
                disableZoomScaling={true}
                defaultColDef={{
                  floatingFilter: true,
                  filter: "agMultiColumnFilter",
                }}
                height={"480px"}
              />
            </div>
          </VFModalCard>
          <AgChartsReact ref={chartRef} options={options} />
        </div>
      </SCChartContainer>
    </div>
  );
};

export default GraphView;
