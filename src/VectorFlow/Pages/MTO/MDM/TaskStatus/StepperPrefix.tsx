import {
  StepperPrefixIcon,
  StepperPrefixLabel,
  StepperPrefixSubLabel,
  StepperPrefixWrapper,
} from "./styles.css";

interface StepperPrefixProps {
  label: string;
  subLabel: string;
}

const StepperPrefix = (props: StepperPrefixProps) => {
  return (
    <div className={StepperPrefixWrapper}>
      <img
        className={StepperPrefixIcon}
        src="/assets/img/VectorFLOW/NMS/task-status-user.svg"
        alt=""
      />
      <p className={StepperPrefixLabel}>{props.label}</p>
      <p className={StepperPrefixSubLabel}>{`(${props.subLabel})`}</p>
    </div>
  );
};

export default StepperPrefix;
