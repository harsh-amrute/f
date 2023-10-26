import { useState } from "react"
import {  IconCardContainer, CardText ,CardIconWrapper} from "./styles"


interface IconCardProps{
    text:string
    iconOnMouseIn:string
    iconOnMouseOut:string
    onClick:()=>void
}


const IconCard = (props:IconCardProps)=>{


    const {
        iconOnMouseIn,
        iconOnMouseOut,
        text,
        onClick
    } = props

    const [activeIcon,setActiveIcon] = useState(iconOnMouseOut)

    const handleOnMouseIn = ()=>{
        setActiveIcon(iconOnMouseIn)
    }

    const handleOnMouseOut = ()=>{
        setActiveIcon(iconOnMouseOut)
    }

    return(
        <IconCardContainer imgSrc="assets/img/VectorFLOW/NMS/card-bg.png">
            <CardText onClick={onClick} data-testid={"icon-card"}>{text}</CardText>
            <CardIconWrapper onMouseEnter={handleOnMouseIn} onMouseLeave={handleOnMouseOut} onClick={onClick}>
                <img data-testid='icon' src={activeIcon}/>
            </CardIconWrapper>
        </IconCardContainer>
    )
}

export default IconCard