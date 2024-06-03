import { BPRColorCellRendererWrapper } from '../../../../../MTA/SupplyChainIntelligenceHub/BPR/styles';


const colorMapper = (color: string) => {
    if (color === "White") {
        return {
            "bg": "white",
            "text": "Black"
        }
    }
    if (color === "Green") {
        return {
            "bg": "#418D18",
            "text": "wWhite"
        }
    }
    if (color === "Yellow") {
        return {
            "bg": "#EBBF2B",
            "text": "White"
        }
    }
    if (color === "Red") {
        return {
            "bg": "#F04D4D",
            "text": "White"
        }
    }

    return {
        "bg": "#000000",
        "text": "White"
    }
}

const ColorCellRenderer = (params: any) => {
    const color = params.data.cp
    const cellColor = colorMapper(color)


    if (!color) {
        return (
            <BPRColorCellRendererWrapper style={{ backgroundColor: cellColor.bg, color: cellColor.text, maxWidth: 90 }} data-testid='color-cell'>
                NULL
            </BPRColorCellRendererWrapper>
        )
    }

    return (
        <BPRColorCellRendererWrapper style={{ backgroundColor: cellColor.bg, color: cellColor.text, maxWidth: 90 }} data-testid='color-cell'>
            {color}
        </BPRColorCellRendererWrapper>
    )
}

export default ColorCellRenderer