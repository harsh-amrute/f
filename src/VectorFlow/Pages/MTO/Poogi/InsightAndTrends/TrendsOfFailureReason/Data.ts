import { ColDef } from "ag-grid-enterprise";
import "./style.css";
export function TooltipRenderer(props: any) {
    const { datum, xKey, labels } = props;
    return `
<div class="tooltip-div-tfr">
<div class="ag-chart-tooltip-title-tfr">
    ${datum[xKey]}
</div>
<div class="ag-chart-tooltip-content-tfr">

<div>
    ${labels?.map((label: any) => `
    <div class="displayFlex">
        <div class="color-label-tfr" style=" background-color: ${label?.color}"></div>
        <div class="color-textbox" style="">
            <div class="color-box-tfr">${label.text}</div>
            <div>${datum[label?.key] || '--' }</div>
        </div>
    </div>
    `).join('')}
</div>
</div>
`
}

export function createSeriesData(labels: any) {
    const seriesData: any = [];
    for (let i = 0; i < labels.length; i++) {
        seriesData.push({
            type: "line",
            xKey: "month",
            yKey: labels[i].key,
            yName: labels[i].text,
            fill: labels[i].color,
            stroke:
                labels[i].color
            ,
            marker: {
                fill: labels[i].color,
                stroke: labels[i].color,
            },

            strokeWidth: 2,
            stacked: true,
            tooltip: {
                renderer: (params: any) => TooltipRenderer({...params, labels}),
            },
        });
    }


    return seriesData;
}

export const getMyColumnDefinitions = (labels: any): ColDef[] => {

    const labelKeys = labels.map((label: any) => label.key);

    const columns: ColDef[] = [
        ...labelKeys.map((key: any) => ({
            headerName: key,
            field: key,
            sortable: true,
            filter: true,
            width: 100,

        })),
    ];

    return columns;
};