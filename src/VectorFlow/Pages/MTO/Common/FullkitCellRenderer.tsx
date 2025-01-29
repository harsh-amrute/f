
import { ICellRendererParams } from "ag-grid-enterprise"
import { useUserData } from "../../../../context";

import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';

const FullkitCellRenderer = (props: ICellRendererParams) => {

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div style={{ marginRight: 12}}>{props.data.fol}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fol} theme={themeUi}/>
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default FullkitCellRenderer;