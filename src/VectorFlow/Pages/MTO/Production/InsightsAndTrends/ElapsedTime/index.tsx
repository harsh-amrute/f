import { Allotment } from 'allotment'
import { useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { BTRAllomentSection, BTRTableWrapper, HorizontalViewWrapper } from '../../../Common/SplitGraphContainer/styles'
import GridView from './GridView'
import WeekWiseGraph from './WeekWiseGraph'
import DeptWiseGraph from './DeptWiseGraph'

const ElapsedTime = () => {

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
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <DeptWiseGraph />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                    <Allotment.Pane minSize={400} preferredSize={'50%'} className='allotment-pane-custom'>
                                        <BTRAllomentSection>
                                            <WeekWiseGraph />
                                        </BTRAllomentSection>
                                    </Allotment.Pane>
                                </Allotment>



                            </BTRTableWrapper>

                        </HorizontalViewWrapper>
                    </>
                    :
                    <>
                        <GridView />
                    </>
            }
        </>
    )
}

export default ElapsedTime