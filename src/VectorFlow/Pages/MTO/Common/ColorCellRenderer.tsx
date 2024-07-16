
import { BPRColorCellRendererWrapper } from '../../MTA/SupplyChainIntelligenceHub/BPR/styles';

const colorMapper = (color: string) => {
    switch (color) {
        case 'White':
            return { bg: '#ffffff', text: '#000000' };
        case 'Green':
            return { bg: '#418D18', text: '#ffffff' };
        case 'Yellow':
            return { bg: '#EBBF2B', text: '#ffffff' };
        case 'Red':
            return { bg: '#F02424', text: '#ffffff' };
        case 'Black':
            return { bg: '#000000', text: '#ffffff' };
        case "Overloaded":
            return { bg: "#F02424", text: "#ffffff" }
        case "Underloaded":
            return { bg: "#CB830E", text: "#ffffff" }
        case "Balanced":
            return { bg: "#A8A8A8", text: "#ffffff" }
        default:
            return { bg: '#ffffff', text: '#000000' };
    }
};

const ColorCellRenderer = (params: any) => {
    // const color = params.data?.cp;
    const color = params.value;
    const cellColor = colorMapper(color);

    return (
        <BPRColorCellRendererWrapper
            style={{ backgroundColor: cellColor.bg, color: cellColor.text, maxWidth: 120 }}
            data-testid='color-cell'>
            {color}
        </BPRColorCellRendererWrapper>
    );
}

export default ColorCellRenderer;
