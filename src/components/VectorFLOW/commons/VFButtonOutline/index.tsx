import {
  scButtonOutline,
  disabled as disabledCls,
  strokeColorVar,
  widthPxVar,
} from "./styles.css";
import React, { CSSProperties, ReactNode } from "react";
import * as globalStyles from "../../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

interface VFButtonOutlineProps {
  onClick: () => void;
  themeUi: string;
  disabled?: boolean;
  width?: number;
  color?: string;
  onHoverChild?: ReactNode;
  children: React.ReactNode;
  style?: CSSProperties;
  //isHoverDisabled?:boolean
}

const VFButtonOutline = (props: VFButtonOutlineProps) => {
  const { onClick, themeUi, disabled, width, children, color, style } = props;

  //const [hoverState,setHoverState] = useState(false);

  const getChildren = () => {
    // if(onHoverChild){
    //     if(hoverState){
    //         return onHoverChild
    //     }
    // }
    return children;
  };

  const themed = globalStyles.chooseThemeColor?.[themeUi];
  const resolvedColor = disabled
    ? "#9A9A9A"
    : color
    ? color
    : themed?.color5 ?? "#BC3D81";

    const inlineVars = assignInlineVars({
      [strokeColorVar]: resolvedColor,
      [widthPxVar]: `${width ?? 130}px`,
    });

    return (
    <button
      className={`${scButtonOutline} ${disabled ? disabledCls : ""}`}
      onClick={onClick}
      style={{...inlineVars, ...style}}
      data-testid="vf-button-outline"

    >
      {getChildren()}
    </button>
  );
};

export default VFButtonOutline;
