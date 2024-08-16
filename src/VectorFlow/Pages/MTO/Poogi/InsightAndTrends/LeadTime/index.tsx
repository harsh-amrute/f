import React, { useState } from 'react'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import ChartView from './ChartView';
import GridView from './GridView';

const LeadTime = () => {
    const [isGridView, setIsGridView] = useState(false);
    return (
        <>
            <MTOActionToolBar handleGoBack={() => { setIsGridView(false) }} isGoBackButton={isGridView} isChartGridToggle isGridView={isGridView} setIsGridView={setIsGridView} isExcelExport />

            {
                isGridView ?
                    <>
                        <GridView />
                    </>
                    :
                    <>
                        <ChartView />
                    </>
            }
        </>
    )
}

export default LeadTime