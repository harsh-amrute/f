import React from 'react'
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay'

interface Props {
    message?: string
}
const OverlayLoader = ({ message }: Props) => {
    return (
        <VFOverlay>
            <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>{message ? message : 'Loading....'}</h1>
        </VFOverlay>
    )
}

export default OverlayLoader