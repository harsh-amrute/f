import { seasonalityQuickFilterData } from "../../../../helpers/MDMConstants"
import { SeasonalityQuickFilterType } from "../../../../VectorFlow/types/MDM"
import { SeasonalityColorCellRendererWrapper, SeasonalityGrapCellRendererWrapper } from "./styles"

export const SeasonalityGraphCellRenderer = (params:any)=>{
    console.log(params)
    return(
        <SeasonalityGrapCellRendererWrapper data-testid="graph-icon">
            <img src="/assets/img/VectorFLOW/NMS/seasonality-graph-icon.svg" height={28} width={28}/>
        </SeasonalityGrapCellRendererWrapper>
    )
}


export const SeasonalityColorCellRenderer = (params:any)=>{

    const stateColor = seasonalityQuickFilterData.find((s:SeasonalityQuickFilterType)=>s.id==params.data.sts)?.color || 'white'

    return <SeasonalityColorCellRendererWrapper stateColor={stateColor}/>
}