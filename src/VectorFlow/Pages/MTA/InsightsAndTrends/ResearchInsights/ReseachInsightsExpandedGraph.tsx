import { AgCharts } from "ag-charts-react";
import { AgCartesianChartOptions } from "ag-charts-community";
import VFModalCard from "../../../../../components/VectorFLOW/commons/VFModalCard";
import {
  ExpandedChartFilterWrapper,
  ExpandedChartSelectWrapper,
  ExpandedChartSelectLabel,
  ExpandedChartCapsuleWrapper,
} from "./styles.css";
import VFCapsule from "../../../../../components/VectorFLOW/commons/VFCapsule";
import { ReseachInsightsGraphState } from "../../../../../VectorFlow/types/BPR";
import { useUserData } from "../../../../../context";
import { useState } from "react";
import {
  SCViewImage,
  SCViewContainerWithBg,
} from "../../SupplyChainIntelligenceHub/Planning/ActionToolBar/styles.css";

import Downshift from "downshift";

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
type Option = { label: string; value: string };

const Dropdown = ({
  options,
  selectedItem,
  onChange,
  placeholder,
}: {
  options: any[];
  selectedItem: any;
  onChange: (selected: any) => void;
  placeholder?: string;
}) => (
  <Downshift<Option>
    selectedItem={selectedItem}
    onChange={(item, _helpers) => {
      if (item) {
        onChange(item); // <-- your external onChange
      }
    }}
    itemToString={(item) => (item ? item.label : "")}
  >
    {({
      getToggleButtonProps,
      getMenuProps,
      getItemProps,
      isOpen,
      highlightedIndex,
      selectedItem,
    }) => (
      <div style={{ width: 250, position: "relative", fontSize: 12 }}>
        <button
          type="button"
          {...getToggleButtonProps()}
          style={{
            width: "100%",
            border: "1px solid hsl(0, 0%, 80%)",
            padding: "6px 8px",
            backgroundColor: "white",
            textAlign: "left",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            outline: "none",
            borderRadius: 0,
          }}
        >
          <span
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              flexGrow: 1,
            }}
          >
            {selectedItem ? selectedItem.label : placeholder || ""}
          </span>
          <svg
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              width: "14px",
              height: "14px",
              flexShrink: 0,
              fill: "grey",
            }}
            viewBox="0 0 20 20"
          >
            <path d="M5 8l5 5 5-5H5z" />
          </svg>
        </button>
        <ul
          {...getMenuProps()}
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: 150,
            overflowY: "auto",
            border: isOpen ? "1px solid hsl(0, 0%, 80%)" : "none",
            backgroundColor: "white",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
            display: isOpen ? "block" : "none",
            borderRadius: 0,
          }}
        >
          {isOpen &&
            options.map((item, index) => {
              const isSelected =
                selectedItem && selectedItem.value === item.value;
              const isHighlighted = highlightedIndex === index;
              return (
                <li
                  key={item.value}
                  {...getItemProps({ item, index })}
                  style={{
                    padding: "6px 8px",
                    backgroundColor: isHighlighted ? "#bc3d814d" : "white",
                    color: isHighlighted ? "black" : "inherit",
                    cursor: "pointer",
                    fontWeight: isSelected ? "bold" : "normal",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </li>
              );
            })}
        </ul>
      </div>
    )}
  </Downshift>
);

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
    tooltip: {
      renderer: (params: any) => {
        const { datum } = params;
        const tooltipItems = Object.entries(datum)
          .filter(([k]) => k in colorMap)
          .map(([k, v]) => {
            const color = colorMap[k as ColorKey];
            return `<div style="color:${color};">${k}: ${v}</div>`;
          });

        return {
          title: datum.date,
          content: tooltipItems.join(""),
        };
      },
    },
  }));

  const whiteSeriesConfig = series.find((s) => s.yKey === "White");
  if (whiteSeriesConfig) {
    whiteSeriesConfig.tooltip.renderer = (params: any) => {
      const { datum } = params;
      const tooltipItems = Object.entries(datum)
        .filter(([k]) => k in colorMap)
        .map(([k, v]) => {
          const color = k === "White" ? "gray" : colorMap[k as ColorKey];
          return `<div style="color:${color};">${k}: ${v}</div>`;
        });
      return {
        title: datum.date,
        content: tooltipItems.join(""),
      };
    };
  }

  const chartOptions: AgCartesianChartOptions = {
    height: 400,
    width: 1000,
    data: data,
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "Red",
        marker: {
          fill: "red",
          size: 2,
          shape: "square",
          stroke: "red",
        },
        stroke: "red",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "Green",
        marker: {
          fill: "green",
          size: 2,
          shape: "square",
          stroke: "green",
        },
        stroke: "green",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "Yellow",
        marker: {
          fill: "#FFBF00",
          size: 2,
          shape: "square",
          stroke: "#FFBF00",
        },
        stroke: "#FFBF00",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "Black",
        marker: {
          fill: "black",
          size: 2,
          shape: "square",
          stroke: "black",
        },
        stroke: "black",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "Blue",
        marker: {
          fill: "blue",
          size: 2,
          shape: "square",
          stroke: "date",
        },
        stroke: "blue",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
      {
        type: "line",
        xKey: "date",
        yKey: "White",
        marker: {
          fill: "gray",
          size: 2,
          shape: "square",
          stroke: "gray",
        },
        stroke: "gray",
        tooltip: {
          renderer: (params: any) => {
            const { datum, xKey } = params;
            const tooltipItems = Object.entries(datum)
              .filter(([key]) => key !== xKey && key !== "undefined")
              .map(
                ([key, value]) =>
                  `<div style="color:${key.toLowerCase()};">${key}: ${value}</div>`
              );

            return `
              <div><strong>${datum[xKey]}</strong></div>
              ${tooltipItems.join("")}
            `;
          },
        },
      },
    ],
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
  };

  return (
    <VFModalCard
      openModal={isOpen}
      headerIcon=""
      headerBgColor="white"
      headerText={`Technical Trend | Horizon - ${horizon} Days`}
      headerTextColor="black"
      closeIcon="/assets/img/VectorFLOW/NMS/close-dark.svg"
      closeModal={handleClose}
    >
      <div className={ExpandedChartFilterWrapper}>
        <div className={ExpandedChartSelectWrapper}>
          <p className={ExpandedChartSelectLabel}>Search By Location</p>
          <Dropdown
            options={options.whcodes}
            selectedItem={selectedLocation}
            onChange={(selected) => {
              setSelectedLocation(selected);
              onChange(selected, "Whcode");
            }}
            placeholder=""
          />
        </div>
        <div className={ExpandedChartSelectWrapper}>
          <p className={ExpandedChartSelectLabel}>Search By Product</p>
          <Dropdown
            options={options.skus}
            selectedItem={selectedProduct}
            onChange={(selected) => {
              setSelectedProduct(selected);
              onChange(selected, "SKUCode");
            }}
            placeholder=""
          />
        </div>

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

      <AgCharts options={chartOptions} />
    </VFModalCard>
  );
};

export default ExpandedGraph;
