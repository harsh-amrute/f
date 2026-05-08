import Chart from "../../../../../../components/VectorFLOW/commons/Chart";
import VFModalCard from "../../../../../../components/VectorFLOW/commons/VFModalCard";
import  DailyDataInfoBar from "../../../../../../components/VectorFLOW/commons/DailyDataGraphModal/DailyDataInfoBar";
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
} from "chart.js";
import {
  SCChartContainer,
  SCSeasonalityContainer,
  SCSeasonalityStatusDetails,
  SCSeasonalityDetailsTitle,
  SCSeasonalityDetailsBody,
  SCText,
  SCCheckBoxRow,
  SCCheckBoxContainer,
  SCHorizontalDivider,
  SCDataRow,
  SCToggleWrapper,
  SCDataNode,
  SCVerticalDivider,
  vTitleBg,
  vTextSize,
  vTextWeight,
} from "./styles.css";
import Checkbox from "../../../../../../components/commons/Checkbox";
//  import {enIN} from 'date-fns/locale';
import { useRef, useState, useEffect } from "react";
import { DailyData } from "../../../../../types/MDM";
import { useUserData } from "../../../../../../context";
import * as globalStyles from "../../../../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import ChartDownloadButton from "../../../Common/ChartDownloadButton/ChartDownloadButton";
import { useChartDownload } from "../../../../../../hooks/useChartDownload";

interface SeasonalityChartModalProps {
  rowData: any;
  chartData: any;
  normChangeData: any;
  isModalOpen: boolean;
  closeModal: () => void;
}

