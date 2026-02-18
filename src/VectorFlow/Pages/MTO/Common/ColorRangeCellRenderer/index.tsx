import { ColorsMTO } from "../Colors";
import {
  bprColorCellRendererWrapper,
  bgVar,
  textVar,
  maxWVar,
} from "./styles.css";
const colorMapper = (color: number) => {
  if (color === 0) {
    return {
      bg: "#cecece",
      text: "black",
    };
  }
  if (color < 0) {
    return {
      bg: ColorsMTO.Blue.code,
      text: "white",
    };
  }
  if (color < 33.33 && color > 0) {
    return {
      bg: "#418D18",
      text: "white",
    };
  }
  if (color > 33.33 && color < 66.66) {
    return {
      bg: "#EBBF2B",
      text: "white",
    };
  }
  if (66.66 < color && color < 99.99) {
    return {
      bg: "#F04D4D",
      text: "white",
    };
  }

  return {
    bg: "#000000",
    text: "white",
  };
};

const ColorRangeCellRenderer = (params: any) => {
  const color = parseFloat(params.value);

  const cellColor = colorMapper(params.value);

  if (color === null || color === undefined || isNaN(color)) {
    return <></>;
  }
  const styleVars = {
    [bgVar as unknown as string]: cellColor.bg,
    [textVar as unknown as string]: cellColor.text,
    [maxWVar as unknown as string]: "85px",
  } as React.CSSProperties;

  const display = color <= -99999999 ? "-999.99" : color;

  return (
    <div
      className={bprColorCellRendererWrapper}
      style={styleVars}
      data-testid="color-cell"
    >
      {display}
    </div>
  );
};

export default ColorRangeCellRenderer;
