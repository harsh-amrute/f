// VFRangeSlider.tsx
import React, { useState } from "react";
import { useUserData } from "../../../../../context";
import {
  rangeSliderContainer,
  rangeSliderInput,
  valueLabel,
  toolTipTriangle,
  progressVar,
  trackColorVar,
  thumbColorVar,
} from "./styles.css";
interface VFRangeSliderProps {
  milestones?: number[];
  min: number;
  max: number;
  strictMode: boolean;
  width: number;
  defaultValue: number;
  showTriangle: boolean;
  handleChange: (number: number) => void;
  labelValueFormatter?: (number: number) => string;
  style?: any;
}
import { assignInlineVars } from "@vanilla-extract/dynamic";

const VFRangeSlider: React.FC<VFRangeSliderProps> = ({
  milestones,
  min,
  max,
  strictMode,
  width,
  defaultValue,
  showTriangle,
  handleChange,
  labelValueFormatter,
  style,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [currMileStoneIndex, setCurrMileStoneIndex] = useState<number>(0);

  const { user } = useUserData();
  const themeUi = user.user.theme_ui;
  const range = max - min;
  const multiplier = width - 20;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currValue = parseInt(event.target.value);
    if (strictMode && milestones) {
      if (
        currValue < milestones[currMileStoneIndex] &&
        currMileStoneIndex > 0 &&
        currValue <
          (milestones[currMileStoneIndex] +
            milestones[currMileStoneIndex - 1]) /
            2
      ) {
        setCurrMileStoneIndex(currMileStoneIndex - 1);
        setValue(milestones[currMileStoneIndex - 1]);
        handleChange(milestones[currMileStoneIndex - 1]);
        return;
      }
      if (
        currValue > milestones[currMileStoneIndex] &&
        currMileStoneIndex < milestones.length &&
        currValue >
          (milestones[currMileStoneIndex + 1] +
            milestones[currMileStoneIndex]) /
            2
      ) {
        setCurrMileStoneIndex(currMileStoneIndex + 1);
        setValue(milestones[currMileStoneIndex + 1]);
        handleChange(milestones[currMileStoneIndex + 1]);
        return;
      }
    } else {
      setValue(currValue);
      handleChange(currValue);
    }
  };

  const valueFormatter = () => {
    if (!labelValueFormatter) return value;
    return labelValueFormatter(value);
  };

  // Theme colors (fallbacks provided if you don't import a central palette)
  const trackColor =
    themeUi === "REGALBLAZE" ? "#FCA311" /* color1 guess */ : "black";
  const thumbColor =
    themeUi === "REGALBLAZE" ? "#CB830E" /* color4-ish */ : "#BC3D81";

  const progressPct = `${(value / max) * 100}%`;

  return (
    <div className={rangeSliderContainer} style={{ width, ...style }}>
      <input
        className={rangeSliderInput}
        type="range"
        data-testid="range-slider"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        // CSS variables used by the pseudo-elements (track/thumb)
        style={assignInlineVars({
          [progressVar]: progressPct,
          [trackColorVar]: trackColor,
          [thumbColorVar]: thumbColor,
        })}
      />

      <div
        className={valueLabel}
        style={{
          left: (value / range) * multiplier - 3,
          top: showTriangle ? 32 : 30,
        }}
      >
        {valueFormatter()}
      </div>

      {showTriangle && (
        <div
          className={toolTipTriangle}
          style={{ left: (value / range) * multiplier + 6.5 }}
        />
      )}

      <div
        style={{
          width: "100%",
          margin: "0 2px",
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 3px",
          position: "absolute",
        }}
      >
        <strong>{min}</strong>
        <strong>{max}</strong>
      </div>

      {/*
      If you re-enable milestones, use the exported classes:
      <div className={milestonesContainer}>
        {milestones?.map((m, i) =>
          m !== milestones[currMileStoneIndex] ? (
            <span
              key={i}
              className={milestoneLabel}
              style={{ left: (m / range) * multiplier + 6.5, top: !showTriangle ? -7 : 6 }}
            >
              {m}
            </span>
          ) : null
        )}
      </div>
      */}
    </div>
  );
};

export default VFRangeSlider;
