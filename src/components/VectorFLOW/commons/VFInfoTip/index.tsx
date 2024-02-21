import { InfoWrapper, IconTextContainer, InfoIcon, Infotext } from "./styles"

interface VFInfoTipProps{
    text:Array<string>
    
}

const VFInfoTip=(props:VFInfoTipProps)=>{

    const {
        text
    } = props

    return(
        <>
        <InfoWrapper>
            <IconTextContainer>
                <InfoIcon>
                    <img src="/assets/img/VectorFLOW/BPR/bulb.svg"></img>
                </InfoIcon>
                <Infotext>
                    {text.length>1 ? text.map((temp)=>(
                        <ul style={{margin:'0px 0px 5px 0px'}}>
                            <li key={temp} style={{listStyle:'outside'}}><b>{temp}</b></li> 
                        </ul>  
                    )) : <p><b>{text}</b></p>}         
                </Infotext>
            </IconTextContainer>   
        </InfoWrapper>
        </>
    )
}
export default VFInfoTip