
import { Allotment } from "allotment"
import React, { useEffect, useState } from "react"
import useViewPort from "../../../../../../hooks/useViewPort"
import MTOActionToolBar from "../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar"
import BTMTA from "./BTMTA"
import BTMTO from "./BTMTO"
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from "./styles"
import "./style.css"
import { useGetRMPMBufferTrendsData } from "../../../../../../VectorFlow/Services/MTO/Procurement/RMPMBufferTrends"


const RMPMBufferTrends = () => {


    const [isMTO] = useState(true);
    const { screenHeight } = useViewPort()

    const { mutateAsync: getRMPMBufferTrendsData } = useGetRMPMBufferTrendsData();

    const [MTOData, setMTOData] = useState(null);
    const [MTAData, setMTAData] = useState(null);
    const GetData = async () => {
        const APIData = await getRMPMBufferTrendsData();
        setMTOData(APIData.data.data.MTO);
        setMTAData(APIData.data.data.MTA);
        console.log('MTOData::::', MTOData);
        console.log("MTAData::::", MTAData);

    }

    useEffect(() => {
        GetData();

    }, [])


    return (
        <div style={{ zoom: 1.33, marginLeft: '30px' }}>


            <MTOActionToolBar comp={"BTRMTO"} />
            <HorizontalViewWrapper style={{ marginTop: '20px' }}>
                <BTRTableWrapper style={{ height: screenHeight - 145, margin: '0' }}>
                    {
                        (isMTO) ?
                            (<Allotment vertical={false} separator={false}   >
                                <Allotment.Pane preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <BTMTO MTOData={MTOData} isMTO={isMTO} />
                                    </BTRAllomentSection>
                                </Allotment.Pane>

                                <Allotment.Pane preferredSize={'50%'}>
                                    <BTRAllomentSection>
                                        <BTMTA MTAData={MTAData} isMTO={isMTO} />
                                    </BTRAllomentSection>
                                </Allotment.Pane>
                            </Allotment>)
                            :
                            <BTMTO MTOData={MTOData} isMTO={isMTO} />

                    }
                </BTRTableWrapper>

            </HorizontalViewWrapper>
        </div>
    )
}
export default RMPMBufferTrends
