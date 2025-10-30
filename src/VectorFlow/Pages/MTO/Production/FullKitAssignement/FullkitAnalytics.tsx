import React, { useState } from "react";
import {
  BPRDailyAnalyticsHeader,
  BPRDailyAnalyticsContainer,
  BPRDailyAnalyticsTableCell,
  BPRDailyAnalyticsTableContainer,
  BPRDailyAnalyticsTableHeader,
  BPRDailyAnalyticsTableHeaderContainer,
  BPRDailyAnalyticsTableRow,
  BPRDailyAnalyticsTableRowContainer,
  BPRDailyAnalyticsWrapper,
  BPRDailyAnalyticsTableCellHeader,
} from "./FullKitAssignment.styled.css";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../../../redux/store/store';
import { formatNumber } from "../../Procurement/MaterialCoverage/CommonFunc";

const FullkitAnalytics = () => {
  //AnalyticsData
  let totalOrderCount = 0;
  let totalCustCount = 0;
  let totalOrderVal = 0;
  const options = {
    Order: [
      {
        currFull: 46,
        incFull: 29,
        cummFull: 600107,
        stdt: 0,
        endt: 0,
        color: "#000",
      },
      {
        currFull: 55,
        incFull: 29,
        cummFull: 91291,
        stdt: 0,
        endt: 0,
        color: "#F02424",
      },
      {
        currFull: 104,
        incFull: 45,
        cummFull: 148399,
        stdt: 0,
        endt: 0,
        color: "#EBBF2B",
      },
      {
        currFull: 70,
        incFull: 33,
        cummFull: 135589,
        stdt: 0,
        endt: 0,
        color: "#418D18",
      },
      {
        currFull: 30,
        incFull: 40,
        cummFull: 135589,
        stdt: 0,
        endt: 0,
        color: "#ffffff",
      },
      {
        currFull: 5,
        incFull: 5,
        cummFull: 54775,
        stdt: 8,
        endt: 15,
        color: "#355FD3",
      },
    ],
  };

  const [rowData] = useState([
    {
      headerName: "",
    },
    {
      headerName: "Orders In Full Kit",
    },
    {
      headerName: "Orders In Partial Kit",
    },
    {
      headerName: "Orders In No Kit",
    },
  ]);

  options?.Order?.map((o: any) => {
    totalOrderCount += o.currFull;
    totalCustCount += o.incFull;
    totalOrderVal += o.currFull + o.incFull;
  });

  if (!options.Order) {
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
              borderTop: "1px white solid",
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
          <div className={BPRDailyAnalyticsTableRowContainer}>
            {options?.Order?.map((o: any) => {
              return (
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
                  {o.color === "#355FD3" ? (
                    <div className={BPRDailyAnalyticsTableCell}>
                      <div
                        style={{
                          height: 20,
                          width: 20,
                          background:
                            "linear-gradient(148deg, rgba(252,252,252,1) 0%, rgba(56,118,255,1) 71%, rgba(56,118,255,1) 100%)",
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div className={BPRDailyAnalyticsTableCell}>
                      <div
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: o.color,
                        }}
                      ></div>
                    </div>
                  )}
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {o.currFull}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {o.incFull}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {formatNumber(o.currFull + o.incFull)}
                    </p>
                  </div>
                </div>
              );
            })}

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
                  {totalOrderCount}
                </p>
              </div>
              <div className={BPRDailyAnalyticsTableCell}>
                <p
                  className={BPRDailyAnalyticsTableCellHeader}
                  style={{ color: "white" }}
                >
                  {totalCustCount}
                </p>
              </div>
              <div className={BPRDailyAnalyticsTableCell}>
                <p
                  className={BPRDailyAnalyticsTableCellHeader}
                  style={{ color: "white" }}
                >
                  {totalOrderVal}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullkitAnalytics;
