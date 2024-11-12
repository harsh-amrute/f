import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay'

interface Props {
    message?: string
}
const OverlayLoader = ({ message }: Props) => {
    return (
        <VFOverlay>
            {/* <h1 >{message ? message : 'Loading....'}</h1> */}
            <div style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px', display: "flex", flexDirection:"column", alignItems:"center" }}>
                <Player src={'/assets/img/mto/fullKitAssignment/loader.json'} loop autoplay style={{ height: 300, width: 300 }} />
                {message}
            </div>
        </VFOverlay>
    )
}

export default OverlayLoader