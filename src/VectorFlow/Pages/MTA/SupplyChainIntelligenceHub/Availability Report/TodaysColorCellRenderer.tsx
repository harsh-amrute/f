import { ICellRendererParams } from "ag-grid-enterprise";
import { BPRColorCellRendererWrapper } from "../BPR/styles.css";

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  Red: { bg: "#D32F2F", text: "#fff" },
  Green: { bg: "#388E3C", text: "#fff" },
  Yellow: { bg: "#F9A825", text: "#1a1a1a" },
  White: { bg: "#E0E0E0", text: "#1a1a1a" },
  Grey: { bg: "#424242", text: "#fff" },
  Gray: { bg: "#424242", text: "#fff" },
  Blue: { bg: "#1565C0", text: "#fff" },
  Black: { bg: "#212121", text: "#fff" },
};


const TodaysColorCellRenderer = (props: ICellRendererParams) => {
  const tc: string = props.data?.tc ?? "White";
  const tp = parseFloat(props.data?.tp ?? "0");

  const { bg, text } = COLOR_MAP[tc] ?? { bg: "#9E9E9E", text: "#fff" };

  const isNoData = tp <= -9999999;
  const displayValue = isNoData ? `-999.99%` : `${tp.toFixed(2)}%`;

  return (
    <div
      className={BPRColorCellRendererWrapper}
      style={{
        backgroundColor: bg,
        color: text,
        maxWidth: 55,
      }}
      data-testid="color-cell"
    >
      {displayValue}
    </div>
  );
};

export default TodaysColorCellRenderer;
