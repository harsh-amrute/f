import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  orderCoverageCellRendererWrapper,
  coverageColorBox,
  colorVar,
} from "./styles.css";

export const OrderCoverageCellRenderer = (params: any) => {
  const getColor = () => {
    switch (params.data["c"]) {
      case "Gap > 67%":
        return "#9A0101";
      case "33% <= Gap <= 67%":
        return "#EBBF2B";
      case "Gap < 33%":
        return "#418D18";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className={orderCoverageCellRendererWrapper}>
      <div
        className={coverageColorBox}
        style={assignInlineVars({ [colorVar]: getColor() })}
        data-testid="coverage-color-box"
      />
      <p>{params.data["c"]}</p>
    </div>
  );
};
