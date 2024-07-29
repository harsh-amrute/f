import { format, subDays } from "date-fns";

export function TooltipRenderer({ datum, yKey }: any) {
    return `
    <div class="ag-chart-tooltip-content" style="color: white; background-color: #6C696A">
    <div>
        <div style="display: flex;">
            <div style="display:flex ; width: 100%; justify-content: space-between">
               ${datum[yKey]}%
            </div>
        </div>
    </div>`;
  }

export const getDateDaysBack = (days: number): string => {
    const today: Date = new Date();
    const pastDate: Date = subDays(today, days);
    return format(pastDate, 'dd MMM yyyy'); // Format the date as 'YYYY-MM-DD'
};