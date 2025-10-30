import React from "react";
import { LabelText, ProgressBoxWrapper } from "./style.css";
import CircularProgress from "./CircularProgress";

interface ProgressBoxProps {
  label: string;
}

function ProgressBox({ label }: ProgressBoxProps) {
  return (
    <div className={ProgressBoxWrapper}>
      <CircularProgress size={130} progress={75} />
      <div className={LabelText}>{label}</div>
    </div>
  );
}

export default ProgressBox;
