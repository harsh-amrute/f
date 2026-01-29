import React from "react";
import { svg, text, circleStyle, circleStrokeWidthVar } from "./style.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

type CircularProgressProps = {
  size: number;
  progress: number; // 0 to 100
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  progress,
  strokeWidth = 10,
  color = "#bd2c84",
  bgColor = "#eee",
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className={svg} width={size} height={size}>
      <circle
        className={circleStyle}
        style={assignInlineVars({
          [circleStrokeWidthVar] : `${strokeWidth}px`
        })}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={bgColor}
        fill="none"
      />
      <circle
        className={circleStyle}
        style={assignInlineVars({
          [circleStrokeWidthVar] : `${strokeWidth}px`
        })}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={color}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text className={text} x="50%" y="50%" dy=".3em">{`${progress}%`}</text>
    </svg>
  );
};

export default CircularProgress;
