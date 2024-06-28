
import { Allotment } from "allotment"
import React, { useState } from "react"
import useViewPort from "../../../../../../hooks/useViewPort"
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import BTMTA from "./BTMTA"
import BTMTO from "./BTMTO"
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from "./styles"
import BPRViewTable from "../../../../MTA/SupplyChainIntelligenceHub/BPR/BPRViewTable"


const RMPMBufferTrends = () => {


    const [isMTO] = useState(true);
    const [isSubGridOpen, setIsSubGridOpen] = useState(true);
    const { screenHeight } = useViewPort()
    return (
        <div style={{ zoom: 1.33, marginLeft: '30px' }}>


            <MTOActionToolBar comp={"BTRMTO"} />
            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 100, margin: '0' }}>
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

    // return (



    //     <div style={{ zoom: 1.25, width: '90vw' }}>
    //         <MTOActionToolBar comp="rmpm-btr" />
    //         <BTRTableWrapper style={{ height: "96vh", margin: "26px" }}>
    //             <Allotment vertical={false} separator={false} >
    //                 <Allotment.Pane >
    //                     <BTMTO />
    //                 </Allotment.Pane>
    //                 {/* <Allotment.Pane maxSize={5}>
    //                     <Separator style={{ cursor: "e-resize" }} >
    //                         <ViewSlider>
    //                             <img src="/assets/img/VectorFLOW/BPR/slider-icon.svg" />
    //                         </ViewSlider>
    //                     </Separator>
    //                 </Allotment.Pane> */}
    //                 <Allotment.Pane>
    //                     <BTMTA />
    //                 </Allotment.Pane>
    //             </Allotment>

    //         </BTRTableWrapper>
    //     </div>

    // )
}
export default RMPMBufferTrends
