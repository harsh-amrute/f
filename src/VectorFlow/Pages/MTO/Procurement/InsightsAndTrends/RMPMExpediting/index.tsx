import { Allotment } from "allotment"
import React, { useState } from "react"
import useViewPort from "../../../../../../hooks/useViewPort"
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import '../RMPMBufferTrends/style.css';
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from "../RMPMBufferTrends/styles";
import ExpeditingMTA from "./MTAGraph/ExpeditingMTA";
import ExpeditingMTO from "./MTOGraph/ExpeditingMTO";
import { useGetDate } from '../../../../../Services/MTO/Procurement/InsightsAndTrends/RMPMExpediting/index'



const RMExpeditionSuppliers = () => {
    const [isMTO] = useState(true);
    const { data, /*isLoading, refetch*/ } = useGetDate();
    
    const { screenHeight } = useViewPort()

    return (
        <div style={{ zoom: 1.33, marginLeft: '30px' }}>
            <MTOActionToolBar comp={"BTRMTO"} />
            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 145, margin: '0' }}>
                    {
                        (isMTO) ?
                            (<Allotment
                                vertical={false}
                                separator={false}   >
                                <Allotment.Pane
                                    preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <ExpeditingMTO
                                            isMTO={isMTO}
                                            date={data?.data?.data}
                                        />
                                    </BTRAllomentSection>
                                </Allotment.Pane>

                                <Allotment.Pane
                                    preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <ExpeditingMTA
                                            isMTO={isMTO}
                                            date={data?.data?.data}
                                        />
                                    </BTRAllomentSection>
                                </Allotment.Pane>
                            </Allotment>)
                            :
                            <ExpeditingMTO isMTO={isMTO} date={data?.data?.data} />
                    }
                </BTRTableWrapper>

            </HorizontalViewWrapper>
        </div>
    )
}

export default RMExpeditionSuppliers;