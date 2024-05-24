import { RRRColorCellRendererWrapper } from "../../MTA/SupplyChainIntelligenceHub/RationedRequirementReport/styles";

const colorMapper = (color: string) => {

    switch (color) {
        case "White":
            return {
                "bg": "white",
                "text": "black"
            }
        case "Yellow":
            return {
                "bg": "#EBBF2B",
                "text": "white"
            }
        case "Green":
            return {
                "bg": "#418D18",
                "text": "white"
            }
        case "Red":
            return {
                "bg": "#F04D4D",
                "text": "white"
            }
        case "Black":
            return {
                "bg": "#000000",
                "text": "white"
            }
        default:
            return {
                "bg": "white",
                "text": "black"
            }
    }
}

export const ColorCellRenderer = (params: any) => {
    const techColor = params.data.value

    const cellColor = colorMapper(techColor)


    if (!techColor || techColor.lenght < 1) {
        return (
            <RRRColorCellRendererWrapper style={{ backgroundColor: cellColor.bg, color: cellColor.text }}>
                NULL
            </RRRColorCellRendererWrapper>
        )
    }

    return (
        <RRRColorCellRendererWrapper style={{ backgroundColor: cellColor.bg, color: cellColor.text }}>
            {params.data.value}
        </RRRColorCellRendererWrapper>
    )
}








