import { useRef, useState } from "react";
import { AgChartOptions, AgCharts } from 'ag-charts-community'
import { AgChartsReact } from 'ag-charts-react'
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"

const ResourceUtilization = () => {

  const [chartLoading, setChartLoading] = useState(false);
  const chartRef = useRef<AgChartsReact>(null);

  const options: AgChartOptions = {
    data: rawData,

    series: [
      {
        type: "bar",
        direction: "horizontal",
        xKey: "r",
        yKey: "bo",
        yName: "Impacted order - Black",
        stacked: true,
        fill: "black",
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
      {
        type: "bar",
        direction: "horizontal",
        xKey: "r",
        yKey: "ro",
        yName: "Impacted order - Red",
        stacked: true,
        fill: "red",
        tooltip: {
          renderer: TooltipRenderer,
        },
      },
    ],

    axes: [
      {
        type: "category",
        position: "left",
        title: {
          text: "Major | Minor Reasons",
          fontSize: 10,
          fontWeight: "bold",
        },
        label: {
          fontSize: 8,
          fontWeight: "bold",
          color: "black",
          padding: 10,
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        title: {
          text: "Count Of Orders",
          fontSize: 10,
          fontWeight: "bold",
          spacing: 3,
        },
        type: "number",
        position: "bottom",
        line: { enabled: true },
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

    return (
        <div>
            <MTOActionToolBar comp={'resourceUtilization'} />
            <div>
                <div style={{ height: `50vh` }}>
                    <AgChartsReact 
                        suppressDragLeaveHidesColumns={true} 
                        ref={chartRef} 
                        options={options} 
                        onChartReady={() => { setChartLoading(false) }} 
                    />
                </div>
            </div>
        </div>
    )

}

export default ResourceUtilization