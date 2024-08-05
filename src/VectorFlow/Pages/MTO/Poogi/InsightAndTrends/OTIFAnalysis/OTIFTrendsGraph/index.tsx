import { useMemo, useState } from "react";
import "allotment/dist/style.css";
import { AgChartOptions } from "ag-charts-community";
import { APIMock, graphColumnConfig } from "../MockData";
import { Poogi } from "../../../../Common/String";
import VFInfoToolTip from "../../../../../../../components/VectorFLOW/commons/VFInfoToolTip";
import SplitGraphContainer from "../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer";
import { getColumnDefinations } from "../../../../../../../helpers/utils";
import { TooltipRenderer } from "../OTIFCommon";

const OTIFTrendsGraph = () => {
  const [startDate] = useState(APIMock.graph.otif_graph.start);
  const [endDate] = useState(APIMock.graph.otif_graph.end);
  const [hideChart1, toggleChart1] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [rawData] = useState(APIMock.graph.otif_graph.data);

  function createSeriesData(val: number) {
    const seriesData: any = [];
    const labels = ["OTIF % Trends", "OTIF % Trends (+3 days)"];
    for (let i = 0; i < val; i++) {
      const color = i === 0 ? "#BC3D81" : "#FCADD7";
      const key = i === 0 ? "otif" : "otif_plus";
      seriesData.push({
        type: "line",
        xKey: "x_label",
        yKey: key,
        yName: labels[i],
        lineDash: i === 0? null : [5, 5], // 5px dash, 5px gap
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
          text: "OTIF %",
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
    return getColumnDefinations(graphColumnConfig?.otif, {}, []);
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
          data-testid="ot-if-graph"
          style={{
            fontSize: "16px",
            margin: "0 auto",

            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: 500 }}>{`${Poogi.otif}  `}</span>
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
      <SplitGraphContainer
        tableLoading={tableLoading}
        chartLoading={chartLoading}
        setTableLoading={setTableLoading}
        setChartLoading={setChartLoading}
        data={rawData}
        rowData={options.data}
        graphTitle={""}
        tableTitle={Poogi.otif}
        options={options}
        colDef={colDefs}
        header={generateHeader}
        hideChart={hideChart1}
        toggleChart={toggleChart1}
        TooltipRenderer={TooltipRenderer}
        graphType={8}
      />
      <div
        style={{
          width: "14px",
          resize: "none",
          height: "88%",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "8px",
            background: "#E8E8E8",
            height: "88%",
            borderRadius: "4px 0 0 4px",
            display: "flex",
            alignItems: "center",
            paddingRight: "1px",
          }}
        >
          <img src="/assets/img/mto/RMPMBufferTrend/slider-icon-left.svg" />
        </div>
      </div>
    </div>
  );
};

export default OTIFTrendsGraph;
