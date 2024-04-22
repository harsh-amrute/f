import { BPRViewTableRequestCellRendererImg, BPRViewTableRequestCellRendererText, BPRViewTableRequestCellRendererWrapper } from "./styles"

interface BPRViewTableRequestCellRendererProps{
    onClick:()=>void
}

const BPRViewTableRequestCellRenderer = (props:BPRViewTableRequestCellRendererProps)=>{

    const {
        onClick
    } = props

    return (
        <BPRViewTableRequestCellRendererWrapper onClick={onClick}>
            <BPRViewTableRequestCellRendererImg src="/assets/img/VectorFlow/BPR/add-circle.svg"/>
            <BPRViewTableRequestCellRendererText >Request</BPRViewTableRequestCellRendererText>
        </BPRViewTableRequestCellRendererWrapper>
    )

}

export default BPRViewTableRequestCellRenderer