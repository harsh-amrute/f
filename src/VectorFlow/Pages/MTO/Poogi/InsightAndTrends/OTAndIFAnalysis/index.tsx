import { Allotment } from 'allotment'
import { useState } from 'react'
import VFTable from '../../../../../../components/VectorFLOW/commons/VFTable'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import useViewPort from '../../../../../../hooks/useViewPort'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import IFFaildGraph from './IFFailedGraph'
import OTFailedGraph from './OTFailedGraph'
import GraphView from './GridView'

const OTAndIFAnalysis = () => {

    const [isGridView, setIsGridView] = useState(false);

    return (
        <>
            <MTOActionToolBar comp={"BTRMTO"} isAddFilterButton isChartGridToggle setIsGridView={setIsGridView} isGridView={isGridView} />

            {
                !isGridView ?
                    <>

                        <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                            <BTRTableWrapper style={{ flex: '1', margin: '0' }}>


                                <Allotment vertical={false} separator={false}   >
                                    <Allotment.Pane preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <OTFailedGraph />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>

                                    <Allotment.Pane preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <IFFaildGraph />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>



                            </BTRTableWrapper>

                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GraphView />
                    </>
            }
        </>
    )
}

export default OTAndIFAnalysis