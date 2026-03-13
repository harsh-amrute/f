import { useMemo } from "react";
import { useUserData } from "../../../../../context";
import {
  RRRAnalyticsContainer,
  RRRAnalyticsHeader,
  RRRAnalyticsTableContainer,
  RRRAnalyticsTableHeaderWrapper,
  RRRAnalyticsWrapper,
  RRRAnalyticsTableHeader,
  RRRAnalyticsTableSubHeader,
  RRRAnalyticsTableSubHeaderSection,
  RRRAnalyticsSeperator,
  RRRAnalyticsTableRowContainer,
  RRRAnalyticsTableRow,
  RRRAnalyticsTableCell,
  RRRAnalyticsTableColorCell,
  RRRAnalyticsTableCustomCell,
  RRRAnalyticsTableColorCellLabel,
  rrrBgVar,
  rrrTextVar,
  rrrSepVar,
  maxW40,
  w100,
  totalRow,
  noBorder,
} from "../RationedRequirementReport/styles.css";
import { useGetBORAnalyticsData } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BuyerOrderReport";
import _ from "lodash";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../../../styles/global";

const BORAnalytics = () => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const { data } = useGetBORAnalyticsData();

  const rowData = useMemo(() => {
    if (data && data.data && data.data.data && Array.isArray(data.data.data)) {
      const result: any = {};
      const rawData = _.omit(data.data.data[0], "tob");
      Object.keys(rawData).map((k: string) => {
        result[k] = rawData[k][0];
      });
      return result;
    }
    return {
      tor: {
        rs: 0,
        ns: 0,
        sc: 0,
      },
      toy: {
        rs: 0,
        ns: 0,
        sc: 0,
      },
      tog: {
        rs: 0,
        ns: 0,
        sc: 0,
      },
    };
  }, [data]);

  const summation = useMemo(() => {
    return {
      ns: rowData.tor.ns + rowData.toy.ns + rowData.tog.ns,
      rs: rowData.tor.rs + rowData.toy.rs + rowData.tog.rs,
      sc: rowData.tor.sc + rowData.toy.sc + rowData.tog.sc,
    };
  }, [rowData]);
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
        <div className={RRRAnalyticsTableContainer}>
          <div className={RRRAnalyticsTableHeaderWrapper}>
            <div
              className={RRRAnalyticsTableHeader}
              style={{ maxWidth: "60px" }}
            >
              Colors
            </div>
            <div className={RRRAnalyticsTableHeader}>
              <div className={RRRAnalyticsTableSubHeader}>Requirement</div>
              <div className={RRRAnalyticsTableSubHeader}>
                <div className={RRRAnalyticsTableSubHeaderSection}>SKU Loc</div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableSubHeaderSection}>Req Sum</div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableSubHeaderSection}>
                  Unique Supp. Count
                </div>
              </div>
            </div>
          </div>
          <div className={RRRAnalyticsTableRowContainer}>
            <div className={RRRAnalyticsTableRow}>
              <div
                className={RRRAnalyticsTableCell}
                style={{ maxWidth: "60px" }}
              >
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#F02424" }}
                />
                <p className={RRRAnalyticsTableColorCellLabel}>TOR</p>
              </div>
              <div className={RRRAnalyticsTableCell}>
                <div
                  className={RRRAnalyticsTableCustomCell}
                  style={{ width: "100%" }}
                >
                  {rowData.tor.ns}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.tor.rs}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.tor.sc}
                </div>
              </div>
            </div>
            <div className={RRRAnalyticsTableRow}>
              <div
                className={RRRAnalyticsTableCell}
                style={{ maxWidth: "60px" }}
              >
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#E3B92D" }}
                />
                <p className={RRRAnalyticsTableColorCellLabel}>TOY</p>
              </div>
              <div className={RRRAnalyticsTableCell}>
                <div
                  className={RRRAnalyticsTableCustomCell}
                  style={{ width: "100%" }}
                >
                  {rowData.toy.ns}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.toy.rs}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.toy.sc}
                </div>
              </div>
            </div>
            <div className={RRRAnalyticsTableRow} style={{ border: "none" }}>
              <div
                className={RRRAnalyticsTableCell}
                style={{ maxWidth: "60px" }}
              >
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#418D18" }}
                />
                <p className={RRRAnalyticsTableColorCellLabel}>TOG</p>
              </div>
              <div className={RRRAnalyticsTableCell}>
                <div
                  className={RRRAnalyticsTableCustomCell}
                  style={{ width: "100%" }}
                >
                  {rowData.tog.ns}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.tog.rs}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />{" "}
                <div className={RRRAnalyticsTableCustomCell}>
                  {rowData.tog.sc}
                </div>
              </div>
            </div>
            <div
              className={RRRAnalyticsTableRow}
              style={{
                color: "white",
                backgroundColor: "black",
                borderRadius: "0px 0px  4px 4px",
                margin: "0px -8px -4px -8px",
                width: "auto",
                padding: "0px 8px 0px  8px",
              }}
            >
              <div
                className={RRRAnalyticsTableCell}
                style={{ maxWidth: "60px" }}
              >
                Total
              </div>
              <div className={RRRAnalyticsTableCell}>
                <div
                  className={RRRAnalyticsTableCustomCell}
                  style={{ width: "100%" }}
                >
                  {summation.ns}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep, backgroundColor: "white" }}
                />
                <div className={RRRAnalyticsTableCustomCell}>
                  {summation.rs}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep, backgroundColor: "white" }}
                />
                <div className={RRRAnalyticsTableCustomCell}>
                  {summation.sc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BORAnalytics;
