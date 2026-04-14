import "allotment/dist/style.css";
import { capsuleWrapper } from "./styles.css";
import {
  SCChartHeaderContainer,
  SCChartContainer,
  SCHorizontalDivider,
  SCChartSliderContainer,
  SCChartMainContainer,
} from "../styles.css";
import VFCapsule from "../../../../../../components/VectorFLOW/commons/VFCapsule";
import { BufferTrendsGraphState } from "../../../../../types/BPR";
import VFRangeSlider from "../../../../../../components/VectorFLOW/commons/VFRangeSlider";

import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import VFInfoToolTip from ".././../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import "./style.css";
import { useChartDownload } from "../../../../../../hooks/useChartDownload";
import ChartDownloadButton from "../../../Common/ChartDownloadButton/ChartDownloadButton";

interface EconomicalWiseProps {
  data: any;
  currentPageTab: string;
  handleClick?: (i: any) => void;
  isLoading: boolean;
  graphs: BufferTrendsGraphState[];
  updateGraphState: (id: number, property: string, value: any) => void;
  setHorizondays?: any;
  handleSubmitClick: () => void;
  horizonDays: number;
  themeUi: string;
}

const EconomicalWise = ({
  data,
  isLoading,
  graphs,
  updateGraphState,
  setHorizondays,
  handleSubmitClick,
  horizonDays,
  themeUi,
}: EconomicalWiseProps) => {
  const numericData = data.map((item: any) => ({
    ...item,
    b: parseFloat(item.b),
    bu: parseFloat(item.bu),
    y: parseFloat(item.y),
    g: parseFloat(item.g),
    w: parseFloat(item.w),
    r: parseFloat(item.r),
    gy: parseFloat(item.gy),
    total: parseFloat(item.total),
    // Parse the string to a floating-point number
  }));

   const { chartWrapperRef, handleDownload } = useChartDownload({
     title: "Buffer Trend Graph",
     fileName: "BufferTrendGraph_Pipeline",
   });

  const colors = [
    { label: "Black", value: "black" },
    { label: "Red", value: "Red" },
    { label: "Yellow", value: "#FFBF00" },
    { label: "Green", value: "Green" },
    { label: "Blue", value: "Blue" },
    { label: "White", value: "#ded2d2ff" },
    { label: "Grey", value: "grey" },
  ].filter((color) => {
    if (graphs[0].pen.label === "Percentage" && color.label === "Grey") {
      return false;
    }
    return true;
  });

  function TooltipRenderer({ datum }: any) {
    return `
      <div class="ev-tooltip-wrapper">
        <div class="ev-tooltip-header">
                    <b>${datum.dt || "No Date"}</b>
                </div>
        <table class="ev-tooltip-table">
                    <thead>
                        <tr>
              <th class="ev-tooltip-th-left">Category</th>
              <th class="ev-tooltip-th-right">
                                ${
                                  graphs[0].pen.label === "Percentage"
                                    ? "Percentage"
                                    : "Count"
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody class="ev-tooltip-th-left">
                        ${colors
                          .map((color) => {
                            const key =
                              color.value === "black"
                                ? "b"
                                : color.value === "Red"
                                ? "r"
                                : color.value === "#FFBF00"
                                ? "y"
                                : color.value === "Green"
                                ? "g"
                                : color.value === "Blue"
                                ? "bu"
                                : color.value === "#ded2d2ff"
                                ? "w"
                                :color.value === "grey"
                                ? "gy"
                                : null;

                            if (!key) return "";

                            return `
                                <tr>
                                  <td class="ev-tooltip-td color-label ">
                                    <div class="color-labelDiv">
                                      <div class="ev-color-box ev-color-value-${key}"></div>
                                      ${color.label}
                                    </div>
                                    </td>
                                    <td class="ev-tooltip-td ev-tooltip-td-right">

                                        ${
                                          graphs[0].pen.label === "Percentage"
                                            ? (() => {
                                                const value = parseFloat(
                                                  datum[key]
                                                );
                                                const total = parseFloat(
                                                  datum.total
                                                );
                                                return !isNaN(value) &&
                                                  !isNaN(total) &&
                                                  total > 0
                                                  ? ((value / total) * 100).toFixed(2)
                                                     + "%"
                                                  : "0%";
                                              })()
                                            : (() => {
                                                const val = parseFloat(
                                                  datum[key]
                                                );
                                                if (isNaN(val)) return "0";
                                                return Number.isInteger(val)
                                                  ? val
                                                  : val.toFixed(2);
                                              })()
                                        }
                                    </td>
                                </tr>
                            `;
                          })
                          .join("")}
                        
                        ${
                          graphs[0].pen.label !== "Percentage"
                            ? `
                                <tr>
                                    <td class="ev-tooltip-td font-bold">
                                        <div class="color-labelDiv">
                                            Total
                                        </div>
                                    </td>
                                    <td class="ev-tooltip-td ev-tooltip-td-right font-bold">
                                        ${datum.total.toFixed(2)}
                                    </td>
                                </tr>
                            `
                            : ""
                        }
                        
                    </tbody>
                </table>
            </div>
        `;
  }

  const options: AgChartOptions = {
    tooltip: {
      position: {
        xOffset: -50,
        yOffset: -10,
      },
      range: "nearest",
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
          autoRotate: false,
          avoidCollisions: true,
        },
      },
      {
        type: "number",
        position: "left",
        ...(graphs[0].pen.label === "Percentage" ? { max: 105, nice: false } : {}),
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
      },
    ],
    series: [
      {
        type: "line",
        xKey: "dt",
        yKey: "b",
        yName: "Black",
        stroke: "black",

        marker: {
          fill: "Black",
          stroke: "Black",
        },

        tooltip: {
          renderer: TooltipRenderer,
        },
      },

      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "r",
        yName: "Red",
        stroke: "Red",
        marker: {
          fill: "Red",
          stroke: "Red",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "y",
        yName: "Yellow",
        stroke: "Yellow",
        marker: {
          fill: "#FFBF00",
          stroke: "#FFBF00",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "g",
        yName: "Green",
        stroke: "Green",
        marker: {
          fill: "Green",
          stroke: "Green",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "bu",
        yName: "Blue",
        stroke: "Blue",
        marker: {
          fill: "Blue",
          stroke: "Blue",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "w",
        yName: "White",
        stroke: "#ded2d2ff",
        marker: {
          fill: "#ded2d2ff",
          stroke: "#ded2d2ff",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
    ...(graphs[0].pen.label !== "Percentage"
        ? [
            {
              type: "line" as any,
              xKey: "dt",
              xName: "Date",
              yKey: "gy",
              yName: "Grey",
              stroke: "grey",
              marker: {
                fill: "grey",
                stroke: "grey",
              },
              tooltip: {
                renderer: TooltipRenderer,
              },
            },
          ]
        : []),
      {
        type: "line",
        xKey: "dt",
        xName: "Date",
        yKey: "total",
        yName: "Total",
        stroke: "purple",
        marker: {
          fill: "purple",
          stroke: "purple",
        },
        tooltip: {
          renderer: TooltipRenderer,
        },
        strokeWidth: 4,
      },
    ],
    legend: {
      position: "bottom",
      item: {
        label: {
          formatter: (params: any) => {
            if (params.value.length > 10)
              return params.value.toString().slice(0, 10) + "...";
            return params.value;
          },
          fontSize: 12,
        },
        marker: {
          size: 12,
          shape: "square",
        },
        line: {
          strokeWidth: 1,
        },
      },
    },
  };
  const graph1 = [
    "This graph shows the trend of number of SKU Locations in Black, Red, Green, Yellow, Blue and White.",
  ];

  return (
    <>
      <div className={SCChartContainer}>
        <div className={SCChartMainContainer}>
          <div className={SCChartSliderContainer}>
            <label
              style={{
                fontStyle: "normal",
                fontVariant: "normal",
                fontWeight: 400,
                fontSize: 15,
                fontFamily: "Roboto",
                paddingLeft: "10px",
              }}
            >
              {" "}
              <b>Select Horizon: </b>
            </label>
            <VFRangeSlider
              showTriangle={false}
              min={1}
              max={90}
              milestones={[0, 1, 90]}
              strictMode={false}
              width={250}
              defaultValue={horizonDays}
              handleChange={(e) => setHorizondays(e)}
              labelValueFormatter={(value: number) =>
                value > 1 ? `${value} Days` : `${value} Day`
              }
            />
            <div style={{ zoom: 0.8 }}>
              {/* <VFButtonOutline themeUi={user.user.theme_ui} onClick={handleSubmitClick} width={120} disabled={false} style={{fontSize:'15px',height:'42px',fontWeight:500}}>
                                Submit
                            </VFButtonOutline> */}
              <img
                style={{ cursor: "pointer" }}
                src={
                  themeUi === "REGALBLAZE"
                    ? "/assets/img/Group 627-regal.svg"
                    : "/assets/img/Group 627.svg"
                }
                height={50}
                width={60}
                onClick={() => handleSubmitClick()}
              />
            </div>
          </div>

          <div
            className={SCChartHeaderContainer}
            style={{ display: "flex", marginBottom: "5px" }}
          >
            <ChartDownloadButton themeUi={themeUi} onDownload={handleDownload} />
            <div className={capsuleWrapper}>
              <VFCapsule
                activeBtn={graphs[0].pen}
                capsules={[
                  {
                    label: "Percentage",
                    value: "Percentage",
                  },
                  {
                    label: "Absolute Value",
                    value: "Absolute",
                  },
                ]}
                handleClick={(value: any) => updateGraphState(1, "pen", value)}
              />
            </div>
          </div>
        </div>

        <SCHorizontalDivider />
        {/* <ChartWrapper> */}
        <div ref={chartWrapperRef} style={{ height: "70%", width: "100%" }}>
          <div
            className="title"
            style={{
              backgroundColor: "white",
              height: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "14px", fontWeight: 500, textAlign: "center" }}
            >
              Buffer Trend Graph
            </div>
            <div style={{ marginLeft: 10, marginBottom: "-5px" }}>
              <VFInfoToolTip infoList={graph1} />
            </div>
          </div>
          <AgCharts options={{ ...options, data: numericData }} />
        </div>
        {/* </ChartWrapper> */}
      </div>

      {!isLoading && (
        <div style={{ marginLeft: "10px", marginRight: "10px" }}>
          {/* <VFInfoTip text={graph1}/> */}
        </div>
      )}
    </>
  );
};

export default EconomicalWise;
