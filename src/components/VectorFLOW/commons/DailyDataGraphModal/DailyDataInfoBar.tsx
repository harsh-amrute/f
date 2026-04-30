import React from "react";
import { SCDailyDataInfoBar } from "./styles.css";
import Tooltip from "../../../../../src/VectorFlow/Pages/MTO/Common/Tooltip";

interface InfoItem {
  label: string;
  value: string;
  tooltip?: string;
}

interface InfoBarProps {
  items: InfoItem[];
}

const DailyDataInfoBar = ({ items }: InfoBarProps) => {
  return (
    <div className={SCDailyDataInfoBar}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              whiteSpace: "nowrap",
            }}
          >
            <span>{item.label} :</span>
            {item.tooltip ? (
              <Tooltip
                disableStyleInjection="core"
                content={
                  <div style={{ padding: "0.5rem 1rem", fontSize: "12px" }}>
                    {item.tooltip}
                  </div>
                }
                tooltipZoom={1}
              >
                <strong style={{ cursor: "pointer", whiteSpace: "nowrap" }}>
                  {item.value}
                </strong>
              </Tooltip>
            ) : (
              <strong style={{ whiteSpace: "nowrap" }}>{item.value}</strong>
            )}
          </span>
          {index < items.length - 1 && (
            <span
              style={{
                margin: "0 10px",
                color: "#333",
                fontWeight: 400,
                flexShrink: 0,
              }}
            >
              |
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DailyDataInfoBar;
