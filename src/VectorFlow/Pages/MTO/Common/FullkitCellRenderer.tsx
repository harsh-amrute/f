
import { ICellRendererParams } from "ag-grid-enterprise"
import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';
import { useUserData } from "../../../../context";
const FullkitCellRenderer = (props: ICellRendererParams) => {

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div style={{ marginRight: 12}}>{props.data.fol}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fol} themeUi={themeUi}/>
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default FullkitCellRenderer;