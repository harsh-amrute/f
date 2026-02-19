import {
  errorText,
  container,
  errorToolTipLi,
  errorToolTipUl,
  toolTipWrapper,
  themeTextColorVar,
} from "../../VectorFLOW/commons/ErrorCell/styles.css";
import { ICellRendererParams } from "ag-grid-enterprise";
import React, { CSSProperties, useState, useEffect } from "react";

import Portal from "../../VectorFLOW/layouts/Portal";
import useViewPort from "../../../hooks/useViewPort";
import { useUserData } from "../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const ErrorCell = (props: ICellRendererParams) => {
  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const { getGridZoom, getScreenZoomValue } = useViewPort();
  const currScreenZoom = getScreenZoomValue();
  const currGridZoom = getGridZoom();

  const [tooltipsState, setTooltipsState] = useState<{
    [key: string]: boolean;
  }>({});
  const [errorCellPosition, setErrorCellPosition] = useState<CSSProperties>();
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isMouseOverTooltip, setIsMouseOverTooltip] = useState<boolean>(false);

  const message = props.data.error;
  if (!message) return null;

  function customSplitter(str: string, exec: (s: number) => boolean) {
    const result: Array<string> = [];
    let currStr = "";
    for (let index = 0; index < str.length; index++) {
      if (exec(index)) {
        result.push(currStr);
        currStr = "";
      } else {
        currStr += str[index];
      }
    }
    if (currStr.length > 0) result.push(currStr);
    return result;
  }

  const messages = customSplitter(message, (s) => {
    try {
      const prevChar = message[s - 1];
      const nextChar = message[s + 1];
      return (
        message[s] === "." &&
        (isNaN(parseInt(prevChar)) || isNaN(parseInt(nextChar)))
      );
    } catch (err) {
      console.error(err);
      return false;
    }
  });

  const getFomattedMessage = (msg: string) => {
    if (msg.length > 30) {
      return msg.slice(0, 30) + "...";
    }
    return msg;
  };

  const onMouseIn = (e: React.MouseEvent<HTMLElement>, tooltipKey: string) => {
    const { bottom, left, top } = e.currentTarget.getBoundingClientRect();
    const tooltipHeight = messages.length * 16;
    const viewportHeight = window.innerHeight;

    let tooltipTop = bottom + 10;

    // Check if tooltip overflows on the bottom side
    if (tooltipTop + tooltipHeight > viewportHeight) {
      tooltipTop = top - tooltipHeight;
    }

    setErrorCellPosition({
      left: left * currGridZoom * currScreenZoom,
      top: tooltipTop,
    });

    setTooltipsState((prevState) => ({
      ...prevState,
      [tooltipKey]: true,
    }));

    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
  };

  const onMouseOut = (tooltipKey: string) => {
    const timeout = setTimeout(() => {
      if (!isMouseOverTooltip) {
        setTooltipsState((prevState) => ({
          ...prevState,
          [tooltipKey]: false,
        }));
      }
    }, 100);

    setTooltipTimeout(timeout);
  };

  const onTooltipMouseEnter = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setIsMouseOverTooltip(true);
  };

  const onTooltipMouseLeave = (tooltipKey: string) => {
    setIsMouseOverTooltip(false);
    setTooltipsState((prevState) => ({
      ...prevState,
      [tooltipKey]: false,
    }));
  };

  useEffect(() => {
    if (!isMouseOverTooltip && tooltipTimeout) {
      const timeout = setTimeout(() => {
        setTooltipsState((prev) => ({ ...prev, ["tooltip"]: false }));
      }, 120);
      return () => clearTimeout(timeout);
    }
  }, [isMouseOverTooltip]);

  // console.log('Tooltips State:', tooltipsState);

  const imageSrc =
    themeUi === "REGALBLAZE"
      ? "/assets/img/VectorFLOW/NMS/error1.svg"
      : "/assets/img/VectorFLOW/NMS/error.svg";

  const themedTextColor =
    themeUi === "REGALBLAZE" ? "rgb(199, 129, 14)" : "rgb(130, 15, 76)";
  const themedBg = themeUi === "REGALBLAZE" ? "#FFEED3" : "#bc3d811a";

  return (
    <>
      <div
        className={container}
        style={{ overflow: "visible" }}
        data-theme={themeUi}
      >
        <img
          src={imageSrc}
          width={17}
          height={17}
          style={{ marginRight: "7px", marginLeft: "5px" }}
          onMouseEnter={(e) => onMouseIn(e, "tooltip")}
          onMouseLeave={() => onMouseOut("tooltip")}
          data-testid="errorImage"
        />
        <span
          className={errorText}
          style={assignInlineVars({ [themeTextColorVar]: themedTextColor })}
        >
          {getFomattedMessage(message)}
        </span>
        {tooltipsState["tooltip"] && (
          <Portal wrapperId="error-tooltip">
            <div
              className={`${toolTipWrapper} custom-scrollbar`}
              data-theme={themeUi}
              data-testid="tooltip-wrapper"
              style={{
                position: "absolute",
                left: errorCellPosition?.left,
                top: errorCellPosition?.top,
                zIndex: 10000,
              }}
              onMouseEnter={onTooltipMouseEnter}
              onMouseLeave={() => onTooltipMouseLeave("tooltip")}
            >
              <ul
                className={errorToolTipUl}
                style={
                  {
                    [themeTextColorVar]: themedTextColor,
                  } as React.CSSProperties
                }
              >
                {messages &&
                  messages.length > 0 &&
                  messages.map((sentence: string, index: number) => {
                    if (sentence.trim() !== "") {
                      return (
                        <li
                          className={errorToolTipLi}
                          data-theme={themeUi}
                          key={index}
                        >
                          {sentence}
                        </li>
                      );
                    }
                    return null;
                  })}
              </ul>
            </div>
          </Portal>
        )}
      </div>
    </>
  );
};

export default ErrorCell;
