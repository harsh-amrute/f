import { ColDef } from "ag-grid-enterprise";
import React, { useMemo, useState } from "react";
import { BMReportAnaytics } from "./helper";
import { useSelector } from "react-redux";
import * as globalStyles from "../../../../../styles/global";

import {
  BPRDailyAnalyticsHeader,
  BPRDailyAnalyticsContainer,
  BPRDailyAnalyticsTableCell,
  BPRDailyAnalyticsTableContainer,
  BPRDailyAnalyticsTableHeader,
  BPRDailyAnalyticsTableHeaderContainer,
  BPRDailyAnalyticsTableRow,
  BPRDailyAnalyticsTableRowContainer,
  BPRDailyAnalyticStatusBar,
  BPRDailyAnalyticsWrapper,
  BPRDailyAnalyticsTableChangeIcon,
  BPRDailyAnalyticsTableNoChangeWrapper,
  BPRDailyAnalyticStatusBarSection,
  BPRDailyAnalyticsTableCellHeader,
  BPRDailyAnalyticsTableCellText,
} from "./styles.css";
import Tooltip from "../../Common/Tooltip";
import {
  analyticsHeaderBorderColorVar,
  analyticsBgVar,
  analyticsTextColorVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useUserData } from "../../../../../context";

const DeptWiseAnalytics = () => {
  const [isLoading] = useState<boolean>(false);

  const rowData = useSelector((state: any) => state.mto.BMReportAnalytics);

  const colHeaders: any = [
    { headerName: "color" },
    { headerName: "Procurement" },
    { headerName: "Production" },
  ];

  // const rowData: any = [
  //     {
  //         color: 'black',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: -10,
  //         ProdValue: 20
  //     },
  //     {
  //         color: 'red',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: -10,
  //         ProdValue: 10
  //     },
  //     {
  //         color: 'yellow',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: 10,
  //         ProdValue: -5
  //     },
  //     {
  //         color: 'green',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: 0,
  //         ProdValue: 0

  //     },
  //     {
  //         color: 'blue',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: -2,
  //         ProdValue: -2
  //     },
  //     {
  //         color: 'white',
  //         ProcCount: 100,
  //         ProcPer: 20,
  //         ProdCount: 80,
  //         ProdPer: 15,
  //         ProcValue: 2,
  //         ProdValue: -2
  //     }

  // ]

  const summation = useMemo(() => {
    let total = 0;
    rowData?.forEach((row: any) => {
      total += row.ProcCount + row.ProdCount;
    });
    return total;
  }, []);

  const getCellIcons = (value: BMReportAnaytics) => {
    if (value == BMReportAnaytics.INCREASE) {
      return (
        <img
          className={BPRDailyAnalyticsTableChangeIcon}
          src="/assets/img/VectorFLOW/BPR/analytics-increase.svg"
        />
      );
    }

    if (value == BMReportAnaytics.DECREASE) {
      return (
        <img
          className={BPRDailyAnalyticsTableChangeIcon}
          src="/assets/img/VectorFLOW/BPR/analytics-decrease.svg"
          style={{ transform: "rotate(90deg)" }}
        />
      );
    }

    if (value == BMReportAnaytics.INCREASE_DECREASE) {
      return (
        <div className={BPRDailyAnalyticsTableNoChangeWrapper}>
          <img
            className={BPRDailyAnalyticsTableChangeIcon}
            src="/assets/img/VectorFLOW/BPR/analytics-increase.svg"
          />
          <img
            className={BPRDailyAnalyticsTableChangeIcon}
            src="/assets/img/VectorFLOW/BPR/analytics-decrease.svg"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>
      );
    }

    if (value == BMReportAnaytics.DECREASE_INCREASE) {
      return (
        <div className={BPRDailyAnalyticsTableNoChangeWrapper}>
          <img
            className={BPRDailyAnalyticsTableChangeIcon}
            src="/assets/img/VectorFLOW/BPR/analytics-decrease.svg"
            style={{ transform: "rotate(90deg)" }}
          />
          <img
            className={BPRDailyAnalyticsTableChangeIcon}
            src="/assets/img/VectorFLOW/BPR/analytics-increase.svg"
          />
        </div>
      );
    }
  };

  const { user } = useUserData();
  const themeUi = user?.user?.theme_ui;
  const themeColor = (themeUi && themeUi === 'NOIRFUSION') ? globalStyles.chooseThemeColor[themeUi]?.color3 : "#383737";

  if (isLoading) {
    return (
      <div className={BPRDailyAnalyticsWrapper}>
        <div
          className={BPRDailyAnalyticsContainer}
          style={assignInlineVars({  
          aspectRatio:'0.9',
          width:'90%',        
          [analyticsBgVar]: themeColor,
          [analyticsTextColorVar]: "white",
      })}
        >
          <div className={BPRDailyAnalyticsHeader}
             style={assignInlineVars({          
              [analyticsHeaderBorderColorVar]: 'white',
          })}
            >
            Analytics (For all orders)
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <p style={{ color: "white" }}>________</p>
          </div>
        </div>
      </div>
    );
  }

  if (!rowData || !Array.isArray(rowData) || rowData.length === 0) {
    return (
      <div className={BPRDailyAnalyticsWrapper}>
        <div
          className={BPRDailyAnalyticsContainer}
          style={{ aspectRatio: "0.9", width: "90%" }}        
        >
          <div className={BPRDailyAnalyticsHeader}>
            Analytics (For all orders)
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <p style={{ color: "white" }}>No data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={BPRDailyAnalyticsWrapper}>
      <div className={BPRDailyAnalyticsContainer}  style={assignInlineVars({
            [analyticsBgVar]: themeColor,                  // bg 
            [analyticsTextColorVar]: "white",             // text color
          })}>
        <div className={BPRDailyAnalyticsHeader}   style={assignInlineVars({          
              [analyticsHeaderBorderColorVar]: 'white',
          })}>
          Analytics (For all orders)
        </div>
        <div className={BPRDailyAnalyticsTableContainer}>
          <div className={BPRDailyAnalyticsTableHeaderContainer}>
            {colHeaders.map((colDef: ColDef) => {
              if (colDef.headerName === "color") {
                return (
                  <div
                    className={BPRDailyAnalyticsTableHeader}
                    style={{ width: 33 }}
                  />
                );
              }
              return (
                <div className={BPRDailyAnalyticsTableHeader}>
                  {colDef.headerName}
                </div>
              );
            })}
          </div>
          <div className={BPRDailyAnalyticsTableRowContainer}>
            {rowData.map((row: any) => {
              return (
                <div className={BPRDailyAnalyticsTableRow}>
                  {Object.keys(row).map((key: string) => {
                    if (key === "color") {
                      return (
                        <div
                          className={BPRDailyAnalyticsTableCell}
                          style={{
                            backgroundColor: row[key],
                            width: 60,
                            boxShadow: "0px 3px 12px #AFAFAF",
                          }}
                        />
                      );
                    }
                    if (key == "ProcCount") {
                      return (
                        <React.Fragment>
                          <div className={BPRDailyAnalyticsTableCell}>
                            <p className={BPRDailyAnalyticsTableCellHeader}>
                              {row.ProcCount}
                            </p>
                            <p className={BPRDailyAnalyticsTableCellText}>
                              {row.ProcPer + "%"}
                            </p>
                          </div>
                          <div className={BPRDailyAnalyticsTableCell}>
                            <Tooltip
                              disableStyleInjection="core"
                              content={
                                <div
                                  style={{
                                    padding: "0.5rem 1rem",
                                    fontSize: "12px",
                                  }}
                                >
                                  {row.ProcPer}%
                                </div>
                              }
                              tooltipZoom={1}
                            >
                              {getCellIcons(row.ProcValue)}
                            </Tooltip>
                          </div>
                        </React.Fragment>
                      );
                    }
                    if (key === "ProdCount") {
                      return (
                        <React.Fragment>
                          <div className={BPRDailyAnalyticsTableCell}>
                            <p className={BPRDailyAnalyticsTableCellHeader}>
                              {row.ProdCount}
                            </p>
                            <p className={BPRDailyAnalyticsTableCellText}>
                              {row.ProdPer + "%"}
                            </p>
                          </div>
                          <div className={BPRDailyAnalyticsTableCell}>
                            <Tooltip
                              disableStyleInjection="core"
                              content={
                                <div
                                  style={{
                                    padding: "0.5rem 1rem",
                                    fontSize: "12px",
                                  }}
                                >
                                  {row.ProdPer}%
                                </div>
                              }
                              tooltipZoom={1}
                            >
                              {getCellIcons(row.ProdValue)}
                            </Tooltip>
                          </div>
                        </React.Fragment>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className={BPRDailyAnalyticStatusBar} style={{ margin: "0 1rem" }}>
          <div className={BPRDailyAnalyticStatusBarSection}>Total</div>
          <div className={BPRDailyAnalyticStatusBarSection}>{summation}</div>
        </div>
      </div>
    </div>
  );
};

export default DeptWiseAnalytics;
