
import { BPRColorCellRendererWrapper } from '../../MTA/SupplyChainIntelligenceHub/BPR/styles';

const colorMapper = (color: string) => {
    switch (color) {
        case 'White':
            return { bg: 'white', text: 'black' };
        case 'Green':
            return { bg: '#418D18', text: 'white' };
        case 'Yellow':
            return { bg: '#EBBF2B', text: 'white' };
        case 'Red':
            return { bg: '#F04D4D', text: 'white' };
        case 'Black':
            return { bg: '#000000', text: 'white' };
        default:
            return { bg: '#000000', text: 'white' };
    }
};

const ColorCellRenderer = (params: any) => {
    const color = params.data?.cp;
    const cellColor = colorMapper(color);

    return (
        <BPRColorCellRendererWrapper style={{ backgroundColor: cellColor.bg, color: cellColor.text, maxWidth: 90 }} data-testid='color-cell'>
            {color}
        </BPRColorCellRendererWrapper>
    );
}

export default ColorCellRenderer;
