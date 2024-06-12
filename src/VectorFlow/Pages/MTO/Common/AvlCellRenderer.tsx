
import { ICellRendererParams } from "ag-grid-enterprise"

import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';

const AvlCellRenderer = (props: ICellRendererParams) => {
    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div style={{ marginRight: 12 }}>{props.data.fka}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fkapr} />
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default AvlCellRenderer