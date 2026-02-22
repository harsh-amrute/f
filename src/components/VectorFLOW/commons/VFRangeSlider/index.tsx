// VFRangeSlider.tsx
import React, { useState } from "react";
import { useUserData } from "../../../../context";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  RangeSliderContainer,
  RangeSliderInput,
  ValueLabel,
  MilestonesContainer,
  MilestoneLabel,
  ToolTipTriangle,
  trackFillVar,
  progressVar,
  thumbBgVar,
  thumbActiveOutlineVar,
  labelLeftVar,
  labelTopVar,
} from "./styles.css";
import * as globalStyles from '../../../../styles/global';
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
  // Simple palette mapping; swap with your theme system if needed
  const isRegal = themeUi === "REGALBLAZE";
  console.log(isRegal,"isRegal");
  const fillColor = isRegal ? globalStyles.chooseThemeColor[themeUi].color1 : "black";
  const knobColor = isRegal ? globalStyles.chooseThemeColor[themeUi].color4 : "#BC3D81";
  const knobActiveOutline = isRegal ? "#CB830E" : "#BC3D81";

  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const leftPx = (value / range) * multiplier;

  return (
    <div className={RangeSliderContainer} style={{ width, ...style }}>
      <input
        className={RangeSliderInput}
        type="range"
        data-testid="range-slider"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        style={assignInlineVars({
          [trackFillVar]: fillColor,
          [thumbBgVar]: knobColor,
          [thumbActiveOutlineVar]: knobActiveOutline,
          [progressVar]: `${pct}%`,
        })}
      />

      <div
        className={ValueLabel}
        style={assignInlineVars({
          [labelLeftVar]: `${leftPx - 3}px`,
          [labelTopVar]: showTriangle ? "32px" : "20px",
        })}
      >
        {valueFormatter()}
      </div>

      {showTriangle && (
        <div className={ToolTipTriangle} style={{ left: leftPx + 1.5 }} />
      )}

      {milestones && (
        <div className={MilestonesContainer}>
          {milestones.map((milestone, index) => {
            if (milestone !== milestones[currMileStoneIndex!]) {
              const mLeft = (milestone / range) * multiplier + 6.5;
              const mTop = !showTriangle ? -7 : 5;
              return (
                <span
                  key={index}
                  className={MilestoneLabel}
                  style={{ left: mLeft, top: mTop }}
                >
                  {milestone}
                </span>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default VFRangeSlider;
