import React, { useMemo, useState } from "react";
import {
  BPRDailyAnalyticsWrapper,
  BPRDailyAnalyticsContainer,
  BPRDailyAnalyticsHeader,
  BPRDailyAnalyticsTableContainer,
  BPRDailyAnalyticsTableHeaderContainer,
  BPRDailyAnalyticsTableHeader,
  BPRDailyAnalyticsTableRowContainer,
  BPRDailyAnalyticsTableRow,
  BPRDailyAnalyticsTableCell,
  BPRDailyAnalyticsTableCellHeader,
} from "./style.css";

import { useGetReasonForPoogiAnalytics } from "../../../../../VectorFlow/Services/MTO/Poogi/ReasonOrderChange/index";

const ReasonsOrderAnalyticalScreen = () => {
  const { data, isLoading /*refetch*/ } = useGetReasonForPoogiAnalytics();
  const analyticsData = useMemo(() => {
    if (!data) return [];
    return data?.data?.data;
  }, [isLoading]);

  const [rowData] = useState([
    {
      headerName: "Order\n Status",
    },
    {
      headerName: "Unassigned",
    },
    {
      headerName: "Assigned",
    },
    {
      headerName: "Order\n Count",
    },
  ]);

  if (!analyticsData) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className={BPRDailyAnalyticsWrapper}>
      <div className={BPRDailyAnalyticsContainer}>
        <div className={BPRDailyAnalyticsHeader}>Analytics</div>

        <div className={BPRDailyAnalyticsTableContainer}>
          <div
            className={BPRDailyAnalyticsTableHeaderContainer}
            style={{
              wordWrap: "break-word",
              borderTop: "1px white dashed",
              borderBottom: "1px dashed white",
            }}
          >
            {rowData.map((data) => {
              return (
                <div className={BPRDailyAnalyticsTableHeader}>
                  {data.headerName}
                </div>
              );
            })}
          </div>
        </div>

        <div className={BPRDailyAnalyticsTableRowContainer}>
          {/**for Closed */}
          <div
            className={BPRDailyAnalyticsTableRow}
            style={{
              height: 30,
              boxShadow: "none",
              backgroundColor: "transparent",
              borderBottom: "1px white solid",
              borderRadius: 0,
            }}
          >
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                Closed
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData?.closed?.unassigned}
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.closed.assigned}
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.closed.total_count}
              </p>
            </div>
          </div>

          {/**for Open */}
          <div
            className={BPRDailyAnalyticsTableRow}
            style={{
              height: 30,
              boxShadow: "none",
              backgroundColor: "transparent",
              borderBottom: "1px white solid",
              borderRadius: 0,
            }}
          >
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                Open
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.open.unassigned}
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.open.assigned}
              </p>
            </div>

            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.open.total_count}
              </p>
            </div>
          </div>

          <div
            className={BPRDailyAnalyticsTableRow}
            style={{
              height: 30,
              boxShadow: "none",
              backgroundColor: "black",
              borderRadius: 0,
            }}
          >
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                Total
              </p>
            </div>
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.closed.unassigned +
                  analyticsData.open.unassigned}
              </p>
            </div>
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {Number(analyticsData.closed.assigned) +
                  Number(analyticsData.open.assigned)}
              </p>
            </div>
            <div className={BPRDailyAnalyticsTableCell}>
              <p
                className={BPRDailyAnalyticsTableCellHeader}
                style={{ color: "white" }}
              >
                {analyticsData.closed.total_count +
                  analyticsData.open.total_count}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReasonsOrderAnalyticalScreen;
