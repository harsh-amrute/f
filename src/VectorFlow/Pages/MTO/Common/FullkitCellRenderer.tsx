
import { ICellRendererParams } from "ag-grid-enterprise"
import { BTRAvailabiltyCellRenderer, BTRAvailabiltyCellRendererWrapper } from '../../MTA/InsightsAndTrends/BTR/styles';
import { useUserData } from "../../../../context";
const FullkitCellRenderer = (props: ICellRendererParams) => {

    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;

    const formatNumber = (num: any) => {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1) + 'Cr';
        } else if (num >= 100000) {
            return (num / 100000).toFixed(1) + 'L'; 
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'; 
        } else {
            return num; 
        }
    };

    return (
        <BTRAvailabiltyCellRendererWrapper data-testid="avl-cell-renderer">
            <div>{formatNumber(props.data.fol)}</div>
            <BTRAvailabiltyCellRenderer value={props.data.fol} themeUi={themeUi}/>     
        </BTRAvailabiltyCellRendererWrapper>
    )
}

export default FullkitCellRenderer;