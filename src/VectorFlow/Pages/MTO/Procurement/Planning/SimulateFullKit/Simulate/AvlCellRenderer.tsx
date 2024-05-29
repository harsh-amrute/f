
import { ICellRendererParams } from "ag-grid-enterprise"

import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../../../../MTA/InsightsAndTrends/BTR/styles';

const AvailabilityCellRenderer = (props: ICellRendererParams) => {
    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="availability-cell-renderer">
            <div style={{ marginRight: 12 }}>{props.data.oq}</div>
            <BTRAvailabiltyCellRenderer value={props.data.avl} />
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default AvailabilityCellRenderer