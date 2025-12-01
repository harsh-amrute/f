import "./style.css";

export function TooltipRenderer({ datum, xKey }: any) {
  return `
      <div class="tooltip-title">
        ${datum[xKey]}
      </div>
      <div class="tooltip-content">
        <div class="tooltip-divider"></div>
        ${[
          { label: "Black", key: "b", colorClass: "color-black" },
          { label: "Red", key: "r", colorClass: "color-red" },
          { label: "Yellow", key: "y", colorClass: "color-yellow" },
          { label: "Green", key: "g", colorClass: "color-green" },
          { label: "Blue", key: "bl", colorClass: "color-blue" },
          { label: "White", key: "w", colorClass: "color-white" },
        ]
          .map(
            (item) => `
          <div class="tooltip-row">
            <div class="color-box ${item.colorClass}"></div>
            <div class="label-value">
              <div>${item.label}</div>
              <div>${datum[item.key]}</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
}

export function createSeriesData() {
  const seriesData: any = [];
  const labels = [
    { text: "Black", color: "#151515", key: "b" },
    { text: "Red", color: "#E53F40", key: "r" },
    { text: "Yellow", color: "#EBBF2B", key: "y" },
    { text: "Green", color: "#418D18", key: "g" },
    { text: "Blue", color: "#3876FE", key: "bl" },
    { text: "White", color: "#E8E8E8", key: "w" },
  ];

  for (let i = 0; i < labels.length; i++) {
    seriesData.push({
      type: "bar",
      xKey: "trailDept",
      yKey: labels[i].key,
      yName: labels[i].text,
      strokeOpacity: 0,
      fill: labels[i].color,
      stacked: true,
      tooltip: {
        renderer: TooltipRenderer,
      },
    });
  }

  return seriesData;
}

