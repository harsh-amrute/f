import { SCContainer } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"

const ErrorCell = (props:ICellRendererParams)=>{
    const message = props.data.error;
    const getFomattedMessage = (msg:string) => {
        if(msg.length > 30) {
            return msg.slice(0,30)+'...'
        }
        return msg;
    }

    return(
        <>
        {message ? 
            <SCContainer>
                <img src="/assets/img/VectorFLOW/NMS/error.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px'}}/>
                <p>{getFomattedMessage(message)}</p>
            </SCContainer>
            :
            <></>
        }
        </>
        
    )
}

export default ErrorCell;