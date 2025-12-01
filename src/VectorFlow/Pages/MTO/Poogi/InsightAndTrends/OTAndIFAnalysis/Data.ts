import { ColDef } from "ag-grid-enterprise";
import "./style.css";

export function TooltipRenderer({ datum, xKey }: any) {
  return `
      <div class="tooltip-container">
        <div class="tooltip-title">
          ${datum[xKey]}
        </div>
        <div class="tooltip-content">
          <div class="tooltip-row">
            <div class="color-box color-1-2-days"></div>
            <div class="label-value">
              <div>1-2 days</div><div>${datum["1_2_d"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-3-7-days"></div>
            <div class="label-value">
              <div>3-7 days</div><div>${datum["3_7_d"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-8-15-days"></div>
            <div class="label-value">
              <div>8-15 days</div><div>${datum["8_15_d"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-16-30-days"></div>
            <div class="label-value">
              <div>16-30 days</div><div>${datum["16_30_d"]}</div>
            </div>
          </div>
        </div>
      </div>
    `;
}
export function TooltipRendererIF({ datum, xKey }: any) {
  return `
      <div class="tooltip-container">
        <div class="tooltip-title">
          ${datum[xKey]}
        </div>
        <div class="tooltip-content">
          <div class="tooltip-row">
            <div class="color-box color-0-20"></div>
            <div class="label-value">
              <div>0%-20%</div>
              <div>${datum["0_2_p"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-20-40"></div>
            <div class="label-value">
              <div>20%-40%</div>
              <div>${datum["20_40_p"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-40-60"></div>
            <div class="label-value">
              <div>40%-60%</div>
              <div>${datum["40_60_p"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-60-80"></div>
            <div class="label-value">
              <div>60%-80%</div>
              <div>${datum["60_80_p"]}</div>
            </div>
          </div>
          <div class="tooltip-row">
            <div class="color-box color-80-100"></div>
            <div class="label-value">
              <div>80%-100%</div>
              <div>${datum["80_100_p"]}</div>
            </div>
          </div>
        </div>
      </div>
    `;
}

export function createSeriesDataIF() {
    const seriesData: any = [];
    const labels = [
        { text: "0%-20%", color: "#F5B279", key: "0_2_p" },
        { text: "20%-40%", color: "#F09241", key: "20_40_p" },
        { text: "40%-60%", color: "#E36A00", key: "40_60_p" },
        { text: "60%-80%", color: "#AD5000", key: "60_80_p" },
        { text: "80%-100%", color: "#6A3000", key: "80_100_p" }
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "m",
            yKey: labels[i].key,
            yName: labels[i].text,
            strokeOpacity: 0,
            fill: labels[i].color,
            strokeWidth: 0.5,
            stacked: true,
            tooltip: {
                renderer: TooltipRendererIF,
            },
        });
    }

    return seriesData;
}
export function createSeriesData() {
    const seriesData: any = [];
    const labels = [
        { text: "1-2 days", color: "#F5B279", key: "1_2_d" },
        { text: "3-7 days", color: "#F09241", key: "3_7_d" },
        { text: "8-15 days", color: "#E36A00", key: "8_15_d" },
        { text: "16-30 days", color: "#AD5000", key: "16_30_d" },
    ];

    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "bar",
            xKey: "m",
            yKey: labels[i].key,
            yName: labels[i].text,
            strokeOpacity: 0,
            fill: labels[i].color,
            strokeWidth: 0.5,
            stacked: true,
            tooltip: {
                renderer: TooltipRenderer,
            },
        });
    }

    return seriesData;
}

export const getMyColumnDefinitions = (labels: any): ColDef[] => {

    const columns: ColDef[] = [
        {
            headerName: 'Week',
            field: 'm',
            sortable: true,
            filter: true,
            width: 150,
        },
        ...labels.map((entry: any) => ({
            headerName: entry.text,
            field: entry.key,
            sortable: true,
            filter: true,
            width: 100,

        })),
    ];

    return columns;
};
