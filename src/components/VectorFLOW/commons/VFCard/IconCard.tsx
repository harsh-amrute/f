
import {  IconCardContainer, CardText ,CardIconWrapper} from "./styles"


interface IconCardProps{
    text:string
    iconOnMouseIn:string
    iconOnMouseOut:string
    onClick:()=>void
}


const IconCard = (props:IconCardProps)=>{


    const {
        iconOnMouseOut,
        text,
        onClick,
    } = props


    return(
        <IconCardContainer imgSrc="assets/img/VectorFLOW/NMS/card-bg.svg">
            <CardText onClick={onClick} data-testid={"icon-card"}>{text}</CardText>
            <CardIconWrapper >
                <img data-testid='icon' src={iconOnMouseOut}/>
            </CardIconWrapper>
        </IconCardContainer>
    )
}

export default IconCard