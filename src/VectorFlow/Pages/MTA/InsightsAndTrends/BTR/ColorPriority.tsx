
import { ICellRendererParams } from "ag-grid-enterprise"

import { ColorPriorityCellRenderer, BTRAvailabiltyCellRendererWrapper } from './styles'

const ColoPriority = (props: ICellRendererParams) => {
    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="availability-cell-renderer">
            <ColorPriorityCellRenderer value={props.data.cp} />
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default ColoPriority