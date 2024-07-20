import { useMemo, useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import { ProductionInsightsAndTrendsString } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from "../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer";
import { columnConfigData, APIMock } from "../OrderBalanceMockData";
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { format } from "date-fns";
import VFCapsule from "../../../../../../../components/VectorFLOW/commons/VFCapsule";
import { CapsuleWrapper } from "../styles";
import { createSeriesData, TooltipRenderer } from "../OrderBalanceCommon";

const TrailDeptBalance = () => {
  const [date] = useState(format(new Date(), "d MMM yyyy"));
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData, setRawData] = useState(APIMock.balMfg);
  const [actBtn, setActBtn] = useState({
    label: "Bal To Mfg.",
    value: "Bal To Mfg.",
  });

  const options: AgChartOptions = {
    data: rawData,
    series: createSeriesData(),
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Trailing Department",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "Quantity (in UOM)",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        line: { enabled: true },
        position: "left",
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
        },
        gridLine: {
          enabled: false,
        },
      },
    ],

    legend: {
      item: {
        label: {
          fontSize: 10,
        },
      },
    },
  };

  const colDefs = useMemo(() => {
    return getColumnDefinations(columnConfigData?.tableColumn, {}, []);
  }, []);

  const updateGraphState = () => {
    if (actBtn.label === "Bal To Mfg.") {
      setActBtn({
        label: "Bal To Disp.",
        value: "Bal To Disp.",
      });
      setRawData(APIMock.balDisp);
    } else {
      setActBtn({
        label: "Bal To Mfg.",
        value: "Bal To Mfg.",
      });
      setRawData(APIMock.balMfg);
    }
  };

  const generateHeader = () => {
    return (
      <div
        className="title"
        style={{
          backgroundColor: "white",
          height: "40px",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          data-testid="fullKit-graph"
          style={{
            fontSize: "16px",
            margin: "0 auto",

            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 500 }}>
            {`${
              actBtn.label === "Bal To Mfg."
                ? ProductionInsightsAndTrendsString.trailDeptMfg
                : ProductionInsightsAndTrendsString.trailDeptDisp
            } `}
          </span>
          <span style={{ fontWeight: 300 }}>{` (${date})`}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CapsuleWrapper style={{ zoom: 1, padding: "4px" }}>
            <VFCapsule
              activeBtn={actBtn}
              capsules={[
                {
                  label: "Bal To Mfg.",
                  value: "Bal To Mfg.",
                },
                {
                  label: "Bal To Disp.",
                  value: "Bal To Disp.",
                },
              ]}
              handleClick={() => updateGraphState()}
            />
          </CapsuleWrapper>
          <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
            <VFInfoToolTip
              infoList={[
                `The graph highlights trailing department wise quantities balance to ${
                  actBtn.label === "Bal To Mfg." ? "manufacture" : "dispatch"
                }`,
              ]}
            />
          </div>
          <div
            data-testid="grid-toggle-btn"
            onClick={() => {
              toggleChart1(!hideChart1);
            }}
            style={{
              marginLeft: 10,
              marginBottom: "-5px",
              marginRight: "10px",
            }}
          >
            <img
              src="/assets/img/VectorFLOW/BPR/minimize.svg"
              height={13}
              width={13}
              color={"#CCCCCC"}
            />
          </div>
        </div>
      </div>
    );
  };

  const tableTitle =
    actBtn.label === "Bal To Mfg."
      ? ProductionInsightsAndTrendsString.trailDeptMfg
      : ProductionInsightsAndTrendsString.trailDeptDisp;

  return (
    <div
      data-testid="mfg-disp-graph"
      style={{ height: "70vh", display: "flex", justifyContent: "left" }}
    >
      <div
        style={{
          width: "14px",
          resize: "none",
          height: "88%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "8px",
            background: "#E8E8E8",
            height: "88%",
            borderRadius: "0 4px 4px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="/assets/img/mto/RMPMBufferTrend/slider-icon-right.svg" />
        </div>
      </div>
      <SplitGraphContainer
        tableLoading={tableLoading}
        chartLoading={chartLoading}
        setTableLoading={setTableLoading}
        setChartLoading={setChartLoading}
        data={rawData}
        rowData={options.data}
        graphTitle={""}
        tableTitle={tableTitle}
        options={options}
        colDef={colDefs}
        header={generateHeader}
        hideChart={hideChart1}
        toggleChart={toggleChart1}
        TooltipRenderer={TooltipRenderer}
        graphType={7}
      />
    </div>
  );
};

export default TrailDeptBalance;
