import { useMemo } from "react";
import { useGetRRRAnalyticsData } from "../../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/RRR";
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
  rrrBgVar,
  rrrTextVar,
  rrrSepVar,
  maxW40,
  w100,
  totalRow,
  noBorder,
} from "./styles.css";
import * as globalStyles from "../../../../../styles/global";

const RRRAnalytics = () => {
  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const { data } = useGetRRRAnalyticsData();

  const rowData = useMemo(() => {
    if (data && data.data && data.data.data && Array.isArray(data.data.data))
      return data.data.data[0];
    return {
      br: 0,
      rr: 0,
      yr: 0,
      gr: 0,
      bc: 0,
      rc: 0,
      yc: 0,
      gc: 0,
      brr: 0,
      rrr: 0,
      yrr: 0,
      grr: 0,
      brc: 0,
      rrc: 0,
      yrc: 0,
      grc: 0,
    };
  }, [data]);

  const summation = useMemo(() => {
    return {
      rt: rowData.br + rowData.rr + rowData.yr + rowData.gr,
      ct: rowData.bc + rowData.rc + rowData.yc + rowData.gc,
      rrt: rowData.brr + rowData.rrr + rowData.yrr + rowData.grr,
      rct: rowData.brc + rowData.rrc + rowData.yrc + rowData.grc,
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
        <div className={RRRAnalyticsHeader} style={{ paddingLeft: "4px" }}>
          Analytics
        </div>

        <div className={RRRAnalyticsTableContainer}>
          <div className={RRRAnalyticsTableHeaderWrapper}>
            <div className={`${RRRAnalyticsTableHeader} ${maxW40}`}>Colors</div>

            <div className={RRRAnalyticsTableHeader}>
              <div className={RRRAnalyticsTableSubHeader}>Requirement</div>
              <div className={RRRAnalyticsTableSubHeader}>
                <div className={`${RRRAnalyticsTableSubHeaderSection} ${w100}`}>
                  Qty
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableSubHeaderSection}>SKU Loc</div>
              </div>
            </div>

            <div className={RRRAnalyticsTableHeader}>
              <div className={RRRAnalyticsTableSubHeader}>Rationing</div>
              <div className={RRRAnalyticsTableSubHeader}>
                <div className={`${RRRAnalyticsTableSubHeaderSection} ${w100}`}>
                  Qty
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableSubHeaderSection}>SKU Loc</div>
              </div>
            </div>
          </div>

          <div className={RRRAnalyticsTableRowContainer}>
            {/* Row 1 (Black) */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "black" }}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.br}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.bc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.brr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.brc}</div>
              </div>
            </div>

            {/* Row 2 (Red) */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#F02424" }}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.rr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.rc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.rrr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.rrc}</div>
              </div>
            </div>

            {/* Row 3 (Yellow) */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#E3B92D" }}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.yr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.yc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.yrr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.yrc}</div>
              </div>
            </div>

            {/* Row 4 (Green) — remove bottom border */}
            <div className={`${RRRAnalyticsTableRow} ${noBorder}`}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={RRRAnalyticsTableColorCell}
                  style={{ backgroundColor: "#418D18" }}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.gr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.gc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {rowData.grr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: sep }}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.grc}</div>
              </div>
            </div>

            {/* Total row */}
            <div className={totalRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>Total</div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {summation.rt}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: "white" }}
                />
                <div className={RRRAnalyticsTableCustomCell}>
                  {summation.ct}
                </div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${w100}`}>
                  {summation.rrt}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={{ [rrrSepVar as any]: "white" }}
                />
                <div className={RRRAnalyticsTableCustomCell}>
                  {summation.rct}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RRRAnalytics;
