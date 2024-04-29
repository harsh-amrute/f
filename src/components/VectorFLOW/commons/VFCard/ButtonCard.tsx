
import { CardButton, ButtonCardContainer } from "./styles"


interface ButtonCardProps{
    text:string
    onClick:()=>void
    opacity?:string
}


const ButtonCard = (props:ButtonCardProps)=>{


    const {
        onClick,
        text,
        opacity
    } = props

    return(
        <ButtonCardContainer style={{opacity:opacity,visibility:opacity==='1'?'visible':'hidden'}} imgSrc="assets/img/VectorFLOW/NMS/card-bg.svg">
            <CardButton onClick={onClick} data-testid={"button-card"}>{text}</CardButton>
        </ButtonCardContainer>
    )
}

export default ButtonCard