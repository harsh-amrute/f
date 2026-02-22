import React, { useState } from "react";
import {
  bprWrapper,
  bprContainer,
  bprHeader,
  bprTableContainer,
  bprHeaderContainer,
  bprHeaderCell,
  bprRowContainer,
  bprRow,
  bprCell,
  bprCellHeader,
} from "./styles.css";
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../../../../redux/store/store';
import { formatNumber } from "../../MaterialCoverage/CommonFunc";

const SimAnalyticalScreen = () => {
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
      headerName: "Current Full Kit",
    },
    {
      headerName: "Incremental Full Kit",
    },
    {
      headerName: "Cummulative Full Kit",
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
    <div className={bprWrapper}>
      <div className={bprContainer}>
        <div className={bprHeader}>Analytics</div>

        <div className={bprTableContainer}>
          <div
            className={bprHeaderContainer}
            style={{
              borderTop: "1px white solid",
              borderBottom: "1px dashed white",
            }}
          >
            {rowData.map((data) => (
              <div key={data.headerName} className={bprHeaderCell}>
                {data.headerName}
              </div>
            ))}
          </div>

          <div className={bprRowContainer}>
            {options?.Order?.map((o: any, idx: number) => (
              <div
                key={idx}
                className={bprRow}
                style={{
                  height: 30,
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  borderBottom: "1px white solid",
                  borderRadius: 0,
                }}
              >
                <div className={bprCell}>
                  <div
                    style={
                      o.color === "#355FD3"
                        ? {
                            height: 20,
                            width: 20,
                            background:
                              "linear-gradient(148deg, rgba(252,252,252,1) 0%, rgba(56,118,255,1) 71%, rgba(56,118,255,1) 100%)",
                          }
                        : { height: 20, width: 20, backgroundColor: o.color }
                    }
                  />
                </div>

                <div className={bprCell}>
                  <p className={bprCellHeader} style={{ color: "white" }}>
                    {o.currFull}
                  </p>
                </div>

                <div className={bprCell}>
                  <p className={bprCellHeader} style={{ color: "white" }}>
                    {o.incFull}
                  </p>
                </div>

                <div className={bprCell}>
                  <p className={bprCellHeader} style={{ color: "white" }}>
                    {formatNumber(o.currFull + o.incFull)}
                  </p>
                </div>
              </div>
            ))}

            <div
              className={bprRow}
              style={{
                height: 30,
                boxShadow: "none",
                backgroundColor: "black",
                borderRadius: 0,
              }}
            >
              <div className={bprCell}>
                <p className={bprCellHeader} style={{ color: "white" }}>
                  Total
                </p>
              </div>
              <div className={bprCell}>
                <p className={bprCellHeader} style={{ color: "white" }}>
                  {totalOrderCount}
                </p>
              </div>
              <div className={bprCell}>
                <p className={bprCellHeader} style={{ color: "white" }}>
                  {totalCustCount}
                </p>
              </div>
              <div className={bprCell}>
                <p className={bprCellHeader} style={{ color: "white" }}>
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

export default SimAnalyticalScreen;
