
import { ICellRendererParams } from "ag-grid-enterprise"

import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';

const FullkitCellRenderer = (props: ICellRendererParams) => {
    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div style={{ marginRight: 12 }}>{props.data.fol}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fol} />
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default FullkitCellRenderer;