import { useMemo } from "react";
import { useUserData } from "../../../../../context";
import { useGetOpenExpediteAnalytics } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";
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
} from "../../Logistics/InTransitWhereAbouts/styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

const OpenExpediteAnalytics = () => {
  const { data } = useGetOpenExpediteAnalytics();

  const rowData = useMemo(() => {
    if (data) return data.data.data[0];
    return { nr: 0, ur: 0, sumplpd: 0 };
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
          </span>{" "}
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
              Sum Potential Loss Of Margin
            </span>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "right", maxWidth: 80 }}
            >
              {rowData.sumplpd}
            </span>
          </div>
          <div className={BPRParticularAnalyticsTableRow}>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "left" }}
            >
              No. of Requests
            </span>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "right", maxWidth: 80 }}
            >
              {rowData.nr}
            </span>
          </div>
          <div className={BPRParticularAnalyticsTableRow}>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "left" }}
            >
              No. of Unactioned Requests
            </span>
            <span
              className={BPRParticularAnalyticsTableCell}
              style={{ textAlign: "right", maxWidth: 80 }}
            >
              {rowData.ur}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenExpediteAnalytics;
