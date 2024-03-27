
import { CardButton, ButtonCardContainer } from "./styles"


interface ButtonCardProps{
    text:string
    onClick:()=>void
}


const ButtonCard = (props:ButtonCardProps)=>{


    const {
        onClick,
        text
    } = props

    return(
        <ButtonCardContainer imgSrc="assets/img/VectorFLOW/NMS/card-bg.svg">
            <CardButton onClick={onClick} data-testid={"button-card"}>{text}</CardButton>
        </ButtonCardContainer>
    )
}

export default ButtonCard