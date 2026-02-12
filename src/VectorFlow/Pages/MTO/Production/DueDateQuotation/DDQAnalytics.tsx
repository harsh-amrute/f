import React, { useEffect, useState } from "react";
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
} from "./DueDateQuotation.styled.css";
import { formatNumber } from "../../Procurement/MaterialCoverage/CommonFunc";
import { useGetDDQAnalytics } from "../../../../../VectorFlow/Services/MTO/Production/DueDateQuotation";

const DDQAnalytics = () => {
  const { mutateAsync: getAnalyticsData } = useGetDDQAnalytics();

  const [options, setOptions] = useState<any>({
    Order: [{ pcb: "--", pdb: "--", ccr: "--", us: "--", sc: "--", ttl: "--" }],
  });

  const getData = async () => {
    try {
      const res: any = await getAnalyticsData();
      if (res.status === 200) {
        setOptions({ Order: [res.data.data] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [rowData] = useState([
    {
      headerName: "Proc Buffer",
    },
    {
      headerName: "Prod Buffer",
    },
    {
      headerName: "CCR/ Route",
    },
    {
      headerName: "Unscheduled",
    },
    {
      headerName: "Scheduled",
    },
    {
      headerName: "Count",
    },
  ]);

  if (!options.Order) {
    return null;
  }

  return (
    <div className={BPRDailyAnalyticsWrapper}>
      <div className={BPRDailyAnalyticsContainer}>
        <div
          className={BPRDailyAnalyticsHeader}
          style={{ borderBottom: "1px dashed white" }}
        >
          Analytics
        </div>
        <div className={BPRDailyAnalyticsHeader}>(Orders with unassigned)</div>

        <div className={BPRDailyAnalyticsTableContainer}>
          <div
            className={BPRDailyAnalyticsTableHeaderContainer}
            style={{ borderBottom: "1px dashed white" }}
          >
            {rowData.map((data) => {
              if (data.headerName === "Proc Buffer") {
                return (
                  <div
                    className={BPRDailyAnalyticsTableHeader}
                    style={{
                      wordBreak: "break-all",
                      padding: "1px",
                      borderTop: "1px solid white",
                      borderLeft: "1px solid white",
                    }}
                  >
                    {data.headerName}
                  </div>
                );
              } else if (data.headerName === "Prod Buffer") {
                return (
                  <div
                    className={BPRDailyAnalyticsTableHeader}
                    style={{
                      wordBreak: "break-all",
                      padding: "1px",
                      borderTop: "1px solid white",
                    }}
                  >
                    {data.headerName}
                  </div>
                );
              } else if (data.headerName === "CCR/ Route") {
                return (
                  <div
                    className={BPRDailyAnalyticsTableHeader}
                    style={{
                      wordBreak: "break-all",
                      padding: "1px",
                      borderTop: "1px solid white",
                      borderRight: "1px solid white",
                    }}
                  >
                    {data.headerName}
                  </div>
                );
              }
              return (
                <div
                  className={BPRDailyAnalyticsTableHeader}
                  style={{ wordBreak: "break-all", padding: "1px" }}
                >
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
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {o.pcb}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {o.pdb}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {formatNumber(o.ccr)}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {formatNumber(o.us)}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {formatNumber(o.sc)}
                    </p>
                  </div>
                  <div className={BPRDailyAnalyticsTableCell}>
                    <p
                      className={BPRDailyAnalyticsTableCellHeader}
                      style={{ color: "white" }}
                    >
                      {formatNumber(o.ttl)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDQAnalytics;
