import { useLayoutEffect, useEffect, useState } from "react";
import {
  stepperWrapper,
  stepWrapper,
  stepLabelWrapper,
  stepLabel,
  stepDescription,
  stepPrefixWrapper,
  stepperContentWrapper,
  stepProgressBase,
  stepProgressCompleted,
  stepProgressPending,
  stepProgressRejected,
  stepProgressDashed,
} from "./styles.css";

interface VFStepperProps {
  items: StepItem[];
  width?: string;
  zoom?: number;
  dashWidth?: string;
}

export interface StepItem {
  label: string;
  status: "completed" | "pending" | "rejected"; // (supports "async" visually if you ever pass it)
  description: string;
  prefix?: React.ReactNode;
}

interface VFStepProps {
  label: string;
  status: "completed" | "pending" | "rejected" | "async";
  index: number;
  isLast: boolean;
  description: string;
  dashWidth?: string;
  prefix?: React.ReactNode;
}

const VFStepper = ({ items, width, zoom = 1, dashWidth = "100px" }: VFStepperProps) => {
  return (
    <div className={stepperWrapper} style={{ width, zoom }} data-testid="stepper">
      {items.map((i, index) => (
        <Step
          key={index}
          label={i.label}
          status={i.status as VFStepProps["status"]}
          index={index}
          isLast={index === items.length - 1}
          description={i.description}
          prefix={i.prefix}
          dashWidth={dashWidth}
        />
      ))}
    </div>
  );
};

const Step = ({ label, status, isLast, description, dashWidth, prefix }: VFStepProps) => {
  const progressColorClass =
    status === "completed"
      ? stepProgressCompleted
      : status === "rejected"
      ? stepProgressRejected
      : stepProgressPending; // pending & rejected share grey color in original

  const dashedClass = status === "async" ? stepProgressDashed : "";

  return (
    <div className={stepWrapper}>
      <div className={stepLabelWrapper}>
        {prefix && <div className={stepPrefixWrapper}>{prefix}</div>}
        <VFStepIcon status={status} />
        <div className={stepperContentWrapper}>
          <div className={stepLabel}>{label}</div>
          <div className={stepDescription}>{description}</div>
        </div>
      </div>

      {!isLast && (
        <div
          className={`${stepProgressBase} ${progressColorClass} ${dashedClass}`}
          style={{
            width: dashWidth,
            marginTop: prefix ? "40px" : "12px",
          }}
        />
      )}
    </div>
  );
};

const VFStepIcon = ({ status }: { status: VFStepProps["status"] }) => {
  const getImgSrc = () => {
    switch (status) {
      case "completed":
        return "/assets/img/VectorFLOW/NMS/successful.svg";
      case "rejected":
        return "/assets/img/VectorFLOW/NMS/rejected.svg";
      default:
        return "/assets/img/VectorFLOW/NMS/pending.svg";
    }
  };
  return <img src={getImgSrc()} height={28} width={28} alt={status} />;
};

export default VFStepper;
