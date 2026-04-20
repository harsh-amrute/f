import { AgCharts } from "ag-charts-react";
import type { AgCartesianChartOptions } from "ag-charts-community";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  ExpandedChartFilterWrapper,
  ExpandedChartSelectWrapper,
  ExpandedChartSelectLabel,
  ExpandedChartCapsuleWrapper,
} from "./styles.css";
import Select, { CSSObjectWithLabel } from "react-select";
import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule";
import { ReseachInsightsGraphState } from "../../../../../VectorFlow/types/BPR";
import { useUserData } from "../../../../../context";
import { useMemo, useState } from "react";
import {
  SCViewImage,
  SCViewContainerWithBg,
} from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar/styles.css";
import "./style.css";
import { nonce } from "../../../../../helpers/utils";
import { useChartDownload } from "../../../../../hooks/useChartDownload";
import ChartDownloadButton from "../../Common/ChartDownloadButton/ChartDownloadButton";

interface ExpandedGraphProps {
  id: number;
  data: any;
  graphs: Array<ReseachInsightsGraphState>;
  isOpen: boolean;
  onClose: () => void;
  options: any;
  onTogglePen: (data: any) => void;
  onUpdateGraphs: any;
  horizon: any;
  setGraphs: any;
}
type ColorKey = "Red" | "Green" | "Yellow" | "Black" | "Blue" | "White";
const colorMap: Record<ColorKey, string> = {
  Red: "red",
  Green: "green",
  Yellow: "#FFBF00",
  Black: "black",
  Blue: "blue",
  White: "gray",
};

