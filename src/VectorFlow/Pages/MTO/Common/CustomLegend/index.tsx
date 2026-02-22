// index.tsx
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as s from "./styles.css";

type SeriesItem = {
  visible: boolean;
  yName?: string;
  yKey?: string;
  fill?: string;
  stroke?: string;
};

type Props = {
  chartOptions: { series: SeriesItem[] };
  setChartOptions: (opts: any) => void;
};

const CustomLegend = ({ chartOptions, setChartOptions }: Props) => {
  // Toggle series visibility
  const toggleSeries = (index: number) => {
    const newOptions = { ...chartOptions };
    newOptions.series[index].visible = !newOptions.series[index].visible;
    setChartOptions(newOptions);
  };

  return (
    <div className={s.customLegendWrapper}>
      {chartOptions.series.map((series, i) => (
        <div
          key={i}
          className={s.legendOptionsWrapper}
          onClick={() => toggleSeries(i)}
          style={assignInlineVars({
            [s.opacityVar]: series.visible ? "1" : "0.4",
          })}
        >
          <span
            className={s.legendOptions}
            style={assignInlineVars({
              [s.backgroundVar]: series.fill || series.stroke || "black",
            })}
          />
          <span className={s.legendOptionsName}>
            {series.yName || series.yKey}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
