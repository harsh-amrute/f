import React from "react";
import { labelText, progressBoxWrapper } from "./style.css";
import CircularProgress from "./CircularProgress";

interface ProgressBoxProps {
    label : string;
    progress: number;
}

function ProgressBox({label, progress} : ProgressBoxProps) {
  return (
    <div className={progressBoxWrapper}>
      <CircularProgress size={120} progress={progress} />
      <div className={labelText}>{label}</div>
    </div>
  );
}

export default ProgressBox;
