import { ColDef } from "ag-grid-enterprise";
import React, { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../../redux/store/store";
import { routerToAnalyticsStringMap } from "../../../../helpers/BPRConstants";
import { useGetAnalyticsData } from "../../../../VectorFlow/Services/MTA/SupplyChainIntelligenceHub/BPR";

import { isBefore } from "date-fns";
import { assignInlineVars } from "@vanilla-extract/dynamic";
// If you have a central theme map, import it:
import * as globalstyles from "../../../../styles/global";

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
  BPRDailyAnalyticsTableCellIcon,
  containerBgVar,
  containerTextVar,
  headerBorderVar,
  rotate90,
} from "./styles.css";

import { useUserData } from "../../../../context";

interface BPRDailyAnalyticsProps {
  colDefs: ColDef[];
}

const BPRDailyAnalytics = (props: BPRDailyAnalyticsProps) => {
  const { colDefs } = props;
  const [rowData, setRowData] = useState<Array<any>>([]);

  const location = useLocation();
  const { currentCategory, currentTab, currentView } = useSelector(
    (state: RootState) => state.mta.planning
  );
  const { mutateAsync: getAnalyticsData, isLoading } = useGetAnalyticsData();

  const { user } = useUserData();

  const themeUi = user.user.theme_ui;

  const summation = useMemo(() => {
    let temp = 0;
    rowData.forEach((row: any) => {
      temp += row.techCount;
    });
    return temp;
  }, [rowData]);

  function calculatePercentIncrease(data: Array<any>) {
    //if (data.length < 2) {
    //  notifyError("Insufficient data to calculate percent increase")
    //}

    const todaysDateIndex = isBefore(data[0].ReportDate, data[1].ReportDate)
      ? 1
      : 0;
    const yesterdayDateIndex =
      (todaysDateIndex - 1 + data.length) % data.length;

    const today = data[todaysDateIndex];
    const yesterday = data[yesterdayDateIndex];

    const percentIncrease: any = {};

    const colors = ["Black", "Red", "Yellow", "Green", "White", "Blue"];

    for (const color of colors) {
      const onHandToday = today[`OnHand${color}`];
      const onHandYesterday = yesterday[`OnHand${color}`];
      const pipelineToday = today[`Pipeline${color}`];
      const pipelineYesterday = yesterday[`Pipeline${color}`];

      percentIncrease[`OnHand${color}`] =
        onHandYesterday - onHandToday !== 0
          ? onHandYesterday !== undefined && onHandYesterday !== 0
            ? parseFloat(
                (
                  ((onHandToday - onHandYesterday) / onHandYesterday) *
                  100
                ).toFixed(2)
              )
            : null
          : 0;
      percentIncrease[`Pipeline${color}`] =
        pipelineYesterday - pipelineToday !== 0
          ? pipelineYesterday !== undefined && pipelineYesterday !== 0
            ? parseFloat(
                (
                  ((pipelineToday - pipelineYesterday) / pipelineYesterday) *
                  100
                ).toFixed(2)
              )
            : null
          : 0;
    }
    const result = [];
    for (const color of colors) {
      const obj = {
        color: color,
        techCount: today[`OnHand${color}`],
        techChange: percentIncrease[`OnHand${color}`],
        ecoCount: today[`Pipeline${color}`],
        ecoChange: percentIncrease[`Pipeline${color}`],
      };
      result.push(obj);
    }
    return result;
  }

  const onGetAnalyticsData = async () => {
    const pathname: string = location.pathname;
    let payloadString = "";
    if (location.pathname === "/mta/supply-chain-intelligence-hub/planning") {
      if (currentCategory !== "") {
        switch (currentCategory) {
          case "GITFromParent":
            payloadString = "gitparent";
            break;
          case "GITToChild":
            payloadString =
              currentTab === "locationWise"
                ? "gitchildlocation"
                : "gitchildtransporter";
            break;
          case "ExpediteFromParent":
            payloadString = "expediteparent";
            break;
          case "ExpediteToChild":
            payloadString = "expeditechild";
            break;
          case "ExcessInventory":
            payloadString = "excessinventory";
            break;
          case "OrderFulfillment":
            payloadString = "orderfulfillment";
            break;
          default:
            return;
        }
      } else {
        payloadString = "planning";
      }
    } else payloadString = routerToAnalyticsStringMap[pathname];
    try {
      const data = await getAnalyticsData({ reportname: payloadString });
      setRowData(calculatePercentIncrease(data.data.data));
      // setRowData(calculatePercentIncrease([
      //     {
      //       "ReportDate": "2024-05-29",
      //       "OnHandBlack": 10,
      //       "OnHandRed": 1297,
      //       "OnHandYellow": 597,
      //       "OnHandGreen": 546,
      //       "OnHandWhite": 138,
      //       "OnHandBlue": 21,
      //       "PipelineBlack": 2077,
      //       "PipelineRed": 1284,
      //       "PipelineYellow": 672,
      //       "PipelineGreen": 629,
      //       "PipelineWhite": 159,
      //       "PipelineBlue": 35
      //     },
      //     {
      //       "ReportDate": "2024-05-30",
      //       "OnHandBlack": 0,
      //       "OnHandRed": 1337,
      //       "OnHandYellow": 587,
      //       "OnHandGreen": 537,
      //       "OnHandWhite": 40,
      //       "OnHandBlue": 25,
      //       "PipelineBlack": 2189,
      //       "PipelineRed": 1323,
      //       "PipelineYellow": 646,
      //       "PipelineGreen": 619,
      //       "PipelineWhite": 44,
      //       "PipelineBlue": 35
      //     }
      //   ]))
    } catch (err: any) {
      setRowData([]);
    }
  };

  useEffect(() => {
    onGetAnalyticsData();
  }, [location.pathname, currentCategory, currentView, currentTab]);

  const getCellText = (text: any, colKey: string) => {
    if (colKey === "techChange" || colKey === "ecoChange") {
      if (text === 0) return "0%";
      if (!text)
        return (
          <img
            className={BPRDailyAnalyticsTableCellIcon}
            src="/assets/img/VectorFLOW/BPR/infinity.svg"
          />
        );
      text = String(text);
      if (text.startsWith("-")) {
        return `${text.slice(1)}%`;
      }
      return `${text}%`;
    }
    return text;
  };

  const cx = (...xs: Array<string | false | null | undefined>) =>
    xs.filter(Boolean).join(" ");

  const getCellIcons = (value: number) => {
    if (value > 0) {
      return (
        <img
          className={BPRDailyAnalyticsTableChangeIcon}
          src="/assets/img/VectorFLOW/BPR/analytics-increase.svg"
          alt="increase"
        />
      );
    }
    if (value < 0) {
      return (
        <img
          className={cx(BPRDailyAnalyticsTableChangeIcon, rotate90)}
          src="/assets/img/VectorFLOW/BPR/analytics-decrease.svg"
          alt="decrease"
        />
      );
    }
    return (
      <div className={BPRDailyAnalyticsTableNoChangeWrapper}>
        <img
          className={BPRDailyAnalyticsTableChangeIcon}
          src="/assets/img/VectorFLOW/BPR/analytics-increase.svg"
          alt="no change up"
        />
        <img
          className={cx(BPRDailyAnalyticsTableChangeIcon, rotate90)}
          src="/assets/img/VectorFLOW/BPR/analytics-decrease.svg"
          alt="no change down"
        />
      </div>
    );
  };
  const bg =
    themeUi === "NOIRFUSION"
      ? globalstyles.chooseThemeColor[themeUi].color3
      : globalstyles.chooseThemeColor[themeUi].color1;
  const text = themeUi === "PUREELEGANCE" ? "black" : "white";
  const headerBorder = text;

  const containerVars = assignInlineVars({
    [containerBgVar]: bg,
    [containerTextVar]: text,
    [headerBorderVar]: headerBorder,
  });

  if (isLoading) {
    return (
      <div className={BPRDailyAnalyticsWrapper}>
        <div
          className={BPRDailyAnalyticsContainer}
          style={{ aspectRatio: "0.9", width: "90%", ...containerVars }}
        >
          <div className={BPRDailyAnalyticsHeader}>
            Analytics (SKU Locations)
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
          style={{ aspectRatio: "0.9", width: "90%", ...containerVars }}
        >
          <div className={BPRDailyAnalyticsHeader}>
            Analytics (SKU Locations)
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
            }}
          >
            <p style={{ color: "white" }}>No data to show</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={BPRDailyAnalyticsWrapper}>
      <div className={BPRDailyAnalyticsContainer} style={containerVars}>
        <div className={BPRDailyAnalyticsHeader}>Analytics (SKU Locations)</div>

        <div className={BPRDailyAnalyticsTableContainer}>
          <div className={BPRDailyAnalyticsTableHeaderContainer}>
            {colDefs.map((colDef, i) =>
              colDef.colId === "color" ? (
                <div
                  key={i}
                  className={BPRDailyAnalyticsTableHeader}
                  style={{ width: 25 }}
                />
              ) : (
                <div key={i} className={BPRDailyAnalyticsTableHeader}>
                  {colDef.headerName}
                </div>
              )
            )}
          </div>

          <div className={BPRDailyAnalyticsTableRowContainer}>
            {rowData.map((row, rIdx) => (
              <div key={rIdx} className={BPRDailyAnalyticsTableRow}>
                {Object.keys(row).map((key, cIdx) => {
                  if (key === "color") {
                    return (
                      <div
                        key={`${rIdx}-color-${cIdx}`}
                        className={BPRDailyAnalyticsTableCell}
                        style={{
                          backgroundColor: row[key],
                          width: 60,
                          boxShadow: "0px 3px 12px #AFAFAF",
                        }}
                      />
                    );
                  }

                  if (key === "techCount") {
                    return (
                      <React.Fragment key={`${rIdx}-tech-${cIdx}`}>
                        <div className={BPRDailyAnalyticsTableCell}>
                          <p className={BPRDailyAnalyticsTableCellHeader}>
                            {getCellText(row[key], key)}
                          </p>
                          <p className={BPRDailyAnalyticsTableCellText}>
                            {getCellText(row.techChange, "techChange")}
                          </p>
                        </div>
                        <div className={BPRDailyAnalyticsTableCell}>
                          {getCellIcons(row.techChange)}
                        </div>
                      </React.Fragment>
                    );
                  }

                  if (key === "ecoCount") {
                    return (
                      <React.Fragment key={`${rIdx}-eco-${cIdx}`}>
                        <div className={BPRDailyAnalyticsTableCell}>
                          <p className={BPRDailyAnalyticsTableCellHeader}>
                            {getCellText(row[key], key)}
                          </p>
                          <p className={BPRDailyAnalyticsTableCellText}>
                            {getCellText(row.ecoChange, "ecoChange")}
                          </p>
                        </div>
                        <div className={BPRDailyAnalyticsTableCell}>
                          {getCellIcons(row.ecoChange)}
                        </div>
                      </React.Fragment>
                    );
                  }

                  return null;
                })}
              </div>
            ))}
          </div>
        </div>

        <div className={BPRDailyAnalyticStatusBar}>
          <div className={BPRDailyAnalyticStatusBarSection}>Total</div>
          <div className={BPRDailyAnalyticStatusBarSection}>{summation}</div>
        </div>
      </div>
    </div>
  );
};

export default BPRDailyAnalytics;
