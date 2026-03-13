import _ from 'lodash';
import {
    BPRRemarksCellRendererWrapper,
    BPRColorCellRendererIcon
} from '../../../MTA/SupplyChainIntelligenceHub/BPR/styles.css';

const RemarkHistoryRenderer = (params: any) => {
    if (_.isEmpty(params.data)) {
        return<></>
    }
    return (
        <div className={BPRRemarksCellRendererWrapper}>
            <img className={BPRColorCellRendererIcon}
                alt="eye icon"
                src="/assets/img/VectorFLOW/BPR/history.svg"
                ref={(ref) => {
                    if (!ref) return;

                    ref.onclick = (e: any) => {
                        params?.onClick(params.data)
                        e.stopPropagation();
                    };
                }}
            />
        </div>
    )
}

export default RemarkHistoryRenderer;