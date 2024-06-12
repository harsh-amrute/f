import { ICellRendererParams } from "ag-grid-enterprise";
import { ColorPriorityCellRendererWrapper, ColorPriorityCellRenderer } from "./styles";

interface ColorValues {
    B: number;
    R: number;
    Y: number;
    G: number;
    W: number;
    Bl: number;
}

const ColorPriority = (props: ICellRendererParams) => {
    const colorValues: ColorValues = props.data.cp[0];

    return (
        <ColorPriorityCellRendererWrapper data-testid="cp-cell-renderer">
            <ColorPriorityCellRenderer
                B={colorValues.B}
                R={colorValues.R}
                Y={colorValues.Y}
                G={colorValues.G}
                W={colorValues.W}
                Bl={colorValues.Bl}
            />
        </ColorPriorityCellRendererWrapper>
    );
};

export default ColorPriority;



