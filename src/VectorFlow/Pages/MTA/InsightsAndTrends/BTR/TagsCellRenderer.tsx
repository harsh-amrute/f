import {BPRTagsCellRendererWrapper} from '../../SupplyChainIntelligenceHub/BPR/styles'

 const TagsCellRenderer = (params:any)=>{
    return(
        <BPRTagsCellRendererWrapper>
            {params.data.Tags}
        </BPRTagsCellRendererWrapper>
    )
}

export default TagsCellRenderer;