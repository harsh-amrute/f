import React, { useState } from 'react'
import ActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import GridView from './GridView/GridView'
import GraphView from './GraphView/GraphView';

const RMPM = () => {

    const [isGridView, setIsGridView] = useState(false);
    return (
        <>

            Graph View
            <ActionToolBar comp={"rmpm"} isGridView={isGridView} setIsGridView={setIsGridView} />

            {(isGridView) ? <GridView /> : <GraphView />}
        </>
    )
}
export default RMPM
