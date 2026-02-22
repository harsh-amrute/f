import React, { useState } from "react";
import { ETACellRendererWrapper } from "../../SupplyChainIntelligenceHub/OpenExpeditingRequests/styles.css";
import {
  ColorGroupCellRendererWrapper,
  ColorGroupColorCell,
  ColorGroupColorCellToolTip,
  CurrentLocationCellRendererWrapper,
  ETACellRendererCellValue,
  barWidthVar,
  barBgVar,
  tipBgVar,
  tipTextVar,
  tipTopVar,
  tipLeftVar,
  tipTriangleVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const colorMapper = (color: string) => {
  switch (color) {
    case "White":
      return {
        bg: "#CCCCCC",
        text: "black",
        label: "White",
      };
    case "Yellow":
      return {
        bg: "#EBBF2C",
        text: "black",
        label: "Yellow",
      };
    case "Green":
      return {
        bg: "#418D18",
        text: "white",
        label: "Green",
      };
    case "Red":
      return {
        bg: "#E53F3F",
        text: "white",
        label: "Red",
      };
    case "Black":
      return {
        bg: "#000000",
        text: "white",
        label: "Black",
      };
    default:
      return {
        bg: "#CCCCCC",
        text: "black",
        label: "White",
      };
  }
};

export const CurrentLocationCellRenderer = (params: any) => {
  const isEven = params.rowIndex % 2 === 1;
  return (
    <div
      className={CurrentLocationCellRendererWrapper}
      style={{ backgroundColor: isEven ? "#EFEFEF" : "white" }}
    >
      {params.value}
    </div>
  );
};

export const ColorGroupColorCellWrapper = (props: {
  color: string;
  value: number;
  totalCount: number;
}) => {
  const [isToolTipOpen, toggleToolTip] = useState<boolean>(false);
  const [errorCellPosition, setErrorCellPosition] = useState<any>();

  const currColorObj = colorMapper(props.color);

  const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { bottom, left, width } = e.currentTarget.getBoundingClientRect();
    const tooltipHeight = 110; /* Height of your tooltip */

    const tooltipTop = bottom + 10;

    // Check if tooltip overflows on the bottom side
    // if (tooltipTop + tooltipHeight > viewportHeight) {
    //     tooltipTop = (top) - tooltipHeight;
    // }

    setErrorCellPosition({
      left: left - 75 + width / 2,
      top: tooltipTop - tooltipHeight,
    });

    toggleToolTip(true);
  };

  return (
    <React.Fragment>
      <div
        className={ColorGroupColorCell}
        onMouseEnter={onMouseIn}
        onMouseLeave={() => toggleToolTip(false)}
        style={assignInlineVars({
          [barWidthVar]: `${(props.value / props.totalCount) * 100}%`,
          [barBgVar]: currColorObj.bg,
        })}
      >
        {isToolTipOpen && (
          <div
            className={ColorGroupColorCellToolTip}
            style={assignInlineVars({
              [tipBgVar]: currColorObj.bg,
              [tipTextVar]: currColorObj.text,
              [tipTopVar]: `${errorCellPosition.top}px`,
              [tipLeftVar]: `${errorCellPosition.left}px`,
              [tipTriangleVar]: currColorObj.bg,
            })}
          >
            {currColorObj.label}{" "}
            {((props.value / props.totalCount) * 100).toFixed(0)}%
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export const ColorGroupCellRenderer = (params: any) => {
  if (!params.value || !params.data.count || params.data.count === 0) {
    return <>No data</>;
  }

  return (
    <div className={ColorGroupCellRendererWrapper}>
      {Object.keys(params.value).map((key: string) => {
        return (
          <ColorGroupColorCellWrapper
            color={key}
            value={params.value[key]}
            key={key}
            totalCount={params.data.count}
          />
        );
      })}
    </div>
  );
};

export const ETACellRenderer = (params: any) => {
  return (
    <div className={ETACellRendererWrapper}>
      <div className={ETACellRendererCellValue}>{params.value}</div>
    </div>
  );
};
