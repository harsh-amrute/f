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
  // new helpers
  pl4,
  maxW40,
  fullW,
  rrrTotalRow,
  rrrColorBg,
  analyticsBgVar,
  analyticsTextVar,
  separatorColorVar,
} from "./styles.css";
import * as globalStyles from "../../../../../styles/global";
import { assignInlineVars } from '@vanilla-extract/dynamic';

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

  const bg =
    themeUi === "NOIRFUSION"
      ? globalStyles.chooseThemeColor[themeUi].color3
      : globalStyles.chooseThemeColor[themeUi].color1;

  const text = themeUi === "PUREELEGANCE" ? "black" : "white";
  const sepColor = themeUi === "PUREELEGANCE" ? "black" : "white";

  return (
    <div className={RRRAnalyticsWrapper}>
      <div
        className={RRRAnalyticsContainer}
        style={assignInlineVars({
          [analyticsBgVar]: bg,
          [analyticsTextVar]: text,
        })}
        >
        <div className={`${RRRAnalyticsHeader} ${pl4}`}>Analytics</div>

        <div className={RRRAnalyticsTableContainer}>
          <div className={RRRAnalyticsTableHeaderWrapper}>
            <div className={`${RRRAnalyticsTableHeader} ${maxW40}`}>Colors</div>

            <div className={RRRAnalyticsTableHeader}>
              <div className={RRRAnalyticsTableSubHeader}>Requirement</div>
              <div className={RRRAnalyticsTableSubHeader}>
                <div
                  className={`${RRRAnalyticsTableSubHeaderSection} ${fullW}`}
                >
                  Qty
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                  />
                <div className={RRRAnalyticsTableSubHeaderSection}>SKU Loc</div>
              </div>
            </div>

            <div className={RRRAnalyticsTableHeader}>
              <div className={RRRAnalyticsTableSubHeader}>Rationing</div>
              <div className={RRRAnalyticsTableSubHeader}>
                <div
                  className={`${RRRAnalyticsTableSubHeaderSection} ${fullW}`}
                >
                  Qty
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableSubHeaderSection}>SKU Loc</div>
              </div>
            </div>
          </div>

          <div className={RRRAnalyticsTableRowContainer}>
            {/* BLACK ROW */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={`${RRRAnalyticsTableColorCell} ${rrrColorBg.black}`}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.br}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.bc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.brr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.brc}</div>
              </div>
            </div>

            {/* RED ROW */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={`${RRRAnalyticsTableColorCell} ${rrrColorBg.red}`}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.rr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.rc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.rrr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.rrc}</div>
              </div>
            </div>

            {/* YELLOW ROW */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={`${RRRAnalyticsTableColorCell} ${rrrColorBg.yellow}`}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.yr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.yc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.yrr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.yrc}</div>
              </div>
            </div>

            {/* GREEN ROW */}
            <div className={RRRAnalyticsTableRow}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>
                <div
                  className={`${RRRAnalyticsTableColorCell} ${rrrColorBg.green}`}
                />
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.gr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.gc}</div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {rowData.grr}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: sepColor })}
                />
                <div className={RRRAnalyticsTableCustomCell}>{rowData.grc}</div>
              </div>
            </div>

            {/* TOTAL ROW */}
            <div className={`${RRRAnalyticsTableRow} ${rrrTotalRow}`}>
              <div className={`${RRRAnalyticsTableCell} ${maxW40}`}>Total</div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {summation.rt}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: "white" })}
                />
                <div className={RRRAnalyticsTableCustomCell}>
                  {summation.ct}
                </div>
              </div>

              <div className={RRRAnalyticsTableCell}>
                <div className={`${RRRAnalyticsTableCustomCell} ${fullW}`}>
                  {summation.rrt}
                </div>
                <div
                  className={RRRAnalyticsSeperator}
                  style={assignInlineVars({ [separatorColorVar]: "white" })}
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
