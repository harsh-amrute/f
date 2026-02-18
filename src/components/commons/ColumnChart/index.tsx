import { useTranslation } from "react-i18next";
import {
  WrapperChart,
  ChartLeft,
  ChartRight,
  WrapperColumnRed,
  WrapperColumnGreen,
  WrapperColumnWhite,
  TextColumn,
  colorTextVar
} from "./styles.css";
import * as globalStyles from "../../../styles/global";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const ColumnChart = ({ themeUi }: any) => {
  const { t } = useTranslation();

  const colorText =
    globalStyles.chooseThemeColor?.[themeUi]?.colorText ?? globalStyles.Black;

  return (
    <div
      className={WrapperChart}
      style={assignInlineVars({ [colorTextVar]: colorText })}
    >
      <div className={ChartRight}>
        <div className={ChartLeft}>{t("columnChart.textLeft")}</div>

        <div className={WrapperColumnRed}>
          <span className={TextColumn}>{t("columnChart.red")}</span>
        </div>

        <div className={WrapperColumnGreen}>
          <span className={TextColumn}>{t("columnChart.green")}</span>
        </div>

        <div className={WrapperColumnWhite}>
          <span className={TextColumn}>{t("columnChart.white")}</span>
        </div>
      </div>
    </div>
  );
};

export default ColumnChart;
