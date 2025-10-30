import {BPRTagsCellRendererWrapper} from '../../SupplyChainIntelligenceHub/BPR/styles.css'

 const TagsCellRenderer = (params:any)=>{
    if(!params.value ||  params.value.length<1)return null
    return(
        <div className={BPRTagsCellRendererWrapper} style={{height:15,padding:"0px 3px",fontSize:9,width:35}}>
            {params.value}
        </div>
    )
}

export default TagsCellRenderer;