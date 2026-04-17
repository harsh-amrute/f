import VFModalCard from "../../commons/VFModalCard/index";
import {
  SCChartContainer,
  SCSeasonalityContainer,
  SCSeasonalityStatusDetails,
  SCSeasonalityDetailsTitle,
  SCSeasonalityDetailsBody,
  SCText,
  SCTextNoMargin,
  SCHorizontalDivider,
  SCDataRow,
  SCDataNode,
  SCVerticalDivider,
  detailsTitleBgVar,
  textFontWeightVar,
  textFontSizeVar,
  SCToggleWrapper,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../styles/global";
import {
  type NormChangeHistory,
  DailyDataChart,
} from "../../../../VectorFlow/types/BPR";
//  import {enIN} from 'date-fns/locale';
import { useEffect, useState } from "react";
import Select, { CSSObjectWithLabel } from "react-select";
import VFRangeSlider from "../VFRangeSlider";
import { AgCharts } from "ag-charts-react";
import { getFormattedDate } from "../../../../helpers/utils";
import { suspensionMessages } from "../../../../helpers/BPRConstants";
import { useDispatch } from "react-redux";
import {
  TOGGLE_GRAPH_MODAL,
  TOGGLE_NORM_CHANGE_HISTORY_TABLE,
} from "../../../../redux/actions/MTA";
import { addDays, eachDayOfInterval, format, subDays } from "date-fns";
import { useUserData } from "../../../../context";
import useGetLastRunData from "../../../../hooks/useGetLastRunData";
import Tooltip from "../../../../../src/VectorFlow/Pages/MTO/Common/Tooltip";
import "./style.css";
import VFFloatingTab from "../VFFloatingTab";
import { useLocation } from "react-router";
import { useChartDownload } from "../../../../hooks/useChartDownload";
import ChartDownloadButton from "../../../../VectorFlow/Pages/MTA/Common/ChartDownloadButton/ChartDownloadButton";

interface DailyDataGraphModalProps {
  rowData: any;
  chartData: any[];
  normChangeData: any;
  suggestionData: any;
  masterData: any;
  monitoringData: any;
  isModalOpen: boolean;
  virtualNormData?: any;
  skuKey: string;
  whKey: string;
  onTabChange?: (val: 'norm' | 'virtualnorm') => void;
  activeTab?: 'norm' | 'virtualnorm';
}

interface NormData {
  norm: number;
  date: string;
}

const DailyDataGraphModal = ({
  rowData,
  chartData,
  normChangeData,
  suggestionData,
  masterData,
  isModalOpen,
  monitoringData,
  virtualNormData,
  skuKey,
  whKey,
  onTabChange,
  activeTab,
}: DailyDataGraphModalProps) => {
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const { date: lastRunDate } = useGetLastRunData();

  const dispatch = useDispatch();
  const suspensionOptions = [
    { label: "Select Suspension Type", value: "" },
    { label: "Upward Stock Based", value: "upwardStockBased" },
    { label: "Downward Stock Based", value: "downwardStockBased" },
    { label: "Upward Consumption Based", value: "upwardConsumptionBased" },
    { label: "Downward Consumption Based", value: "downwardConsumptionBased" },
  ];
  const { pathname } = useLocation();
  const [horizon, setHorizon] = useState<number>(14);
  const [suspensionType, setSuspensionType] = useState("");
  const [normData, setNormData] = useState<any[]>([]);
  const [adjustedChartData, setadjustedChartData] = useState<any[]>([]);
  const [missingData, setMissingData] = useState<any[]>([]);
  const { chartWrapperRef, handleDownload } = useChartDownload({
    title: "Daily Data Graph",
    fileName: "DailyDataGraph",
  });

  const fillNotAvailableDates = (data: any) => {
    const lastNinetyDates = eachDayOfInterval({
      start: subDays(new Date(lastRunDate), 89),
      end: new Date(lastRunDate),
    });
    const lastNinetyDaysData: DailyDataChart[] = [];
    lastNinetyDates.forEach((date: Date) => {
      const dailyData = data.find((data: DailyDataChart) => {
        return (
          new Date(data.dt).getDate() === date.getDate() &&
          new Date(data.dt).getMonth() === date.getMonth() &&
          new Date(data.dt).getFullYear() &&
          date.getFullYear()
        );
      });
      if (dailyData) {
        lastNinetyDaysData.push(dailyData);
      } else {
        lastNinetyDaysData.push({
          cs: null,
          dt: format(date, "yyyy-MM-dd"),
          git: null,
          rp: null,
          stk: null,
          rrs: null,
          grs: null,
          rrc: null,
          grc: null,
        });
      }
    });
    return lastNinetyDaysData;
  };

  const addBoundaryDataPoints = (data: any) => {
    if (data.length === 0) return data;
    const firstDate = new Date(data[0].date);
    const lastDate = new Date(data[data.length - 1].date);

    const startPoint = {
      date: format(subDays(firstDate, 1), "yyyy-MM-dd"),
      // date: "",
      hideTooltip: true, // Special flag to hide tooltip
      upwardStockBasedNorm: null,
      downwardStockBasedNorm: null,
      upwardConsumptionBasedNorm: null,
      downwardConsumptionBasedNorm: null,
      norm: data[0].norm,
      normRed: data[0].normRed,
      normYellow: data[0].normYellow,
      normGreen: data[0].normGreen,
      normBlue: data[0].normBlue,
    };

    const endPoint = {
      // date:"",
      date: format(addDays(lastDate, 1), "yyyy-MM-dd"),
      hideTooltip: true, // Special flag to hide tooltip
      upwardStockBasedNorm: null,
      downwardStockBasedNorm: null,
      upwardConsumptionBasedNorm: null,
      downwardConsumptionBasedNorm: null,
      norm: data[data?.length - 1].norm,
      normRed: data[data?.length - 1].normRed,
      normYellow: data[data?.length - 1].normYellow,
      normGreen: data[data?.length - 1].normGreen,
      normBlue: data[data?.length - 1].normBlue,
    };

    const newData = [startPoint, ...data, endPoint];
    return newData;
  };

  const addBoundaryDataPointsADJ = (data: any) => {
    if (data.length === 0) return data;
    const firstDate = new Date(data[0].dt);
    const lastDate = new Date(data[data.length - 1].dt);

    const startPoint = {
      dt: format(subDays(firstDate, 1), "yyyy-MM-dd"),
      // dt: "",
      hideTooltip: true, // Special flag to hide tooltip
      bz: null,
      cs: null,
      git: null,
      grc: null,
      grs: null,
      rp: null,
      rrc: null,
      rrs: null,
      // stk: null,
    };

    const endPoint = {
      // dt:"",
      dt: format(addDays(lastDate, 1), "yyyy-MM-dd"),
      hideTooltip: true, // Special flag to hide tooltip
      bz: null,
      cs: null,
      git: null,
      grc: null,
      grs: null,
      rp: null,
      rrc: null,
      rrs: null,
      // stk: null,
    };

    const newData = [startPoint, ...data, endPoint];
    console.log("newData", newData);
    return newData;
  };

  useEffect(() => {
    if (lastRunDate) setMissingData(fillNotAvailableDates(chartData));
  }, [lastRunDate, chartData]);

  const generateChartOptions = () => {
    useEffect(() => {
      {
        const lastIndex = missingData.length - 1;
        const startIndex = Math.max(0, lastIndex - horizon + 1);

        const newadjustedChartData = missingData.slice(
          startIndex,
          lastIndex + 1
        );

        setadjustedChartData(newadjustedChartData);
        const sortedNormChangeData = normChangeData
          ? [...normChangeData].sort(
              (a: NormChangeHistory, b: NormChangeHistory) =>
                new Date(a.nCD).getTime() - new Date(b.nCD).getTime()
            )
          : [];
        let tempNorm = 0;
        let updateNormData: any[] = [];
        updateNormData = missingData
          .map((dailyData: DailyDataChart) => {
            //Find Closest Norm Change History to current Date
            let closestNormChangeIndex = -1;

            sortedNormChangeData.forEach(
              (o: NormChangeHistory, index: number) => {
                if (
                  new Date(dailyData.dt).getTime() >= new Date(o.nCD).getTime()
                ) {
                  closestNormChangeIndex = index;
                }
              }
            );

            if (normChangeData?.length > 0 && closestNormChangeIndex !== -1) {
              tempNorm = sortedNormChangeData[closestNormChangeIndex]["nN"];
            } else if (normChangeData?.length > 0) {
              tempNorm = sortedNormChangeData[0]["olN"];
            } else {
              tempNorm = masterData?.["nm"] || "";
            }

            return { date: dailyData.dt, norm: tempNorm };
          })
          .slice(startIndex, lastIndex + 1);

        updateNormData = updateNormData.map((data: NormData, index: number) => {
          let normBand = parseFloat((data.norm / 3).toFixed(2));
          const bz = parseInt(newadjustedChartData?.[index]?.["bz"], 10) || 0;
          
          let normBlue = bz;

          if (activeTab === 'virtualnorm') {
            const currentDate = new Date(newadjustedChartData[index].dt).toDateString();
            const virtualNormEntry = virtualNormData?.find(
              (v: { vN: number; rD: string }) =>
                new Date(v.rD).toDateString() === currentDate
            );

            if (virtualNormEntry) {
              normBand = parseFloat((virtualNormEntry.vN / 3).toFixed(2));
              normBlue = (bz + data.norm - virtualNormEntry.vN) < 0 ? 0 : (bz + data.norm - virtualNormEntry.vN);
            }
          }

          const normObj = {
            ...data,
            normRed: normBand,
            normGreen: normBand,
            normYellow: normBand,
            normBlue: normBlue,
            rrs:
              newadjustedChartData[index]["rrs"] > 0
                ? newadjustedChartData[index]["rrs"]
                : 0,
            grs:
              newadjustedChartData[index]["grs"] > 0
                ? newadjustedChartData[index]["grs"]
                : 0,
            rrc:
              newadjustedChartData[index]["rrc"] > 0
                ? newadjustedChartData[index]["rrc"]
                : 0,
            grc:
              newadjustedChartData[index]["grc"] > 0
                ? newadjustedChartData[index]["grc"]
                : 0,
            upwardStockBasedNorm:
              newadjustedChartData[index]["rrs"] > 0 ? data.norm : 0,
            downwardStockBasedNorm:
              newadjustedChartData[index]["grs"] > 0 ? data.norm : 0,
            upwardConsumptionBasedNorm:
              newadjustedChartData[index]["rrc"] > 0 ? data.norm : 0,
            downwardConsumptionBasedNorm:
              newadjustedChartData[index]["grc"] > 0 ? data.norm : 0,
          };
          
          return normObj;
        });
        setNormData(updateNormData);
      }
    }, [horizon, missingData, activeTab]);

    function generateSuspensionReasons(
      rrs: number,
      grs: number,
      rrc: number,
      grc: number
    ) {
      const suspensionReasons: Array<string> = [];
      suspensionMessages.forEach((obj: { Key: number; Value: string }) => {
        if (
          (obj.Key & rrs) > 0 ||
          (obj.Key & grs) > 0 ||
          (obj.Key & rrc) > 0 ||
          (obj.Key & grc) > 0
        ) {
          if (!suspensionReasons.includes(obj.Value))
            suspensionReasons.push(obj.Value);
        }
      });

      let suspensionReasonsHTML = ``;

      suspensionReasons.forEach((reason: string) => {
        suspensionReasonsHTML += `<li>${reason}</li>`;
      });
      return suspensionReasonsHTML;
    }

    const generateRevisionSuggestedBlock = (
      oldNorm: number,
      newNorm: number,
      reason: string
    ) => `
      <div class="revision-container">
        <span class="revision-title">Revision Suggested :</span>
        <span>Old Norm - ${oldNorm} </span>
        <span>New Norm - ${newNorm} </span>
        <br>
        <span class="revision-title">Reason : </span>
        <span>${reason}</span>
        <div class="divider"></div>
      </div>
    `;

    const generateSuspensionReasonsBlock = (reasons: string) => `
      <div class="suspension-container">
        <p class="suspension-title">Suspension Reasons :</p>
        <ol>
          ${reasons}
        </ol>
        <div class="divider"></div>
      </div>
    `;

    const generateDailyDataBlock = (
      stock: number,
      receipt: number,
      git: number,
      consumption: number,
      redNorm: number,
      yellowNorm: number,
      greenNorm: number,
      blueNorm: number
    ) => `
      <div class="dailydata-container">
        <div class="dailydata-top-row">
          ${
            stock != null && stock != undefined
              ? `<div class="dailydata-item">
                  <div class="color-box stock-color"></div>
                  <span class="label">Stock :</span>
                  <span>${stock}</span>
                </div>`
              : ""
          }
          ${
            git != null && git != undefined
              ? `<div class="dailydata-item">
                  <div class="dailydata-color-box git-color"></div>
                  <span class="label">GIT :</span>
                  <span>${git}</span>
                </div>`
              : ""
          }
          ${
            receipt != null && receipt != undefined
              ? `<div class="dailydata-item">
                  <div class="dailydata-color-box receipt-color"></div>
                  <span class="label">Receipt :</span>
                  <span>${receipt}</span>
                </div>`
              : ""
          }
          ${
            consumption != null && consumption != undefined
              ? `<div class="dailydata-item">
                  <div class="dailydata-color-box consumption-color"></div>
                  <span class="label">Consumption :</span>
                  <span>${consumption}</span>
                </div>`
              : ""
          }
        </div>
        <div class="dailydata-bottom-row">
          <div class="dailydata-item">
            <div class="dailydata-color-box red-norm-color"></div>
            <span>${redNorm}</span>
          </div>
          <div class="dailydata-item">
            <div class="dailydata-color-box yellow-norm-color"></div>
            <span>${yellowNorm}</span>
          </div>
          <div class="dailydata-item">
            <div class="dailydata-color-box green-norm-color"></div>
            <span>${greenNorm}</span>
          </div>
          <div class="dailydata-item">
            <div class="dailydata-color-box blue-norm-color"></div>
            <span>${blueNorm}</span>
          </div>
        </div>
      </div>
    `;

    function renderer(params: any) {
      let inputRRS = 0;
      let inputGRS = 0;
      let inputRRC = 0;
      let inputGRC = 0;

      if (suspensionType === "upwardStockBased") {
        inputRRS = params.datum.rrs;
      } else if (suspensionType === "downwardStockBased") {
        inputGRS = params.datum.grs;
      } else if (suspensionType === "upwardConsumptionBased") {
        inputRRC = params.datum.rrc;
      } else if (suspensionType === "downwardConsumptionBased") {
        inputGRC = params.datum.grc;
      }

      const suggestionObject = suggestionData.find(
        (data: any) =>
          new Date(data["sdate"]).getTime() ===
          new Date(params.datum["date"]).getTime()
      );
      const dailyDataObject = missingData.find(
        (data: any) =>
          new Date(data["dt"]).getTime() ===
          new Date(params.datum["date"]).getTime()
      );
      // if(!dailyDataObject.stk && !dailyDataObject.rp && !dailyDataObject.git && !dailyDataObject.cs){
      //   return ""
      // }

      const allDates = addBoundaryDataPoints(normData).map((data: any) =>
        new Date(data["date"]).getTime()
      );

      const firstDate = allDates[0];

      const lastDate = allDates[allDates.length - 1];

      const currentDate = new Date(params.datum["date"]).getTime();

      if (currentDate === firstDate || currentDate === lastDate) {
        return " ";
      }

      const suspensionReasons = generateSuspensionReasons(
        inputRRS,
        inputGRS,
        inputRRC,
        inputGRC
      );

      let tooltip = `
          <div class="dailygraph-tooltip-header">
              ${getFormattedDate(new Date(params.datum.date))}
            </div>
          `;

      if (suggestionObject)
        tooltip += generateRevisionSuggestedBlock(
          suggestionObject?.oln,
          suggestionObject?.nn,
          suggestionObject?.rsn
        );
      if (suspensionReasons.length > 0 && suspensionType !== "")
        tooltip += generateSuspensionReasonsBlock(suspensionReasons);

      if (
        dailyDataObject?.stk != null ||
        dailyDataObject?.rp != null ||
        dailyDataObject?.git != null ||
        dailyDataObject?.cs != null
      ) {
        tooltip += generateDailyDataBlock(
          dailyDataObject?.stk,
          dailyDataObject?.rp,
          dailyDataObject?.git,
          dailyDataObject?.cs,
          params.datum.normRed,
          params.datum.normGreen * 2,
          Math.round(params.datum.normYellow * 3),
          params.datum.normBlue
        );
      }

      const finalTooltipHTML = `
        <div class="dailygraph-tooltip-container">
          ${tooltip}
        </div>
      `;

      return finalTooltipHTML;
    }

    function formatter(params: any) {
      const suggestionObject = suggestionData.find(
        (data: any) =>
          new Date(data["sdate"]).getTime() ===
          new Date(params.datum["dt"]).getTime()
      );
      if (suggestionObject)
        return { size: 7, fill: "#5D148B", stroke: "white", strokeWidth: 1 };
      return { size: 0 };
    }

    const options: any = {
      title: {
        text: "",
      },
      legend: {
        item: {
          showSeriesStroke: true,
        },
      },
      series: [
        {
          xKey: "date",
          xName: "Date",
          yKey: "normRed",
          yName: "",
          data: addBoundaryDataPoints(normData),
          type: "area",
          // strokeWidth: 3,
          fill: "#ED4A4A",
          stacked: true,
          showInLegend: false,
          tooltip: {
            renderer: renderer,
          },
          position: {
            type: "pointer",
          },
        },
        {
          xKey: "date",
          xName: "Date",
          yKey: "normYellow",
          yName: "",
          data: addBoundaryDataPoints(normData),
          type: "area",
          // strokeWidth: 3,
          stacked: true,
          fill: "#F5EE4E",
          showInLegend: false,
          tooltip: {
            renderer: renderer,
          },
          position: {
            type: "pointer",
          },
        },
        {
          xKey: "date",
          xName: "Date",
          yKey: "normGreen",
          yName: "",
          data: addBoundaryDataPoints(normData),
          type: "area",
          // strokeWidth: 3,
          stacked: true,
          fill: "#418D18",
          showInLegend: false,
          tooltip: {
            renderer: renderer,
          },
          position: {
            type: "pointer",
          },
        },
        {
          xKey: "date",
          xName: "Date",
          yKey: "normBlue",
          yName: "",
          data: addBoundaryDataPoints(normData),
          type: "area",
          // strokeWidth: 3,
          fill: "#355FD3",
          stacked: true,
          showInLegend: false,
          tooltip: {
            renderer: renderer,
            position: {
              type: "pointer",
            },
          },
        },
        {
          xKey: "dt",
          xName: "Date",
          yKey: "git",
          yName: "GIT",
          data: addBoundaryDataPointsADJ(adjustedChartData),
          type: "bar",
          fill: "#8137BC",
          tooltip: {
            enabled: false,
          },
        },
        {
          xKey: "dt",
          xName: "Date",
          yKey: "rp",
          yName: "Receipts",
          data: addBoundaryDataPointsADJ(adjustedChartData),
          type: "bar",
          fill: "#67B6E8",
          tooltip: {
            enabled: false,
          },
        },
        {
          xKey: "dt",
          xName: "Date",
          yKey: "cs",
          yName: "Consumption",
          data: addBoundaryDataPointsADJ(adjustedChartData),
          type: "bar",
          fill: "#EDB04D",
          tooltip: {
            enabled: false,
          },
        },
        {
          xKey: "dt",
          xName: "Date",
          yKey: "stk",
          yName: "Stock",
          data: addBoundaryDataPointsADJ(adjustedChartData),
          type: "line",
          stroke: "#5D148B",
          tooltip: {
            enabled: false,
          },
          marker: {
            formatter,
          },
        },
      ],
      axes: [
        {
          type: "category",
          position: "bottom",
          label: {
            autoRotate: false,
            avoidCollisions: true,
            formatter: (params: any) => {
              const date = new Date(params.value);
              const allDates = addBoundaryDataPoints(normData).map(
                (data: any) => new Date(data["date"]).getTime()
              );

              const firstDate = allDates[0];
              const lastDate = allDates[allDates.length - 1];
              const currentDate = date.getTime();

              if (currentDate === firstDate || currentDate === lastDate) {
                return "";
              }
              return params.value;
            },
          },
        } as const,
        {
          type: "number",
          position: "left",
          title: {
            text: "Count",
            fontSize: 10,
            fontFamily: "Roboto",
          },
        },
      ],
    };
    const upwardStockBasedOptions = {
      xKey: "date",
      xName: "Date",
      yKey: "upwardStockBasedNorm",
      yName: "",
      data: addBoundaryDataPoints(normData),
      type: "area",
      // strokeWidth: 3,
      fill: "#808080",
      fillOpacity: 0.8,
      showInLegend: false,
      tooltip: {
        enabled: false,
      },
    };
    const downwardStockBasedOptions = {
      xKey: "date",
      xName: "Date",
      yKey: "downwardStockBasedNorm",
      yName: "",
      data: addBoundaryDataPoints(normData),
      type: "area",
      // strokeWidth: 3,
      fill: "#808080",
      fillOpacity: 0.8,
      showInLegend: false,
      tooltip: {
        enabled: false,
      },
    };

    const upwardConsumptionBasedOptions = {
      xKey: "date",
      xName: "Date",
      yKey: "upwardConsumptionBasedNorm",
      yName: "",
      data: addBoundaryDataPoints(normData),
      type: "area",
      // strokeWidth: 3,
      fill: "#808080",
      fillOpacity: 0.8,
      showInLegend: false,
      tooltip: {
        enabled: false,
      },
    };

    const downwardConsumptionBasedOptions = {
      xKey: "date",
      xName: "Date",
      yKey: "downwardConsumptionBasedNorm",
      yName: "",
      data: addBoundaryDataPoints(normData),
      type: "area",
      // strokeWidth: 3,
      fill: "#808080",
      fillOpacity: 0.8,
      showInLegend: false,
      tooltip: {
        enabled: false,
      },
    };

    if (suspensionType === "upwardStockBased")
      options["series"].push(upwardStockBasedOptions);
    if (suspensionType === "downwardStockBased")
      options["series"].push(downwardStockBasedOptions);
    if (suspensionType === "upwardConsumptionBased")
      options["series"].push(upwardConsumptionBasedOptions);
    if (suspensionType === "downwardConsumptionBased")
      options["series"].push(downwardConsumptionBasedOptions);

    return options;
  };

  const getMonitoringDate = () => {
    if (monitoringData?.length == 0) {
      return "";
    }
    if (suspensionType === "upwardStockBased") return monitoringData[0]["srrd"];
    if (suspensionType === "downwardStockBased")
      return monitoringData[0]["sgrd"];
    if (suspensionType === "upwardConsumptionBased")
      return monitoringData[0]["crrd"];
    if (suspensionType === "downwardConsumptionBased")
      return monitoringData[0]["cgrd"];
  };

  const onChangeHorizon = (horizon: number) => {
    setHorizon(horizon);
  };
  const themeColor =
  user.user.theme_ui === "REGALBLAZE" ? "#14213D" : "#000000";
  return (
    <VFModalCard
      openModal={isModalOpen}
      closeModal={() => dispatch(TOGGLE_GRAPH_MODAL(false))}
      headerIcon=""
      headerText="Daily Data Graph"
      headerBgColor={themeColor}
      headerTextColor="white"
      paddingLeftAndRight={27}
      absolute
      closeIcon={"/assets/img/VectorFLOW/NMS/close-white.svg"}
    >
      <div className={SCSeasonalityContainer}>
        <div ref={chartWrapperRef} className={SCChartContainer}>
          <div className={SCToggleWrapper}>
            <ChartDownloadButton themeUi={themeUi} onDownload={handleDownload}/>
            {(pathname === "/mta/supply-chain-intelligence-hub/bpr") && (
            <div style={{ zoom: 0.6 }}>
              <VFFloatingTab
                handleClick={(e: any) => {
                  if (onTabChange) onTabChange(e.value ?? e);
                }}
                defaultTab={[
                  { value: "virtualnorm" },
                  { value: "norm" },
                ].findIndex((t) => t.value === (activeTab ?? "virtualnorm"))}
                tabs={[
                  { id: "modal-tab-1", value: "virtualnorm", label: "Virtual Norm" },
                  { id: "modal-tab-2", value: "norm", label: "Norm" },
                ]}
              />
            </div>
            )}          
            </div>
          <AgCharts
            options={{
              ...generateChartOptions(),
              padding: { right: 30 },
              height: 450,
            }}
          />
        </div>

        <div className={SCSeasonalityStatusDetails}>
          {/* Theme-driven header background */}
          <div
            className={SCSeasonalityDetailsTitle}
            style={assignInlineVars({
              [detailsTitleBgVar]:
                themeUi === "PUREELEGANCE"
                  ? "black"
                  : globalStyles.chooseThemeColor[themeUi]?.color1 ?? "black",
            })}
          >
            Daily Data Graph Details
          </div>

          <div className={SCSeasonalityDetailsBody}>
            {/* Select Horizon */}
            <p
              className={SCText}
              style={assignInlineVars({
                [textFontWeightVar]: "400",
                [textFontSizeVar]: "14px",
              })}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Select Horizon
              </span>
            </p>
            <div style={{ marginTop: "0px" }}>
              <VFRangeSlider
                min={0}
                max={90}
                milestones={[-1, 0, 90]}
                strictMode={false}
                width={324}
                defaultValue={horizon}
                handleChange={onChangeHorizon}
                showTriangle={false}
              />
            </div>

            <hr className={SCHorizontalDivider} />

            {/* Norm Change History */}
            <div className={SCDataRow}>
              <p
                className={SCText}
                style={assignInlineVars({
                  [textFontWeightVar]: "300",
                  [textFontSizeVar]: "16px",
                })}
              >
                Norm Change History :
              </p>
              <div
                style={{ display: "flex", gap: "5px" }}
                onClick={() => dispatch(TOGGLE_NORM_CHANGE_HISTORY_TABLE(true))}
              >
                <img
                  src={
                    themeUi === "REGALBLAZE"
                      ? "/assets/img/VectorFLOW/BPR/eye-filled-regal.svg"
                      : "/assets/img/VectorFLOW/BPR/eye-filled-purple.svg"
                  }
                />
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "700",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  <span
                    style={{
                      color: themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80",
                    }}
                  >
                    Click To View
                  </span>
                </p>
              </div>
            </div>

            <hr className={SCHorizontalDivider} />

            {/* Suspension Type */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
                fontSize: "16px",
              }}
            >
              <p
                className={SCText}
                style={assignInlineVars({
                  [textFontWeightVar]: "300",
                  [textFontSizeVar]: "18px",
                })}
              >
                Select Suspension Type:
              </p>
              <Select
                options={suspensionOptions}
                placeholder={"Select Suspension Type"}
                defaultValue={suspensionOptions[0]}
                onChange={(data: any) => setSuspensionType(data.value)}
                styles={{
                  option: (baseStyles, { isSelected }) =>
                    ({
                      ...baseStyles,
                      backgroundColor: isSelected
                        ? themeUi === "REGALBLAZE"
                          ? "#FCA311"
                          : "#BC3D80"
                        : "white",
                      "&:hover": {
                        backgroundColor:
                          themeUi === "REGALBLAZE"
                            ? "rgb(252, 163, 17,0.3) "
                            : "#bc3d814d",
                        color: "black",
                      },
                    } as CSSObjectWithLabel),
                  control: (baseStyles, { isFocused }) =>
                    ({
                      ...baseStyles,
                      borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                      },
                    } as CSSObjectWithLabel),
                }}
              />
            </div>

            <hr className={SCHorizontalDivider} />

            {/* SKU */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
              }}
            >
              <p
                className={SCText}
                style={assignInlineVars({
                  [textFontWeightVar]: "300",
                  [textFontSizeVar]: "18px",
                })}
              >
                SKU:
              </p>
              <p
                className={`${SCText} ${SCTextNoMargin}`}
                style={assignInlineVars({
                  [textFontWeightVar]: "500",
                  [textFontSizeVar]: "18px",
                })}
              >
                {rowData[skuKey]}
              </p>
            </div>

            <hr className={SCHorizontalDivider} />

            {/* Location / RLT */}
            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  Location :
                  <Tooltip
                    disableStyleInjection="core"
                    content={
                      <div style={{ padding: "0.5rem 1rem", fontSize: "12px" }}>
                        {rowData[whKey]}
                      </div>
                    }
                    tooltipZoom={1}
                  >
                    <span
                      className={`${SCText} ${SCTextNoMargin}`}
                      style={assignInlineVars({
                        [textFontWeightVar]: "500",
                        [textFontSizeVar]: "18px",
                      })}
                    >
                      {rowData[whKey].slice(0, 13) + "…"}
                    </span>
                  </Tooltip>
                </p>
              </div>

              <div className={SCVerticalDivider} />

              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  RLT :
                </p>
                <p
                  className={`${SCText} ${SCTextNoMargin}`}
                  style={assignInlineVars({
                    [textFontWeightVar]: "500",
                    [textFontSizeVar]: "18px",
                  })}
                >
                  {masterData?.["rlt"] ?? ""}
                </p>
              </div>
            </div>

            <hr className={SCHorizontalDivider} />

            {/* Current/Min Norm */}
            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  Current Norm :
                </p>
                <p
                  className={`${SCText} ${SCTextNoMargin}`}
                  style={assignInlineVars({
                    [textFontWeightVar]: "500",
                    [textFontSizeVar]: "18px",
                  })}
                >
                  {masterData?.["nm"] ?? ""}
                </p>
              </div>

              <div className={SCVerticalDivider} />

              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  Min Norm :
                </p>
                <p
                  className={`${SCText} ${SCTextNoMargin}`}
                  style={assignInlineVars({
                    [textFontWeightVar]: "500",
                    [textFontSizeVar]: "18px",
                  })}
                >
                  {masterData?.["mn"] ?? ""}
                </p>
              </div>
            </div>

            <hr className={SCHorizontalDivider} />

            {/* RCP / GCP */}
            <div className={SCDataRow}>
              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  RCP :
                </p>
                <p
                  className={`${SCText} ${SCTextNoMargin}`}
                  style={assignInlineVars({
                    [textFontWeightVar]: "500",
                    [textFontSizeVar]: "18px",
                  })}
                >
                  {masterData?.["rcp"] ?? ""}
                </p>
              </div>

              <div className={SCVerticalDivider} />

              <div className={SCDataNode}>
                <p
                  className={SCText}
                  style={assignInlineVars({
                    [textFontWeightVar]: "300",
                    [textFontSizeVar]: "16px",
                  })}
                >
                  GCP :
                </p>
                <p
                  className={`${SCText} ${SCTextNoMargin}`}
                  style={assignInlineVars({
                    [textFontWeightVar]: "500",
                    [textFontSizeVar]: "18px",
                  })}
                >
                  {masterData?.["gcp"] ?? ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VFModalCard>
  );
};

export default DailyDataGraphModal;
