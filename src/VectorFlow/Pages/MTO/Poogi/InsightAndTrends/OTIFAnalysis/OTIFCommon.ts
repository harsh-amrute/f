import "./style.css";

export function TooltipRenderer({ datum, yKey }: any) {
  return `
      <div class="tooltip-content">
        <div>
          <div class="tooltip-row">
            <div class="tooltip-value">
              ${datum[yKey]}%
            </div>
          </div>
        </div>
      </div>
    `;
}
