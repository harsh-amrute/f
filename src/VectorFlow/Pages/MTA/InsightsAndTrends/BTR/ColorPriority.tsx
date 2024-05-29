import { ICellRendererParams } from "ag-grid-enterprise";
import { BTRAvailabiltyCellRendererWrapper, ColorPriorityCellRenderer } from "./styles";

interface ColorValues {
    B: number;
    R: number;
    Y: number;
    G: number;
}

const ColorPriority = (props: ICellRendererParams) => {
    const colorValues: ColorValues = props.data.cp[0];

    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="availability-cell-renderer">
            <ColorPriorityCellRenderer
                B={colorValues.B}
                R={colorValues.R}
                Y={colorValues.Y}
                G={colorValues.G}
            />
        </BTRAvailabiltyCellRendererWrapper>
    );
};

export default ColorPriority;



