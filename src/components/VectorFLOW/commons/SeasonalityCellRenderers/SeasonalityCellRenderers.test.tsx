import { render } from "@testing-library/react"
import { SeasonalityColorCellRenderer, SeasonalityGraphCellRenderer } from "."


describe("It handles all SeasonalityCellRenderers renders",()=>{
    it('Renders the graph renderer',()=>{
        render(<SeasonalityGraphCellRenderer/>)
    })

    it('Renders the color renderer',()=>{
        render(<SeasonalityColorCellRenderer data={{sts:'fasfas'}}/>)
    })
})