import {
    BPRRemarksCellRendererWrapper,
    BPRColorCellRendererIcon
} from '../../../MTA/SupplyChainIntelligenceHub/BPR/styles';

const RemarkHistoryRenderer = (params: any) => {
    //console.log('remarkcelrender' ,params.data.ok)
    return (
        <BPRRemarksCellRendererWrapper >
            <BPRColorCellRendererIcon
                alt="eye icon"
                src="/assets/img/VectorFLOW/BPR/history.svg"
                ref={(ref) => {
                    if (!ref) return;

                    ref.onclick = (e: any) => {
                        params.onClick(params.data.ok)
                        e.stopPropagation();
                    };
                }}
            />
        </BPRRemarksCellRendererWrapper>
    )
}

export default RemarkHistoryRenderer;