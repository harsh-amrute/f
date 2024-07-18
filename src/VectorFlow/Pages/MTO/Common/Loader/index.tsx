import React from 'react'
import VFOverlay from '../../../../../components/VectorFLOW/commons/VFOverlay'

const OverlayLoader = () => {
    return (
        <VFOverlay>
            <h1 style={{ backgroundColor: "white", padding: '15px', borderRadius: '8px' }}>Loading....</h1>
        </VFOverlay>
    )
}

export default OverlayLoader