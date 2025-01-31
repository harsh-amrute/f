
import { ICellRendererParams } from "ag-grid-enterprise"

import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';
import { useUserData } from "../../../../context";
const AvlCellRenderer = (props: ICellRendererParams) => {
    const { user } = useUserData();

    const themeUi = user.user.theme_ui;
    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div style={{ marginRight: 12 }}>{props.data.fka}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fkapr} themeUi={themeUi} />
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default AvlCellRenderer