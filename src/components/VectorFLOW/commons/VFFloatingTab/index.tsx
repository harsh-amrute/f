
import { useEffect, useState } from 'react'
import {VFFloatingTabWrapper,VFFloatingTabButton,VFFloatingTabButtonActiveShadow} from './styles'

interface VFFloatingTabItemProps{
    label:string
    value:string
    id:string
}


export interface VFFloatingTabProps{
    tabs:Array<VFFloatingTabItemProps>
    defaultTab?:number
    handleClick?:(i:any,index:any)=>void  
}

interface ActiveShadowDataType{
    width:number | string | undefined,
    left:number | string | undefined
}

const VFFloatingTab = (props:VFFloatingTabProps)=>{

    const {
        tabs,
        defaultTab=0,
        handleClick
    } = props
    
    const [activeIndex,setActiveIndex] = useState<number>(defaultTab)

    const [activeShadowData,setActiveShadowData] = useState<ActiveShadowDataType | null>(null)

    useEffect(()=>{
        const activeTabElement = document.getElementById(tabs[defaultTab].id)
        setActiveShadowData({
            left:activeTabElement?.offsetLeft,
            width:activeTabElement?.offsetWidth
        })
       
    },[])
   

    const onClick = (e:any,index:number)=>{
        setActiveShadowData({
            left:e.currentTarget.offsetLeft,
            width:e.currentTarget.offsetWidth
        })
        setActiveIndex(index)
       if( handleClick) handleClick(tabs[index],index)
    }

    return(
        <VFFloatingTabWrapper>
            {tabs.map((t:VFFloatingTabItemProps,index:number)=>{
                return(
                    <VFFloatingTabButton
                        id={t.id}
                        isActive={index===activeIndex}
                        key={index}
                        onClick={(e)=>onClick(e,index)}
                        data-testid='floatingTabButton'
                    >
                        {t.label}
                    </VFFloatingTabButton>
                )
            })}
            {activeShadowData && <VFFloatingTabButtonActiveShadow style={{left:activeShadowData.left,width:activeShadowData.width}}/>}
        </VFFloatingTabWrapper>
    )
}

export default VFFloatingTab