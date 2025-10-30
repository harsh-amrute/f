import Tooltip from "../../../VectorFLOW/commons/MTO/Tooltip";
import { scButton, tooltipText } from "./styles.css";
import React, { CSSProperties, ReactNode } from "react";

interface VFButtonProps {
  onClick: () => void;
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
      className={scButton({ theme: themeVariant, disabled: !!disabled })}
      style={mergedStyle}
      data-testid="vf-button"
    >
      {children}
    </button>
  );

  if (disabled && currentStep === 2) {
    return (
      <Tooltip
        disableStyleInjection={true}
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
