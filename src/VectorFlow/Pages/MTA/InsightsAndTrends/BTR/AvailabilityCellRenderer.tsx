
import { ICellRendererParams } from "ag-grid-enterprise"

import {BTRAvailabiltyCellRenderer,BTRAvailabiltyCellRendererWrapper} from './styles'

const AvailabilityCellRenderer = (props:ICellRendererParams)=>{
    return(
        <BTRAvailabiltyCellRendererWrapper data-testid="availability-cell-renderer">
            <BTRAvailabiltyCellRenderer value={props.data.Availability}/>
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default AvailabilityCellRenderer