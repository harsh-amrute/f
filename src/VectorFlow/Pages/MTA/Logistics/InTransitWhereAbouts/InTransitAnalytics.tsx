import { useMemo } from "react";
import { useUserData } from "../../../../../context";
import { useGetInTransitWhereAboutAnalytics } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
import {
  BPRParticularAnalyticsWrapper,
  BPRParticularAnalyticsTableWrapper,
  BPRParticularAnalyticsTableHeaderWrapper,
  BPRParticularAnalyticsTableHeader,
  BPRParticularAnalyticsTableRowWrapper,
  BPRParticularAnalyticsTableRow,
  BPRParticularAnalyticsTableCell,
  analyticsBgVar,
  analyticsTextVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

const InTransitAnalytics = () => {
  const { data } = useGetInTransitWhereAboutAnalytics();

  const rowData = useMemo(() => {
    if (data) return data.data.data[0];
    return { d: 0, it: 0 };
  }, [data]);

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  return (
    <div className={BPRParticularAnalyticsWrapper}>
      <div
        className={BPRParticularAnalyticsTableWrapper}
        style={assignInlineVars({
          [analyticsBgVar]:
            themeUi === "NOIRFUSION"
              ? globalStyles.chooseThemeColor[themeUi].color3
              : globalStyles.chooseThemeColor[themeUi].color1,
          [analyticsTextVar]: themeUi === "PUREELEGANCE" ? "black" : "white",
        })}
      >
        <div className={BPRParticularAnalyticsTableHeaderWrapper}>
          <span
            className={BPRParticularAnalyticsTableHeader}
            style={{ textAlign: "left" }}
          >
            Particulars
          </span>
          <span
            className={BPRParticularAnalyticsTableHeader}
            style={{ textAlign: "right", maxWidth: 80 }}
          >
            Count (Today)
          </span>
        </div>
        <div className={BPRParticularAnalyticsTableRowWrapper}>
          <div className={BPRParticularAnalyticsTableRow}>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "left" }}
            >
              InTransit
            </span>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "right", maxWidth: 80 }}
            >
              {rowData.it}
            </span>
          </div>
          <div className={BPRParticularAnalyticsTableRow}>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "left" }}
            >
              Delayed
            </span>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "right", maxWidth: 80 }}
            >
              {rowData.d}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InTransitAnalytics;
