import { BPRGraphCellRendererWrapper } from "./styles.css"


const BPRGraphCellRenderer = (params:any)=>{
    return(
        <img className={BPRGraphCellRendererWrapper} src="/assets/img/VectorFLOW/NMS/seasonality-graph-icon.svg" onClick={()=>params.onOpenDailyDataGraph(params)}/>
    )
}

export default BPRGraphCellRenderer