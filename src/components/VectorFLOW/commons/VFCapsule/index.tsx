import { useState } from "react"
import { useUserData } from "../../../../context"
import { VFCapsuleButton, VFCapsuleWrapper } from "./styles"

interface Capsule{
    label:string
    value:string
}

interface VFCapsuleProps{
    defaultActive:number
    capsules:Capsule[]
    handleClick:any
    //handleClick?:(i:any,index:any)=>void  
}

const VFCapsule = (props:VFCapsuleProps)=>{

    const {
        defaultActive,
        capsules,
        handleClick
    } = props

    

    const {user} = useUserData()

    const [activeButton,setActiveButton] = useState<Capsule>(capsules[defaultActive])

    const onClick = (capsule:Capsule)=>{
        setActiveButton(capsule)
        handleClick(capsule)
        
    }

    return(
        <VFCapsuleWrapper themeUi={user.user.theme_ui}>
            {capsules.map((c:Capsule,i:any)=>{
                return(
                    <VFCapsuleButton isActive={c.value===activeButton.value} onClick={()=>onClick(c)} themeUi={user.user.theme_ui} key={c.value}>
                        {c.label}
                    </VFCapsuleButton>
                )
            })}
        </VFCapsuleWrapper>
    )
}

export default VFCapsule