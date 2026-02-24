import { useMemo } from "react";
import { useUserData } from "../../../../../context";
import {
  RRRAnalyticsContainer,
  RRRAnalyticsHeader,
  RRRAnalyticsTableContainer,
  RRRAnalyticsTableHeaderWrapper,
  RRRAnalyticsWrapper,
  RRRAnalyticsTableHeader,
  RRRAnalyticsTableRowContainer,
  RRRAnalyticsTableRow,
  RRRAnalyticsTableCell,
  rrrBgVar,
  rrrTextVar,
} from "../../SupplyChainIntelligenceHub/RationedRequirementReport/styles.css";
import { useGetDBMAnalyticsData } from "../../../../../VectorFlow/Services/MTA/DBM";
import * as globalStyles from "../../../../../styles/global";

const DBMAnalytics = () => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const { data } = useGetDBMAnalyticsData();

  const rowData = useMemo(() => {
    if (data && data.data && data.data.data && Array.isArray(data.data.data)) {
      const result: any = {};
      const rawData = data.data.data[0];
      Object.keys(rawData).map((k: string) => {
        result[k] = rawData[k][0];
      });
      return result;
    }
    return {
      nofsugg: {
        u: 0,
        d: 0,
      },
      acc: {
        u: 0,
        d: 0,
      },
      sleep: {
        u: 0,
        d: 0,
      },
    };
  }, [data]);

  console.log(rowData);

  const theme = globalStyles.chooseThemeColor[themeUi];
  const bg = themeUi === "NOIRFUSION" ? theme.color3 : theme.color1;
  const text = themeUi === "PUREELEGANCE" ? "black" : "white";
  const sep = text; // same logic as before

  return (
    <div className={RRRAnalyticsWrapper}>
      <div
        className={RRRAnalyticsContainer}
        style={{
          [rrrBgVar as any]: bg,
          [rrrTextVar as any]: text,
        }}
      >
        <div className={RRRAnalyticsHeader} style={{ paddingLeft: "10px" }}>
          Analytics
        </div>
        <div
          className={RRRAnalyticsTableContainer}
          style={{ padding: "4px 10px" }}
        >
          <div className={RRRAnalyticsTableHeaderWrapper}>
            <div
              className={RRRAnalyticsTableHeader}
              style={{ maxWidth: "60px" }}
            />
            <div className={RRRAnalyticsTableHeader}>
              No Of
              <br /> Upward
            </div>
            <div className={RRRAnalyticsTableHeader}>
              No Of
              <br /> Downward
            </div>
          </div>
          <div className={RRRAnalyticsTableRowContainer}>
            <div className={RRRAnalyticsTableRow} style={{ border: "none" }}>
              <div
                className={RRRAnalyticsTableCell}
                style={{
                  height: "40px",
                  maxWidth: "60px",
                  textAlign: "center",
                }}
              >
                No Of Suggestion
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.nofsugg.u}
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.nofsugg.d}
              </div>
            </div>
            <div className={RRRAnalyticsTableRow} style={{ border: "none" }}>
              <div
                className={RRRAnalyticsTableCell}
                style={{
                  height: "40px",
                  maxWidth: "60px",
                  textAlign: "center",
                }}
              >
                Suggestion Accepted
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.acc.u}
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.acc.d}
              </div>
            </div>
            <div className={RRRAnalyticsTableRow} style={{ border: "none" }}>
              <div
                className={RRRAnalyticsTableCell}
                style={{
                  height: "40px",
                  maxWidth: "60px",
                  textAlign: "center",
                }}
              >
                Suggestion Put On Sleep
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.sleep.u}
              </div>
              <div className={RRRAnalyticsTableCell} style={{ height: "40px" }}>
                {rowData.sleep.d}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBMAnalytics;
