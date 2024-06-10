import {useState} from 'react'
import Portal from '../../layouts/Portal'
import { Icon, TextWrapper, Wrapper,Text } from "./styles"


interface VFInfoToolTipProps{
    infoList:Array<string>
}

interface ToolTipPositionType{
    top:number
    left:number
}

const VFInfoToolTip = (props:VFInfoToolTipProps)=>{

    const {
        infoList
    } = props



    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [tooltipPosition,setTooltipPosition] = useState<ToolTipPositionType>({
        top:0,
        left:0
    })

    const onOpenToolTip = (e:React.MouseEvent<HTMLElement>)=>{
        const {top,left} = e.currentTarget.getBoundingClientRect()
        setTooltipPosition({
            top:(top /0.75) + 30,
            left
        })
        setIsOpen(true)
    }

    return(
        <Wrapper  >
            {isOpen?<Icon src={"/assets/img/VectorFLOW/BPR/cancel.svg"} onClick={()=>setIsOpen(false)}/>:<Icon src={"/assets/img/VectorFLOW/BPR/info.svg"} onClick={onOpenToolTip}/>}
            {isOpen &&  (
                <Portal  wrapperId='tooltip'>
                    <TextWrapper style={{...tooltipPosition}} >
                        {infoList.map(((s,index)=>{
                            return(
                                <Text key={index}>{s}</Text>
                            )
                        }))}
                    </TextWrapper>
                </Portal>
            )}
        </Wrapper>
    )
}

export default VFInfoToolTip