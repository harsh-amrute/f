import { Allotment } from 'allotment'
import { useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import DownTrend from './DownTrend'
import EmgAndUnres from './EmgAndUnres'

const TrendsOfFailureReason = () => {

    const [isGridView, setIsGridView] = useState(false);

    return (
        <>
            <MTOActionToolBar isAddFilterButton />


            <HorizontalViewWrapper style={{ margin: '20px 14px', height: '85%', display: 'flex' }}>
                <BTRTableWrapper style={{ flex: '1', margin: '0' }}>


                    <Allotment vertical={false} separator={false}   >
                        <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                            <BTRAllomentSection>
                                <EmgAndUnres />
                            </BTRAllomentSection>
                        </Allotment.Pane>

                        <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                            <BTRAllomentSection>
                                <DownTrend />
                            </BTRAllomentSection>
                        </Allotment.Pane>
                    </Allotment>



                </BTRTableWrapper>

            </HorizontalViewWrapper>
        </>
    )
}

export default TrendsOfFailureReason