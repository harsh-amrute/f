import { SCContainer, SCErrorToolTipLi, SCErrorToolTipUl } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"
import { Tooltip } from "react-tooltip";

const ErrorCell = (props:ICellRendererParams)=>{
    const message = props.data.error;
    const rowId:any = props.node.rowIndex 
    const getFomattedMessage = (msg:string) => {
        if(msg.length > 30) {
            return msg.slice(0,30)+'...'
        }
        return msg;
    }

    return(
        <>
        {message &&
            <SCContainer style={{overflow:'visible'}}>
                <img src="/assets/img/VectorFLOW/NMS/error.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px'}}/>
                <a data-tooltip-id={rowId}>{getFomattedMessage(message)}</a>
                <Tooltip id={rowId} style={{width:'270px',backgroundColor:'rgba(255,255,255,1)',color:'#820F4C',borderRadius:'8px',border:'1px solid #BC3D81'}}>
                    <SCErrorToolTipUl>
                        {message.split(/(?<=\.)\s+/).map((sentence:string,index:number)=>{
                            return <SCErrorToolTipLi key={index}>{sentence}</SCErrorToolTipLi>
                        })}
                    </SCErrorToolTipUl>
                </Tooltip>
            </SCContainer>
        }
        </>
        
    )
}

export default ErrorCell;