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
    let colorValues: ColorValues;
    if (props.node.group) {
        const allData: any = props?.node?.allLeafChildren?.[0];
        colorValues = allData?.data?.cp[0];
    } else {
        colorValues = props.data?.cp[0];
    }    

    //in some cases like grouping color value might me null or undefined
    if (!colorValues) {
        return <></>
    }
    
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



