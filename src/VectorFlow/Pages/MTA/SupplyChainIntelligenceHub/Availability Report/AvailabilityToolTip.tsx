import { AvailabilityToolTipWrapper } from "./styles.css";

import { ITooltipParams } from "ag-grid-enterprise";

const AvailabilityToolTip = (params: ITooltipParams) => {
  const value = Number(params?.value);

  return (
    <div className={AvailabilityToolTipWrapper}>
      {isNaN(value) ? "" : `${value.toFixed(2)}%`} Availability
    </div>
  );
};
export default AvailabilityToolTip;
