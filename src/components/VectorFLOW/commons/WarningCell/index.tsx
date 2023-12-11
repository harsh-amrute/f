import { SCContainer } from "./styles"
import { ICellRendererParams } from "ag-grid-enterprise"

const WarningCell = (props:ICellRendererParams)=>{
    const message = props.data.warning;
    const getFomattedMessage = (msg:string) => {
        if(msg.length > 25) {
            return msg.slice(0,25)+'...'
        }
        return msg;
    }

    return(
        <>
        {message ? 
            <SCContainer>
                <img src="/assets/img/VectorFLOW/NMS/error-orange.svg" width={17} height={17} style={{marginRight:'7px',marginLeft:'5px'}}/>
                {getFomattedMessage(message)}
            </SCContainer>
            :
            <></>
        }
        </>
        
    )
}

export default WarningCell;