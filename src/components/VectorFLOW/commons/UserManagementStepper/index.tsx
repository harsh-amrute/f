import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../styles/global";
import {
  stepIcon,
  stepIconWrapper,
  stepLabel,
  stepperWrapper,
  stepSection,
  stepStroke,
  stepStrokeWrapper,
  stepWrapper,
  stepLabelColorVar,
} from "./styles.css";

type StepState = "completed" | "active" | "pending";

interface UserManagementStepperProps {
  list: Array<UserManagementStepperListProps>;
  themeUi: string;
}

interface UserManagementStepperListProps {
  label: string;
  currentState: StepState;
}

interface StepComponentProps {
  label: string;
  currentState: StepState;
  isLast: boolean;
  themeUi: string;
}

const UserManagementStepper = (props: UserManagementStepperProps) => {
  const { list, themeUi } = props;

  return (
    <div className={stepperWrapper}>
      {list.map((s, index) => {
        return (
          <UserManagementStepperItem
            label={s.label}
            currentState={s.currentState}
            isLast={index === list.length - 1}
            themeUi={themeUi}
            key={index}
          />
        );
      })}
    </div>
  );
};

const UserManagementStepperItem = (step: StepComponentProps) => {
  const { currentState, label, isLast, themeUi } = step;

  const getImgSrc = (state: StepState): string => {
    console.log(state);
    if (state === "completed") return "/assets/img/step-completed.svg";
    if (state === "active")
      return themeUi === "REGALBLAZE"
        ? "/assets/img/step-active-regal.svg"
        : "/assets/img/step-active.svg";
    return "/assets/img/step-pending.svg";
  };

  const clr = globalStyles.chooseThemeColor[themeUi]?.color4 ?? "#333";

  return (
    <div className={stepWrapper} style={{ width: isLast ? "auto" : "100%" }}>
      <div className={stepSection}>
        <div className={stepIconWrapper}>
          <img className={stepIcon} src={getImgSrc(currentState)} />
        </div>
      </div>
      <div className={stepSection}>
        <label
          className={stepLabel}
          style={assignInlineVars({ [stepLabelColorVar]: clr })}
        >
          {label}
        </label>
      </div>
      {!isLast && (
        <div className={stepSection} style={{ width: "100%" }}>
          <div className={stepStrokeWrapper}>
            <div className={stepStroke} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementStepper;
