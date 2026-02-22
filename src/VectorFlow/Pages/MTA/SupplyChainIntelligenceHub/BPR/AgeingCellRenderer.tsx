import {
  AgeingCell,
  AgeingIcon,
  AgeingText,
  AgeingToolTipSection,
  AgeingToolTipText,
  AgeingToolTipWrapper,
  BPRViewTableRowCell,
  BPRViewTableToolTip,
} from "./styles.css";

import Portal from "../../../../../components/VectorFLOW/layouts/Portal";

import React, { CSSProperties, useState } from "react";
import { useUserData } from "../../../../../context";

interface AgeingCellRendererProps {
  value: any;
}

const AgeingCellRenderer = (props: AgeingCellRendererProps) => {
  const { value } = props;

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const [isOpen, setIsOpen] = useState(false);

  const [toolTipPosition, setoolTipPosition] = useState<CSSProperties>({});

  const onMouseIn = (e: React.MouseEvent<HTMLElement>) => {
    const { top, left } = e.currentTarget.getBoundingClientRect();
    setoolTipPosition({
      top: top * 0.75 - 80,
      left: left * 0.75 - 100,
    });
    setIsOpen(true);
  };

  const onMouseOut = () => setIsOpen(false);

  return (
    <div
      className={BPRViewTableRowCell}
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        justifyContent: "center",
      }}
    >
      <div className={AgeingCell}>
        <div className={AgeingText}>{value.ag}</div>
        <img
          className={AgeingIcon}
          onMouseEnter={onMouseIn}
          onMouseLeave={onMouseOut}
          src={
            themeUi === "REGALBLAZE"
              ? "/assets/img/VectorFLOW/BPR/ageing-sub-grid-regal.svg"
              : "/assets/img/VectorFLOW/BPR/ageing-sub-grid.svg"
          }
        />
      </div>
      {isOpen && (
        <Portal wrapperId="viewtable">
          <div
            className={BPRViewTableToolTip}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{
              top: toolTipPosition.top,
              left: toolTipPosition.left,
              maxWidth: 250,
            }}
          >
            <div className={AgeingToolTipWrapper}>
              <div className={AgeingToolTipSection}>
                <div className={AgeingToolTipText}>Creation Date -</div>
                <div className={AgeingToolTipText}>{value.cd}</div>
              </div>
              <div className={AgeingToolTipSection}>
                <div className={AgeingToolTipText}>SLT -</div>
                <div className={AgeingToolTipText}>{value.slt}</div>
              </div>
              <div className={AgeingToolTipSection}>
                <div className={AgeingToolTipText}>TLT -</div>
                <div className={AgeingToolTipText}>{value.tlt}</div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default AgeingCellRenderer;
