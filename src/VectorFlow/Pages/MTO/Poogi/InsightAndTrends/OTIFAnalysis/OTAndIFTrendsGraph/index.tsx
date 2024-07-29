import { useMemo, useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import { APIMock, graphColumnConfig } from "../MockData";
import { Poogi } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from "../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer";
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { format } from "date-fns";
import { getDateDaysBack, TooltipRenderer } from "../OTIFCommon";

const OTAndIFTrendsGraph = () => {
  const [startDate] = useState(APIMock.graph.ot_n_if_graph.start);
  const [endDate] = useState(APIMock.graph.ot_n_if_graph.end);
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData] = useState(APIMock.graph.ot_n_if_graph.data);

  function createSeriesData(val: number) {
    const seriesData: any = [];
    const labels = ["On Time %", "In Full %"];
    for (let i = 0; i < val; i++) {
      const color = i === 0 ? "#838282" : "#CBCBCB";
      const key = i === 0 ? "ot" : "if";
      seriesData.push({
        type: "line",
        xKey: "x_label",
        yKey: key,
        yName: labels[i],
        fill: color,
        strokeWidth: 4,
        marker: {
            enabled: true,
            shape: 'circle',
            size: 8,
            fill: color
        },
        strokeOpacity: 1,
        stroke: color,
        tooltip: {
          renderer: TooltipRenderer,
        },
      });
    }

    return seriesData;
  }

  const options: AgChartOptions = {
    data: rawData,

    series: createSeriesData(2),

    axes: [
      {
        type: "category",
        position: "bottom",
        title: { text: "", fontSize: 10, fontWeight: "bold" },
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
          text: "OT & In Full %",
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
          formatter: (params) => `${params.value}%`
        },
        gridLine: {
          enabled: false,
        },
        min: 0
      },
    ],

    legend: {
        item: {
            label: {
                fontSize: 10,
                fontWeight: 'bold', // Make legend text bold
            },
            marker: {
                size: 15,
                strokeWidth: 0,
                shape: "square",
            },
        },
    },
  };

  const colDefs = useMemo(() => {
    return getColumnDefinations(graphColumnConfig?.ot_n_if, {}, []);
  }, []);

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
          <span style={{ fontWeight: 500 }}>{`${Poogi.otNif}  `}</span>
          <span style={{ fontWeight: 300 }}>{`(${startDate} - ${endDate})`}</span>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: 30, marginBottom: "-5px" }}>
            <VFInfoToolTip
              infoList={[
                "The graph highlights the On-Time In-Full (OTIF) trend of complted orders.",
                "Orders are plotted based on their respective completion dates."
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

  return (
    <div style={{ height: "70vh", display: "flex", justifyContent: "left" }}>
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
        tableTitle={Poogi.otNif}
        options={options}
        colDef={colDefs}
        header={generateHeader}
        hideChart={hideChart1}
        toggleChart={toggleChart1}
        TooltipRenderer={TooltipRenderer}
        graphType={9}
      />
    </div>
  );
};

export default OTAndIFTrendsGraph;