const SeasonalityChartModal = ({
  rowData,
  chartData,
  normChangeData,
  isModalOpen,
  closeModal,
}: SeasonalityChartModalProps) => {
  
  const { user } = useUserData();
  const { theme_ui } = user.user;
  const { chartWrapperRef, handleDownload } = useChartDownload({
      title: `SKU: ${rowData.sc ?? ""} (${rowData.skd ?? ""}) | Location: ${rowData.wc ?? ""} (${rowData.wd ?? ""})`,
      fileName: "SeasonalityGraph",
      fontSize: 16,
      lineHeight: 20,
      padding: 25,
      titleMarginTop: 25,
    });

  const customTooltip = (context: any) => {
    const getCurrentDate = () => {
      // const splitDateString = tooltip.dataPoints[0].label.split(',');
      // const currentDate = `${splitDateString[0].split(' ')[1]}-${splitDateString[0].split(' ')[0]}-${splitDateString[1].trim()}`;
      // return currentDate
      return tooltip.dataPoints[0].label;
    };

    const getCurrentStock = () => {
      const dataIndex = tooltip.dataPoints[0].dataIndex;
      const stockDataSet = context.chart.data.datasets.find(
        (data: ChartDataset) => data.label === "Stock"
      );
      return stockDataSet.data[dataIndex] ?? "—";
    };

    const getCurrentNorm = () => {
      const dataIndex = tooltip.dataPoints[0].dataIndex;
      const normDataSet = context.chart.data.datasets.find(
        (data: ChartDataset) => data.label === "Norm"
      );
      return normDataSet.data[dataIndex] ?? "—";
    };

    const getCurrentGIT = () => {
      const dataIndex = tooltip.dataPoints[0].dataIndex;
      const gitDataSet = context.chart.data.datasets.find(
        (data: ChartDataset) => data.label === "GIT"
      );
      return gitDataSet.data[dataIndex] ?? "—";
    };

    const getNormChangeReason = () => {
      const dataIndex = tooltip.dataPoints[0].dataIndex;
      const currentDate = new Date(chart.data.labels[dataIndex]);

      const normObject = normChangeData.find((data: DailyData) => {
        const normChangeDate = new Date(data.date);
        if (
          currentDate.getDay() === normChangeDate.getDay() &&
          currentDate.getMonth() === normChangeDate.getMonth() &&
          currentDate.getFullYear() === normChangeDate.getFullYear()
        ) {
          return true;
        }
        return false;
      });

      if (normObject) {
        return normObject.change_reason;
      }
      return "—";
    };

    const { chart, tooltip } = context;

    // let tooltipEl: HTMLElement = chart.canvas.parentNode.querySelector("div");
    let tooltipEl: HTMLElement = chart.canvas.parentNode.querySelector(".chartjs-tooltip");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chartjs-tooltip";
      tooltipEl.style.width = "160px";
      tooltipEl.style.height = "200px";
      tooltipEl.style.backgroundColor = "#ffffff";
      tooltipEl.style.color = "#000000";
      tooltipEl.style.fontFamily = "Roboto";
      tooltipEl.style.boxShadow = "-6px 6px 16px #0000000F";
      tooltipEl.style.display = "flex";
      tooltipEl.style.flexDirection = "column";
      tooltipEl.style.justifyContent = "space-evenly";
      tooltipEl.style.borderRadius = "4px";
      tooltipEl.style.pointerEvents = "none"
      tooltipEl.style.zIndex = '9999';
    }

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    if (!tooltip.dataPoints || tooltip.dataPoints.length === 0) return;
    const toolTipHTML = `
    <h3 class="tooltip-title">${getCurrentDate()}</h3>
    <div class="tooltip-row">
      <p>Start Date</p>
      <p class="font-bold">${rowData.sd}</p>
    </div>
    <div class="tooltip-row">
      <p>Norm</p>
      <p class="font-bold">${getCurrentNorm()}</p>
    </div>
    <div class="tooltip-row">
      <p>Original Norm</p>
      <p class="font-bold">${rowData.onm}</p>
    </div>
    <hr class="tooltip-divider"/>
    <div class="tooltip-row">
      <p>Stock</p>
      <p class="font-medium">${getCurrentStock()}</p>
    </div>
    <div class="tooltip-row">
      <p>GIT</p>
      <p class="font-bold">${getCurrentGIT()}</p>
    </div>
    <div class="tooltip-row">
      <p>Reason</p>
      <p class="font-bold">${getNormChangeReason()}</p>
    </div>
  `;

    tooltipEl.appendChild(document.createElement("p"));
    // console.log(tooltipEl);

    tooltipEl.innerHTML = toolTipHTML;

    chart.canvas.parentNode.appendChild(tooltipEl);

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = "1";
    tooltipEl.style.position = "absolute";
    tooltip;
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px";
    // return tooltipEl;
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      point: {
        pointStyle: "circle",
        radius: 8,
      },
    },
    scales: {
      x: {
        // type:'timeseries',
        // time:{
        //   unit:'day',
        // },
        // adapters:{
        //   date:{
        //     locale:enIN
        //   }
        // },
        title: {
          display: true,
          color: "#000000",
          font: {
            size: 16,
            weight: 500,
            family: "Roboto",
          },
        },
        ticks: {
          source: "labels",
          font: {
            weight: (c) => {
              const currentDate = new Date(c["tick"].value);
              const todaysDate = new Date();
              if (
                currentDate.getDate() === todaysDate.getDate() &&
                currentDate.getMonth() === todaysDate.getMonth() &&
                currentDate.getFullYear() === todaysDate.getFullYear()
              ) {
                return "bold";
              }

              return "normal";
            },
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Quantity",
          align: "center",
          color: "#000000",
          font: {
            size: 18,
            weight: 300,
            family: "Roboto",
          },
        },
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
        onClick(e, legendItem, legend) {
          const index: any = legendItem.datasetIndex;
          const ci = legend.chart;
          if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            legendItem.hidden = true;
          } else {
            ci.show(index);
            legendItem.hidden = false;
          }
        },
        position: "bottom",
      },
      tooltip: {
        intersect: false,
        enabled: false,
        external: customTooltip,
        position: "nearest",
      },
    },
  };

  const truncate = (text?: string, limit = 15) => {
    if (!text) return "—";
    return text?.length > limit ? text.slice(0, limit) + "…" : text;
  };
  const chartRef = useRef<ChartJS>();
  const [visibleDataSets, setVisibleDataSets] = useState<number[]>(() => {
    return chartData.datasets.map((_: any, index: number) => index);
  });

  useEffect(() => {
    if (chartRef.current) {
      if (visibleDataSets.length === 0) {
        chartData.datasets.forEach((data: ChartData, dataSetIndex: number) => {
          chartRef.current?.show(dataSetIndex);
        });
      } else {
        chartData.datasets.forEach((data: ChartData, dataSetIndex: number) => {
          if (visibleDataSets.includes(dataSetIndex)) {
            chartRef.current?.show(dataSetIndex);
          } else {
            chartRef.current?.hide(dataSetIndex);
          }
        });
      }
    }
  }, [visibleDataSets]);

  const onToggleDataset = (e: any) => {
    const dataSetIndex = chartData.datasets.findIndex(
      (d: ChartDataset) => d.label === e.target.name
    );
    if (e.target.value === "0") {
      setVisibleDataSets([...visibleDataSets, dataSetIndex]);
    } else {
      setVisibleDataSets(
        visibleDataSets.filter(
          (visibleDataSetIndex: number) => visibleDataSetIndex !== dataSetIndex
        )
      );
    }
  };

  return (
    <VFModalCard
      openModal={isModalOpen}
      closeModal={closeModal}
      headerIcon=""
      headerText="Seasonality Graph"
      headerBgColor="white"
      headerTextColor="#000000"
      paddingLeftAndRight={27}
      closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
    >
      <div className={SCSeasonalityContainer}>
        <div ref={chartWrapperRef} className={SCChartContainer}>
          <div className={SCToggleWrapper}>
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>  
              <div style={{ width: "fit-content", maxWidth: "100%" }}>      
                <DailyDataInfoBar
                  items={[
                    { label: "SKU", value: rowData.sc ?? "—" },
                    {
                      label: "SKU Name",
                      value: truncate(rowData.skd),
                      tooltip: rowData.skd,
                    }, 
                    { label: "Location", value: rowData.wc ?? "—" },
                    {
                      label: "Location Name",
                      value: truncate(rowData.wd),
                      tooltip: rowData.wd,
                    },
                  ]}
                />
              </div>
            </div>
            <ChartDownloadButton themeUi={theme_ui} onDownload={handleDownload}/>
          </div>
          <Chart
            type="bar"
            data={chartData}
            options={chartOptions}
            ref={chartRef}
          />
        </div>

        <div className={SCSeasonalityStatusDetails}>
          <div
            className={SCSeasonalityDetailsTitle}
            style={assignInlineVars({
              [vTitleBg]:
                theme_ui === "PUREELEGANCE"
                  ? "black"
                  : globalStyles.chooseThemeColor[theme_ui]?.color1,
            })}
          >
            Seasonality Status Details
          </div>

          <div className={SCSeasonalityDetailsBody}>
            <p
              className={SCText}
              style={assignInlineVars({
                [vTextSize]: "16px",
                [vTextWeight]: "500", // string is fine
              })}
            >
              Select Type :
            </p>

            <div className={SCCheckBoxRow}>
              <label className={SCCheckBoxContainer}>
                <Checkbox
                  name="BuildUpDuration"
                  value="BuildUpDuration"
                  onChange={onToggleDataset}
                  defaultChecked
                  data-testid="checkbox"
                />
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Build Up Duration
                </p>
              </label>

              <label className={SCCheckBoxContainer}>
                <Checkbox
                  name="GIT"
                  value="GIT"
                  onChange={onToggleDataset}
                  defaultChecked
                  data-testid="checkbox"
                />
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  GIT
                </p>
              </label>
            </div>

            <div className={SCCheckBoxRow}>
              <label className={SCCheckBoxContainer}>
                <Checkbox
                  name="Stock"
                  value="Stock"
                  onChange={onToggleDataset}
                  defaultChecked
                  data-testid="checkbox"
                />
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Stock
                </p>
              </label>
            </div>

            <hr className={SCHorizontalDivider} />

            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Season Start Date
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.sd}
                </p>
              </div>
              <div className={SCVerticalDivider} />
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Season End Date
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.ed}
                </p>
              </div>
            </div>

            <hr className={SCHorizontalDivider} />

            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Original Norm
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.onm}
                </p>
              </div>
              <div className={SCVerticalDivider} />
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Target Norm
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.tn}
                </p>
              </div>
            </div>

            <hr className={SCHorizontalDivider} />

            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  Build Up Duration
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.bd}
                </p>
              </div>
              <div className={SCVerticalDivider} />
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "16px",
                    [vTextWeight]: "300",
                  })}
                >
                  RLT
                </p>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [vTextSize]: "18px",
                    [vTextWeight]: "500",
                  })}
                >
                  {rowData.r}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VFModalCard>
  );
};

export default SeasonalityChartModal;
