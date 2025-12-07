import { assignInlineVars } from "@vanilla-extract/dynamic";
import Tooltip from "../../../VectorFLOW/commons/MTO/Tooltip";
import { buttonBackgroundVar, buttonOpacityVar, buttonPointerEventsVar, scButton, tooltipText } from "./styles.css";
import React, { CSSProperties, ReactNode } from "react";

interface VFButtonProps {
  onClick: any;
  themeUi: string;
  disabled?: boolean;
  width?: number;
  children: React.ReactNode;
  style?: CSSProperties;
  onHoverChild?: ReactNode;
  currentStep?: number;
}

const VFButton = (props: VFButtonProps) => {
  const { onClick, themeUi, disabled, width, style, children, currentStep } =
    props;

  // const getChildren = () => {
  //     // if(onHoverChild){
  //     //     if(hoverState){
  //     //         return onHoverChild
  //     //     }
  //     // }
  //     return children
  // }

  const themeVariant = themeUi === "REGALBLAZE" ? "regalblaze" : "magenta";

  // Keep base width at 130px in CSS, override via inline when provided.
  const mergedStyle: React.CSSProperties = {
    ...(width ? { width } : {}),
    ...style,
  };

  const button = (
    <button
      onClick={onClick}
      className={scButton}
      style={{
        ...assignInlineVars({
          [buttonBackgroundVar]:
            themeVariant === "magenta"
              ? "transparent linear-gradient(74deg, #820F4C 0%, #BC3D81 100%) 0% 0% no-repeat padding-box"
              : "transparent linear-gradient(261deg, #FCA311 0%, #CB830E 100%) 0% 0% no-repeat padding-box",

          [buttonOpacityVar]: disabled ? "0.2" : "1",
          [buttonPointerEventsVar]: disabled ? "none" : "all",
        }),
        ...mergedStyle, // your incoming styles remain applied last
      }}
      data-testid="vf-button"
    >
      {children}
    </button>
  );

  if (disabled && currentStep === 2) {
    return (
      <Tooltip
        disableStyleInjection="core"
        content={
          <div className={tooltipText}>
            Assign a route and apply the production buffer to all the orders!
          </div>
        }
      >
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default VFButton;
