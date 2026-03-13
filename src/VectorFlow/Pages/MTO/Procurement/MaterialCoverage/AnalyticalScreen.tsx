import { assignInlineVars } from "@vanilla-extract/dynamic";
import {
  bprWrapper,
  bprContainer,
  bprHeader,
  bprTableContainer,
  bprTableHeaderContainer,
  bprTableHeader,
  bprRowContainer,
  bprRow,
  bprRowCompact,
  bprRowTotal,
  bprCell,
  bprCellHeaderWhite,
  bprColorChip,
  chipBgVar,
} from "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { formatNumber } from "./CommonFunc";

const gradient355FD3 =
  "linear-gradient(148deg, rgba(252,252,252,1) 0%, rgba(56,118,255,1) 71%, rgba(56,118,255,1) 100%)";

const AnalyticalScreen = ({ pageName }: { pageName: string }) => {
  //AnalyticsData
  let totalOrderCount = 0;
  let totalCustCount = 0;
  let totalOrderVal = 0;
  let options: any = {};

  let rowData: any = [];

  if (pageName === "MaterialSO") {
    options = useSelector((state: RootState) => state.mto.AnalyticsData);
    rowData = [
      {
        headerName: "",
      },
      {
        headerName: "No Of Orders",
      },
      {
        headerName: "No Of Customers",
      },
      {
        headerName: "Total Order Value",
      },
    ];
    options?.Order?.map((o: any) => {
      totalOrderCount += o.ordCunt;
      totalCustCount += o.cusCunt;
      totalOrderVal += o.totalCunt;
    });
  } else if (pageName === "Fullkit assignment") {
    rowData = [
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
    ];

    options = {
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
    options?.Order?.map((o: any) => {
      totalOrderCount += o.currFull;
      totalCustCount += o.incFull;
      totalOrderVal += o.currFull + o.incFull;
    });
  }

  if (!options.Order) {
    return null;
  }

  if (pageName === "MaterialSO") {
    return (
      <div className={bprWrapper}>
        <div className={bprContainer}>
          <div className={bprHeader}>Analytics</div>

          <div className={bprTableContainer}>
            <div className={bprTableHeaderContainer}>
              {rowData.map((data: any) => (
                <div key={data.headerName} className={bprTableHeader}>
                  {data.headerName}
                </div>
              ))}
            </div>

            <div className={bprRowContainer}>
              {options?.Order?.map((o: any, idx: number) => {
                const chipStyle = assignInlineVars({
                  [chipBgVar]: o.color === "#355FD3" ? gradient355FD3 : o.color,
                });
                return (
                  <div key={idx} className={`${bprRow} ${bprRowCompact}`}>
                    <div className={bprCell}>
                      <div className={bprColorChip} style={chipStyle} />
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>{o.ordCunt}</p>
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>{o.cusCunt}</p>
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>
                        {formatNumber(o.totalCunt)}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className={`${bprRow} ${bprRowTotal}`}>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>Total</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>{totalOrderCount}</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>{totalCustCount}</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>
                    {formatNumber(totalOrderVal)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (pageName === "Fullkit assignment") {
    return (
      <div className={bprWrapper}>
        <div className={bprContainer}>
          <div className={bprHeader}>Analytics</div>

          <div className={bprTableContainer}>
            <div className={bprTableHeaderContainer}>
              {rowData.map((data: any) => (
                <div key={data.headerName} className={bprTableHeader}>
                  {data.headerName}
                </div>
              ))}
            </div>

            <div className={bprRowContainer}>
              {options?.Order?.map((o: any, idx: number) => {
                const chipStyle = assignInlineVars({
                  [chipBgVar]: o.color === "#355FD3" ? gradient355FD3 : o.color,
                });
                return (
                  <div key={idx} className={`${bprRow} ${bprRowCompact}`}>
                    <div className={bprCell}>
                      <div className={bprColorChip} style={chipStyle} />
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>{o.currFull}</p>
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>{o.incFull}</p>
                    </div>

                    <div className={bprCell}>
                      <p className={bprCellHeaderWhite}>
                        {formatNumber(o.currFull + o.incFull)}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className={`${bprRow} ${bprRowTotal}`}>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>Total</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>{totalOrderCount}</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>{totalCustCount}</p>
                </div>
                <div className={bprCell}>
                  <p className={bprCellHeaderWhite}>{totalOrderVal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default AnalyticalScreen;
