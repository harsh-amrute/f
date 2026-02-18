import { seasonalityQuickFilterData } from "../../../../helpers/MDMConstants";
import { SeasonalityQuickFilterType } from "../../../../VectorFlow/types/MDM";
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
    SeasonalityColorCellRendererWrapper,
    SeasonalityGrapCellRendererWrapper,
    stateColorVar,
  } from './styles.css';
  
export const SeasonalityGraphCellRenderer = (params: any) => {
  const onChartClick = () => {
    params.onShowChart(params.data);
  };

  return (
    <div className={SeasonalityGrapCellRendererWrapper}>
      <img
        src="/assets/img/VectorFLOW/NMS/seasonality-graph-icon.svg"
        height={28}
        width={28}
        onClick={onChartClick}
        data-testid="graph-icon"
      />
    </div>
  );
};

export const SeasonalityColorCellRenderer = (params: any) => {
  const stateColor =
    seasonalityQuickFilterData.find((s: SeasonalityQuickFilterType) =>
      s.id.includes(params.data.sts)
    )?.color || "white";

    return (
        <div
          className={SeasonalityColorCellRendererWrapper}
          style={assignInlineVars({ [stateColorVar]: stateColor })}
        />
      );
    };
