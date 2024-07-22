
import { Allotment } from "allotment"
import React, { useState } from "react"
import useViewPort from "../../../../../../hooks/useViewPort"
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import BTMTA from "./BTMTA"
import BTMTO from "./BTMTO"
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from "./styles"
import "./style.css"


const RMPMBufferTrends = () => {


    const [isMTO] = useState(true);
    const { screenHeight } = useViewPort()
    return (
        <div style={{ zoom: 1.33, marginLeft: '30px' }}>


            <MTOActionToolBar comp={"BTRMTO"} isAddFilterButton />
            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 145, margin: '0' }}>
                    {
                        (isMTO) ?
                            (<Allotment vertical={false} separator={false}   >
                                <Allotment.Pane preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <BTMTO isMTO={isMTO} />
                                    </BTRAllomentSection>
                                </Allotment.Pane>

                                <Allotment.Pane preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <BTMTA isMTO={isMTO} />
                                    </BTRAllomentSection>
                                </Allotment.Pane>
                            </Allotment>)
                            :
                            <BTMTO isMTO={isMTO} />

                    }
                </BTRTableWrapper>

            </HorizontalViewWrapper>
        </div>
    )
}
export default RMPMBufferTrends