const ExpandedGraph = (props: ExpandedGraphProps) => {
  const {
    data,
    graphs,
    setGraphs,
    id,
    options,
    onClose,
    isOpen,
    onTogglePen,
    onUpdateGraphs,
    horizon,
  } = props;

  const activeCapsuleIndex = graphs[id - 1].pen;

  const { chartWrapperRef, handleDownload } = useChartDownload({
    title: `Technical Trend | Horizon - ${horizon} Days`,
    fileName: "AvailabilityTrend",
  });

  const onChange = (e: any, key: string) => {
    const doesFilterExist = graphs[id - 1].filters.find(
      (filter) => filter.key === key
    );
    if (doesFilterExist) {
      return onUpdateGraphs(
        id,
        "filters",
        graphs[id - 1].filters.map((filter) =>
          filter.key === key ? { key: key, value: e.value } : filter
        )
      );
    }
    const tempFilters = [
      ...graphs[id - 1].filters,
      { key: key, value: e.value },
    ];
    onUpdateGraphs(id, "filters", tempFilters);
  };

  const handleClose = () => {
    onClose();
    onUpdateGraphs(id, "filters", []);
  };

  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const onreset = (e: any) => {
    onUpdateGraphs(id, "filters", []);

    setSelectedLocation(null);
    setSelectedProduct(null);
  };

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;

  const yKeys =
    data && data.length > 0
      ? (Object.keys(data[0]).filter((key) => key in colorMap) as ColorKey[])
      : [];

  const createCommonTooltip = (seriesColor: string) => ({
    enabled: true,
    renderer: (params: any) => {
      const { datum, xKey } = params;

      const colorRows = yKeys
        .map((key) => {
          const value = datum[key] !== undefined ? datum[key] : 0;
          return `
                    <div class="colorRowDiv">
                        <span class="rie-color-${key?.toLowerCase()} colorRowDivKeySpan">${key}:</span>
                        <span class="colorRowValue">${value}</span>
                    </div>
                `;
        })
        .join("");

      return `
                <div class="colorBg-${seriesColor.toLowerCase()} seriesColorCommonTooltip">
                    <div class="tooltipKey">
                        ${datum[xKey]}
                    </div>
                    <div class="tooltipRows">
                        ${colorRows}
                    </div>
                </div>
            `;
    },
  });

  const series = yKeys.map((key) => ({
    type: "line",
    xKey: "date",
    yKey: key,
    yName: key,
    marker: {
      fill: colorMap[key],
      size: 2,
      shape: "square",
      stroke: colorMap[key],
    },
    stroke: colorMap[key],
    tooltip: createCommonTooltip(key),
  }));

  const chartOptions: AgCartesianChartOptions = useMemo(
    () => ({
      height: 400,
      width: 1000,
      data: data,
      series: series as any,
      axes: [
        {
          type: "category",
          position: "bottom",
          label: {
            fontSize: 8,
          },
        },
        {
          type: "number",
          position: "left",
          label: {
            fontSize: 8,
          },
        },
        {
          type: "number",
          position: "left",
          label: {
            fontSize: 8,
          },
          title: {
            text: "Count of Item",
            enabled: true,
            fontSize: 10,
            fontFamily: "Roboto",
          },
        },
      ],

      // -------------- CRITICAL: pass nonce to AG Charts --------------
      ...(nonce ? { styleNonce: nonce } : {}),
      theme: {
        overrides: {
          common: {
            ...(nonce ? { styleNonce: nonce } : {}),
          },
        },
      },
      // ----------------------------------------------------------------
    }),

    [data, nonce]
  );
  const themeColor =
  user.user.theme_ui === "REGALBLAZE" ? "#14213D" : "#000000";
  return (
    <VFModalCard
      openModal={isOpen}
      headerIcon=""
      headerBgColor={themeColor}
      headerText={`Technical Trend | Horizon - ${horizon} Days`}
      headerTextColor="white"
      closeIcon="/assets/img/VectorFLOW/NMS/close-white.svg"
      closeModal={handleClose}
      absolute
    >
      <div className={ExpandedChartFilterWrapper}>
        <div className={ExpandedChartSelectWrapper}>
          <p className={ExpandedChartSelectLabel}>Search By Location</p>
          <Select
            styles={{
              container: (baseStyles: any) => ({
                ...baseStyles,
                width: 250,
                // border:'1px solid red',
              }),
              option: (baseStyles, { isSelected }) =>
                ({
                  ...baseStyles,
                  backgroundColor: isSelected ? "#BC3D80" : "white",

                  "&:hover": {
                    backgroundColor: "#bc3d814d",
                    color: "black",
                  },
                } as CSSObjectWithLabel),
              control: (baseStyles, { isFocused }) =>
                ({
                  ...baseStyles,
                  borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                  // border: "none",
                  // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                  },
                } as CSSObjectWithLabel),
            }}
            options={options.whcodes}
            onChange={(e) => {
              setSelectedLocation(e);
              onChange(e, "Whcode");
            }}
            value={selectedLocation}
          />
        </div>
        <div className={ExpandedChartSelectWrapper}>
          <p className={ExpandedChartSelectLabel}>Search By Product</p>
          <Select
            styles={{
              container: (baseStyles: any) => ({
                ...baseStyles,
                width: 250,
              }),
              option: (baseStyles, { isSelected }) =>
                ({
                  ...baseStyles,
                  backgroundColor: isSelected ? "#BC3D80" : "white",

                  "&:hover": {
                    backgroundColor: "#bc3d814d",
                    color: "black",
                  },
                } as CSSObjectWithLabel),
              control: (baseStyles, { isFocused }) =>
                ({
                  ...baseStyles,
                  borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                  // border: "none",
                  // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
                  },
                } as CSSObjectWithLabel),
            }}
            options={options.skus}
            onChange={(e) => {
              setSelectedProduct(e);
              onChange(e, "SKUCode");
            }}
            value={selectedProduct}
          />
        </div>
        {/* <RIButtonOutline themeUi={user.user.theme_ui} onClick={onreset}>
                         Reset Filters
                      </RIButtonOutline> */}
        <div className={ExpandedChartCapsuleWrapper}>
          <div
            className={SCViewContainerWithBg}
            style={{
              width: "50px",
              height: "50px",
              padding: "3px",
              // minWidth: '40px',
              boxShadow: "none",
              marginLeft: "-40px",
            }}
            onClick={onreset}
          >
            <img
              className={SCViewImage}
              src={
                themeUi === "REGALBLAZE"
                  ? "/assets/img/VectorFLOW/BPR/refresh-regal.svg"
                  : "/assets/img/VectorFLOW/BPR/refresh.svg"
              }
              style={{ height: "30px" }}
              alt=""
            />
            {/* <p>Reset</p> */}
          </div>
        </div>
          <div style={{marginLeft: "-20px"}}>
            <ChartDownloadButton themeUi={themeUi} onDownload={handleDownload}/>
          </div>
        <div className={ExpandedChartCapsuleWrapper}>
          <VFCapsule
            activeBtn={activeCapsuleIndex}
            capsules={[
              {
                label: "On-Hand Inventory",
                value: "Tech",
              },
              {
                label: "Pipeline Inventory",
                value: "Eco",
              },
            ]}
            handleClick={onTogglePen}
          />
        </div>
      </div>
      {/* <AgCharts
                  options={{
                      height: 400,
                      width: 1000,
                      data: data,
                      series: [
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "Red",
                              yName: "Red",

                              marker: {
                                  fill: 'red',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "red"
                              },
                              stroke: 'red'
                          },
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "Green",
                              yName: "Green",
                              marker: {
                                  fill: 'green',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "green"
                              },
                              stroke: 'green'
                          },
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "Yellow",
                              yName: "Yellow",
                              marker: {
                                  fill: '#FFBF00',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "#FFBF00"
                              },
                              stroke: '#FFBF00'
                          },
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "Black",
                              yName: "Black",
                              marker: {
                                  fill: 'black',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "black"
                              },
                              stroke: 'black'
                          },
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "Blue",
                              yName: "Blue",
                              marker: {
                                  fill: 'blue',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "blue"
                              },
                              stroke: 'blue'
                          },
                          {
                              type: "line",
                              xKey: "date",
                              yKey: "White",
                              yName: "White",
                              marker: {
                                  fill: 'gray',
                                  size: 2,
                                  shape: 'square',
                                  stroke: "gray"
                              },
                              stroke: 'gray',
                          }
                      ]
                  }}
              /> */}

      <div ref={chartWrapperRef}><AgCharts options={chartOptions} /></div>
    </VFModalCard>
  );
};

export default ExpandedGraph;
