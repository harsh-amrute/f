import { ICellRendererParams } from "ag-grid-enterprise";
import { BPRColorCellRendererWrapper } from "../BPR/styles.css";

const COLOR_MAP: Record<string, { bg: string; text: string }> = {
  Red: { bg: "#D32F2F", text: "#fff" },
  Green: { bg: "#388E3C", text: "#fff" },
  Yellow: { bg: "#F9A825", text: "#1a1a1a" },
  White: { bg: "white", text: "#1a1a1a" },
  Grey: { bg: "#D3D3D3", text: "#1a1a1a" },
  Gray: { bg: "#D3D3D3", text: "#1a1a1a" },
  Blue: { bg: "#1565C0", text: "#fff" },
  Black: { bg: "#212121", text: "#fff" },
};

const TodaysColorCellRenderer = (props: ICellRendererParams) => {
  const tc: string = props.data?.tc ?? "White";
  const tp = parseFloat(props.data?.tp ?? "0");

  const { bg, text } = COLOR_MAP[tc] ?? { bg: "#9E9E9E", text: "#fff" };

  const isNoData = tp <= -9999999;
  const displayValue =
    tp === null || tp === undefined || isNaN(tp)
      ? "X"
      : isNoData
      ? "-999.99%"
      : `${tp.toFixed(2)}%`;
  return (
    <div
      className={BPRColorCellRendererWrapper}
      style={{
        backgroundColor: bg,
        color: text,
        maxWidth: 90,
      }}
      data-testid="color-cell"
    >
      {displayValue}
    </div>
  );
};

export default TodaysColorCellRenderer;
