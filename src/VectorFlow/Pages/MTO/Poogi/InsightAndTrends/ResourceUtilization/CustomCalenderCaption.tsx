import { CaptionProps, useNavigation } from "react-day-picker";

import { format } from "date-fns";

import {
  customCalenderCaptionArrow,
  customCalenderCaptionHeader,
  customCalenderCaptionWrapper,
} from "./styles.css";

const CustomCalenderCaption = (props: CaptionProps) => {
  const { nextMonth, previousMonth, goToMonth } = useNavigation();

  return (
    <div className={customCalenderCaptionWrapper}>
      <img
        className={customCalenderCaptionArrow}
        style={{ transform: "rotate(90deg)" }}
        src="/assets/img/VectorFLOW/BPR/calender-left-arrow.svg"
        onClick={() => previousMonth && goToMonth(previousMonth)}
      />
      <p className={customCalenderCaptionHeader}>
        {format(props.displayMonth, "MMM yyy")}
      </p>
      <img
        className={customCalenderCaptionArrow}
        style={{ transform: "rotate(90deg)" }}
        src="/assets/img/VectorFLOW/BPR/calender-right-arrow.svg"
        onClick={() => nextMonth && goToMonth(nextMonth)}
      />
    </div>
  );
};

export default CustomCalenderCaption;
