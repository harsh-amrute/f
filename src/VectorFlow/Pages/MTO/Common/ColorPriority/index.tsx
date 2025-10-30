import { ICellRendererParams } from "ag-grid-enterprise";
import {
  colorPriorityCellRendererWrapper,
  colorPriorityCellRenderer,
  gradientVar,
} from "./styles.css";
import _ from "lodash";

interface ColorValues {
  B: number;
  R: number;
  Y: number;
  G: number;
  W: number;
  Bl: number;
}

function buildGradient({
  B = 0,
  R = 0,
  Y = 0,
  G = 0,
  W = 0,
  Bl = 0,
}: ColorValues) {
  const stops: string[] = [];
  let acc = 0;

  const push = (len: number, color: string) => {
    if (len > 0) {
      const start = acc;
      const end = acc + len;
      stops.push(`${color} ${start}% ${end}%`);
      acc = end;
    }
  };

  push(B, "#000000"); // Black
  push(R, "#E53F3F"); // Red
  push(Y, "#EBBF2C"); // Yellow
  push(G, "#4CAF50"); // Green
  push(W, "#cecece"); // White/Grey
  push(Bl, "#0000FF"); // Blue

  // fallback if no colors provided
  if (stops.length === 0) stops.push("#FFFFFF 0% 100%");

  return `linear-gradient(to right, ${stops.join(", ")})`;
}

const ColorPriority = (props: ICellRendererParams) => {
  let colorValues: ColorValues | undefined;
  if (!_.isEmpty(props.data)) {
    colorValues = props.data?.cp[0];
  }

  //in some cases like grouping color value might me null or undefined
  if (!colorValues) {
    return <></>;
  }

  const gradient = buildGradient(colorValues);

  return (
    <div
      className={colorPriorityCellRendererWrapper}
      data-testid="cp-cell-renderer"
    >
      <div
        className={colorPriorityCellRenderer}
        // set the gradient at runtime via CSS variable
        style={{ [gradientVar as unknown as string]: gradient }}
      />
    </div>
  );
};

export default ColorPriority;
