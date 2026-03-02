import { AvailabilityToolTipWrapper } from "./styles.css";

import { ITooltipParams } from "ag-grid-enterprise";

const AvailabilityToolTip = (params: ITooltipParams) => {
  return (
    <div className={AvailabilityToolTipWrapper}>
      {params?.value}% Availability
    </div>
  );
};

export default AvailabilityToolTip;
